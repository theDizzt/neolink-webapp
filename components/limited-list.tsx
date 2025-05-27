import Card from '@/components/card';

const data = [
  { title: '오펀스미스', rating: 4.6, image: '/images/opensmith.png' },
  { title: '내일은 내일에게', rating: 5.0, image: '/images/tomorrow.png' },
  { title: '파우스트', rating: 4.0, image: '/images/faust.png' },
];

export default function LimitedList() {
  return (
    <section className="mt-10">
      {/* 섹션 제목 + 전체 보기 버튼 */}
      <div className="mx-2 mb-4 flex items-center justify-between">
        <h3 className="flex items-center text-[27px] font-normal text-[#EAE0FF]">
          <img src="/images/hourglass.png" alt="hourglass" className="mr-2" />
          기간 한정
        </h3>

        {/* 전체 보기 버튼 */}
        <div className="inline-block rounded-full bg-gradient-to-r from-[#504584] to-[#3C184C] p-[2px]">
          <button className="h-[32px] w-[100px] rounded-full bg-gradient-to-r from-[#3D366E] to-[#271743] text-[16px] text-[#A38BB1]">
            전체 보기
          </button>
        </div>
      </div>

      {/* 카드 리스트 */}
      <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
        {data.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
