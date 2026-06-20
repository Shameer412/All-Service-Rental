'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const commissionData = [
  { name: 'Jan', Platform: 7500, Vendor: 34000 },
  { name: 'Feb', Platform: 9000, Vendor: 41000 },
  { name: 'Mar', Platform: 8000, Vendor: 37000 },
  { name: 'Apr', Platform: 11500, Vendor: 49000 },
  { name: 'May', Platform: 10000, Vendor: 46000 },
  { name: 'Jun', Platform: 12600, Vendor: 54800 },
];

const trendData = [
  { name: 'Jan', revenue: 43500 },
  { name: 'Feb', revenue: 50800 },
  { name: 'Mar', revenue: 46200 },
  { name: 'Apr', revenue: 60500 },
  { name: 'May', revenue: 57400 },
  { name: 'Jun', revenue: 67400 },
];

export default function PaymentsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-inter">
      {/* Commission Breakdown Bar Chart */}
      <div className="bg-[#0B2337] border border-[#2A2F38] p-6 rounded-[24px] space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white font-inter">Commission Breakdown</h2>
          <p className="text-white text-xs mt-1 font-inter">Platform vs Vendor revenue split</p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={commissionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barGap={6}>
              <CartesianGrid stroke="#1E2E3D" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#FFFFFF"
                strokeOpacity={0.4}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#FFFFFF', opacity: 0.6, fontSize: 11 }}
                dy={8}
              />
              <YAxis
                stroke="#FFFFFF"
                strokeOpacity={0.4}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#FFFFFF', opacity: 0.6, fontSize: 11 }}
                domain={[0, 60000]}
                ticks={[0, 15000, 30000, 45000, 60000]}
                dx={-5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0B2337',
                  borderColor: '#2A2F38',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                }}
                formatter={(value: any, name: any) => [`$${value.toLocaleString()}`, name]}
              />
              <Bar
                dataKey="Platform"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                maxBarSize={12}
              />
              <Bar
                dataKey="Vendor"
                fill="#22C55E"
                radius={[4, 4, 0, 0]}
                maxBarSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Trend Line Chart */}
      <div className="bg-[#0B2337] border border-[#2A2F38] p-6 rounded-[24px] space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white font-inter">Revenue Trend</h2>
          <p className="text-white text-xs mt-1 font-inter">Total revenue over time</p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#1E2E3D" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#FFFFFF"
                strokeOpacity={0.4}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#FFFFFF', opacity: 0.6, fontSize: 11 }}
                dy={8}
              />
              <YAxis
                stroke="#FFFFFF"
                strokeOpacity={0.4}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#FFFFFF', opacity: 0.6, fontSize: 11 }}
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
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Total Revenue']}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22C55E"
                strokeWidth={3}
                dot={{ fill: '#22C55E', r: 5, strokeWidth: 0 }}
                activeDot={{ r: 7, strokeWidth: 0, fill: '#22C55E' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
