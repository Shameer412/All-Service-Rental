import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pill' | 'outline' | 'simple';
  className?: string;
  dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'pill', 
  className = '',
  dot = false
}) => {
  const baseStyles = 'w-fit flex items-center gap-2 uppercase tracking-wider font-[700]';
  
  const variants = {
    pill: 'bg-[#66DF75] text-white px-4 py-1.5 rounded-full text-[12px]',
    outline: 'border border-[#66DF75] text-[#66DF75] px-4 py-1.5 rounded-full text-[12px]',
    simple: 'text-[#66DF75] text-[14px] tracking-[0.2em]',
  };

  if (variant === 'simple' && className.includes('with-line')) {
    return (
      <div className={`${baseStyles} ${variants.simple} ${className}`}>
        <div className="w-12 h-[2px] bg-[#66DF75]" />
        {children}
      </div>
    );
  }

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {dot && variant === 'pill' && (
        <div className="w-2 h-2 bg-white rounded-full" />
      )}
      {children}
    </div>
  );
};

export default Badge;
