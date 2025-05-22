import { BaseButton } from '@/components/button/base-button';
import { Header } from '@/components/header';
import { LocationEdit, MapPin } from 'lucide-react';

// 여기 작업
const PlayDetailPage = ({ params }: { params: { uid: string } }) => {
  return (
    <div className="flex h-dvh w-full flex-col">
      <Header />
      <div className="w-full px-4">
        <div className="mb-3 flex flex-row justify-start">
          <p className="text-2xl">{params.uid}</p>
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
        <BaseButton title={'라이브 중! 보러가기'} className={'w-full'} />
      </div>
    </div>
  );
};
export default PlayDetailPage;
