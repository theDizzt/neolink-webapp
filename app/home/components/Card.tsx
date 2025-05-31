interface CardProps {
  title: string;
  rating: number;
  image: string;
}

export default function Card({ title, rating, image }: CardProps) {
  return (
    <div className="w-[240px] mx-auto rounded-[8px] overflow-hidden shadow-[2px_2px_2px_2px_rgba(99,98,158,0.5),_0_0_5px_#63629E]">
      <div className="relative h-[320px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* 하단 블러 오버레이 */}
        <div className="absolute bottom-0 left-0 w-full bg-[#1E1B2E]/30 backdrop-blur-[3px] px-3 py-4">
          <p className="text-[28px] font-medium text-[#E0E3FF] truncate ml-1">{title}</p>
          <p className="flex items-center text-[20px] ml-1 mt-1">
            <img src="/images/star.png" alt="별" className="w-[20px] h-[20px] mr-1" />
            <span className="text-[#E0E3FF]">{rating.toFixed(1)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
