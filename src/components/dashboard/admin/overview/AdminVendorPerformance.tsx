'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const data = [
  { name: 'DriveShare Ltd', displayName: 'DriveShare Ltd', revenue: 25000 },
  { name: 'Apex Rentals', displayName: '', revenue: 22000 },
  { name: 'Elite Fleet', displayName: '', revenue: 19000 },
  { name: 'QuickCar Inc', displayName: 'QuickCar Inc', revenue: 15500 },
];

export default function AdminVendorPerformance() {
  return (
    <div className="bg-[#0B2337] border border-[#2A2F38] p-6 rounded-[24px] space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white font-inter">Top Performing Vendors</h2>
        <p className="text-white text-xs mt-1 font-inter">Revenue by vendor this month</p>
      </div>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 5, bottom: 0 }} barSize={48}>
            <CartesianGrid stroke="#1E2E3D" strokeDasharray="3 3" vertical={true} />
            <XAxis
              dataKey="displayName"
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
              domain={[0, 26000]}
              ticks={[0, 6500, 13000, 19500, 26000]}
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
              labelFormatter={(label, items) => {
                const item = items[0]?.payload;
                return item ? item.name : label;
              }}
              itemStyle={{ color: '#22C55E', fontFamily: 'Inter' }}
              labelStyle={{ color: '#FFFFFF', fontWeight: '600', fontFamily: 'Inter' }}
              formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Bar
              dataKey="revenue"
              fill="#22C55E"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
