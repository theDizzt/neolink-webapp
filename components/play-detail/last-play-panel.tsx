import { PlayCard } from './play-card';

export const LastPlayPanel = () => {
  return (
    <div className="mt-4 flex flex-col pb-4">
      <p className="mb-2">마지막 플레이 (15:00) 회차</p>
      <PlayCard />
      <PlayCard />
      <PlayCard />
      <PlayCard />
      <PlayCard />
    </div>
  );
};
