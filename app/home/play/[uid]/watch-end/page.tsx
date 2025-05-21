'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactStars = dynamic(() => import('react-stars'), { ssr: false });

export default function Page() {
  const [step, setStep] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [review, setReview] = useState<string>('');

  const goToStep2 = () => setStep(2);
  const handleRating = (newRating: number) => {
    setRating(newRating);
    setStep(3);
  };
  const handleFinish = () => setStep(4);
  const displayRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-4">
      {step === 1 && (
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-6">즐겁게 관람하셨나요?</h2>
          <div className="flex space-x-4 justify-center">
            <button onClick={goToStep2} className="px-6 py-2 border rounded-full hover:bg-gray-100">네</button>
            <button onClick={goToStep2} className="px-6 py-2 border rounded-full hover:bg-gray-100">아니오</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-6">별점을 남겨주세요!</h2>
          <div className="flex items-center justify-center">
            <ReactStars
              count={5}
              value={rating}
              onChange={handleRating}
              onHover={(newValue) => setHoverRating(newValue ?? null)}
              half={true}
              size={48}
            />
            <span className="ml-2 text-xl font-medium">{displayRating.toFixed(1)}</span>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center w-full max-w-md">
          <h2 className="text-2xl font-medium mb-6">후기도 부탁드려요!</h2>
          <div className="mb-4 flex items-center justify-center">
            <ReactStars
              count={5}
              value={rating}
              onChange={(newRating) => setRating(newRating)}
              onHover={(newHover) => {
                if (newHover) setHoverRating(newHover);
                else setHoverRating(null);
              }}
              half={true}
              size={36}
            />
            <span className="ml-2 text-lg font-medium">{displayRating.toFixed(1)}</span>
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="후기를 작성해주세요"
            className="w-full border rounded p-2 mb-4 h-32 resize-none"
          />
          <div className="flex space-x-4 justify-center">
            <button onClick={handleFinish} className="px-6 py-2 border rounded-full hover:bg-gray-100">등록하기</button>
            <button onClick={handleFinish} className="px-6 py-2 border rounded-full hover:bg-gray-100">건너뛸래요</button>
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
