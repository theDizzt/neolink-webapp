import Header from "./components/Header";
import Banner from "./components/Banner";
import PopularList from "./components/PopularList";

export default function HomePage() {
  return (
    <main className="bg-[#130033] min-h-screen text-white px-4 pb-10">
      <div className="w-[800px] mx-auto">
        <Header />
        <Banner />
        <PopularList />
        {/* 여기에 기간한정, 후기 같은 컴포넌트도 추가 */}
      </div>
    </main>
  );
}
