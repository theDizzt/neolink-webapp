import { cn } from '@/lib/utils';
import { BaseButton } from '../button/base-button';

export const PlayCard = ({
  title,
  date,
  description,
  className,
}: {
  title: string;
  date: string;
  description: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex h-[120px] w-full shrink-0 flex-row items-center',
        className,
      )}
    >
      <div className="h-full w-[180px] shrink-0 rounded-md border bg-white"></div>
      <div className="ml-3 flex h-full w-full flex-col">
        <p className="mb-1 text-lg font-semibold text-[#EAE0FF]">{title}</p>
        <p className="mb-2 text-sm text-[#646464]">{date}</p>
        <p className="text-base text-[#EAE0FF]">
          {description}
          <br />
        </p>
      </div>
      <BaseButton title={'보러가기 ▶'} className="rounded-full" />
    </div>
  );
};
