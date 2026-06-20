import React from 'react';
import Image from 'next/image';

interface PageHeroBgProps {
  /** Path to the background image */
  src: string;
  alt?: string;
  /** Overlay color (hex/rgba), defaults to dark navy */
  overlayColor?: string;
  /** Overlay opacity 0-100 */
  overlayOpacity?: number;
  /** Additional gradient classes applied on top of the solid overlay */
  gradientClassName?: string;
  /** Content rendered above the overlay */
  children: React.ReactNode;
  className?: string;
  priority?: boolean;
}

/**
 * PageHeroBg — A full-bleed section with an absolutely-positioned background
 * image and a configurable dark overlay.
 *
 * Replaces the repeated pattern in:
 *  - AboutHero.tsx
 *  - ContactHero.tsx
 *  - IntegrateCTA.tsx
 *  - how_it_works/CTASection.tsx
 */
const PageHeroBg: React.FC<PageHeroBgProps> = ({
  src,
  alt = 'Background',
  overlayColor = '#00080D',
  overlayOpacity = 75,
  gradientClassName,
  children,
  className = '',
  priority = false,
}) => {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
        />
        {/* Solid dark overlay */}
        <div
          className="absolute inset-0 bg-[#00080D] opacity-75"
        />
        {/* Optional gradient overlay */}
        {gradientClassName && (
          <div className={`absolute inset-0 ${gradientClassName}`} />
        )}
      </div>

      {/* Content above overlay */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default PageHeroBg;
