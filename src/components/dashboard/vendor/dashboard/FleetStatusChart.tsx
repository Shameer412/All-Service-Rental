'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'Available', count: 12 },
  { name: 'Rented', count: 18 },
  { name: 'Maintenance', count: 3 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0B2337] border-[0.97px] border-[#2A2F38] p-3 rounded-xl shadow-lg font-inter">
        <p className="text-white text-xs font-semibold">{payload[0].payload.name}</p>
        <p className="text-[#22C55E] text-sm font-bold mt-1">
          {payload[0].value} Vehicles
        </p>
      </div>
    );
  }
  return null;
};

const formatXAxis = (value: string) => {
  if (value === 'Rented') return '';
  return value;
};

export default function FleetStatusChart() {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: 15, bottom: 5 }}
          barSize={40}
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
            tickFormatter={formatXAxis}
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
            domain={[0, 20]}
            ticks={[0, 5, 10, 15, 20]}
            dx={-3}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar
            dataKey="count"
            fill="#22C55E"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
