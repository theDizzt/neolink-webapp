import { BaseButton } from '../button/base-button';

export const PlayCard = () => {
  return (
    <div className="mb-2 flex h-[120px] w-full shrink-0 flex-row items-center">
      <div className="h-full w-[180px] shrink-0 rounded-md border border-black"></div>
      <div className="ml-2 flex h-full w-full flex-col">
        <p>회차 정보</p>
        <p>2024.12.10</p>
        <p>
          {`회차 정보 입니다.`}
          <br />
        </p>
      </div>
      <BaseButton title={'보러가기'} />
    </div>
  );
};
