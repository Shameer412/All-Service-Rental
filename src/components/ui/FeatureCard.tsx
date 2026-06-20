import React from 'react';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

interface FeatureCardBaseProps {
  title: string;
  desc: string;
  className?: string;
}

interface FeatureCardWithIcon extends FeatureCardBaseProps {
  /** Lucide icon component */
  icon: LucideIcon;
  /** Number badge shown top-right (e.g. "01") */
  num?: string;
  imgSrc?: never;
}

interface FeatureCardWithImg extends FeatureCardBaseProps {
  imgSrc: string;
  imgAlt?: string;
  icon?: never;
  num?: never;
}

type FeatureCardProps = FeatureCardWithIcon | FeatureCardWithImg;

/**
 * FeatureCard — A dark card with an icon/image, title, and description.
 * Replaces the repeated card pattern in WhyChooseUs.tsx and CategoryGrid.tsx.
 */
const FeatureCard: React.FC<FeatureCardProps> = (props) => {
  const { title, desc, className = '' } = props;

  return (
    <div
      className={`flex flex-col gap-5 p-6 xl:p-8 rounded-sm transition-colors cursor-pointer group ${className}`}
    >
      {/* Icon / Image row */}
      <div className="flex justify-between items-start">
        {'icon' in props && props.icon ? (
          <>
            <props.icon className="text-[#66DF75] w-5 h-5" />
            {props.num && (
              <span className="text-slate-600 font-bold text-xl">{props.num}</span>
            )}
          </>
        ) : 'imgSrc' in props && props.imgSrc ? (
          <div className="w-14 h-14 relative transition-transform group-hover:scale-110 duration-300">
            <Image
              src={props.imgSrc}
              alt={'imgAlt' in props && props.imgAlt ? props.imgAlt : title}
              fill
              className="object-contain brightness-0 invert"
            />
          </div>
        ) : null}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="text-white font-semibold text-[18px] md:text-[20px] group-hover:text-[#66DF75] transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-[15px] md:text-[16px] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
