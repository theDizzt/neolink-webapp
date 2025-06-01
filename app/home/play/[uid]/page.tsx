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
import { PlayDetailCard } from '@/components/play-detail/play-detail-card';
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
        <PlayDetailCard />
        <Tabs defaultValue="info" className="flew-row flex w-full">
          <TabsList className="h-[52px] w-full bg-transparent">
            <TabsTrigger
              value="info"
              className="text-md data-[state=active]:bg-transparen rounded-none border-b-[#A38BB1] py-3 text-[#A38BB1] data-[state=active]:border-b-2 data-[state=active]:border-b-[#CEC4E4] data-[state=active]:text-[#CEC4E4]"
            >
              정보
            </TabsTrigger>
            <TabsTrigger
              value="last-play"
              className="text-md data-[state=active]:bg-transparen rounded-none border-b-[#A38BB1] py-3 text-[#A38BB1] data-[state=active]:border-b-2 data-[state=active]:border-b-[#CEC4E4] data-[state=active]:text-[#CEC4E4]"
            >
              이전회차
            </TabsTrigger>
            <TabsTrigger
              value="behind"
              className="text-md data-[state=active]:bg-transparen rounded-none border-b-[#A38BB1] py-3 text-[#A38BB1] data-[state=active]:border-b-2 data-[state=active]:border-b-[#CEC4E4] data-[state=active]:text-[#CEC4E4]"
            >
              비하인드
            </TabsTrigger>
            <TabsTrigger
              value="review"
              className="text-md data-[state=active]:bg-transparen rounded-none border-b-[#A38BB1] py-3 text-[#A38BB1] data-[state=active]:border-b-2 data-[state=active]:border-b-[#CEC4E4] data-[state=active]:text-[#CEC4E4]"
            >
              후기
            </TabsTrigger>
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
