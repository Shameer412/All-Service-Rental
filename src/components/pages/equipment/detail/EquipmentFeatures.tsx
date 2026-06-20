import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const EquipmentFeatures = () => {
  const features = [
    "Advanced Driver Assistance Systems", "Sleeper Cab with Premium Bedding",
    "Bluetooth Connectivity", "Backup Camera",
    "Electronic Stability Control", "Air Conditioning",
    "Cruise Control", "Air Suspension Seats"
  ];

  return (
    <div
      className="p-8 md:p-10 specs-container"
    >
      <h2 className="text-2xl 3xl:text-3xl 4xl:text-4xl font-black mb-8 tracking-tight text-white">Features & Amenities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4 gap-4">
        {features.map((item) => (
          <div
            key={item}
            className="bg-[#0B2337] p-4 3xl:p-5 rounded-xl flex items-center gap-4 text-sm 3xl:text-base 4xl:text-lg text-white group hover:border-[#05DF72]/30 transition-colors spec-card-custom"
          >
            <CheckCircle2 className="text-[#05DF72] shrink-0" size={18} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentFeatures;
