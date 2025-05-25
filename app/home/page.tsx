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
    <main className="h-[1886px] w-[1280px] mx-auto bg-[url('/images/background.png')] bg-cover bg-center min-h-screen">
      <div className="w-[800px] mx-auto">
        <Header />
        <Banner />
        <PopularList />
        {/* 여기에 기간한정, 후기 같은 컴포넌트도 추가 */}
      </div>
    </main>
  );
}
