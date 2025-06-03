'use client';
import { useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Modal({
  show,
  onClose,
  title,
  description,
  image,
  modalImage,
}: {
  show: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image: string;
  modalImage?: string;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!show) return null;

  const displayImage = modalImage || image;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="relative h-[419px] w-[800px] overflow-hidden rounded-xl"
        style={{
          boxShadow: '0 0 10px 5px rgba(163, 139, 177, 0.25)',
        }}
      >
        {/* 배경 이미지 */}
        <img
          src={displayImage}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* 설명 박스 */}
        <div
          className="absolute bottom-[22px] left-[20px] h-[138px] w-[200px] rounded-[12px] px-3 py-2 text-sm leading-[1.4] text-white"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        >
          <h2 className="mt-1 text-[15px] font-medium">{title}</h2>
          <p className="mt-2 text-[11.5px] leading-tight whitespace-pre-wrap">
            {description}
          </p>
        </div>

        {/* 보러가기 버튼 */}
        <button
          className="absolute right-[12px] bottom-[22px] flex cursor-pointer items-center gap-[4px] rounded-full px-[12px] py-[8px] text-sm text-white"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={() => {
            router.push('/home/play/dongbaek');
          }}
        >
          보러가기 <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
