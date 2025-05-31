'use client';
import { useRef, useCallback, useState } from 'react';
import Card from './Card';

const data = [
  { title: '오펀스', rating: 4.6, image: '/images/opensmith.png' },
  { title: '내일은 내일에게', rating: 5.0, image: '/images/tomorrow.png' },
  { title: '파우스트', rating: 4.0, image: '/images/faust.png' },
  { title: '클로저', rating: 4.3, image: '/images/closer.png' },
];

export default function LimitedList() {
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
    <section className="mt-10">
      <div className="flex items-center justify-between mx-2 mb-4">
        <h3 className="text-[27px] font-normal text-[#EAE0FF] flex items-center">
          <img src="/images/hourglass.png" alt="hourglass" className="mr-2" />
          기간 한정
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
        className="overflow-x-auto no-scrollbar pb-2 mt-8 pr-5 pl-2 cursor-grab select-none"
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