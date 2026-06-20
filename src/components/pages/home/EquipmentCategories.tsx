import React from 'react';
import Image from 'next/image';
import Section from '@/components/common/Section';

const categories = [
  { id: 1, name: "Moving Truck", icon: "/icons/truck3.png" },
  { id: 2, name: "Flatbeds / Box Truck", icon: "/icons/truck4.png" },
  { id: 3, name: "Heavy Equipment", icon: "/icons/truck6.png" },
  { id: 4, name: "Trailers", icon: "/icons/truck5.png" },
];

const CategoryCard = ({ name, icon }: { name: string, icon: string }) => (
  <div
    className="flex flex-col items-center justify-center gap-2 md:gap-4 w-full h-[180px] md:h-[240px] xl:h-[280px] 2xl:h-[300px] 3xl:h-[340px] transition-all hover:scale-105 hover:border-[#28A745] group cursor-pointer p-4 xl:p-6 glass-card-v1"
  >
    {/* Icon Area */}
    <div className="relative w-32 h-20 md:w-52 md:h-32 xl:w-60 xl:h-36 3xl:w-72 3xl:h-44">
      <Image
        src={icon}
        alt={name}
        fill
        className="object-contain"
      />
    </div>

    {/* Text Area */}
    <span className="text-white font-outfit font-[500] text-[18px] md:text-[22px] xl:text-[24px] 3xl:text-[28px] text-center">
      {name}
    </span>
  </div>
);

const EquipmentCategories = () => {
  return (
    <Section className="bg-transparent py-12 md:py-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center w-full">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} name={cat.name} icon={cat.icon} />
        ))}
      </div>
    </Section>
  );
};

export default EquipmentCategories;
