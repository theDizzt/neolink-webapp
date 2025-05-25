import { Inter } from 'next/font/google';
import Header from './components/Header';
import Banner from './components/Banner';
import PopularList from './components/PopularList';
import LimitedList from './components/LimitedList';

// Inter 폰트 설정 (300 포함!)
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function HomePage() {
  return (
    <main
      className={`${inter.className} font-light relative h-[1886px] w-[1280px] mx-auto bg-[url('/images/background.png')] bg-cover bg-center min-h-screen`}
    >
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-[#1E1B2E]/70 z-0" />

      {/* 콘텐츠 */}
      <div className="relative z-10 w-[800px] mx-auto">
        <Header />
        <Banner />
        <PopularList />
        <LimitedList />
        <div className="border-b border-[#3B2B6C] w-full mt-8 mb-4" />

        {/* 여기에 기간한정, 후기 같은 컴포넌트도 추가 */}
      </div>
    </main>
  );
}
