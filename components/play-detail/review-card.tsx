'use client';

import { useEffect, useState } from 'react';

export const ReviewCard = ({
  title,
  content,
  userName,
  date,
  rate,
}: {
  title: string;
  content: string;
  userName: string;
  date: string;
  rate: number;
}) => {
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    const starRateRound = rate > 5.0 ? 5.0 : Math.round(rate);
    setStarCount(starRateRound);
  }, [rate]);
  return (
    <div className="mb-5 flex w-full flex-col">
      <div className="mb-1 flex flex-row">
        <p className="mr-2 text-lg text-black">{title}</p>
        <p className="mr-2 text-sm text-gray-300">{userName}</p>
        <p className="text-base text-gray-300">{date}</p>
      </div>
      <div className="mb-2 flex w-full flex-row items-start">
        <p>{rate}</p>
        {Array.from({ length: starCount }, (_, index) => (
          <span key={index} className="text-yellow-500">
            ★
          </span>
        ))}
        {Array.from({ length: 5 - starCount }, (_, index) => (
          <span key={index} className="text-gray-300">
            ★
          </span>
        ))}
      </div>
      <p className="text-base text-gray-600">{content}</p>
    </div>
  );
};
