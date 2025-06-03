'use client';

import { useState } from 'react';

import { Header } from '@/components/header';
import { PlayThumbnailCard } from '@/components/home/play-thumbnail-card';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function SeatBookingPage() {
  const router = useRouter();
  const pathName = usePathname();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: false,
    containScroll: 'trimSnaps',
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 날짜/시간 옵션
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // 좌석 ID 생성
  let seatCounter = 0;
  const getSeatId = () => ++seatCounter;

  useEffect(() => {
    if (!selectedDate || !emblaApi) return;
    const idx = dateOptions.findIndex(
      (d) => `${d.month} ${d.day} ${d.time}` === selectedDate,
    );
    if (idx !== -1) {
      emblaApi.scrollTo(idx);
    }
  }, [selectedDate, dateOptions, emblaApi]);

  return (
    <div className="flex h-full w-full flex-col bg-[#181228]">
      {/* 상단 고정 바 */}
      <Header hasBackButton={true} />

      {/* 메인 컨텐츠 영역 */}
      <div className="flex w-full flex-col overflow-y-auto pt-5">
        {/* 공연 포스터 이미지 영역 */}
        <div className="mb-8 flex h-48 w-full items-center justify-center">
          <PlayThumbnailCard
            title={'동백꽃'}
            rating={5}
            image={'/images/dongbeak.png'}
            className="mr-4"
          />
        </div>

        {/* 나머지 컨텐츠 */}
        <div className="w-full px-4 pb-8">
          {/* 드래그 가능한 날짜 선택 영역*/}
          {/* 날짜 선택 영역 - Embla Carousel 사용 */}
          <div className="mb-6 flex w-full justify-center">
            <div className="w-full max-w-2xl">
              <div className="embla" ref={emblaRef} tabIndex={0}>
                <div className="embla__container">
                  {dateOptions.map((date, index) => (
                    <div className="embla__slide" key={index}>
                      <div
                        tabIndex={0}
                        aria-selected={
                          selectedDate ===
                          `${date.month} ${date.day} ${date.time}`
                        }
                        className={`mx-2 flex-shrink-0 cursor-pointer rounded-[40px] px-[80px] py-[10px] text-center transition-all outline-none focus:ring-2 focus:ring-[#907FC4]${
                          selectedDate ===
                          `${date.month} ${date.day} ${date.time}`
                            ? 'border-white-300 scale-90 border-1 bg-gradient-to-tl from-[#3D366E] to-[#271743] text-white shadow-lg'
                            : 'scale-100 bg-gradient-to-tl from-[#707070] to-[#D6D6D6] text-gray-300 hover:from-[#907FC4] hover:to-[#271743]'
                        }`}
                        onClick={() => {
                          handleDateSelect(date);
                          if (emblaApi) {
                            emblaApi.scrollTo(index);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleDateSelect(date);
                            if (emblaApi) {
                              emblaApi.scrollTo(index);
                            }
                          }
                        }}
                      >
                        <div className="text-sm text-[30px] font-bold">
                          {date.month}
                        </div>
                        <div className="text-[30px] font-bold">{date.day}</div>
                        <div className="text-xs text-[20px] font-bold">
                          {date.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* --- */}
              {/* END Embla Carousel */}
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
                  ? 'opacity-50'
                  : 'cursor-pointer shadow-lg'
              }`}
              disabled={selectedSeats.length === 0}
              onClick={() => {
                if (selectedSeats.length > 0) {
                  router.push('/home/play/dongbaek/watch?live=true');
                }
              }}
            >
              입장 - ${selectedSeats.length * 5}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
