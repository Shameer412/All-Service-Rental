import React from 'react';
import Badge from '@/components/common/Badge';
import Heading from '@/components/common/Heading';

interface SectionHeaderProps {
  badge?: string;
  badgeDot?: boolean;
  title: React.ReactNode;
  subtitle?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
}

/**
 * SectionHeader — Badge + Heading + optional subtitle.
 * Replaces the repeated pattern found in HowItWorks, WhyChooseUs,
 * MemberBenefits, and Reviews sections.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeDot = true,
  title,
  subtitle,
  size = 'xl',
  align = 'left',
  className = '',
  titleClassName = '',
}) => {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      {badge && (
        <Badge dot={badgeDot} className="mb-2">
          {badge}
        </Badge>
      )}
      <Heading size={size} className={titleClassName}>
        {title}
      </Heading>
      {subtitle && (
        <p className="text-gray-400 text-[16px] md:text-[18px] xl:text-[20px] 3xl:text-[22px] leading-relaxed max-w-[80%] lg:max-w-[50%]">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
