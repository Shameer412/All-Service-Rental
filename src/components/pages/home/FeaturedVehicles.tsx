import React from 'react';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import Badge from '@/components/common/Badge';
import Heading from '@/components/common/Heading';
import VehicleCard from '@/components/common/VehicleCard';
import Link from 'next/link';

const vehicleData = [
  { id: 1, name: "FREIGHTLINER CASCADIA", type: "Automatic", price: "599", img: "/images/vehicle1.svg", description: "The gold standard in fuel efficiency and reliability for long-haul operations." },
  { id: 2, name: "KENWORTH T680",         type: "Manual",    price: "749", img: "/images/vehicle1.svg", description: "Aerodynamic excellence combined with legendary Kenworth performance." },
  { id: 3, name: "PETERBILT 579",         type: "Automatic", price: "675", img: "/images/vehicle3.svg", description: "The quintessential owner-operator truck, delivering uncompromising power." },
  { id: 4, name: "VOLVO VNL 860",         type: "Automatic", price: "820", img: "/images/vehicle4.svg", description: "Advanced safety technology meets premium Swedish engineering." },
  { id: 5, name: "MACK ANTHEM 64T",       type: "Manual",    price: "549", img: "/images/vehicle5.svg", description: "A bold, efficient long-haul machine built for the toughest jobs." },
  { id: 6, name: "INTERNATIONAL LT625",   type: "Automatic", price: "699", img: "/images/vehicle1.svg", description: "Versatile and dependable workhorse designed for maximum uptime." },
];

const FeaturedVehicles = () => {
  return (
    <Section className="bg-[#001c2f]">
      {/* Section Header */}
      <div className="mb-12">
        <Badge 
          dot
          className="justify-center items-center mb-6 fleet-badge-custom"
        >
          Explore Our Fleet
        </Badge>
        <Heading size="lg">
          Featured Vehicles
        </Heading>
      </div>

      {/* Grid Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 mb-16">
        {vehicleData.map((item) => (
          <VehicleCard key={item.id} vehicle={item} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center">
        <Link href="/equipment">
          <Button size="md">
            Show More Vehicles
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default FeaturedVehicles;
