import { ReviewCard } from './review-card';

export const ReviewTabPanel = () => {
  return (
    <div className="mt-2 flex w-full flex-col">
      <ReviewCard
        title={'완전 추천해요!'}
        content={
          '배우들의 연기력에 감탄을 금치 못했습니다. 인물 하나하나의 감정선이 매우 섬세하게 표현되어 극 속에 푹 빠질 수 있었어요. 특히 내래이션은 극의 흐름을 자연스럽게 이어주며 이야기의 깊이를 더해주었고, 마치 책을 눈앞에서 펼쳐 보이는 듯한 느낌이었습니다. 감정이 고조되는 장면에서는 숨을 죽이고 집중하게 되었고, 여운이 오래 남았어요.'
        }
        userName={'cazNm'}
        date={'2025.03.09'}
        rate={5.0}
      />
      <ReviewCard
        title={'괜찮아요!'}
        content={
          '‘동백꽃’이라는 작품을 이렇게 재밌고 생동감 있게 풀어낸 연극은 처음입니다. 교과서에서 접했던 고전 소설이 무대 위에서는 전혀 다른 매력으로 다가왔어요. 원작의 따뜻함과 익살스러움, 그리고 인물 간의 미묘한 감정들이 배우들의 연기를 통해 더욱 입체적으로 느껴졌습니다. 책으로만 읽었을 때는 몰랐던 장면의 유머와 감동이 생생하게 전달돼서, 다시 한 번 원작을 읽어보고 싶어졌습니다.'
        }
        userName={'306lsm'}
        date={'2025.04.19'}
        rate={4.3}
      />{' '}
      <ReviewCard
        title={'괜찮아요'}
        content={
          '공연 내내 웃음과 감동이 끊이지 않았습니다. 유쾌한 장면에서는 관객 모두가 함께 웃으며 분위기를 즐겼고, 잔잔한 장면에서는 코끝이 찡해질 정도로 감정에 깊이 이입할 수 있었어요. 짜임새 있는 연출과 연기 덕분에 짧은 시간 안에 다양한 감정을 경험할 수 있었던 뜻깊은 공연이었습니다. 특히 인물 간의 관계를 풀어내는 방식이 정감 있고 따뜻해서 마음이 따뜻해졌습니다.'
        }
        userName={'seungmilsm'}
        date={'2025.04.25'}
        rate={4.5}
      />
      <ReviewCard
        title={'추천하지 않아요!'}
        content={
          '전반적으로 나쁘지 않았지만 기대했던 만큼 강한 인상은 남지 않았던 공연이었습니다. 배우들의 연기는 안정적이었고 중간중간 웃음을 유발하는 장면들도 있었지만, 이야기 전개가 조금 평이하게 느껴졌어요. 원작의 감성을 잘 살리려 한 노력은 보였지만, 감정선이 확 끌어올려지는 부분이 부족해서 살짝 아쉬웠습니다.'
        }
        userName={'dndkosss'}
        date={'2025.04.30'}
        rate={2.0}
      />{' '}
      <ReviewCard
        title={'완전 추천해요!'}
        content={
          ' 배우들의 연기력에 감탄을 금치 못했습니다. 인물 하나하나의 감정선이 매우 섬세하게 표현되어 극 속에 푹 빠질 수 있었어요. 특히 내래이션은 극의 흐름을 자연스럽게 이어주며 이야기의 깊이를 더해주었고, 마치 책을 눈앞에서 펼쳐 보이는 듯한 느낌이었습니다. 감정이 고조되는 장면에서는 숨을 죽이고 집중하게 되었고, 여운이 오래 남았어요.'
        }
        userName={'sfdddd'}
        date={'2024.05.20 '}
        rate={5.0}
      />
    </div>
  );
};
