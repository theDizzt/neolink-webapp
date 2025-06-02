'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { PlayThumbnailCard } from '../home/play-thumbnail-card';

export const ActorInfoCard = ({
  imgSrc,
  name,
  role,
}: {
  imgSrc: string;
  name: string;
  role: string;
}) => {
  const [openDeatil, setOpenDetail] = useState(false);

  return (
    <div
      className="flex w-[200px] shrink-0 cursor-pointer flex-col"
      onClick={() => setOpenDetail(!openDeatil)}
    >
      <div className="relative aspect-[3/4] w-full overflow-clip rounded-md bg-amber-500">
        <Image
          src={imgSrc}
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 200px) 100vw, 200px"
        />
      </div>
      <div className="mt-3 flex flex-col items-start">
        <p className="text-lg font-semibold text-[#EAE0FF]">{name}</p>
        <p className="mt-1 text-sm text-[#EAE0FF]">{role}</p>
      </div>
      {openDeatil && (
        <div className="fixed top-0 left-0 z-50 flex h-svh w-svw items-center justify-center bg-black/50">
          <div className="flex h-fit w-full max-w-[600px] flex-col items-center justify-center rounded-lg bg-[#23163B] p-4">
            <div className="mb-2 flex w-full flex-row items-end justify-end">
              <X
                className="h-6 w-6 stroke-[#FFFFFF]"
                onClick={() => {
                  setOpenDetail(false);
                }}
              />
            </div>
            ㅣㅈ
            <div className="flex w-full flex-row items-start">
              <div className="relative aspect-[3/4] h-[180px] overflow-clip rounded-md bg-amber-500">
                <Image
                  src={imgSrc}
                  alt=""
                  width={0}
                  height={0}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  sizes="(max-width: 200px) 100vw, 200px"
                />
              </div>
              <div className="ml-4 flex w-full flex-col">
                <p className="text-xl font-semibold text-[#EAE0FF]">
                  {name + '(' + role + ')'}
                </p>
                <div className="flex flex-row">
                  <p className="mr-1 text-base font-semibold text-[#A38BB1]">
                    역할 소개 ({role}) :{' '}
                  </p>
                  <p className="text-base text-[#EAE0FF]">
                    추후 업데이트 예정입니다.
                  </p>
                </div>
                <div className="my-2 h-[1px] w-full bg-[#3B2B6C]" />
                <div className="flex flex-row">
                  <p className="mr-1 text-base font-semibold text-[#A38BB1]">
                    배우 {name} :
                  </p>
                  <p className="text-base text-[#EAE0FF]">
                    추후 업데이트 예정입니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="my-4 h-[1px] w-full items-start bg-[#3B2B6C]" />
            <p className="mb-3 w-full text-start text-lg text-[#EAE0FF]">
              이 배우가 등장하는 다른 작품
            </p>
            <div className="flex w-full flex-row gap-4 overflow-x-auto">
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
      )}
    </div>
  );
};
