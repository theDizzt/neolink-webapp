export default function Banner() {
  return (
    <div className="relative flex items-center justify-between bg-[#1E1B2E] rounded-xl p-6 mt-4 overflow-hidden shadow-[0_0_15px_3px_#4F398E] h-[267px]">
      {/* 왼쪽 텍스트 */}
      <div className="z-10 flex-1 text-[#A38BB1] ml-12">
        <p className="text-[18px] mb-1">일상을 그리는 여러 색의 현실들</p>
        <h2 className="text-[36px] font-black leading-tight mt-2">2025 하현상 팬미팅</h2>
        <p className="text-[18px] mt-2">3.24 (월) 20:00 티켓 오픈</p>
        <button className="mt-4 px-4 py-2 bg-white text-purple-700 rounded-full text-sm hover:bg-purple-100 transition">
          티켓 예약하기
        </button>
      </div>

      {/* 오른쪽 이미지 */}
      <img
        src="/images/hahyun.png"
        alt="하현상"
        className="absolute right-0 bottom-0 h-full object-cover pointer-events-none"
      />
    </div>
  );
}
