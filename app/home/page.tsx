import { Inter } from 'next/font/google';
import Header from './components/Header';
import Banner from './components/Banner';
import PopularList from './components/PopularList';

// Inter 폰트 설정
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

export default function HomePage() {
  return (
    <main className={`${inter.className} bg-[#130033] min-h-screen text-white px-4 pb-10`}>
      <div className="w-[800px] mx-auto">
        <Header />
        <Banner />
        <PopularList />
        {/* 여기에 기간한정, 후기 같은 컴포넌트도 추가 */}
      </div>
    </main>
  );
}
