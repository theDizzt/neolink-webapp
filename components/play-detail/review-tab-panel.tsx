import { ReviewCard } from './review-card';

export const ReviewTabPanel = () => {
  return (
    <div className="mt-2 flex w-full flex-col">
      <ReviewCard
        title={'POWER'}
        content={'Home sweet home Home sick home Well, I said I would be back'}
        userName={'CAZNM'}
        date={'2024.12.10'}
        rate={3.3}
      />
      <ReviewCard
        title={'POWER'}
        content={'Home sweet home Home sick home Well, I said I would be back'}
        userName={'CAZNM'}
        date={'2024.12.10'}
        rate={4.3}
      />{' '}
      <ReviewCard
        title={'POWER'}
        content={'Home sweet home Home sick home Well, I said I would be back'}
        userName={'CAZNM'}
        date={'2024.12.10'}
        rate={4.2}
      />{' '}
      <ReviewCard
        title={'POWER'}
        content={'Home sweet home Home sick home Well, I said I would be back'}
        userName={'CAZNM'}
        date={'2024.12.10'}
        rate={5.0}
      />{' '}
      <ReviewCard
        title={'POWER'}
        content={'Home sweet home Home sick home Well, I said I would be back'}
        userName={'CAZNM'}
        date={'2024.12.10'}
        rate={5.0}
      />
    </div>
  );
};
