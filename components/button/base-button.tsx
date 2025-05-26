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
        'flex h-10 w-20 items-center justify-center rounded-lg bg-gray-200',
        className,
      )}
    >
      <p className="shrink-0 text-sm text-black">{title}</p>
    </div>
  );
};
