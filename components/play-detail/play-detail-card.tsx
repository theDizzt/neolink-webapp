import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';
import { BaseButton } from '../button/base-button';
import { PlayAddress } from './play-address';
import { PlayThumbnailCard } from '../home/play-thumbnail-card';

export const PlayDetailCard = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="mb-4 flex w-full flex-row">
        <PlayThumbnailCard
          title={'동백꽃'}
          rating={5}
          image={'/images/dongbeak.png'}
          className="mr-4"
        />
        <div className="flex w-full flex-col">
          <PlayAddress location="포항시립연극단원" />
          <p className="text-lg font-semibold text-[#A38BB1]">작품 설명 :</p>
          <br />
          <p className="text-lg text-[#EAE0FF]">
            김유정의 대표 단편소설 동백꽃은 일제강점기 농촌을 배경으로, 사춘기
            시절의 순수하고 유쾌한 감정을 사실적으로 그려낸 작품입니다. 주인공
            소작인의 아들과 마름의 딸 간의 좌충우돌 관계 속에 깃든 첫사랑의
            감정은 한국 농촌의 소박한 일상과 함께 해학적으로 전개되며, 웃음과
            공감을 자아냅니다.
          </p>
          <br />
          <p className="text-lg text-[#EAE0FF]">
            연극 동백꽃은 원작의 정서를 살려, 풋풋한 감정과 서로에게 마음을
            전하는 서툰 방식들을 무대 위에 생동감 있게 풀어냅니다. 투박하지만
            진심 어린 대사와 시대적 배경이 느껴지는 무대 연출은 관객들에게
            잔잔한 향수를 불러일으키며, 당시의 농촌 풍경과 인간미 넘치는
            인물들을 사실감 있게 전달합니다.
          </p>
        </div>
      </div>
      <BaseButton title={'라이브 중! 보러가기'} className={'mb-6 w-full'} />
    </div>
  );
};
