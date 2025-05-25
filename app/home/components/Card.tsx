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
        <div className="absolute bottom-0 left-0 w-full bg-[#1E1B2E]/18 backdrop-blur-sm px-3 py-4">
          <p className="text-[28px] font-extrabold text-[#E0E3FF] truncate ml-4">{title}</p>
          <p className="flex items-center text-[20px] ml-4">
            <img src="/images/star.png" alt="별" className="mr-1" />
            <span className="text-[#E0E3FF] mt-1">{rating.toFixed(1)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
