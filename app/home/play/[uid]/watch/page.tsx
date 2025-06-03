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
  Smile,
  Vote,
  Video,
} from 'lucide-react';
import Image from 'next/image';
import classNames from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';

interface VotingOption {
  time: number;
  question: string;
  options: string[];
}

export default function Home() {
  // 페이지 자동 이동을 위한 라우터
  const router = useRouter();
  const searchParmas = useSearchParams();

  // 비디오 참조 및 영역
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 비디오 재생 제어
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
  const [videoSrc, setVideoSrc] = useState('/test/sample2.mp4');
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 재생 제어바 숨김처리
  const [showTitle, setShowTitle] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // 라이브 인터렉션
  const [showVote, setShowVote] = useState(false);
  const [showReaction, setShowReaction] = useState(false);
  const [playbackRateMenuOpen, setPlaybackRateMenuOpen] = useState(false);
  const [showSubtitleMenu, setShowSubtitleMenu] = useState(false);
  const [showProductInfo, setShowProductInfo] = useState(false);

  // 투표 기능 변수
  const [votes, setVotes] = useState({ A: 0, B: 0 });
  const totalVotes = votes.A + votes.B;
  const percentA =
    totalVotes === 0 ? 0 : Math.round((votes.A / totalVotes) * 100);
  const percentB = 100 - percentA;
  const [currentVote, setCurrentVote] = useState<VotingOption>();
  const [voteIndex, setVoteIndex] = useState(0);
  const [countdown, setCountdown] = useState(15);
  const [showResult, setShowResult] = useState(false);

  // 라이브 여부
  const [isLive, setIsLive] = useState(searchParmas.get('live') === 'true');

  //재생속도 제어
  const playbackRateMenuRef = useRef<HTMLDivElement>(null);
  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const controlTimeout = useRef<NodeJS.Timeout>(null);

  // 자막 옵션
  const subtitleOptions = [
    { label: '한국어', srclang: 'ko', src: '/subs/ko.vtt' },
    { label: 'English', srclang: 'en', src: '/subs/en.vtt' },
  ];

  // 상품 목록
  const sampleProducts = [
    {
      id: 1,
      image: '/images/product1.jpg',
      title: '옷 알파',
      price: '33,900원',
      description: '입고있는 등장인물 정보 및 기타 정보',
    },
    {
      id: 2,
      image: '/images/product1.jpg',
      title: '옷 베타',
      price: '44,200원',
      description: '추가 상품 상세 설명',
    },
    {
      id: 3,
      image: '/images/product1.jpg',
      title: '옷 감마',
      price: '55,500원',
      description: '입고있는 등장인물 정보 및 기타 정보',
    },
    {
      id: 4,
      image: '/images/product1.jpg',
      title: '옷 델타',
      price: '61,400원',
      description: '추가 상품 상세 설명',
    },
    {
      id: 5,
      image: '/images/product1.jpg',
      title: '옷 엡실론',
      price: '68,400원',
      description: '입고있는 등장인물 정보 및 기타 정보',
    },
    {
      id: 6,
      image: '/images/product1.jpg',
      title: '옷 제타',
      price: '70,700원',
      description: '추가 상품 상세 설명',
    },
  ];

  // 투표 목록
  const votingData: VotingOption[] = [
    {
      time: 65,
      question: '점순네 닭을 후려칠까?',
      options: ['후려친다', '다시 생각해본다'],
    },
    {
      time: 101,
      question: '이때 주인공은 어떤 행동을 할까?',
      options: ['참는다', '맞서 싸운다'],
    },
    {
      time: 201,
      question: '이때 투입될 등장 인물은 누구일까?',
      options: ['점순이네 어머니', '까치'],
    },
  ];

  // 재생 시간 반환 ([h]:mm:ss)
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

  // 자막 기능
  const handleSelectSubtitle = (option: (typeof subtitleOptions)[0] | null) => {
    const video = videoRef.current;
    if (!video) return;

    (video as HTMLVideoElement)
      .querySelectorAll('track')
      .forEach((t) => t.remove());
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

  // 동영상 재생 기능
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

  // 음소거 기능
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

  // 동영상 재생 시간과 남은 기간을 전환하는 기능
  const toggleTimeDisplay = () => {
    setShowRemaining(!showRemaining);
  };

  // 동영상 재생 시간 실시간 업데이트
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  // 동영상 메타데이터 읽기
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

  // 동영상 재생 완료 후 이벤트
  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    setCountdown(3);
    router.push('/home/play/[uid]/watch-end');
  };

  // 마우스 커서 동작 이벤트
  const handleMouseMove = () => {
    setShowControls(true);
    setShowTitle(true);
    if (controlTimeout.current) clearTimeout(controlTimeout.current);
    controlTimeout.current = setTimeout(() => {
      setShowControls(false);
      setShowTitle(false);
    }, 3000);
  };

  // 재생 제어 메뉴 더블 클릭 시 즉시 숨기기
  const handleDoubleClick = () => {
    setShowControls((prev) => !prev);
    setShowTitle((prev) => !prev);
  };

  // 전체화면 모드
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

  // 투표 조작 함수

  // 라이브 자동 재생 기능
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

  // 동영상 배속 설정
  useEffect(() => {
    const video = videoRef.current;
    if (video && !isNaN(video.duration)) {
      video.volume = volume;
      video.playbackRate = playbackRate;
    }
  }, [volume, playbackRate]);

  // 단축키 설정
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // 동영상 길이 반환
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

  // 특정 시간에 투표 자동으로 띄우기
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkTime = () => {
      if (
        voteIndex < votingData.length &&
        Math.floor(video.currentTime) === votingData[voteIndex].time
      ) {
        video.pause();
        setCurrentVote(votingData[voteIndex]);
        setShowVote(true);
        setCountdown(15);
        setVotes({ A: 0, B: 0 });
        setVoteIndex((prev) => prev + 1);
      }
    };

    const interval = setInterval(checkTime, 500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteIndex]);

  // 투표 결과 띄우기
  useEffect(() => {
    if (showVote && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (showVote && countdown === 0) {
      setShowResult(true);
      setTimeout(() => {
        setShowVote(false);
        setShowResult(false);
        videoRef.current?.play();
      }, 5000);
    }
  }, [countdown, showVote]);

  const handleVote = (option: string) => {
    setVotes((prev) => ({
      ...prev,
      [option === 'A' ? 'A' : 'B']: prev[option === 'A' ? 'A' : 'B'] + 1,
    }));
  };

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
            'absolute top-2 left-2 flex w-full justify-between gap-4 px-3 py-1 text-xs font-semibold transition-opacity duration-300',
            {
              'opacity-100': showControls,
              'opacity-0': !showControls,
            },
          )}
        >
          <div>
            <span className="inline-flex items-center">
              <Video
                className={classNames('mr-1 align-middle', {
                  'text-red-600': isLive,
                  'text-gray-600': !isLive,
                })}
                size={24}
              />
              <span className="ml-1 align-middle text-lg text-white">
                {isLive ? '실시간' : '녹화본'}
              </span>
            </span>
          </div>
          <div>
            <button
              onClick={() => setShowProductInfo(true)}
              className="flex items-center space-x-2 rounded-full bg-[#3d3750]/90 text-white shadow-md transition hover:bg-[#6c6090]"
            >
              <span className="ml-2 inline-block text-sm">
                여기를 눌러서 정보를 확인해 보세요
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5a5272] transition hover:bg-[#6c6090]">
                <Info size={20} />
              </div>
            </button>
          </div>
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
              {!isLive && (
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
              )}
              <button
                onClick={() => setShowReaction(!showReaction)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5a5272] transition hover:bg-[#6c6090]"
              >
                <Smile size={20} />
              </button>
              <button
                onClick={() => setShowVote(!showVote)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5a5272] transition hover:bg-[#6c6090]"
              >
                <Vote size={20} />
              </button>
              <button
                onClick={() => setShowSubtitleMenu((p) => !p)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5a5272] transition hover:bg-[#6c6090]"
              >
                <Subtitles size={20} />
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

        {showVote && currentVote && (
          <div className="absolute bottom-20 flex w-full flex-col items-center space-y-4 px-4">
            <div className="flex space-x-4">
              {currentVote.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleVote(i === 0 ? 'A' : 'B')}
                  className="w-55 rounded bg-purple-600 px-6 py-2 font-semibold text-white hover:bg-purple-700"
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="w-full max-w-md rounded-xl bg-[#d6c9f0] py-4 text-center text-lg font-semibold text-black shadow-md">
              {currentVote.question}
              <p className="text-sm">{countdown}초 남음</p>
            </div>

            <div className="absolute right-4 bottom-4 w-56 space-y-1 rounded-lg bg-black/60 px-3 py-2 text-xs text-white shadow-lg">
              <p className="text-center text-lg font-semibold">투표 결과</p>
              <p>현재 {totalVotes} 명이 투표에 참여함!</p>

              <div className="mb-1 flex justify-between text-lg font-bold">
                <span className="text-red-400">{percentA}%</span>
                <span className="text-sky-500">{percentB}%</span>
              </div>
              <div className="flex h-6 w-full overflow-hidden rounded border border-white bg-gray-200">
                <div
                  className="bg-red-400 transition-all duration-500"
                  style={{ width: `${percentA}%` }}
                />
                <div
                  className="bg-sky-500 transition-all duration-500"
                  style={{ width: `${percentB}%` }}
                />
              </div>
              <div className="mb-1 flex justify-between text-xs font-bold">
                <span className="text-red-400">
                  <p>{currentVote.options[0]}</p>
                  <p>{votes.A}표</p>
                </span>
                <span className="text-right text-sky-500">
                  <p>{currentVote.options[1]}</p>
                  <p>{votes.B}표</p>
                </span>
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
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
            {/* 모달 영역 */}
            <div
              style={{
                backgroundColor: 'rgba(46, 30, 78, 0.76)',
                borderRadius: '1rem',
              }}
              className="relative z-50 flex h-[60vh] w-[70vw] flex-col overflow-hidden p-6 text-white shadow-xl"
            >
              {/* 닫기 버튼 */}
              <button
                onClick={() => setShowProductInfo(false)}
                className="absolute top-3 right-4 z-10 text-2xl text-white hover:text-gray-300"
              >
                ✕
              </button>

              {/* 스크롤 가능한 리스트 (모달 내부에 스크롤) */}
              <div className="mt-8 flex-1 space-y-4 overflow-y-auto pr-2">
                {sampleProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between gap-4 rounded-xl bg-white/5 px-4 py-3"
                  >
                    <div className="flex items-start gap-4">
                      <Image
                        src={prod.image}
                        alt={prod.title}
                        width={96}
                        height={96}
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="text-lg">
                        <p className="font-semibold text-white">{prod.title}</p>
                        <p className="text-purple-300">{prod.price}</p>
                        <p className="text-gray-300">{prod.description}</p>
                      </div>
                    </div>

                    <button className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-lg whitespace-nowrap text-white hover:bg-white/20">
                      옷 정보 보러가기 <span className="ml-1">▶</span>
                    </button>
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
