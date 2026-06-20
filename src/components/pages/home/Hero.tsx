import React from 'react';
import Image from 'next/image';
import HeroBadges from './HeroBadges';
import SearchBar from './SearchBar';
import EquipmentCategories from './EquipmentCategories';

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center font-outfit pt-[120px]">
      {/* Background Image — extends above section to cover behind transparent navbar */}
      <div className="absolute -top-[70px] left-0 right-0 bottom-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-top"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#212B36]/55 to-[#12181F] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#051F30] to-transparent opacity-55 z-10" />
      </div>

      {/* Main Container */}
      <div className="relative z-20 flex flex-col items-center text-center text-white w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto">
        {/* Heading - Weight 700 */}
        <h1 className="mt-20 font-[700] text-[32px] md:text-[44px] lg:text-[56px] xl:text-[64px] 2xl:text-[72px] 3xl:text-[80px] leading-[1.1] max-w-[90%] lg:max-w-[75%] capitalize tracking-[-1%]">
          Rent the right equipment right when you need it
        </h1>

        {/* Subheading - Weight 400 */}
        <p className="mt-4 md:mt-6 font-[400] text-[16px] md:text-[22px] xl:text-[24px] 2xl:text-[26px] 3xl:text-[30px] leading-snug md:leading-[49px] max-w-[85%] lg:max-w-[60%] text-gray-200 capitalize tracking-[-1%] px-4">
          Commercial, residential, and specialty rentals available at same day
        </p>

        {/* Badges Component */}
        <HeroBadges />
        <SearchBar />
        <EquipmentCategories />
      </div>
    </section>
  );
};

export default HeroSection;
