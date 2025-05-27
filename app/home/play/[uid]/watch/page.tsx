'use client';

import { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  FastForward,
  Subtitles,
  Info,
} from 'lucide-react';
import { FaBolt, FaPoll } from 'react-icons/fa';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';

export default function WatchPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showRemaining, setShowRemaining] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isEnded, setIsEnded] = useState(false);
  const [videoSrc, setVideoSrc] = useState('/test/sample.mp4');
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [showTitle, setShowTitle] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [showVote, setShowVote] = useState(false);
  const [showReaction, setShowReaction] = useState(false);
  const [playbackRateMenuOpen, setPlaybackRateMenuOpen] = useState(false);
  const [showSubtitleMenu, setShowSubtitleMenu] = useState(false);
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const playbackRateMenuRef = useRef<HTMLDivElement>(null);
  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const controlTimeout = useRef<NodeJS.Timeout | null>(null);
  const countdownInterval = useRef(null);

  const subtitleOptions = [
    { label: '한국어', srclang: 'ko', src: '/subs/ko.vtt' },
    { label: 'English', srclang: 'en', src: '/subs/en.vtt' },
  ];

  const sampleProducts = [
    {
      id: 1,
      image: '/images/product1.jpg',
      title: '옷',
      price: '339,000원',
      description: '입고있는 등장인물 정보 및 기타 정보',
    },
    {
      id: 2,
      image: '/images/product2.jpg',
      title: '옷',
      price: '339,000원',
      description: '추가 상품 상세 설명',
    },
  ];

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return hrs > 0 ? `${hrs}:${mins}:${secs}` : `${mins}:${secs}`;
  };

  const handleSelectSubtitle = (option: (typeof subtitleOptions)[0] | null) => {
    const video = videoRef.current;
    if (!video) return;

    video.querySelectorAll('track').forEach((t) => t.remove());
    if (option) {
      const track = document.createElement('track');
      track.kind = 'subtitles';
      track.label = option.label;
      track.srclang = option.srclang;
      track.src = option.src;
      track.default = true;
      video.appendChild(track);

      const [textTrack] = Array.from(video.textTracks || []);
      if (textTrack) textTrack.mode = 'showing';
    }
    setShowSubtitleMenu(false);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    const d = video.duration;
    const t = video.currentTime;

    if (!isNaN(d) && d > 0) {
      setDuration(d);
      setCurrentTime(t);
      setProgress((t / d) * 100);
    }

    if (video.paused || video.ended) {
      video.play();
      setIsPlaying(true);
      setIsEnded(false);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (isMuted || volume === 0) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const toggleTimeDisplay = () => {
    setShowRemaining(!showRemaining);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!isNaN(video.duration) && video.duration > 0) {
      setDuration(video.duration);
    } else {
      const onDurationChange = () => {
        if (!isNaN(video.duration) && video.duration > 0) {
          setDuration(video.duration);
          video.removeEventListener('durationchange', onDurationChange);
        }
      };
      video.addEventListener('durationchange', onDurationChange);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    setCountdown(3);
    router.push('/home/play/[uid]/watch-end');
  };

  const handleMouseMove = () => {
    setShowControls(true);
    setShowTitle(true);
    if (controlTimeout.current) clearTimeout(controlTimeout.current);
    controlTimeout.current = setTimeout(() => {
      setShowControls(false);
      setShowTitle(false);
    }, 3000);
  };

  const handleDoubleClick = () => {
    setShowControls((prev) => !prev);
    setShowTitle((prev) => !prev);
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
    handleMouseMove();
  };

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isLive) {
      vid.muted = true;
      vid.defaultMuted = true;
      vid.playsInline = true;
      vid.autoplay = true;
      vid.preload = 'auto';
      vid
        .play()
        .then(() => {
          vid.muted = false;
          setIsPlaying(true);
          console.log('▶LIVE autoplay 성공, 소리 ON');
        })
        .catch((err) => {
          console.warn('LIVE autoplay 실패:', err);
        });
    }
  }, [isLive]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && !isNaN(video.duration)) {
      video.volume = volume;
      video.playbackRate = playbackRate;
    }
  }, [volume, playbackRate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video) return;

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          video.currentTime = Math.min(video.currentTime + 5, video.duration);
          break;
        case 'ArrowLeft':
          video.currentTime = Math.max(video.currentTime - 5, 0);
          break;
        case 'ArrowUp':
          setVolume((prev) => Math.min(prev + 0.1, 1));
          break;
        case 'ArrowDown':
          setVolume((prev) => Math.max(prev - 0.1, 0));
          break;
        case 'f':
          handleFullscreenToggle();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        playbackRateMenuRef.current &&
        !playbackRateMenuRef.current.contains(e.target as Node)
      ) {
        setPlaybackRateMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateDuration = () => {
      if (!isNaN(video.duration) && video.duration > 0) {
        setDuration(video.duration);
      }
    };

    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('durationchange', updateDuration);
    video.addEventListener('canplaythrough', updateDuration);

    return () => {
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('durationchange', updateDuration);
      video.removeEventListener('canplaythrough', updateDuration);
    };
  }, [videoSrc]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-black p-6 text-purple-200">
      <div
        className="relative aspect-video h-[calc(100vh-48px)] w-full max-w-screen"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onDoubleClick={handleDoubleClick}
      >
        <video
          ref={videoRef}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          className="h-full w-full bg-black object-contain"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div
          className={classNames(
            'absolute top-2 left-2 rounded px-2 py-1 text-xs font-semibold transition-opacity duration-300',
            {
              'bg-red-600 text-white': isLive,
              'bg-gray-600 text-white': !isLive,
              'opacity-100': showControls,
              'opacity-0': !showControls,
            },
          )}
        >
          {isLive ? 'LIVE' : '녹화본'}
        </div>

        <div
          className={classNames(
            'absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent px-4 pt-4 pb-2 text-white transition-opacity duration-300',
            {
              'opacity-100': showControls,
              'opacity-0': !showControls,
            },
          )}
        >
          {!isLive && (
            <div className="flex w-full flex-col gap-2">
              <div
                className="relative h-2 w-full cursor-pointer rounded-full bg-white/20"
                onMouseDown={(e) => {
                  const bar = e.currentTarget;
                  const rect = bar.getBoundingClientRect();

                  const updatePosition = (clientX: number) => {
                    const clickX = Math.min(
                      Math.max(clientX - rect.left, 0),
                      rect.width,
                    );
                    const newProgress = (clickX / rect.width) * 100;
                    const video = videoRef.current;
                    if (video && video.duration) {
                      const newTime = (newProgress / 100) * video.duration;
                      video.currentTime = newTime;
                      setProgress(newProgress);
                      setCurrentTime(newTime);
                    }
                  };

                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    updatePosition(moveEvent.clientX);
                  };

                  const handleMouseUp = (upEvent: MouseEvent) => {
                    updatePosition(upEvent.clientX);
                    window.removeEventListener('mousemove', handleMouseMove);
                    window.removeEventListener('mouseup', handleMouseUp);
                  };

                  window.addEventListener('mousemove', handleMouseMove);
                  window.addEventListener('mouseup', handleMouseUp);
                }}
              >
                <div
                  className="absolute top-0 left-0 h-full rounded-full bg-purple-400 hover:bg-purple-500"
                  style={{ width: `${progress}%` }}
                />

                <div
                  className="absolute -top-1 h-4 w-4 -translate-x-1/2 transform rounded-full bg-purple-400 shadow-md hover:bg-purple-500"
                  style={{ left: `${progress}%` }}
                />
              </div>
              <div className="h-0.5" />
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              {!isLive && (
                <button
                  onClick={togglePlay}
                  className="rounded-full bg-purple-400 p-2 hover:bg-purple-500"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
              )}
              <div
                className="relative flex items-center gap-2 hover:text-purple-400"
                onMouseEnter={() => setShowVolumeBar(true)}
                onMouseLeave={() => setShowVolumeBar(false)}
              >
                <button onClick={toggleMute}>
                  {volume === 0 || isMuted ? (
                    <VolumeX size={18} />
                  ) : (
                    <Volume2 size={18} />
                  )}
                </button>
                {showVolumeBar && (
                  <div
                    className="relative h-1.5 w-24 cursor-pointer rounded-full bg-white/20"
                    onMouseDown={(e) => {
                      const bar = e.currentTarget;
                      const rect = bar.getBoundingClientRect();

                      const updateVolume = (clientX: number) => {
                        const x = Math.min(
                          Math.max(clientX - rect.left, 0),
                          rect.width,
                        );
                        const newVolume = parseFloat(
                          (x / rect.width).toFixed(2),
                        );
                        setVolume(newVolume);
                        setIsMuted(newVolume === 0);
                        const video = videoRef.current;
                        if (video) video.volume = newVolume;
                      };

                      const handleMouseMove = (moveEvent: MouseEvent) =>
                        updateVolume(moveEvent.clientX);
                      const handleMouseUp = (upEvent: MouseEvent) => {
                        updateVolume(upEvent.clientX);
                        window.removeEventListener(
                          'mousemove',
                          handleMouseMove,
                        );
                        window.removeEventListener('mouseup', handleMouseUp);
                      };

                      window.addEventListener('mousemove', handleMouseMove);
                      window.addEventListener('mouseup', handleMouseUp);
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 h-full rounded-full bg-purple-400 hover:bg-purple-500"
                      style={{ width: `${volume * 100}%` }}
                    />

                    <div
                      className="absolute -top-0.75 h-3 w-3 -translate-x-1/2 transform rounded-full bg-purple-400 shadow-md hover:bg-purple-500"
                      style={{ left: `${volume * 100}%` }}
                    />

                    <div
                      className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full px-1 py-1 text-xs text-white"
                      style={{ left: `${volume * 100}%` }}
                    >
                      {Math.round(volume * 100)}
                    </div>
                  </div>
                )}
              </div>
              <span
                className="text-video-time cursor-pointer text-xs"
                onClick={toggleTimeDisplay}
              >
                {isLive
                  ? `${formatTime(currentTime)}`
                  : showRemaining
                    ? `-${formatTime(duration - currentTime)} / ${formatTime(duration)}`
                    : `${formatTime(currentTime)} / ${formatTime(duration)}`}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative" ref={playbackRateMenuRef}>
                <button
                  onClick={() => setPlaybackRateMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1 rounded px-2 py-1 text-white hover:text-purple-400"
                >
                  <FastForward size={18} />
                  {playbackRate}x
                </button>
                {playbackRateMenuOpen && (
                  <div className="absolute bottom-full left-0 z-10 mb-1 rounded bg-black/45 text-white shadow-md">
                    {playbackRates.map((rate) => (
                      <button
                        key={rate}
                        onClick={() => {
                          setPlaybackRate(rate);
                          setPlaybackRateMenuOpen(false);
                        }}
                        className={`z-10 block w-full rounded px-3 py-1 text-left shadow-md hover:bg-purple-800/45 ${
                          playbackRate === rate
                            ? 'z-10 rounded bg-purple-700/45 font-bold shadow-md'
                            : ''
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowReaction(!showReaction)}
                className="flex items-center gap-1 hover:text-purple-400"
              >
                <FaBolt />
              </button>
              <button
                onClick={() => setShowVote(!showVote)}
                className="flex items-center gap-1 hover:text-purple-400"
              >
                <FaPoll />
              </button>
              <button
                onClick={() => setShowProductInfo(true)}
                className="flex items-center gap-1 hover:text-purple-400"
              >
                <Info size={16} />
              </button>
              <button
                onClick={() => setShowSubtitleMenu((p) => !p)}
                className="flex items-center gap-1 hover:text-purple-400"
              >
                <Subtitles size={16} />
              </button>
              <button
                onClick={handleFullscreenToggle}
                className="rounded-full p-2 hover:text-purple-400"
              >
                {isFullscreen ? (
                  <Minimize2 size={20} />
                ) : (
                  <Maximize2 size={20} />
                )}
              </button>
            </div>
          </div>
        </div>

        {showVote && (
          <div className="absolute bottom-24 flex w-full justify-center px-4">
            <div className="w-full max-w-2xl rounded-xl bg-[#e5e5ff] p-4 text-center text-black shadow-md">
              <p className="mb-4 font-semibold">
                연극 내용.. 다음 상황을 어떻게 풀어나가면 좋을까?!
                <br />
                향유자님이 직접 골라주세요!
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['선택지 A', '선택지 B', '선택지 C', '선택지 D'].map(
                  (option, index) => (
                    <button
                      key={index}
                      className="rounded-lg bg-white py-2 transition hover:bg-blue-100"
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        )}

        {showReaction && (
          <div className="absolute bottom-40 flex w-full justify-center px-4">
            <div className="w-full max-w-md rounded-xl bg-white/80 p-4 text-center text-black shadow-md">
              <p className="mb-2 font-semibold">반응 리모컨</p>
              <div className="flex justify-around text-3xl">
                <button className="transition hover:scale-124">👏</button>
                <button className="transition hover:scale-124">🎉</button>
                <button className="transition hover:scale-124">😂</button>
                <button className="transition hover:scale-124">😢</button>
                <button className="transition hover:scale-124">👍</button>
              </div>
            </div>
          </div>
        )}

        {showSubtitleMenu && (
          <div className="absolute right-16 bottom-10 z-10 rounded bg-black/80 text-white shadow-md">
            {subtitleOptions.map((opt) => (
              <button
                key={opt.srclang}
                onClick={() => handleSelectSubtitle(opt)}
                className="block w-full px-4 py-2 text-left hover:bg-purple-600"
              >
                {opt.label}
              </button>
            ))}
            <button
              onClick={() => handleSelectSubtitle(null)}
              className="block w-full px-4 py-2 text-left hover:bg-purple-600"
            >
              OFF
            </button>
          </div>
        )}

        {showProductInfo && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-lg rounded-lg bg-white p-6">
              <button
                onClick={() => setShowProductInfo(false)}
                className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
              <div className="max-h-[60vh] space-y-4 overflow-y-auto">
                {sampleProducts.map((prod) => (
                  <div key={prod.id} className="flex items-start gap-4">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {prod.title}
                      </p>
                      <p className="text-sm text-purple-600">{prod.price}</p>
                      <p className="text-sm text-gray-600">
                        {prod.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
