'use client';

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';

const data = [
  { name: 'Active', value: 245, color: '#22C55E' },
  { name: 'Maintenance', value: 32, color: '#F59E0B' },
  { name: 'Available', value: 87, color: '#3B82F6' },
  { name: 'Reserved', value: 41, color: '#A855F7' },
];

export default function AdminFleetStatus() {
  return (
    <div className="bg-[#0B2337] border border-[#2A2F38] p-6 rounded-[24px] flex flex-col justify-between min-h-[386px]">
      <div>
        <h2 className="text-lg font-bold text-white font-inter">Fleet Status</h2>
        <p className="text-white text-xs mt-1 font-inter">Current vehicle distribution</p>
      </div>
      <div className="h-[180px] w-full my-4 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={0}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth={1}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0B2337',
                borderColor: '#2A2F38',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif'
              }}
              itemStyle={{ color: '#FFFFFF', fontFamily: 'Inter' }}
              formatter={(value: any) => [`${value} Vehicles`, 'Count']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Custom 2-Column Legend */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-2 border-t border-white/5">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2.5">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-white text-sm font-medium font-inter">
                {item.name}
              </span>
              <span className="text-white text-base font-bold leading-tight font-inter">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
