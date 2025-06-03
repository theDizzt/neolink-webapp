'use client';
import { useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import Card from './Card';
import Modal from './Modal';

const data = [
  {
    title: '웃는남자',
    rating: 4.5,
    image: '/images/laughingman.png',
    modalImage: '/images/laughingman_modal.png',
    description:
      '기형적인 미소를 가진 그윈플렌은 유랑극단에서 눈먼 데아, 약장수 우르수스와 함께 살아간다. 광대로 유명해진 그는 귀족 조시아나의 유혹과 출생의 비밀로 인해 평온했던 삶이 흔들리게 된다.',
  },
  {
    title: '동백꽃',
    rating: 4.8,
    image: '/images/dongbaek.png',
    modalImage: '/images/dongbaek_modal.png',
    description:
      '농촌을 배경으로 마름의 딸과 소작인 아들의 풋풋한 애정을 해학적으로 그려 낸 작품.',
  },
  {
    title: '용팔이',
    rating: 4.7,
    image: '/images/yongpal.png',
    modalImage: '/images/yongpal_modal.jpg',
    description:
      '우리는 인생을 살아가며 수많은 사람과 인연을 맺습니다. 그 속에서 가끔 이런 고민을 합니다. "용팔이"를 보고 난 후, 묻고 싶습니다. 당신은 다른 사람에게 어떤 모습으로 남아 있나요?',
  },
  {
    title: '결단코, 사랑',
    rating: 5.0,
    image: '/images/decisionlove.png',
    modalImage: '/images/decisionlove_modal.jpg',
    description:
      '극 중 한 여인은 죽음보다 더 악몽 같았던 인생을 살면서 죽음에 안달한다. 그러나 그 여인의 곁에 영(靈)이라는 존재가 모습을 드러내 여인의 죽음을 방해하고 그의 삶에 개입하기 시작한다.',
  },
];

export default function PopularList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [totalX, setTotalX] = useState(0);
  const [selected, setSelected] = useState<null | (typeof data)[0]>(null);

  const preventUnexpectedEffects = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).tagName === 'BUTTON' ||
      (e.target as HTMLElement).closest('a')
    )
      return;

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
      const scrollLeft = totalX - e.clientX;
      if (containerRef.current) {
        containerRef.current.scrollLeft = scrollLeft;
      }
    },
    [isDragging, totalX],
  );

  const onMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  };

  const onMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.cursor = 'default';
    }
  };

  const handleCardClick = (item: (typeof data)[0]) => {
    if (!isDragging) {
      setSelected(item);
    }
  };

  return (
    <section className="mt-6">
      <div className="mb-2 ml-2 text-[24px]">
        <span className="text-[#A38BB1]">위치 : </span>
        <span className="text-[#E0E3FF]">대학로 </span>
      </div>

      <div className="mx-2 mb-4 flex items-center justify-between">
        <h3 className="flex items-center text-[27px] font-normal text-[#EAE0FF]">
          <img src="/images/crown.png" alt="crown" className="mr-2" />
          인기 작품
        </h3>
        <div className="inline-block rounded-full bg-gradient-to-r from-[#504584] to-[#3C184C] p-[2px]">
          <Link href="/home/category">
            <button className="h-[32px] w-[100px] rounded-full bg-gradient-to-r from-[#3D366E] to-[#271743] text-[16px] text-[#A38BB1]">
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
        className="no-scrollbar cursor-grab overflow-x-auto pr-5 pb-4 pl-2 select-none"
      >
        <div className="flex gap-4">
          {data.map((item, i) => (
            <div
              key={i}
              className="min-w-[220px] flex-shrink-0"
              onClick={() => handleCardClick(item)}
            >
              <Card
                title={item.title}
                rating={item.rating}
                image={item.image}
              />
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
