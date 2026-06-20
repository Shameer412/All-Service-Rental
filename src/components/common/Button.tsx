import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-[700] uppercase tracking-wider transition-all rounded-[16px] flex items-center justify-center gap-3 active:scale-95';

  const variants = {
    primary: 'bg-[#28A745] hover:bg-[#218838] text-white shadow-xl',
    secondary: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm',
    outline: 'border border-[#28A745] text-[#28A745] hover:bg-[#28A745] hover:text-white',
  };

  const sizes = {
    sm: 'px-6 py-2.5 text-[12px]',
    md: 'px-8 py-3.5 text-[14px]',
    lg: 'px-10 py-4 text-[16px]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
