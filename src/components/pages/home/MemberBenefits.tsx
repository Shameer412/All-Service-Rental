import React from 'react';
import Image from 'next/image';
import Section from '@/components/common/Section';
import Button from '@/components/common/Button';
import { SectionHeader, FeatureCard, ChecklistItem } from '@/components/ui';

const MemberBenefits = () => {
  return (
    <Section className="bg-[#021928]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-stretch">

        {/* Left: Large Image with Floating Card */}
        <div className="relative rounded-[32px] overflow-hidden min-h-[400px] lg:min-h-[600px] xl:min-h-[680px] 2xl:min-h-[720px] 3xl:min-h-[800px] group">
          <Image
            src="/member.png"
            alt="Heavy Equipment"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-[20px] md:rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 shadow-2xl text-center md:text-left">
            <h4 className="text-[#010F18] text-[18px] md:text-[24px] xl:text-[26px] 3xl:text-[30px] font-[700] leading-tight max-w-full md:max-w-[45%]">
              Book and manage all your rentals in one place
            </h4>
            <Button size="md" variant="primary" className="px-6 md:px-8 py-3 md:py-4 rounded-[12px] md:rounded-[14px]">
              Book Now
            </Button>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-between gap-12">
          <div className="flex flex-col gap-6">
            <SectionHeader
              badge="Member Benefits"
              title="Enjoy More with Every Trip"
              size="lg"
              subtitle="Join the Travra community and unlock exclusive rewards that make every ride more rewarding. From flexible perks to digital convenience, membership means smarter travel at every turn."
            />

            <ul className="flex flex-col gap-5 mt-4">
              {[
                "Free vehicle upgrades and early access to new models",
                "Bonus points for referrals and repeat bookings",
                "Exclusive travel guides and partner deals",
              ].map((benefit, i) => (
                <ChecklistItem key={i}>{benefit}</ChecklistItem>
              ))}
            </ul>
          </div>

          <div className="relative w-full h-[200px] md:h-[300px] lg:h-[340px] xl:h-[380px] 3xl:h-[440px] rounded-[24px] md:rounded-[32px] overflow-hidden">
            <Image src="/member2.png" alt="Truck on Road" fill className="object-cover" />
          </div>
        </div>

      </div>
    </Section>
  );
};

export default MemberBenefits;
