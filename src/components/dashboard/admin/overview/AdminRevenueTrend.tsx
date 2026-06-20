'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 },
  { name: 'May', revenue: 59000 },
  { name: 'Jun', revenue: 68000 },
];

export default function AdminRevenueTrend() {
  return (
    <div className="bg-[#0B2337] border border-[#2A2F38] p-6 rounded-[24px] space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white font-inter">Revenue Trend</h2>
        <p className="text-white text-xs mt-1 font-inter">Monthly revenue and rental performance</p>
      </div>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 5, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1E2E3D" strokeDasharray="3 3" vertical={true} />
            <XAxis
              dataKey="name"
              stroke="#FFFFFF"
              strokeOpacity={0.4}
              tickLine={true}
              axisLine={true}
              tick={{ fill: '#FFFFFF', opacity: 1, fontSize: 12, fontFamily: 'Inter' }}
              dy={8}
            />
            <YAxis
              stroke="#FFFFFF"
              strokeOpacity={0.4}
              tickLine={true}
              axisLine={true}
              tick={{ fill: '#FFFFFF', opacity: 1, fontSize: 12, fontFamily: 'Inter' }}
              domain={[0, 80000]}
              ticks={[0, 20000, 40000, 60000, 80000]}
              dx={-5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0B2337',
                borderColor: '#2A2F38',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif'
              }}
              itemStyle={{ color: '#22C55E', fontFamily: 'Inter' }}
              labelStyle={{ color: '#FFFFFF', fontWeight: '600', fontFamily: 'Inter' }}
              formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#22C55E"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              activeDot={{ r: 6, strokeWidth: 0, fill: '#22C55E' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
