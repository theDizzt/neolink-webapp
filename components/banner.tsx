const Banner = () => {
  return (
    <div className="relative mt-2 flex h-[267px] items-center justify-between overflow-hidden rounded-xl bg-[#1E1B2E] p-6 shadow-[0_0_15px_3px_#4F398E]">
      {/* 왼쪽 텍스트 */}
      <div className="z-10 ml-12 flex-1 text-[#A38BB1]">
        <p className="mb-1 text-[20px]">일상을 그리는 여러 색의 현실들</p>
        <h2 className="mt-2 text-[36px] leading-tight font-black">
          2025 하현상 팬미팅
        </h2>
        <p className="mt-2 text-[20px]">3.24 (월) 20:00 티켓 오픈</p>
        <button className="mt-4 rounded-md border border-[#A38BB1] px-4 py-2 text-[12px] font-bold text-[#A38BB1] shadow-[0_0_4px_1px_#A38BB1] transition hover:bg-[#A38BB1]/20">
          티켓 예매하기
        </button>
      </div>

      {/* 오른쪽 이미지 */}
      <img
        src="/images/hahyun.png"
        alt="하현상"
        className="pointer-events-none absolute right-0 bottom-0 h-full object-cover"
      />
    </div>
  );
};

export default Banner;
