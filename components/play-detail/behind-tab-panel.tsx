import { PlayCard } from './play-card';

export const BehindTabPanel = () => {
  return (
    <div className="mt-4 flex flex-col gap-3 pb-4">
      <PlayCard
        title="제5회: “타이밍 0.1초 차이”"
        date="2025.01.05"
        description="손을 내밀까 말까? 미세한 타이밍 조절로 웃음과 설렘"
      />
      <PlayCard
        title="제4회: “엄마가 무서워”"
        date="2024.12.10"
        description="배우의 ‘진짜 엄마력’에 연습 중 얼어붙은 배우들?!"
      />
      <PlayCard
        title="제3회: “감정 몰입의 늪”"
        date="2024.11.15"
        description="감정씬 도중 눈물 터진 배우. 첫사랑의 서툰 설렘"
      />
      <PlayCard
        title="제2회: “말다툼도 합이 맞아야 한다”"
        date="2024.10.20"
        description="싸우는 것도 호흡이 필요하다! 두 배우의 찰떡같은 이야기."
      />
      <PlayCard
        title="제1회: “닭들은 무사한가?"
        date="2024.09.25"
        description="닭들의 운명을 건 첫 번째 연습. 배우들의 고군분투"
      />
    </div>
  );
};
