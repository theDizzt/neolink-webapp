'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

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
    title: '연애하기 좋은 날',
    rating: 5.0,
    image: '/images/dating.png',
    modalImage: '/images/dating_modal.png',
    description:
      '지후는 시연의 마음을 돌리기 위해 과거 연인시절의 이야기를 조작하기 시작한다. 서로에 대한 마음이 호감으로 변하는 와중 잊혀졌던 이별의 기억이 조금씩 돌아오는데!!!',
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
  {
    title: '오펀스',
    rating: 4.6,
    image: '/images/opensmith.png',
    modalImage: '/images/opensmith_modal.jpg',
    description:
      '필라델피아 북부에 위치한 집에 살고 있는 고아 형제 트릿과 필립. 2주 후, 해롤드와 두 형제의 이상한 동거는 시작되고,  세 사람은 이전에 겪어보지 못한 알 수 없는 감정에 빠져들며 점차 가족이 되어 가는데...',
  },
  {
    title: '동백꽃',
    rating: 4.8,
    image: '/images/dongbaek.png',
    modalImage: '/images/dongbaek_modal.png',
    description: '농촌을 배경으로 마름의 딸과 소작인 아들의 풋풋한 애정을 해학적으로 그려 낸 작품.',
  },
  {
    title: '내일은 내일에게',
    rating: 5.0,
    image: '/images/tomorrow.png',
    modalImage: '/images/tomorrow_modal.png',
    description:
      "높고 화려한 빌딩들이 반짝이는 도시, 별빛마을. 허름한 주택가가 조용히 밤을 맞이하는 곳, 달빛마을. 어느날, 달동네에 난데없이 '이상'이라는 카페가 오픈한다.",
  },
  {
    title: '파우스트',
    rating: 4.0,
    image: '/images/faust.png',
    modalImage: '/images/faust_modal.png',
    description:
      '악마 메피스토는 평생을 학자로 살아온 파우스트를 두고 신과 내기를 한다. 파우스트는 인생의 즐거움을 알려주는 대가로 자신의 영혼을 요구하는 메피스토의 거래 제안을 수락하게 된다.',
  },
  {
    title: '클로저',
    rating: 4.3,
    image: '/images/closer.png',
    modalImage: '/images/closer_modal.jpg',
    description:
      '다시 올 수 없을 것 같았던 순간의 느낌이 댄은 물론, 안나와 앨리스 모두를 혼란에 빠지게 하는데. 첫눈에 반한 운명 같은 사랑... 과연 그것은 진정한 사랑일까? 아니면, 순간의 유혹일까?',
  },
];

export default function CategoryPage() {
  const [selected, setSelected] = useState<null | typeof data[0]>(null);
  const router = useRouter();

  return (
    <main
      className={`${inter.className} font-light relative h-[1259px] w-[1280px] mx-auto bg-[url('/images/background.png')] bg-cover bg-center min-h-screen select-none`}
    >
      <div className="absolute inset-0 bg-[#1E1B2E]/70 z-0" />

      {/* 상단 헤더 */}
      <div className="relative z-10 w-[836px] mx-auto">
        {/* ← 버튼 줄 */}
        <div className="flex justify-start mt-[34px] ml-13 mb-2">
          <img
            src="/images/arrow_left.png"
            alt="back"
            className="cursor-pointer"
            onClick={() => router.push('/home')}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          {/* 타이틀 */}
          <h2 className="text-[24px] text-[#EAE0FF] flex items-center mt-10 ml-6">
            <img src="/images/crown.png" alt="crown" className="mr-2" />
            대학로 인기 작품
          </h2>

          {/* 추천순 + 로그인 */}
          <div className="flex flex-col items-end gap-13 mr-4 -mt-7.5">
            <button className="text-[#A38BB1] text-sm mr-7">로그인</button>
            <button className="text-[#A38BB1] text-[13pt] flex items-center mr-4">
              추천순
              <img src="/images/sort_icon.png" alt="sort" />
            </button>
          </div>
        </div>

        {/* 카드 목록 */}
        <div className="grid grid-cols-3 gap-6 flex w-[800px] mx-auto">
          {data.map((item, index) => (
            <div key={index} onClick={() => setSelected(item)}>
              <Card {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* 페이지네이션 - Figma 디자인 기반 */}
      <div className="absolute top-[1183px] left-[322px] w-[636px] h-[60px] flex justify-center items-center gap-11 z-10">
        <img src="/images/first.png" alt="first"  />
        <img src="/images/prev.png" alt="prev"  />

        <button className="w-[33px] h-[33px] rounded-full bg-[#9D91BF]/30 text-[18px] text-[#66549d] font-semibold leading-none text-center">1</button>
        <button className="text-[#4F398E] text-[18px] font-semibold leading-none">2</button>
        <img src="/images/dots.png" alt="dots"  />
        <button className="text-[#4F398E] text-[18px] font-semibold leading-none">10</button>
        <button className="text-[#4F398E] text-[18px] font-semibold leading-none">11</button>

        <img src="/images/next.png" alt="next"  />
        <img src="/images/last.png" alt="last" />
      </div>


      <Modal
        show={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ''}
        description={selected?.description ?? ''}
        image={selected?.image ?? ''}
        modalImage={selected?.modalImage}
      />
    </main>
  );
}
