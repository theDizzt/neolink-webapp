export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4">
      {/* 고정 너비 박스 (왼쪽 정렬 + 내부 4개 동일 간격 배치) */}
      <div className="w-[461px] flex items-center gap-17">
        <h1 className="text-[30px] font-extrabold bg-gradient-to-l from-[#4F398E] to-[#835E92] bg-clip-text text-transparent">
          NEOLINK
        </h1>
        <a href="#" className="text-[16px] text-[#E0E3FF]">홈</a>
        <a href="#" className="text-[16px] text-[#E0E3FF]">찜한 작품</a>
        <a href="#" className="text-[16px] text-[#E0E3FF]">기타</a>
      </div>

      {/* 로그인은 오른쪽 */}
      <button className="text-sm text-[#A38BB1] hover:text-[#E0E3FF] transition">
        로그인
      </button>
    </header>
  );
}
