import { NextResponse } from 'next/server';
const APIContracts = require('authorizenet').APIContracts;
const APIControllers = require('authorizenet').APIControllers;

export async function POST(req: Request): Promise<Response> {
  try {
    const { opaqueData } = await req.json();

    if (!opaqueData || !opaqueData.dataDescriptor || !opaqueData.dataValue) {
      return NextResponse.json({ error: 'Invalid payment token data' }, { status: 400 });
    }

    const merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(process.env.AUTHORIZENET_API_LOGIN_ID);
    merchantAuthenticationType.setTransactionKey(process.env.AUTHORIZENET_TRANSACTION_KEY);

    const opaqueDataType = new APIContracts.OpaqueDataType();
    opaqueDataType.setDataDescriptor(opaqueData.dataDescriptor);
    opaqueDataType.setDataValue(opaqueData.dataValue);

    const paymentType = new APIContracts.PaymentType();
    paymentType.setOpaqueData(opaqueDataType);

    const transactionRequestType = new APIContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount('410.40'); // This should ideally come from backend state/db

    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    const ctrl = new APIControllers.CreateTransactionController(createRequest.getJSON());
    // For sandbox, use: ctrl.setEnvironment("https://apitest.authorize.net/xml/v1/request.api");
    // For production, use default or: ctrl.setEnvironment("https://api.authorize.net/xml/v1/request.api");
    
    return new Promise<Response>((resolve) => {
      ctrl.execute(() => {
        const apiResponse = ctrl.getResponse();
        const response = new APIContracts.CreateTransactionResponse(apiResponse);

        if (response !== null) {
          if (response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
            if (response.getTransactionResponse().getMessages() !== null) {
              resolve(NextResponse.json({ success: true, transactionId: response.getTransactionResponse().getTransId() }));
            } else {
              if (response.getTransactionResponse().getErrors() !== null) {
                resolve(NextResponse.json({ error: response.getTransactionResponse().getErrors().getError()[0].getErrorText() }, { status: 400 }));
              } else {
                resolve(NextResponse.json({ error: 'Payment failed with unknown transaction response' }, { status: 400 }));
              }
            }
          } else {
            if (response.getTransactionResponse() !== null && response.getTransactionResponse().getErrors() !== null) {
              resolve(NextResponse.json({ error: response.getTransactionResponse().getErrors().getError()[0].getErrorText() }, { status: 400 }));
            } else {
              resolve(NextResponse.json({ error: response.getMessages().getMessage()[0].getText() }, { status: 400 }));
            }
          }
        } else {
          resolve(NextResponse.json({ error: 'Null response received from Authorize.net' }, { status: 500 }));
        }
      });
    });

  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
