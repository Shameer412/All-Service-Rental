import React from 'react';
import { CheckCheck } from 'lucide-react';

interface ChecklistItemProps {
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
}

/**
 * ChecklistItem — A list item with a double tick icon.
 */
const ChecklistItem: React.FC<ChecklistItemProps> = ({
  children,
  accentColor = '#28A745',
  className = '',
}) => {
  return (
    <li
      className={`flex items-start md:items-center gap-4 text-white font-[500] 
        text-[15px] md:text-[18px] border-b border-[#021928] pb-4 last:border-none ${className}`}
    >
      <div
        className="mt-1 md:mt-0 shrink-0"
      >
        <CheckCheck 
          className="w-[20px] h-[20px] text-[#28A745]" 
          strokeWidth={3} 
        />
      </div>
      <span>{children}</span>
    </li>
  );
};

export default ChecklistItem;
