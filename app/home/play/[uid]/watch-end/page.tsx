"use client";

import { useState } from "react";
import ReactStars from "react-stars";

const Feedback = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [recommendation, setRecommendation] = useState(null);

    const handleSubmit = () => {
        setSubmitted(true);
        console.log("리뷰 제출됨:", { rating, review, recommendation });
    };

    const handleSkip = () => {
        setSubmitted(true);
        console.log("리뷰 건너뜀:", { rating, review, recommendation });
    };

    const handleRecommendation = (value) => {
        setRecommendation(value);
    };

    if (submitted) {
        return (
            <div className="bg-gradient-to-b from-[#0d0d2b] to-[#1b103f] text-white min-h-screen flex flex-col items-center justify-center px-4 py-10">
                <h1 className="text-xl font-bold text-[#EAE0FF] mb-4">감사합니다!</h1>
                <hr className="border-t border-[#EAE0FF] w-full max-w-md mt-2" />
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-[#0d0d2b] to-[#1b103f] text-white min-h-screen flex flex-col items-center justify-center px-4 py-10">
            <h1 className="text-2xl font-bold mb-6 text-[#EAE0FF]">즐겁게 관람하셨나요?</h1>

            <div className="flex space-x-6 mb-10">
                <button
                    className={`flex flex-col items-center hover:scale-105 transition-transform ${recommendation === "best" ? "text-yellow-400" : "text-[#EAE0FF]"}`}
                    onClick={() => handleRecommendation("best")}
                >
                    <span className="text-4xl">👍</span>
                    <span className="mt-2 font-bold ">완전 추천해요!</span>
                </button>
                <button
                    className={`flex flex-col items-center hover:scale-105 transition-transform ${recommendation === "okay" ? "text-yellow-400" : "text-[#EAE0FF]"}`}
                    onClick={() => handleRecommendation("okay")}
                >
                    <span className="text-4xl">👍</span>
                    <span className="mt-2  font-bold ">괜찮아요!</span>
                </button>
                <button
                    className={`flex flex-col items-center hover:scale-105 transition-transform ${recommendation === "no" ? "text-yellow-400" : "text-[#EAE0FF]"}`}
                    onClick={() => handleRecommendation("no")}
                >
                    <span className="text-4xl">👎</span>
                    <span className="mt-2  font-bold">추천하지 않아요!</span>
                </button>
            </div>

            <hr className="border-t border-gray-500 w-full max-w-md mb-6" />

            <h2 className="text-xl font-bold mb-2 text-[#EAE0FF] font-bold">후기도 부탁드려요!</h2>

            <ReactStars
                count={5}
                size={24}
                color2="#ffd700"
                edit={true}
            />

            <textarea
                className="w-full max-w-md h-32 mt-4 p-3 bg-transparent border-2 border-[#A38BB1] rounded-md placeholder-gray-400 text-sm resize-none"
                maxLength={300}
                placeholder="내용을 입력해 주세요. 상세하게 적을수록 다른 고객에게 큰 도움이 됩니다."
                value={review}
                onChange={(e) => setReview(e.target.value)}
            />

            <div className="text-right text-xs text-gray-400 w-full max-w-md mt-1">
                {review.length}/300
            </div>

            <div className="flex space-x-4 mt-6">
                <button
                    className="bg-gradient-to-r from-[#3D366E] to-[#271743] px-20 py-2 rounded-full border-1 border-[#504584] text-white font-semibold hover:opacity-80"
                    onClick={handleSubmit}
                >
                    등록하기
                </button>
                <button
                    className="bg-gradient-to-r from-[#3D366E] to-[#271743] px-20 py-2 border-1  border-[#504584] rounded-full text-white font-semibold hover:opacity-80"
                    onClick={handleSkip}
                >
                    건너뛸게요
                </button>
            </div>
        </div>
    );
};

export default Feedback;
