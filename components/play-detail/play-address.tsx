import { MapPin } from 'lucide-react';

export const PlayAddress = ({ location }: { location: string }) => {
  return (
    <div className="mb-2 flex flex-row items-center justify-start">
      <p className="mr-1 text-lg font-semibold text-[rgb(163,139,177)]">
        오프라인 방문 :
      </p>
      <p className="mr-4 text-lg text-[#EAE0FF]">{location}</p>
      <div className="flex flex-row rounded-full border border-[#504584] bg-linear-to-r from-[#3D366E] to-[#271743] px-3 py-1.5">
        <MapPin className="h-6 w-6 stroke-[#6774CC]" />
        <p className="text-base text-[#A38BB1]">위치</p>
      </div>
    </div>
  );
};
