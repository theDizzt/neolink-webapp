interface CardProps {
  title: string;
  rating: number;
  image: string;
}

export default function Card({ title, rating, image }: CardProps) {
  return (
    <div className="shadow-purple-card rounded-xl overflow-hidden w-[160px]">
      <div className="relative h-[240px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* 텍스트 오버레이 */}
        <div className="absolute bottom-0 left-0 w-full bg-[#1a1a2a]/30 backdrop-blur px-3 py-2">
          <p className="text-sm font-semibold text-[#E0E3FF]">{title}</p>
          <p className="text-sm">
            <span className="text-[#63629e] text-lg font-bold">★</span>
            <span className="text-[#E0E3FF] text-xs ml-1">{rating.toFixed(1)}</span>
          </p>

        </div>
      </div>
    </div>
  );
}
