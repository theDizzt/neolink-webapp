import Card from "./Card";

const data = [
  { title: "오펀스미스", rating: 4.6, image: "/images/opensmith.png" },
  { title: "내일은 내일에게", rating: 5.0, image: "/images/tomorrow.png" },
  { title: "파우스트", rating: 4.0, image: "/images/faust.png" },
];

export default function LimitedList() {
  return (
    <section className="mt-10">
      {/* 섹션 제목 + 전체 보기 버튼 */}
      <div className="flex items-center justify-between mx-2 mb-4">
        <h3 className="text-[27px] font-normal text-[#EAE0FF] flex items-center">
          <img src="/images/hourglass.png" alt="hourglass" className="mr-2" />
          기간 한정
        </h3>

        {/* 전체 보기 버튼 */}
        <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-[#504584] to-[#3C184C]">
          <button
            className="w-[100px] h-[32px] rounded-full bg-gradient-to-r from-[#3D366E] to-[#271743] text-[#A38BB1] text-[16px]"
          >
            전체 보기
          </button>
        </div>
      </div>

      {/* 카드 리스트 */}
      <div className="flex gap-4 overflow-x-auto pb-2 mt-8">
        {data.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
