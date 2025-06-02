'use client';

import { useState } from 'react';
import ReactStars from 'react-stars';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const handleSubmit = () => {
    setSubmitted(true);
    console.log('리뷰 제출됨:', { rating, review, recommendation });
  };

  const handleSkip = () => {
    setSubmitted(true);
    console.log('리뷰 건너뜀:', { rating, review, recommendation });
  };

  const handleRecommendation = (value) => {
    setRecommendation(value);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0d0d2b] to-[#1b103f] px-4 py-10 text-white">
        <h1 className="mb-4 text-xl font-bold text-[#EAE0FF]">감사합니다!</h1>
        <hr className="mt-2 w-full max-w-md border-t border-[#EAE0FF]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0d0d2b] to-[#1b103f] px-4 py-10 text-white">
      <h1 className="mb-6 text-2xl font-bold text-[#EAE0FF]">
        즐겁게 관람하셨나요?
      </h1>

      <div className="mb-10 flex space-x-6">
        <button
          className={`flex flex-col items-center transition-transform hover:scale-105 ${recommendation === 'best' ? 'text-yellow-400' : 'text-[#EAE0FF]'}`}
          onClick={() => handleRecommendation('best')}
        >
          <span className="text-4xl">👍</span>
          <span className="mt-2 font-bold">완전 추천해요!</span>
        </button>
        <button
          className={`flex flex-col items-center transition-transform hover:scale-105 ${recommendation === 'okay' ? 'text-yellow-400' : 'text-[#EAE0FF]'}`}
          onClick={() => handleRecommendation('okay')}
        >
          <span className="text-4xl">👍</span>
          <span className="mt-2 font-bold">괜찮아요!</span>
        </button>
        <button
          className={`flex flex-col items-center transition-transform hover:scale-105 ${recommendation === 'no' ? 'text-yellow-400' : 'text-[#EAE0FF]'}`}
          onClick={() => handleRecommendation('no')}
        >
          <span className="text-4xl">👎</span>
          <span className="mt-2 font-bold">추천하지 않아요!</span>
        </button>
      </div>

      <hr className="mb-6 w-full max-w-md border-t border-gray-500" />

      <h2 className="mb-2 text-xl font-bold text-[#EAE0FF]">
        후기도 부탁드려요!
      </h2>

      <ReactStars count={5} size={24} color2="#ffd700" edit={true} />

      <textarea
        className="mt-4 h-32 w-full max-w-md resize-none rounded-md border-2 border-[#A38BB1] bg-transparent p-3 text-sm placeholder-gray-400"
        maxLength={300}
        placeholder="내용을 입력해 주세요. 상세하게 적을수록 다른 고객에게 큰 도움이 됩니다."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <div className="mt-1 w-full max-w-md text-right text-xs text-gray-400">
        {review.length}/300
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          className="rounded-full border-1 border-[#504584] bg-gradient-to-r from-[#3D366E] to-[#271743] px-20 py-2 font-semibold text-white hover:opacity-80"
          onClick={handleSubmit}
        >
          등록하기
        </button>
        <button
          className="rounded-full border-1 border-[#504584] bg-gradient-to-r from-[#3D366E] to-[#271743] px-20 py-2 font-semibold text-white hover:opacity-80"
          onClick={handleSkip}
        >
          건너뛸게요
        </button>
      </div>
    </div>
  );
};

export default Feedback;
