import React from 'react';
import Image from 'next/image';

const badgesData = [
  { id: 1, text: "4.9 AVG Rating", icon: "/icons/star.png" },
  { id: 2, text: "Same Day Rentals", icon: "/icons/car-key.png" },
  { id: 3, text: "300+ Vehicle", icon: "/icons/delivery-truck.png" },
  { id: 4, text: "Flexible Booking", icon: "/icons/booking.png" },
];

const HeroBadges = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-12">
      {badgesData.map((badge) => (
        <div
          key={badge.id}
          className="bg-[#28A745] flex items-center justify-center gap-2 md:gap-3 px-3 md:px-6 xl:px-8 shadow-lg transition-transform hover:scale-105 w-[calc(50%-8px)] sm:w-auto h-[50px] md:h-[68px] xl:h-[74px] 3xl:h-[82px] rounded-[14px] md:rounded-[19px]"
        >
          {/* ICON PLACEHOLDER: Yahan apni image ka path daal dena */}
          <div className="w-6 h-6 relative flex items-center justify-center">
             <Image
                src={badge.icon}
                alt="icon"
                width={24}
                height={24}
                className="brightness-0 invert" // Is se icon white ho jaye ga
             />
          </div>

          {/* TEXT */}
          <span className="text-white font-outfit font-[500] text-[13px] sm:text-[14px] md:text-[18px] xl:text-[20px] 3xl:text-[22px] leading-tight text-center">
            {badge.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default HeroBadges;
