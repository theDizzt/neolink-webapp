import { cn } from '@/lib/utils';

export const BaseButton = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex shrink-0 cursor-pointer items-center justify-center rounded-lg bg-linear-to-r from-[#504584] to-[#3C184C] px-3 py-2',
        className,
      )}
    >
      <p className="text-sm text-[#EAE0FF]">{title}</p>
    </div>
  );
};
