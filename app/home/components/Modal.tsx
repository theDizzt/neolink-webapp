'use client';
import { useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

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
        className="relative w-[800px] h-[419px] rounded-xl overflow-hidden"
        style={{
          boxShadow: '0 0 10px 5px rgba(163, 139, 177, 0.25)',
        }}
      >
        {/* 배경 이미지 */}
        <img
          src={displayImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 설명 박스 */}
        <div
          className="absolute left-[20px] bottom-[22px] w-[200px] h-[138px] rounded-[12px] px-3 py-2 text-white text-sm leading-[1.4]"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        >
          <h2 className="text-[15px] font-medium mt-1">{title}</h2>
          <p className="text-[11.5px] whitespace-pre-wrap leading-tight mt-2">{description}</p>
        </div>

        {/* 보러가기 버튼 */}
        <button
          className="absolute bottom-[22px] right-[12px] flex items-center gap-[4px] px-[12px] py-[8px] text-white text-sm rounded-full"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          보러가기 <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
