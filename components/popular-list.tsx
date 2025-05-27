import Card from '@/components/card';

const data = [
  { title: '웃는남자', rating: 4.5, image: '/images/laughingman.png' },
  { title: '연애하기 좋은 날', rating: 5.0, image: '/images/dating.png' },
  { title: '용팔이', rating: 4.7, image: '/images/yongpal.png' },
];

export default function PopularList() {
  return (
    <section className="mt-6">
      {/* 현재 위치 */}
      <div className="mb-2 ml-2 text-[24px]">
        <span className="text-[#A38BB1]">현재 위치 : </span>
        <span className="text-[#E0E3FF]">대학로 &gt;</span>
      </div>

      {/* 제목 + 전체보기 버튼 */}
      <div className="mx-2 mb-4 flex items-center justify-between">
        <h3 className="flex items-center text-[27px] font-normal text-[#EAE0FF]">
          <img src="/images/crown.png" alt="crown" className="mr-2" />
          인기 작품
        </h3>
        <div className="inline-block rounded-full bg-gradient-to-r from-[#504584] to-[#3C184C] p-[2px]">
          <button className="h-[32px] w-[100px] rounded-full bg-gradient-to-r from-[#3D366E] to-[#271743] text-[16px] text-[#A38BB1]">
            전체 보기
          </button>
        </div>
      </div>

      {/* 카드 리스트 */}
      <div className="mt-10 flex gap-4 overflow-x-auto pb-2">
        {data.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
