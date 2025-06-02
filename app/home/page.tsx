import { Inter } from 'next/font/google';
import Header from './components/Header';
import Banner from './components/Banner';
import PopularList from './components/PopularList';
import LimitedList from './components/LimitedList';
import ReviewList from './components/ReviewList';

// Inter 폰트 설정 (300 포함!)
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function HomePage() {
  return (
    <div className={`${inter.className} font-light select-none`}>
      {/* 콘텐츠 */}
      <div className="relative z-10 flex w-[800px] flex-col">
        <Header />
        <Banner />
        <PopularList />
        <LimitedList />
        <div className="mt-8 mb-4 w-full border-b border-[#3B2B6C]" />
        <ReviewList />
        <div className="mb-5 w-full" />

        {/* 여기에 기간한정, 후기 같은 컴포넌트도 추가 */}
      </div>
    </div>
  );
}
