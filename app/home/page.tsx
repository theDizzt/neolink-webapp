import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import Banner from '@/components/banner';
import PopularList from '@/components/popular-list';
import LimitedList from '@/components/limited-list';
import ReviewList from '@/components/review-list';

// Inter 폰트 설정 (300 포함!)
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function HomePage() {
  return (
    <main
      className={`${inter.className} relative mx-auto h-[1886px] min-h-screen w-[1280px] bg-[url('/images/background.png')] bg-cover bg-center font-light`}
    >
      {/* 오버레이 */}
      <div className="absolute inset-0 z-0 bg-[#1E1B2E]/70" />

      {/* 콘텐츠 */}
      <div className="relative z-10 mx-auto w-[800px]">
        <Header />
        <Banner />
        <PopularList />
        <LimitedList />
        <div className="mt-8 mb-4 w-full border-b border-[#3B2B6C]" />
        <ReviewList />

        {/* 여기에 기간한정, 후기 같은 컴포넌트도 추가 */}
      </div>
    </main>
  );
}
