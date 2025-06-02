'use client';

import Image from 'next/image';
import { ActorInfoCard } from '../actor/actor-info-card';
import { PlayThumbnailCard } from '../home/play-thumbnail-card';
import { useState } from 'react';

export const InfoTabPanel = () => {
  const [moreActors, setMoreActors] = useState(false);

  return (
    <div className="mt-2 flex flex-col pb-4">
      <p className="text-lg text-[#EAE0FF]">배우 (15:00) 회차</p>
      <div className="mt-3 flex flex-row gap-4 overflow-x-auto">
        <ActorInfoCard imgSrc="/images/actor_1.png" name="하지희" role="정순" />
        <ActorInfoCard imgSrc="/images/actor_2.png" name="김나운" role="소년" />
        <ActorInfoCard
          imgSrc="/images/actor_3.png"
          name="김용운"
          role="쎈 수탉"
        />
        <ActorInfoCard
          imgSrc="/images/actor_4.png"
          name="이정길"
          role="약한 수탉"
        />
      </div>
      <p className="mt-5 text-lg text-[#EAE0FF]">배우 (17:00) 회차</p>

      <div className="mt-3 flex flex-row gap-4 overflow-x-auto">
        <ActorInfoCard imgSrc="/images/actor_5.png" name="이다은" role="정순" />
        <ActorInfoCard imgSrc="/images/actor_6.png" name="이나경" role="소년" />
        <ActorInfoCard
          imgSrc="/images/actor_7.png"
          name="이승주"
          role="쎈 수탉"
        />
        <ActorInfoCard
          imgSrc="/images/actor_8.png"
          name="김민상"
          role="약한 수탉"
        />
      </div>
      {!moreActors && (
        <div
          className="mt-4 flex w-full flex-row items-center justify-center"
          onClick={() => setMoreActors(true)}
        >
          <div className="flex cursor-pointer flex-row rounded-full border border-[#504584] bg-linear-to-r from-[#3D366E] to-[#271743] px-3 py-1.5">
            <p className="text-base text-[#A38BB1]">배우 정보 더보기</p>
            <Image
              src={'/images/map-pin.png'}
              alt="map pin"
              width={24}
              height={24}
            />
          </div>
        </div>
      )}
      {moreActors && (
        <>
          <p className="mt-5 text-lg text-[#EAE0FF]">배우 (19:00) 회차</p>
          <div className="mt-3 flex flex-row gap-4 overflow-x-auto">
            <ActorInfoCard
              imgSrc="/images/actor_1.png"
              name="하지희"
              role="정순"
            />
            <ActorInfoCard
              imgSrc="/images/actor_2.png"
              name="김나운"
              role="소년"
            />
            <ActorInfoCard
              imgSrc="/images/actor_3.png"
              name="김용운"
              role="쎈 수탉"
            />
            <ActorInfoCard
              imgSrc="/images/actor_4.png"
              name="이정길"
              role="약한 수탉"
            />
          </div>
        </>
      )}
      <div className="mt-6 flex w-full flex-col items-start border-t border-[#3B2B6C]">
        <p className="mt-6 text-lg text-[#EAE0FF]">비슷한 작품</p>
        <div className="mt-6 flex w-full flex-row gap-5 overflow-x-auto">
          <PlayThumbnailCard
            title={'파우스트'}
            rating={5}
            image={'/images/faust.png'}
          />
          <PlayThumbnailCard
            title={'연애하기 좋은 날'}
            rating={3}
            image={'/images/dating.png'}
          />
          <PlayThumbnailCard
            title={'클로저'}
            rating={4}
            image={'/images/image 18.png'}
          />
        </div>
      </div>
    </div>
  );
};
