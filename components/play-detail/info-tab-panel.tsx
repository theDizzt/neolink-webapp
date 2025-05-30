import { ActorInfoCard } from '../actor/actor-info-card';

export const InfoTabPanel = () => {
  return (
    <div className="mt-4 flex flex-col pb-4">
      <p>배우 (15:00) 회차</p>
      <div className="mt-3 flex flex-row gap-4">
        <ActorInfoCard />
        <ActorInfoCard />
        <ActorInfoCard />
      </div>
      <div className="mt-3 flex flex-row gap-4">
        <ActorInfoCard />
        <ActorInfoCard />
        <ActorInfoCard />
      </div>
    </div>
  );
};
