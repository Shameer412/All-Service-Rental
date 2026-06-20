'use client';

import React from 'react';
import { CreditCard, DollarSign, Calendar, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';

export default function CustomerPayments() {
  const paymentStats = [
    { label: 'Total Paid', value: '$2,793', icon: DollarSign, color: 'text-white' },
    { label: 'Pending', value: '$0', icon: Clock, color: 'text-yellow-500' },
  ];

  const transactions = [
    {
      id: 1,
      date: '2025-02-10',
      vendor: 'NYC Fleet Co.',
      amount: '$1,323',
      method: 'Credit Card',
      status: 'completed',
    },
    {
      id: 2,
      date: '2025-01-20',
      vendor: 'West Coast Trucks',
      amount: '$1,470',
      method: 'Credit Card',
      status: 'completed',
    },
  ];

  return (
    <div className="w-[98%] lg:w-[96%] 2xl:w-[94%] max-w-[2400px] mx-auto space-y-10 bg-[#001C2F]">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Payment History</h1>
        <p className="text-gray-400">All your payment transactions.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentStats.map((stat, index) => (
          <div key={index} className="bg-[#0B2337] border border-[#2A2F38] p-8 rounded-[20px] relative overflow-hidden group hover:border-[#22C55E]/30 transition-all">
            <div className="space-y-1">
              <p className="text-gray-400 font-medium mb-1">{stat.label}</p>
              <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-[#0B2337] border border-[#2A2F38] rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#001C2F]/50">
                <th className="px-6 py-5 text-gray-400 font-bold text-sm uppercase tracking-wider">Date</th>
                <th className="px-6 py-5 text-gray-400 font-bold text-sm uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-5 text-gray-400 font-bold text-sm uppercase tracking-wider">Amount</th>
                <th className="px-6 py-5 text-gray-400 font-bold text-sm uppercase tracking-wider">Method</th>
                <th className="px-6 py-5 text-gray-400 font-bold text-sm uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-6 text-gray-300 font-medium">{tx.date}</td>
                  <td className="px-6 py-6 text-white font-bold">{tx.vendor}</td>
                  <td className="px-6 py-6 text-white font-bold">{tx.amount}</td>
                  <td className="px-6 py-6 text-gray-400 font-medium">{tx.method}</td>
                  <td className="px-6 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider ${
                      tx.status === 'completed' 
                        ? 'bg-[#22C55E]/10 text-[#22C55E]' 
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
