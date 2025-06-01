import Image from 'next/image';
export const ActorInfoCard = ({
  imgSrc,
  name,
  role,
}: {
  imgSrc: string;
  name: string;
  role: string;
}) => {
  return (
    <div className="flex w-[200px] shrink-0 cursor-pointer flex-col">
      <div className="relative aspect-[3/4] w-full overflow-clip rounded-md bg-amber-500">
        <Image
          src={imgSrc}
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 200px) 100vw, 200px"
        />
      </div>
      <div className="mt-3 flex flex-col items-start">
        <p className="text-lg font-semibold text-[#EAE0FF]">{name}</p>
        <p className="mt-1 text-sm text-[#EAE0FF]">{role}</p>
      </div>
    </div>
  );
};
