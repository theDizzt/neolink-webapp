'use client';

import { BaseButton } from '@/components/button/base-button';
import { Header } from '@/components/header';
import { BehindTabPanel } from '@/components/play-detail/behind-tab-panel';
import { InfoTabPanel } from '@/components/play-detail/info-tab-panel';
import { LastPlayPanel } from '@/components/play-detail/last-play-panel';
import { ReviewTabPanel } from '@/components/play-detail/review-tab-panel';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
// 여기 작업
const PlayDetailPage = () => {
  const searchParams = usePathname();
  const uid = searchParams.split('/').pop() || 'Unknown Play';

  return (
    <div className="flex h-dvh w-full flex-col">
      <Header hasBackButton={true} />
      <div className="w-full px-4">
        <div className="mb-3 flex flex-col justify-start">
          <p className="mb-0.5 text-2xl font-semibold text-white">{'동백꽃'}</p>
          <div className="flex flex-row items-center justify-start">
            <p className="text-sm text-white">2025</p>
            <Image
              src="/images/age-12.png"
              alt="play logo"
              width={16}
              height={16}
              className="ml-1 h-4 w-4"
            />
            <p className="ml-2 text-sm text-white">에피소드 10개</p>
          </div>
        </div>
        <div className="mb-4 flex w-full flex-row">
          <div className="mr-6 flex aspect-[240/320] w-[240px] bg-amber-200" />
          <div className="flex w-full flex-col">
            <div className="mb-3 flex flex-row items-center justify-start gap-3">
              <p>오프라인 방문 : 혜화 대학로 XX로 XX 길</p>
              <div className="flex flex-row rounded-full border border-black px-2 py-1">
                <MapPin className="h-6 w-6" />
                <p className="text-base">위치</p>
              </div>
            </div>
            <p>
              작품 설명 this is test text description that showing current text
              is sample text. power power power power 천재지변 불가항력 억까짤
              퍼다 샬라샬라하다 권력 오남용 묻고 관용 천재지변 불가항력 this is
              test text description that showing current text is sample text.
              power power power power 천재지변 불가항력 억까짤 퍼다 샬라샬라하다
              권력 오남용 묻고 관용 천재지변 불가항력 this is test text
              description that showing current text is sample text. power power
              power power 천재지변 불가항력 억까짤 퍼다 .....
            </p>
          </div>
        </div>
        <BaseButton title={'라이브 중! 보러가기'} className={'mb-6 w-full'} />
        <Tabs defaultValue="info" className="flew-row flex w-full">
          <TabsList className="w-full">
            <TabsTrigger value="info">정보</TabsTrigger>
            <TabsTrigger value="last-play">이전회차</TabsTrigger>
            <TabsTrigger value="behind">비하인드</TabsTrigger>
            <TabsTrigger value="review">후기</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <InfoTabPanel />
          </TabsContent>
          <TabsContent value="last-play">
            <LastPlayPanel />
          </TabsContent>
          <TabsContent value="behind">
            <BehindTabPanel />
          </TabsContent>
          <TabsContent value="review">
            <ReviewTabPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlayDetailPage;
