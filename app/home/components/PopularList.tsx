import Card from "./Card";

const data = [
  { title: "웃는남자", rating: 4.5, image: "/images/laughingman.png" },
  { title: "연애하기 좋은 날", rating: 5.0, image: "/images/dating.png" },
  { title: "용팔이", rating: 4.7, image: "/images/yongpal.png" },
];

export default function PopularList() {
  return (
    <section className="mt-6">
      <h3 className="text-lg font-bold mb-4">인기 작품</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {data.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
