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
import { useRouter } from 'next/router';

// 여기 작업
const PlayDetailPage = () => {
  const router = useRouter();
  const uid = router.query.uid;

  return (
    <div className="flex h-dvh w-full flex-col">
      <Header />
      <div className="w-full px-4">
        <div className="mb-3 flex flex-row justify-start">
          <p className="text-2xl">{uid}</p>
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
