export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-xl font-bold text-purple-300">NEOLINK</h1>
      <nav className="space-x-4 text-[#E0E3FF]">
        <a href="#">홈</a>
        <a href="#">찜한 작품</a>
        <a href="#">기타</a>
      </nav>
      <button className="text-sm">로그인</button>
    </header>
  );
}
