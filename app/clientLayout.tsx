'use client';

import { usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isWatchEnd =
    pathname.startsWith('/home/play/') && pathname.endsWith('/watch');

  if (isWatchEnd) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-fit w-full max-w-[800px] overflow-auto border border-gray-200">
      {children}
    </div>
  );
}