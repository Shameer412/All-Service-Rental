'use client';

import React from 'react';

interface PayoutLog {
  date: string;
  gross: number;
  commission: number;
  net: number;
  bank: string;
  status: string;
}

interface PayoutHistoryProps {
  logs: PayoutLog[];
}

export default function PayoutHistory({ logs }: PayoutHistoryProps) {
  return (
    <div className="overflow-hidden shadow-2xl">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#28A745]">
              <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider whitespace-nowrap rounded-tl-2xl">
                Date
              </th>
              <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider whitespace-nowrap">
                Gross Amount
              </th>
              <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider whitespace-nowrap">
                Commission
              </th>
              <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider whitespace-nowrap">
                Net Amount
              </th>
              <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider whitespace-nowrap">
                Bank Account
              </th>
              <th className="px-4 sm:px-6 py-4 text-white font-extrabold text-sm uppercase tracking-wider whitespace-nowrap rounded-tr-2xl">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-transparent">
            {logs.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const rowBg = isEven ? 'bg-[#0B2337]' : 'bg-[#001C2F]';

              return (
                <tr
                  key={idx}
                  className={`transition-all cursor-pointer group ${rowBg}`}
                >
                  <td className="px-4 sm:px-6 py-4 text-white/80 text-sm font-medium whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-white/80 text-sm font-medium whitespace-nowrap">
                    {item.gross ? `${item.gross.toLocaleString()}` : ''}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-white/80 text-sm font-medium whitespace-nowrap">
                    {item.commission ? `-$${item.commission.toLocaleString()}` : ''}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-[#28A745] font-extrabold text-sm whitespace-nowrap">
                    ${item.net.toLocaleString()}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-white/80 text-sm font-medium whitespace-nowrap">
                    {item.bank}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm whitespace-nowrap">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                        item.status === 'Pending'
                          ? 'text-[#B93815] border-[#FEE4E2] bg-[#FEF6EE]'
                          : 'text-[#027A48] border-[#D1FADF] bg-[#ECFDF3]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
