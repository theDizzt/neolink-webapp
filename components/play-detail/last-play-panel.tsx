import { PlayCard } from './play-card';

export const LastPlayPanel = () => {
  return (
    <div className="mt-4 flex flex-col gap-3 pb-4">
      <PlayCard
        title="제7회: 피어나는 동백꽃처럼"
        date="2025.02.05"
        description="소중한 첫사랑의 기억, 동백꽃 향기처럼 오래도록."
      />
      <PlayCard
        title="제6회: 진심이 드러나다"
        date="2025.01.20"
        description="웃음 뒤에 숨어 있던 진심, 두 사람의 관계에 미묘한 변화"
      />
      <PlayCard
        title="제5회: 작은 용기, 서툰 표현"
        date="2025.01.05"
        description="용기 내 한 걸음 다가가는 주인공 작지만 큰 변화의 시작"
      />
      <PlayCard
        title="제4회: 마을 사람들의 시선"
        date="2024.12.10"
        description="가정환경의 차이, 어른들의 시선, 농촌 사회의 보수적인 분위기"
      />
      <PlayCard
        title="제3회: 엇갈리는 마음"
        date="2024.11.15"
        description="의도치 않게 상처를 주고받는 순간.서로를 향한 진실된 마음"
      />
      <PlayCard
        title="제2회: 시시껄렁한 말다툼"
        date="2024.10.20"
        description="툭하면 티격태격. 감정 표현이 서툰 두 주인공"
      />
      <PlayCard
        title="제1회: 첫눈에 피는 감정"
        date="2024.09.25"
        description="점순과 소년의 첫 만남. 서로에게 느끼는 묘한 감정의 시작"
      />
    </div>
  );
};
