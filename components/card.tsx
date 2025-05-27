interface CardProps {
  title: string;
  rating: number;
  image: string;
}

const Card = ({ title, rating, image }: CardProps) => {
  return (
    <div className="mx-auto w-[240px] overflow-hidden rounded-[8px] shadow-[2px_2px_2px_2px_rgba(99,98,158,0.5),_0_0_5px_#63629E]">
      <div className="relative h-[320px]">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        {/* 하단 블러 오버레이 */}
        <div className="absolute bottom-0 left-0 w-full bg-[#1E1B2E]/30 px-3 py-4 backdrop-blur-sm">
          <p className="ml-1 truncate text-[28px] font-medium text-[#E0E3FF]">
            {title}
          </p>
          <p className="mt-1 ml-1 flex items-center text-[20px]">
            <img
              src="/images/star.png"
              alt="별"
              className="mr-1 h-[20px] w-[20px]"
            />
            <span className="text-[#E0E3FF]">{rating.toFixed(1)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
