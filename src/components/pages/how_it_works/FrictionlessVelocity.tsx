import React from 'react';
import Image from 'next/image';
import Heading from '@/components/common/Heading';
import Badge from '@/components/common/Badge';

const FrictionlessVelocity = () => {
  return (
    <section className="relative bg-[#011428] w-full overflow-hidden selection:bg-green-500/30 pt-32 md:pt-40 pb-16 md:pb-24 px-4">

      {/* Background Decorative Element (The Diamonds) */}
      <div className="absolute -right-20 lg:right-[5%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] pointer-events-none opacity-20 lg:opacity-40 transition-all duration-700">
        <div className="relative w-full h-full">
          {/* Outer Diamond - Different Direction and Larger */}
          <div className="absolute inset-0 border border-[#66DF7520] rotate-[30deg] scale-110" />
          {/* Middle Diamond - Aligned with Inner */}
          <div className="absolute inset-0 border border-[#66DF7530] rotate-45 scale-[0.85]" />
          {/* Inner Diamond - Aligned with Middle */}
          <div className="absolute inset-[35%] border border-[#66DF7530] rotate-45 flex items-center justify-center">
            {/* Work Icon */}
            <div className="w-12 h-12 lg:w-16 lg:h-16 -rotate-45 flex items-center justify-center">
              <Image
                src="/images/Work5.svg"
                alt="Workflow Icon"
                width={64}
                height={64}
                className="w-full h-full object-contain opacity-90"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto relative z-10">
        <div className="max-w-none">

          {/* Top Label */}
          <Badge variant="simple" className="text-[#66DF75] mb-8">
            Protocol 01: Operational Workflow
          </Badge>

          {/* Main Heading */}
          <Heading
            as="h1"
            className="mb-10 lg:whitespace-nowrap uppercase !text-[60px] md:!text-[70px] !font-bold !tracking-tight !leading-[0.95] !font-afacad"
          >
            <span className="text-blue-100">Frictionless</span>{' '}
            <span className="text-[#66DF75]">Velocity.</span>
          </Heading>

          {/* Description Text */}
          <p className="text-slate-400 text-base md:text-2xl leading-relaxed max-w-[90%] lg:max-w-[65%] font-light">
            Experience the kinetic power of a logistics infrastructure built for the next
            century. Our automated rental protocol ensures your cargo never stops
            moving.
          </p>

        </div>
      </div>

      {/* Subtle Background Mesh/Gradient (Optional for depth) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(102,223,117,0.05),transparent_50%)]" />
    </section>
  );
};

export default FrictionlessVelocity;
