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
        'flex h-10 w-20 cursor-pointer items-center justify-center rounded-lg bg-linear-to-r from-[#504584] to-[#3C184C]',
        className,
      )}
    >
      <p className="shrink-0 text-sm text-[#EAE0FF]">{title}</p>
    </div>
  );
};
