'use client';

import { useState, useRef } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SeatBookingPage() {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('May 26 15:00');
    const controls = useAnimation();
    const constraintsRef = useRef(null);
    const router = useRouter();

    // 날짜/시간 옵션
    const dateOptions = [
        { month: 'May', day: '26', time: '13:00' },
        { month: 'May', day: '26', time: '15:00' },
        { month: 'May', day: '26', time: '17:00' },
        { month: 'May', day: '27', time: '13:00' },
        { month: 'May', day: '27', time: '15:00' },
        { month: 'May', day: '27', time: '17:00' },
    ];

    // 예약된 좌석 ID 목록
    const reservedSeatIds = [2, 5, 6, 13, 14, 27, 32, 35];

    // 좌석 구성
    const seatLayout = [
        { row: 1, cols: 4 }, { row: 2, cols: 9 },
        { row: 3, cols: 9 }, { row: 4, cols: 9 },
        { row: 5, cols: 7 }
    ];

    // 드래그 이벤트 핸들러
    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x < -100) {
            controls.start({ x: '-=200' });
        } else if (info.offset.x > 100) {
            controls.start({ x: '+=200' });
        } else {
            controls.start({ x: 0 });
        }
    };

    // 좌석 선택 처리
    const handleSeatClick = (seatId: number) => {
        if (reservedSeatIds.includes(seatId)) return;
        setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(id => id !== seatId) : [...prev, seatId]);
    };

    // 날짜 선택 처리
    const handleDateSelect = (date: { month: string; day: string; time: string }) => {
        setSelectedDate(`${date.month} ${date.day} ${date.time}`);
        setSelectedSeats([]);
    };

    // 뒤로 가기 처리
    const handleBackClick = () => {
        router.back();
    };


    // 좌석 ID 생성
    let seatCounter = 0;
    const getSeatId = () => ++seatCounter;

    return (
        <div className="min-h-screen bg-[#181228]">
            {/* 상단 고정 바 */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-[#181228] py-4">
                <div className="container mx-auto px-4 flex justify-between">
                    <button
                        onClick={handleBackClick}
                        className="text-[#907FC4] px-4 py-2 rounded-lg hover:bg-[#271743] transition-colors"
                    >
                        ←
                    </button>
                    <button
                        className="text-[#907FC4] px-4 py-2 rounded-lg hover:bg-[#271743] transition-colors"
                    >
                        로그인
                    </button>
                </div>
            </div>

            {/* 메인 컨텐츠 영역 */}
            <div className="pt-20">
                {/* 공연 포스터 이미지 영역 */}
                <div className="w-full h-48 flex items-center justify-center mb-8">
                    <div className="text-[#907FC4] text-2xl font-bold">공연 포스터 이미지</div>
                </div>

                {/* 나머지 컨텐츠 */}
                <div className="max-w-4xl mx-auto px-4 pb-8">
                    {/* 드래그 가능한 날짜 선택 영역*/}
                    <div className="flex justify-center mb-6">
                        <div className="overflow-hidden" ref={constraintsRef}>
                            <motion.div
                                className="flex cursor-grab active:cursor-grabbing"
                                drag="x"
                                dragConstraints={constraintsRef}
                                onDragEnd={handleDragEnd}
                                animate={controls}
                                whileTap={{ cursor: 'grabbing' }}
                            >
                                {dateOptions.map((date, index) => (
                                    <div
                                        key={index}
                                        className={`flex-shrink-0 text-center px-[80px] py-[10px] mx-2 rounded-[40px] transition-all 
                      ${selectedDate === `${date.month} ${date.day} ${date.time}`
                                                ? 'bg-gradient-to-tl from-[#907FC4] to-[#271743] shadow-lg scale-90 text-white border-1 border-white-300'
                                                : 'bg-gradient-to-tl from-[#707070] to-[#D6D6D6] hover:from-[#907FC4] scale-100 hover:to-[#271743] text-gray-300'
                                            }`}
                                        onClick={() => handleDateSelect(date)}
                                    >
                                        <div className="text-[30px] font-bold text-sm">{date.month}</div>
                                        <div className="text-[30px] font-bold">{date.day}</div>
                                        <div className="text-[20px] font-bold text-xs">{date.time}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* 곡선형 무대 표시 */}
                    <div className="relative flex justify-center mb-12 h-24">
                        <div className="w-full max-w-2xl">
                            <svg
                                viewBox="0 0 500 60"
                                className="w-full h-full"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M0,60 Q250,0 500,60"
                                    fill="#181228"
                                    stroke="#FFFFFF"
                                    strokeWidth="2"
                                />
                                <text
                                    x="250"
                                    y="45"
                                    textAnchor="middle"
                                    fill="#CEC4E4"
                                    fontFamily="Inter"
                                    fontSize="10"
                                    fontWeight="bold"
                                >
                                    stage
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* 좌석 배치 */}
                    <div className="flex flex-col items-center mb-10">
                        {seatLayout.map(({ row, cols }) => (
                            <div
                                key={row}
                                className="flex justify-center mb-3"
                                style={{ width: '100%', maxWidth: `${cols * 44}px` }}
                            >
                                {Array.from({ length: cols }, (_, i) => {
                                    const seatId = getSeatId();
                                    const isReserved = reservedSeatIds.includes(seatId);
                                    const isSelected = selectedSeats.includes(seatId);

                                    return (
                                        <div
                                            key={seatId}
                                            className={`w-10 h-10 rounded mx-1 transition-colors ${isReserved
                                                    ? 'bg-[#737778] cursor-not-allowed'
                                                    : isSelected
                                                        ? 'bg-[#907FC4] cursor-pointer'
                                                        : 'bg-[#4E3C84] border hover:bg-[#907FC4] cursor-pointer'
                                                }`}
                                            onClick={() => handleSeatClick(seatId)}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* 상태 설명 */}
                    <div className="flex justify-center space-x-8 mb-8">
                        <div className="flex items-center">
                            <div className="w-5 h-5 bg-[#907FC4] rounded-[100px] mr-2"></div>
                            <span className="text-sm text-gray-300 font-medium">Selected</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-5 h-5 bg-[#4E3C84] rounded-[100px] mr-2"></div>
                            <span className="text-sm text-gray-300 font-medium">Available</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-5 h-5 bg-[#737778] rounded-[100px] mr-2"></div>
                            <span className="text-sm text-gray-300 font-medium">Reserved</span>
                        </div>
                    </div>

                    {/* 구매 버튼 */}
                    <div className="flex justify-center">
                        <button
                            className={`bg-gradient-to-r from-[#907FC4] to-[#271743] hover:from-purple-700 hover:to-blue-700 text-[#CEC4E4] font-bold py-4 px-12 rounded-[500px] text-lg transition-all ${selectedSeats.length === 0 ? 'opacity-50 cursor-not-allowed' : 'shadow-lg'
                                }`}
                            disabled={selectedSeats.length === 0}
                        >
                            Buy Ticket - ${selectedSeats.length * 5}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}