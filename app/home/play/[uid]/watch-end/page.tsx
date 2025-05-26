// 여기를 작업해주시면 됩니다.
'use client';
import { RateStar } from '@/components/rate-star/rate-star';
import { useState } from 'react';

export default function WatchEndPage() {
  const [step, setStep] = useState<number>(1);
  const [review, setReview] = useState<string>('');

  const goToStep2 = () => setStep(2);

  const handleFinish = () => setStep(4);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-black">
      {step === 1 && (
        <div className="text-center">
          <h2 className="mb-6 text-2xl font-medium">즐겁게 관람하셨나요?</h2>
          <div className="flex justify-center space-x-4">
            <button
              onClick={goToStep2}
              className="rounded-full border px-6 py-2 hover:bg-gray-100"
            >
              네
            </button>
            <button
              onClick={goToStep2}
              className="rounded-full border px-6 py-2 hover:bg-gray-100"
            >
              아니오
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="text-center">
          <h2 className="mb-6 text-2xl font-medium">별점을 남겨주세요!</h2>
          <div className="flex items-center justify-center">
            <RateStar
              onChange={() => {
                // Handle rating change logic here
              }}
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="w-full max-w-md text-center">
          <h2 className="mb-6 text-2xl font-medium">후기도 부탁드려요!</h2>
          <div className="mb-4 flex items-center justify-center">
            <RateStar count={5} value={0} onChange={() => {}} />
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="후기를 작성해주세요"
            className="mb-4 h-32 w-full resize-none rounded border p-2"
          />
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleFinish}
              className="rounded-full border px-6 py-2 hover:bg-gray-100"
            >
              등록하기
            </button>
            <button
              onClick={handleFinish}
              className="rounded-full border px-6 py-2 hover:bg-gray-100"
            >
              건너뛸래요
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="text-center">
          <h2 className="text-2xl font-medium">감사합니다!</h2>
        </div>
      )}
    </div>
  );
}
