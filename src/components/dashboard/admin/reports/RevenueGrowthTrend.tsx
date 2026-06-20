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

const chartData = [
  { name: 'Jul 25', revenue: 41000 },
  { name: 'Aug 25', revenue: 45000 },
  { name: 'Sep 25', revenue: 48000 },
  { name: 'Oct 25', revenue: 51000 },
  { name: 'Nov 25', revenue: 56000 },
  { name: 'Dec 25', revenue: 61000 },
  { name: 'Jan 26', revenue: 67000 },
];

export default function RevenueGrowthTrend() {
  return (
    <div className="p-6 bg-[#0B2337] border border-[#2A2F38] rounded-[24px] space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white tracking-wide font-inter">Revenue Growth Trend</h2>
        <p className="text-white/60 text-xs mt-1 font-inter">Monthly revenue and growth rate</p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenueTrend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1E2E3D" strokeDasharray="3 3" vertical={true} />
            <XAxis
              dataKey="name"
              stroke="#FFFFFF"
              strokeOpacity={0.3}
              tickLine={true}
              axisLine={true}
              tick={{ fill: '#FFFFFF', opacity: 0.7, fontSize: 12, fontFamily: 'Inter' }}
              dy={8}
            />
            <YAxis
              stroke="#FFFFFF"
              strokeOpacity={0.3}
              tickLine={true}
              axisLine={true}
              tick={{ fill: '#FFFFFF', opacity: 0.7, fontSize: 12, fontFamily: 'Inter' }}
              domain={[0, 80000]}
              ticks={[0, 20000, 40000, 60000, 80000]}
              dx={-8}
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
              fill="url(#colorRevenueTrend)"
              activeDot={{ r: 6, strokeWidth: 0, fill: '#22C55E' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 pt-2 text-xs font-semibold text-white/70 font-inter">
        <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
        Revenue ($)
      </div>
    </div>
  );
}
