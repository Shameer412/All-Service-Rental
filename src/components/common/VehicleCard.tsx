import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface VehicleCardProps {
  vehicle: {
    id: number;
    name: string;
    type: string;
    price: string;
    img: string;
    description: string;
  };
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => (
  <div className="bg-[#06121C] rounded-[24px] md:rounded-[32px] overflow-hidden flex flex-col w-full group transition-all shadow-lg">
    {/* Truck Image Container */}
    <div className="relative w-full h-[200px] md:h-[220px] xl:h-[260px] 2xl:h-[280px] 3xl:h-[320px] overflow-hidden">
      <Image 
        src={vehicle.img} 
        alt={vehicle.name} 
        fill 
        className="object-cover group-hover:scale-105 transition-transform duration-500" 
      />
    </div>

    {/* Content */}
    <div className="p-5 md:p-6 xl:p-7 flex flex-col flex-grow">
      
      {/* Title and Badge */}
      <div className="flex justify-between items-center mb-4 md:mb-5">
        <h3 className="text-white font-outfit font-[600] text-[16px] md:text-[18px] tracking-tight uppercase">
          {vehicle.name}
        </h3>
        <span 
          className="bg-[#28A745] text-white flex items-center justify-center text-[13px] md:text-[14px] font-[500] vehicle-type-badge"
        >
          {vehicle.type}
        </span>
      </div>

      {/* Description */}
      <p className="text-white/80 text-[15px] md:text-[16px] leading-snug mb-5 md:mb-6 font-medium">
        {vehicle.description}
      </p>

      <div className="mt-auto">
        {/* Divider */}
        <div className="h-[1px] w-full bg-white/5 mb-4 md:mb-5" />

        {/* Price and Details */}
        <div className="flex justify-between items-center">
          <div className="flex items-end">
            <span 
              className="text-white vehicle-price-text"
            >
              ${vehicle.price}
            </span>
            <span className="text-white/60 text-[12px] md:text-[13px] font-bold tracking-widest ml-1.5 mb-2 uppercase">/ Day</span>
          </div>
          <Link href={`/equipment/${vehicle.id}`}>
            <button className="text-[#28A745] hover:text-[#218838] text-[12px] md:text-[13px] uppercase font-bold tracking-wider transition-all border-b-2 border-[#28A745] hover:border-[#218838] pb-0.5">
              VIEW DETAILS
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default VehicleCard;
