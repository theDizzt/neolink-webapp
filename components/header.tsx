'use client';
import { ChevronLeft } from 'lucide-react';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/navigation';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
});

export const Header = ({
  hasBackButton = false,
}: {
  hasBackButton?: boolean;
}) => {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-4 py-5">
      {!hasBackButton && (
        <div className="flex w-[461px] items-center gap-16">
          {/* NEOLINK만 Poppins */}
          <h1
            className={`${poppins.className} bg-gradient-to-l from-[#835E92] to-[#4F398E] bg-clip-text text-[36px] font-semibold text-transparent`}
          >
            NEOLINK
          </h1>

          {/* 메뉴는 기존 Inter 또는 기본 폰트 */}
          <a href="#" className="text-[16px] text-[#E0E3FF]">
            홈
          </a>
          <a href="#" className="text-[16px] text-[#E0E3FF]">
            찜한 작품
          </a>
          <a href="#" className="text-[16px] text-[#E0E3FF]">
            기타
          </a>
        </div>
      )}
      {hasBackButton && (
        <ChevronLeft
          className="h-6 w-6 cursor-pointer stroke-[#B29FE9]"
          onClick={() => {
            router.back();
          }}
        />
      )}

      <button className="text-sm text-[#A38BB1] transition hover:text-[#E0E3FF]">
        로그인
      </button>
    </header>
  );
};
