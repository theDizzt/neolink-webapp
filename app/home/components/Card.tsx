interface CardProps {
  title: string;
  rating: number;
  image: string;
}

export default function Card({ title, rating, image }: CardProps) {
  return (
    <div className="relative w-[160px] h-[240px] rounded-lg overflow-hidden shadow-purple-card">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white px-3 py-2">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-purple-300">★ {rating.toFixed(1)}</p>
      </div>
    </div>
  );
}
