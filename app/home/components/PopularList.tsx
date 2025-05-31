'use client';
import { useRef, useCallback, useState } from 'react';
import Card from './Card';

const data = [
  { title: '웃는남자', rating: 4.5, image: '/images/laughingman.png' },
  { title: '연애하기 좋은 날', rating: 5.0, image: '/images/dating.png' },
  { title: '용팔이', rating: 4.7, image: '/images/yongpal.png' },
  { title: '결단코, 사랑', rating: 5.0, image: '/images/decisionlove.png' },
];

export default function PopularList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [totalX, setTotalX] = useState(0);

  const preventUnexpectedEffects = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const throttle = (func: () => void, delay: number) => {
    let timer: NodeJS.Timeout | null = null;
    return () => {
      if (timer === null) {
        timer = setTimeout(() => {
          func();
          timer = null;
        }, delay);
      }
    };
  };

  const onMouseDown = (e: React.MouseEvent) => {
    preventUnexpectedEffects(e.nativeEvent);
    if (!containerRef.current) return;
    setIsDragging(true);
    const x = e.clientX;
    setStartX(x);
    setTotalX(x + containerRef.current.scrollLeft);
    document.body.style.cursor = 'grabbing';
  };

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      throttle(() => {
        preventUnexpectedEffects(e.nativeEvent);
        const scrollLeft = totalX - e.clientX;
        if (containerRef.current) {
          containerRef.current.scrollLeft = scrollLeft;
        }
      }, 100)();
    },
    [isDragging, totalX, preventUnexpectedEffects]
  );

  const onMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      setIsDragging(false);
      document.body.style.cursor = 'default';

      const endX = e.clientX;
      const childNodes = [...(containerRef.current?.childNodes[0]?.childNodes || [])];
      const dragDiff = Math.abs(startX - endX);

      if (dragDiff > 10) {
        childNodes.forEach((child) => {
          child.addEventListener('click', preventUnexpectedEffects);
        });
      } else {
        childNodes.forEach((child) => {
          child.removeEventListener('click', preventUnexpectedEffects);
        });
      }
    },
    [isDragging, startX, preventUnexpectedEffects]
  );

  const onMouseLeave = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    document.body.style.cursor = 'default';
  }, [isDragging]);

  return (
    <section className="mt-6">
      <div className="text-[24px] ml-2 mb-2">
        <span className="text-[#A38BB1]">현재 위치 : </span>
        <span className="text-[#E0E3FF]">대학로 &gt;</span>
      </div>

      <div className="flex items-center justify-between mx-2 mb-4">
        <h3 className="text-[27px] font-normal text-[#EAE0FF] flex items-center">
          <img src="/images/crown.png" alt="crown" className="mr-2" />
          인기 작품
        </h3>
        <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-[#504584] to-[#3C184C]">
          <button className="w-[100px] h-[32px] rounded-full bg-gradient-to-r from-[#3D366E] to-[#271743] text-[#A38BB1] text-[16px]">
            전체 보기
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className="overflow-x-auto no-scrollbar pr-5 pl-2 cursor-grab select-none"
      >
        <div className="flex gap-4">
          {data.map((item, i) => (
            <div key={i} className="min-w-[220px] flex-shrink-0">
              <Card {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}