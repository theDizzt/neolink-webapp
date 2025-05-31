'use client';

import { useEffect, useState } from 'react';

const bannerData = [
  {
    image: '/images/hahyun.png',
    subtitle: '일상을 그리는 여러 색의 현실들',
    title: '2025 하현상 팬미팅',
    info: '3.24 (월) 20:00 티켓 오픈',
  },
  {
    image: '/images/hahyun.png',
    subtitle: '당신을 위한 새로운 이야기',
    title: '뮤지컬 그날들',
    info: '4.10 (수) 18:00 티켓 오픈',
  },
  {
    image: '/images/hahyun.png',
    subtitle: '감동을 전하는 무대',
    title: '연극 라스트 세션',
    info: '5.5 (일) 14:00 티켓 오픈',
  },
  {
    image: '/images/hahyun.png',
    subtitle: '한 여름밤의 클래식',
    title: '2025 썸머콘서트',
    info: '6.1 (토) 19:00 티켓 오픈',
  },
  {
    image: '/images/hahyun.png',
    subtitle: '위로해주는 한 마디',
    title: '연극 쉼표',
    info: '6.7 (토) 17:00 티켓 오픈',
  },
];

export default function Banner() {
  const total = bannerData.length;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const { image, subtitle, title, info } = bannerData[activeIndex];

  return (
    <div className="relative flex items-center justify-between bg-[#1E1B2E] rounded-xl p-6 mt-2 overflow-hidden shadow-[0_0_15px_3px_#4F398E] h-[267px]">
      {/* 왼쪽 텍스트 */}
      <div className="z-10 flex-1 text-[#A38BB1] ml-12">
        <p className="text-[20px] mb-1">{subtitle}</p>
        <h2 className="text-[36px] font-black leading-tight mt-2">{title}</h2>
        <p className="text-[20px] mt-2">{info}</p>
        <button className="mt-4 px-4 py-2 rounded-md border border-[#A38BB1] text-[#A38BB1] text-[12px] font-bold shadow-[0_0_4px_1px_#A38BB1] hover:bg-[#A38BB1]/20 transition">
          티켓 예매하기
        </button>
      </div>

      {/* 오른쪽 이미지 - 슬라이드 */}
      <img
        src={image}
        alt={`배너 이미지 ${activeIndex + 1}`}
        className="absolute right-0 bottom-0 h-full object-cover pointer-events-none transition-opacity duration-500"
      />

      {/* 인디케이터 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {bannerData.map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-300 w-[12px] h-[12px] rounded-full ${
              index === activeIndex
                ? 'w-[40px] bg-[#CEC4E4] opacity-100 rounded-[999px]'
                : 'bg-[#A38BB1] opacity-100'
            }`}
          />
        ))}
      </div>
    </div>
  );
}