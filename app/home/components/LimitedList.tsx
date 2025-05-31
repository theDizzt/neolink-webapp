'use client';
import { useRef, useCallback, useState } from 'react';
import Card from './Card';
import Modal from './Modal';
import Link from 'next/link';


const data = [
  {
    title: '오펀스',
    rating: 4.6,
    image: '/images/opensmith.png',
    modalImage: '/images/opensmith_modal.jpg',
    description: '필라델피아 북부에 위치한 집에 살고 있는 고아 형제 트릿과 필립. 2주 후, 해롤드와 두 형제의 이상한 동거는 시작되고,  세 사람은 이전에 겪어보지 못한 알 수 없는 감정에 빠져들며 점차 가족이 되어 가는데...',
  },
  {
    title: '내일은 내일에게',
    rating: 5.0,
    image: '/images/tomorrow.png',
    modalImage: '/images/tomorrow_modal.png',
    description: '높고 화려한 빌딩들이 반짝이는 도시, 별빛마을. 허름한 주택가가 조용히 밤을 맞이하는 곳, 달빛마을. 어느날, 달동네에 난데없이 \'이상\'이라는 카페가 오픈한다.',
  },
  {
    title: '파우스트',
    rating: 4.0,
    image: '/images/faust.png',
    modalImage: '/images/faust_modal.png',
    description: '악마 메피스토는 평생을 학자로 살아온 파우스트를 두고 신과 내기를 한다. 파우스트는 인생의 즐거움을 알려주는 대가로 자신의 영혼을 요구하는 메피스토의 거래 제안을 수락하게 된다.',
  },
  {
    title: '클로저',
    rating: 4.3,
    image: '/images/closer.png',
    modalImage: '/images/closer_modal.jpg',
    description: '다시 올 수 없을 것 같았던 순간의 느낌이 댄은 물론, 안나와 앨리스 모두를 혼란에 빠지게 하는데. 첫눈에 반한 운명 같은 사랑... 과연 그것은 진정한 사랑일까? 아니면, 순간의 유혹일까?',
  },
];

export default function LimitedList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [totalX, setTotalX] = useState(0);
  const [selected, setSelected] = useState<null | typeof data[0]>(null);

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

  const handleCardClick = (item: typeof data[0]) => {
    if (!isDragging) {
      setSelected(item);
    }
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mx-2 mb-4">
        <h3 className="text-[27px] font-normal text-[#EAE0FF] flex items-center">
          <img src="/images/hourglass.png" alt="hourglass" className="mr-2" />
          기간 한정
        </h3>
        <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-[#504584] to-[#3C184C]">
          <Link href="/home/limited">
            <button className="w-[100px] h-[32px] rounded-full bg-gradient-to-r from-[#3D366E] to-[#271743] text-[#A38BB1] text-[16px]">
              전체 보기
            </button>
          </Link>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className="overflow-x-auto no-scrollbar pb-4 mt-8 pr-5 pl-2 cursor-grab select-none"
      >
        <div className="flex gap-4">
          {data.map((item, i) => (
            <div
              key={i}
              className="min-w-[220px] flex-shrink-0"
              onClick={() => handleCardClick(item)}
            >
              <Card {...item} />
            </div>
          ))}
        </div>
      </div>

      <Modal
        show={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ''}
        description={selected?.description ?? ''}
        image={selected?.image ?? ''}
        modalImage={selected?.modalImage}
      />
    </section>
  );
}