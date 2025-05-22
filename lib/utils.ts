import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// isMobile
export const isMobile = () => {
  if (typeof window !== 'undefined') {
    return /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
  }
  return false;
};

export const isiOS = () => {
  if (typeof window !== 'undefined') {
    return /iPhone|iPad|iPod/i.test(window.navigator.userAgent);
  }
  return false;
};
export const isAndroid = () => {
  if (typeof window !== 'undefined') {
    return /Android/i.test(window.navigator.userAgent);
  }
  return false;
};

export const share = async (url?: string, title?: string, text?: string) => {
  // TODO: default title and text for share

  const shareUrl =
    url === undefined && typeof window !== 'undefined'
      ? window.location.href
      : url;
  if (typeof navigator !== 'undefined' && shareUrl !== undefined) {
    navigator.share({
      title: title,
      text: text,
      url: shareUrl,
    });
  }
};
