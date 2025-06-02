'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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
      <div className="mb-1 flex flex-row items-center">
        <p className="mr-1 text-xl text-[#EAE0FF]">{title}</p>
        <p className="mr-1 text-xs text-[#ADADAD]">{userName}</p>
        <p className="text-xs text-[#ADADAD]">{date}</p>
      </div>
      <div className="mb-2 flex w-full flex-row items-center">
        <p className="mr-1 text-xl text-[#A779BC]">{rate}</p>
        {Array.from({ length: starCount }, (_, index) => (
          <Image
            src={'/svg/star.svg'}
            alt="star"
            width={24}
            height={24}
            key={index}
            className="ml-1 h-5 w-5"
          />
        ))}
      </div>
      <p className="text-lg text-[#EAE0FF]">{content}</p>
    </div>
  );
};
