"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  ChevronDown,
  Search,
  Truck,
  Package,
  Layers,
  Snowflake,
  Trash2,
  Wrench,
  Hammer,
  Zap,
  ArrowUp,
  Wind,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner';

const SearchField = ({
  label,
  iconSrc,
  options,
  selectedValue,
  onSelect
}: {
  label: string,
  iconSrc: string,
  options: { label: string, icon: React.ElementType }[],
  selectedValue: string,
  onSelect: (val: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full lg:flex-1" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 lg:px-6 w-full h-[60px] lg:h-[68px] bg-[#021928] hover:bg-[#03253a] transition-all rounded-[16px] cursor-pointer border border-transparent hover:border-[#28A745]/30 group"
      >
        <div className="flex items-center gap-3 lg:gap-4 overflow-hidden">
          {/* Icon Area */}
          <div className="w-5 h-5 lg:w-6 lg:h-6 relative shrink-0">
            <Image
              src={iconSrc}
              alt={label}
              fill
              className="object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="flex flex-col items-start overflow-hidden">
            {selectedValue && (
              <span className="text-gray-400 font-outfit text-[10px] lg:text-[12px] uppercase tracking-wider animate-in fade-in slide-in-from-bottom-1 duration-300">
                {label}
              </span>
            )}
            <span className="text-white font-outfit font-[400] text-[15px] lg:text-[17px] whitespace-nowrap overflow-hidden text-ellipsis w-full">
              {selectedValue || label}
            </span>
          </div>
        </div>
        {/* Arrow */}
        <ChevronDown
          className={`text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#021928] border border-[#03253a] rounded-[16px] shadow-2xl z-[100] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                onSelect(option.label);
                setIsOpen(false);
              }}
              className="px-6 py-3 text-white font-outfit text-[16px] hover:bg-[#28A745] hover:text-white cursor-pointer transition-colors flex items-center gap-3"
            >
              <option.icon size={18} className="opacity-70 group-hover:opacity-100" />
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SearchBar = () => {
  const [truckType, setTruckType] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [location, setLocation] = useState("");

  const truckOptions = [
    { label: "Semi Truck", icon: Truck },
    { label: "Box Truck", icon: Package },
    { label: "Flatbed", icon: Layers },
    { label: "Refrigerator Truck", icon: Snowflake },
    { label: "Dump Truck", icon: Trash2 },
  ];

  const equipmentOptions = [
    { label: "Forklift", icon: Wrench },
    { label: "Excavator", icon: Hammer },
    { label: "Generator", icon: Zap },
    { label: "Scissor Lift", icon: ArrowUp },
    { label: "Air Compressor", icon: Wind },
  ];

  const locationOptions = [
    { label: "New York, NY", icon: MapPin },
    { label: "Los Angeles, CA", icon: MapPin },
    { label: "Chicago, IL", icon: MapPin },
    { label: "Houston, TX", icon: MapPin },
    { label: "Phoenix, AZ", icon: MapPin },
    { label: "London, UK", icon: MapPin },
    { label: "Dubai, UAE", icon: MapPin },
  ];

  const handleSearch = () => {
    if (!truckType && !equipmentType && !location) {
      toast.error("Please select at least one filter to search.");
      return;
    }

    toast.success("Searching for availability...", {
      description: `${truckType || 'Any'} Truck • ${equipmentType || 'Any'} Equipment • ${location || 'Any'}`,
    });

    console.log("Searching for:", { truckType, equipmentType, location });
  };

  return (
    <div className="w-full px-2 mt-8 md:mt-12 relative z-50">
      {/* Wrapper div with the requested background color */}
      <div
        className="w-full flex items-center justify-center shadow-2xl min-h-[120px] lg:h-[180px] xl:h-[190px] py-6 lg:py-0 px-4 lg:px-6 xl:px-8 relative z-50 search-bar-wrapper"
      >
        {/* Inner Content - Centered */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:px-4 gap-5">

          {/* Fields Group */}
          <div className="flex flex-col lg:flex-row items-center flex-grow justify-start gap-4 lg:gap-4 w-full">
            <SearchField
              label="Truck Type"
              iconSrc="/icons/delivery-truck.png"
              options={truckOptions}
              selectedValue={truckType}
              onSelect={setTruckType}
            />
            <SearchField
              label="Equipment Type"
              iconSrc="/icons/maintenance.png"
              options={equipmentOptions}
              selectedValue={equipmentType}
              onSelect={setEquipmentType}
            />
            <SearchField
              label="Pickup Location"
              iconSrc="/icons/delivery-truck2.png"
              options={locationOptions}
              selectedValue={location}
              onSelect={setLocation}
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleSearch}
            className="bg-[#28A745] hover:bg-[#218838] active:scale-95 transition-all text-white flex items-center justify-center gap-2 lg:gap-3 font-outfit font-[600] text-[16px] lg:text-[18px] 3xl:text-[20px] shrink-0 w-full lg:w-[18%] lg:min-w-[180px] h-[60px] lg:h-[68px] xl:h-[72px] 3xl:h-[80px] rounded-[16px] shadow-lg shadow-[#28A745]/20"
          >
            <Search size={22} strokeWidth={2.5} />
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

