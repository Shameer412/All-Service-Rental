"use client";
import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Truck } from '@/components/data/truck';
import Link from 'next/link';

interface TruckCardProps {
  truck: Truck;
}

export const TruckCard = ({ truck }: TruckCardProps) => {
  return (
    <Link href={`/equipment/${truck.id}`} className="block h-full group">
      <div className="bg-[#0a2538] rounded-xl overflow-hidden border border-gray-800 group-hover:border-green-500/50 transition-all duration-300 flex flex-col h-full shadow-lg">
        {/* Image Placeholder */}
        <div className="relative w-full h-48 3xl:h-56 4xl:h-64 bg-gray-200 overflow-hidden">
          <img 
            src={truck.image} 
            alt={truck.name} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Card Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            ))}
            <Star className="w-4 h-4 fill-yellow-500/50 text-yellow-500" />
            <span className="text-sm text-gray-300 ml-1">{truck.rating}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold mb-2 group-hover:text-green-500 transition-colors">{truck.name}</h3>
          
          {/* Location */}
          <div className="flex items-center text-gray-400 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {truck.location}
          </div>

          {/* Specs */}
          <p className="text-sm text-gray-500 mb-6">{truck.specs}</p>

          {/* Footer (Price & Button) */}
          <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-800">
            <div className="text-gray-400">
              <span className="text-2xl font-bold text-green-500">${truck.price}</span> /day
            </div>
            <button className="bg-green-600 group-hover:bg-green-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
