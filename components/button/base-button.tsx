import { cn } from '@/lib/utils';

export const BaseButton = ({
  title,
  className,
  onClick,
}: {
  title: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn(
        'flex shrink-0 cursor-pointer items-center justify-center rounded-lg bg-linear-to-r from-[#504584] to-[#3C184C] px-3 py-2',
        className,
      )}
      onClick={onClick}
    >
      <p className="text-sm text-[#EAE0FF]">{title}</p>
    </div>
  );
};
