import React from 'react';
import { TeamCard } from '@/components/ui';

const teamMembers = [
  { name: "Marcus Vane",  role: "CHIEF EXECUTIVE OFFICER",       img: "/team/team1.svg" },
  { name: "Elena Thorne", role: "CHIEF OPERATIONS ARCHITECT",    img: "/team/team2.svg" },
  { name: "David Chen",   role: "CHIEF STRATEGY OFFICER",        img: "/team/team3.svg" },
];

const OurTeam = () => {
  return (
    <section className="w-full py-24 bg-[#011428] overflow-hidden">
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto">

        {/* Header */}
        <div className="mb-20">
          <h2 className="text-white text-[32px] sm:text-[48px] md:text-[56px] font-[700] uppercase tracking-tight mb-8">
            Our Team
          </h2>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-gray-500 text-[14px] font-[700] uppercase tracking-[0.2em]">
              The Architects of Modern Trade
            </p>
            <div className="hidden md:block flex-1 h-[1px] bg-white/10 ml-12" />
          </div>
        </div>

        {/* Team Grid — uses TeamCard UI primitive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} name={member.name} role={member.role} img={member.img} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurTeam;
