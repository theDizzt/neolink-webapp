'use client';
import { useRef, useCallback, useState } from 'react';
import Image from 'next/image';

const GradientStar = ({ keyId }: { keyId: string }) => (
  <svg key={keyId} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
    <defs>
      <linearGradient id={`grad-${keyId}`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#944c94" />
        <stop offset="100%" stopColor="#c5b0c1" />
      </linearGradient>
    </defs>
    <path
      fill={`url(#grad-${keyId})`}
      d="M12 2l2.9 6.1 6.7.6-5 4.8 1.2 6.6L12 17.3l-5.8 3.1L7.4 14 2.4 9.2l6.7-.6L12 2z"
    />
  </svg>
);

const GradientStarHalf = ({ keyId }: { keyId: string }) => (
  <svg key={keyId} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
    <defs>
      <linearGradient id={`grad-${keyId}`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#944c94" />
        <stop offset="100%" stopColor="#c5b0c1" />
      </linearGradient>
      <clipPath id={`half-${keyId}`}>
        <rect x="0" y="0" width="12" height="24" />
      </clipPath>
    </defs>
    <path
      fill={`url(#grad-${keyId})`}
      clipPath={`url(#half-${keyId})`}
      d="M12 2l2.9 6.1 6.7.6-5 4.8 1.2 6.6L12 17.3l-5.8 3.1L7.4 14 2.4 9.2l6.7-.6L12 2z"
    />
  </svg>
);

const renderStars = (rating: number) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const stars = [];
  for (let i = 0; i < full; i++) {
    stars.push(<GradientStar key={`full-${i}`} keyId={`full-${i}`} />);
  }
  if (half) {
    stars.push(<GradientStarHalf key="half" keyId="half" />);
  }
  return <div className="flex items-center">{stars}</div>;
};

const reviews = [
  {
    title: '연애하기 좋은 날',
    comment: '너무 재미있었고 배우 연기가 최고였어요! 스토리도 좋고 강력 추천합니다.',
    user: 'uxin유타',
    date: '2025.05.15',
    rating: 5,
    image: '/images/dating.png',
  },
  {
    title: '용팔이',
    comment: '배우가 말투, 손짓 하나하나에 공을 들인 게 잘 보였습니다. 너무 잘봤습니다. 최고!!',
    user: '306lsm',
    date: '2025.05.10',
    rating: 4.5,
    image: '/images/yongpal.png',
  },
  {
    title: '파우스트',
    comment: '역시 믿고보는 박해수 배우였습니다. 카리스마, 연기 다 대박이었습니다.',
    user: 'seungmilsm',
    date: '2025.04.18',
    rating: 4.5,
    image: '/images/faust.png',
  },
  {
    title: '스위치',
    comment: '스토리가 무섭다보단 주로 점프스케어로 공포를 유발해서 감흥이 조금 부족했습니다.',
    user: 'mxxy_dodo',
    date: '2025.05.19',
    rating: 3,
    image: '/images/switch.jpg',
  },
  {
    title: '내일은 내일에게',
    comment: '어려서 아동극 소극장을 많이 봤는데...어느새 훌쩍 커버렸네요!!...',
    user: 'sunm***',
    date: '2025.05.20',
    rating: 5,
    image: '/images/tomorrow.png',
  },
  {
    title: '오펀스',
    comment: '감동적인 공연이었습니다 배우님들 최고..ㅠㅠ',
    user: 'dustn1***',
    date: '2023.04.16',
    rating: 5,
    image: '/images/opensmith.png',
  },
];

export default function ReviewList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="mt-10 px-4">
      <h2 className="text-[27px] text-[#EAE0FF] mb-4 flex items-center gap-2 font-normal">
        <img src="/images/speech-bubble.png" alt="speech-bubble" />
        관람 후기
      </h2>

      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        className="overflow-x-auto cursor-grab active:cursor-grabbing no-scrollbar pr-[54px]"
      >
        <div className="grid grid-rows-2 grid-flow-col auto-cols-max gap-x-6 gap-y-4">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="w-[359px] h-[146px] bg-gradient-to-r from-[#1d1845] to-[#281743] border-2 border-[#473576] p-4 rounded-xl flex gap-4 shadow-md"
            >
              <Image
                src={review.image}
                alt={review.title}
                width={80}
                height={120}
                className="rounded min-w-[80px] min-h-[120px]"
              />
              <div className="text-[#E0E3FF] flex flex-col justify-between w-full">
                <div>
                  <div className="mt-1">{renderStars(review.rating)}</div>
                  <h3 className="text-[16px] mt-1 font-medium">{review.title}</h3>
                  <p className="text-[11px] mt-1 line-clamp-2">{review.comment}</p>
                </div>
                <div className="text-[11px] mt-1 flex items-center">
                  <span>{review.user}</span>
                  <span className="text-[#7a7894] text-[13px] ml-auto text-right block min-w-[80px]">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
