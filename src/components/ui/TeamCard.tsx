import React from 'react';
import Image from 'next/image';

interface TeamCardProps {
  name: string;
  role: string;
  img: string;
  accentColor?: string;
  className?: string;
}

/**
 * TeamCard — A card showing a team member's portrait, name, and role.
 * Extracted from OurTeam.tsx for potential reuse across the site.
 */
const TeamCard: React.FC<TeamCardProps> = ({
  name,
  role,
  img,
  accentColor = '#28A745',
  className = '',
}) => {
  return (
    <div className={`flex flex-col group ${className}`}>
      {/* Portrait */}
      <div className="relative aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
        <Image
          src={img}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Info */}
      <div
        className="p-8 border border-t-0 border-[#021928] group-hover:border-[#28A745] transition-colors duration-300 team-card-info"
      >
        <h3 className="text-white text-[24px] font-[600] mb-2">{name}</h3>
        <p
          className="text-[12px] font-[700] uppercase tracking-[0.15em] text-[#28A745]"
        >
          {role}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
