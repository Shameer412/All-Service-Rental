import React from 'react';
import { TableItemProps } from '@/types/equipment';

const TableItem = ({ label, value }: TableItemProps) => (
  <div className="flex flex-col border-b border-white/40 pb-1 mb-4 h-12 3xl:h-16 justify-center">
    <div className="flex justify-between items-center w-full">
      <span className="text-[#05DF72] text-xs md:text-base 3xl:text-lg 4xl:text-xl font-medium">{label}</span>
      <span className="text-white font-bold text-sm md:text-lg 3xl:text-xl 4xl:text-2xl text-right">{value}</span>
    </div>
  </div>
);

const TechnicalSpecs = () => {
  return (
    <div
      className="p-8 md:p-10 specs-container"
    >

      <h2 className="text-2xl 3xl:text-3xl 4xl:text-4xl font-black mb-8 tracking-tight text-white">Technical Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
        <TableItem label="Engine" value="DD15 Detroit Diesel" />
        <TableItem label="Transmission" value="DT12 Automated Manual" />
        <TableItem label="GVWR" value="80,000 lbs" />
        <TableItem label="Wheelbase" value="229 inches" />
        <TableItem label="Fuel Capacity" value="150 gallons" />
        <TableItem label="Sleeper" value="72-inch Mid-Roof XT" />
      </div>
    </div>
  );
};

export default TechnicalSpecs;
