import Card from "./Card";

const data = [
  { title: "웃는남자", rating: 4.5, image: "/images/laughingman.png" },
  { title: "연애하기 좋은 날", rating: 5.0, image: "/images/dating.png" },
  { title: "용팔이", rating: 4.7, image: "/images/yongpal.png" },
];

export default function PopularList() {
  return (
    <section className="mt-6">
      {/* 현재 위치 */}
      <div className="text-[24px] ml-2 mb-2">
        <span className="text-[#E0E3FF]">현재 위치 : </span>
        <span className="text-[#A38BB1] font-medium">대학로 &gt;</span>
      </div>

      {/* 제목 + 아이콘 */}
      <h3 className="text-[27px] font-normal mb-4 text-[#E0E3FF] ml-2 flex items-center">
        <img src="/images/crown.png" alt="crown" className="mr-2" />
        인기 작품
      </h3>

      {/* 카드 리스트 */}
      <div className="flex gap-4 overflow-x-auto pb-2 mt-6">
        {data.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
