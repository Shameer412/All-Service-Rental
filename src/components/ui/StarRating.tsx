import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating?: number;
  /** If true, always renders 5 filled stars regardless of rating */
  fullStars?: boolean;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * StarRating — Renders a row of filled star icons.
 * Replaces the repeated `[...Array(n)].map(Star)` pattern in Reviews.tsx.
 */
const StarRating: React.FC<StarRatingProps> = ({
  rating = 5,
  fullStars = false,
  size = 20,
  color = '#F4B400',
  className = '',
}) => {
  const count = fullStars ? 5 : rating;
  return (
    <div className={`flex gap-1 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <Star key={i} width={size} height={size} fill={color} color={color} />
      ))}
    </div>
  );
};

export default StarRating;
