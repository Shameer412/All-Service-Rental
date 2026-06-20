import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  containerClassName = '',
  id 
}) => {
  return (
    <section 
      id={id}
      className={`w-full py-24 overflow-hidden ${className}`}
    >
      <div className={`w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
