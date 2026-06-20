import React from 'react';
import { Gauge, Calendar, Fuel, Settings } from 'lucide-react';
import { SpecCardProps } from '@/types/equipment';

const SpecCard = ({ icon, label, value }: SpecCardProps) => (
  <div
    className="bg-[#0B2337] rounded-2xl p-6 3xl:p-8 flex items-center gap-4 transition-colors spec-card-custom"
  >
    <div className="flex items-center justify-center shrink-0">
      {React.cloneElement(icon as React.ReactElement, { className: 'text-[#05DF72] w-6 h-6 3xl:w-8 3xl:h-8' } as any)}
    </div>
    <div>
      <p className="text-gray-500 text-[10px] 3xl:text-xs 4xl:text-sm font-bold uppercase tracking-wider mb-1">{label}</p>
      <p className="font-black text-base 3xl:text-lg 4xl:text-xl text-white">{value}</p>
    </div>
  </div>
);

const EquipmentSpecs = () => {
  return (
    <div
      className="p-6 md:p-10 specs-container"
    >

      <h2 className="text-2xl 3xl:text-3xl 4xl:text-4xl font-black mb-8 tracking-tight text-white">Key Specifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-4 gap-4">
        <SpecCard icon={<Gauge />} label="Engine Power" value="450 HP" />
        <SpecCard icon={<Calendar />} label="Mileage" value="120K Miles" />
        <SpecCard icon={<Fuel />} label="Fuel Type" value="Diesel" />
        <SpecCard icon={<Settings />} label="Model Year" value="2023" />
      </div>
    </div>
  );
};

export default EquipmentSpecs;
