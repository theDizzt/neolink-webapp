'use client';

import { useState } from 'react';

export const RateStar = ({
  count = 5,
  value = 0,
  onChange = () => {},
}: {
  count?: number;
  value?: number;
  onChange?: (newValue: number) => void;
}) => {
  // States
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: count }).map((_, idx) => {
        const starValue = idx + 1;
        const isFilled =
          hoverRating !== null
            ? starValue <= hoverRating
            : starValue <= (rating || value);
        return (
          <span
            key={starValue}
            style={{
              cursor: 'pointer',
              color: isFilled ? '#FFD700' : '#ccc',
              fontSize: 24,
              transition: 'color 0.2s',
            }}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => {
              setRating(starValue);
              onChange(starValue);
            }}
            data-testid={`star-${starValue}`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};
