import { ChevronLeft } from 'lucide-react';
import { BaseButton } from './button/base-button';

export const Header = ({
  hasBackButton = false,
}: {
  hasBackButton?: boolean;
}) => {
  return (
    <div className="flex flex-row items-center justify-between bg-white p-4">
      {hasBackButton && <ChevronLeft className="h-6 w-6" />}
      {!hasBackButton && (
        <div className="flex flex-row gap-3">
          <p className="text-center text-lg text-black md:text-2xl">NeoLink</p>
          <BaseButton title="홈" />
          <BaseButton title="찜한 작품" />
          <BaseButton title="기타" />
        </div>
      )}
      <BaseButton title="로그인" />
    </div>
  );
};
