'use client';

import { usePathname } from 'next/navigation';

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isWatch =
    pathname.startsWith('/home/play/') && pathname.endsWith('/watch');

  if (isWatch) {
    return <div className="h-screen w-screen bg-black">{children}</div>;
  }

  return (
    <div className="flex h-fit w-full max-w-[800px] overflow-auto border border-gray-200">
      {children}
    </div>
  );
};
