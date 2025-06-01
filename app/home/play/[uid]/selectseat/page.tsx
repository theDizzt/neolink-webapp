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
    { row: 1, cols: 4 },
    { row: 2, cols: 9 },
    { row: 3, cols: 9 },
    { row: 4, cols: 9 },
    { row: 5, cols: 7 },
  ];

  // 드래그 이벤트 핸들러
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
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
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId],
    );
  };

  // 날짜 선택 처리
  const handleDateSelect = (date: {
    month: string;
    day: string;
    time: string;
  }) => {
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
      <div className="fixed top-0 right-0 left-0 z-50 bg-[#181228] py-4">
        <div className="container mx-auto flex justify-between px-4">
          <button
            onClick={handleBackClick}
            className="rounded-lg px-4 py-2 text-[#907FC4] transition-colors hover:bg-[#271743]"
          >
            ←
          </button>
          <button className="rounded-lg px-4 py-2 text-[#907FC4] transition-colors hover:bg-[#271743]">
            로그인
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="pt-20">
        {/* 공연 포스터 이미지 영역 */}
        <div className="mb-8 flex h-48 w-full items-center justify-center">
          <div className="text-2xl font-bold text-[#907FC4]">
            공연 포스터 이미지
          </div>
        </div>

        {/* 나머지 컨텐츠 */}
        <div className="mx-auto max-w-4xl px-4 pb-8">
          {/* 드래그 가능한 날짜 선택 영역*/}
          <div className="mb-6 flex justify-center">
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
                    className={`mx-2 flex-shrink-0 rounded-[40px] px-[80px] py-[10px] text-center transition-all ${
                      selectedDate === `${date.month} ${date.day} ${date.time}`
                        ? 'border-white-300 scale-90 border-1 bg-gradient-to-tl from-[#3D366E] to-[#271743] text-white shadow-lg'
                        : 'scale-100 bg-gradient-to-tl from-[#707070] to-[#D6D6D6] text-gray-300 hover:from-[#907FC4] hover:to-[#271743]'
                    }`}
                    onClick={() => handleDateSelect(date)}
                  >
                    <div className="text-sm text-[30px] font-bold">
                      {date.month}
                    </div>
                    <div className="text-[30px] font-bold">{date.day}</div>
                    <div className="text-xs text-[20px] font-bold">
                      {date.time}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* 곡선형 무대 표시 */}
          <div className="relative mb-12 flex h-24 justify-center">
            <div className="w-full max-w-2xl">
              <svg
                viewBox="0 0 500 60"
                className="h-full w-full"
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
          <div className="mb-10 flex flex-col items-center">
            {seatLayout.map(({ row, cols }) => (
              <div
                key={row}
                className="mb-3 flex justify-center"
                style={{ width: '100%', maxWidth: `${cols * 44}px` }}
              >
                {Array.from({ length: cols }, (_, i) => {
                  const seatId = getSeatId();
                  const isReserved = reservedSeatIds.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <div
                      key={seatId}
                      className={`mx-1 h-10 w-10 rounded transition-colors ${
                        isReserved
                          ? 'cursor-not-allowed bg-[#737778]'
                          : isSelected
                            ? 'cursor-pointer bg-[#907FC4]'
                            : 'cursor-pointer border bg-[#4E3C84] hover:bg-[#907FC4]'
                      }`}
                      onClick={() => handleSeatClick(seatId)}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* 상태 설명 */}
          <div className="mb-8 flex justify-center space-x-8">
            <div className="flex items-center">
              <div className="mr-2 h-5 w-5 rounded-[100px] bg-[#907FC4]"></div>
              <span className="text-sm font-medium text-gray-300">
                Selected
              </span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-5 w-5 rounded-[100px] bg-[#4E3C84]"></div>
              <span className="text-sm font-medium text-gray-300">
                Available
              </span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-5 w-5 rounded-[100px] bg-[#737778]"></div>
              <span className="text-sm font-medium text-gray-300">
                Reserved
              </span>
            </div>
          </div>

          {/* 구매 버튼 */}
          <div className="flex justify-center">
            <button
              className={`rounded-[500px] bg-gradient-to-r from-[#3D366E] to-[#271743] px-12 py-4 text-lg font-bold text-[#CEC4E4] transition-all hover:opacity-80 ${
                selectedSeats.length === 0
                  ? 'cursor-not-allowed opacity-50'
                  : 'shadow-lg'
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
