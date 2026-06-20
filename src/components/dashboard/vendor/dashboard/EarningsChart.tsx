'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'Jan', earnings: 40000 },
  { name: 'Feb', earnings: 47000 },
  { name: 'Mar', earnings: 45000 },
  { name: 'Apr', earnings: 55000 },
  { name: 'May', earnings: 50000 },
  { name: 'Jun', earnings: 62000 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0B2337] border-[0.97px] border-[#2A2F38] p-3 rounded-xl shadow-lg font-inter">
        <p className="text-white text-xs font-semibold">{payload[0].payload.name}</p>
        <p className="text-[#22C55E] text-sm font-bold mt-1">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function EarningsChart() {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 10, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            stroke="#1E2E3D"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="#FFFFFF"
            strokeOpacity={0.4}
            tickLine={true}
            axisLine={{ stroke: '#FFFFFF', strokeOpacity: 0.4, strokeWidth: 1.5 }}
            tick={{ fill: '#FFFFFF', fontSize: 13, fontFamily: 'Inter, sans-serif' }}
            dy={10}
          />
          <YAxis
            stroke="#FFFFFF"
            strokeOpacity={0.4}
            tickLine={true}
            axisLine={{ stroke: '#FFFFFF', strokeOpacity: 0.4, strokeWidth: 1.5 }}
            tick={{ fill: '#FFFFFF', fontSize: 13, fontFamily: 'Inter, sans-serif' }}
            domain={[0, 80000]}
            ticks={[0, 20000, 40000, 60000, 80000]}
            dx={-3}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#1E2E3D', strokeWidth: 1.5 }} />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#22C55E"
            strokeWidth={3.5}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#22C55E' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
