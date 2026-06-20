import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  style?: React.CSSProperties;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  as: Component = 'h2',
  size = 'md',
  className = '',
  style,
}) => {
  const sizes = {
    'xs': 'text-[18px] md:text-[20px] xl:text-[22px] 3xl:text-[24px] font-bold',
    'sm': 'text-[22px] md:text-[24px] xl:text-[26px] 3xl:text-[30px] font-bold',
    'md': 'text-[32px] md:text-[40px] xl:text-[44px] 3xl:text-[50px] font-bold',
    'lg': 'text-[36px] md:text-[48px] xl:text-[52px] 3xl:text-[60px] font-bold',
    'xl': 'text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] 3xl:text-[84px] font-bold',
    '2xl': 'text-[56px] md:text-[64px] lg:text-[72px] xl:text-[80px] 2xl:text-[88px] 3xl:text-[100px] font-bold',
  };

  const baseStyles = 'text-white leading-[1.1] tracking-tight';

  return (
    <Component className={`${baseStyles} ${sizes[size]} ${className}`} style={style}>
      {children}
    </Component>
  );
};

export default Heading;
