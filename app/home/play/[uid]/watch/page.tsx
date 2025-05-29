'use client';

import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, FastForward, Subtitles, Info, Smile, Vote, Video } from 'lucide-react';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';

export default function Home() {
  // 페이지 자동 이동을 위한 라우터
  const router = useRouter();

  // 비디오 참조 및 영역
  const videoRef = useRef(null);
  const containerRef = useRef(null);

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
  const [videoSrc, setVideoSrc] = useState('/test/sample.mp4');
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
  const percentA = totalVotes === 0 ? 0 : Math.round((votes.A / totalVotes) * 100);
  const percentB = 100 - percentA;
  const [currentVote, setCurrentVote] = useState(null);
  const [voteIndex, setVoteIndex] = useState(0);
  const [countdown, setCountdown] = useState(15);
  const [showResult, setShowResult] = useState(false);

  // 라이브 여부
  const [isLive, setIsLive] = useState(true);

  //재생속도 제어
  const playbackRateMenuRef = useRef(null);
  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const controlTimeout = useRef(null);

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

  // 투표 목록
  const votingData = [
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
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return hrs > 0 ? `${hrs}:${mins}:${secs}` : `${mins}:${secs}`;
  };

  // 자막 기능
  const handleSelectSubtitle = (option: typeof subtitleOptions[0] | null) => {
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
    if (!vid) return

    if (isLive) {
      vid.muted = true
      vid.defaultMuted = true
      vid.playsInline = true
      vid.autoplay = true
      vid.preload = 'auto'
      vid.play()
        .then(() => {
          vid.muted = false
          setIsPlaying(true)
          console.log('▶LIVE autoplay 성공, 소리 ON')
        })
        .catch(err => {
          console.warn('LIVE autoplay 실패:', err)
        })
    }
  }, [isLive])

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
    const handleKeyDown = (e) => {
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
    const handleClickOutside = (e) => {
      if (playbackRateMenuRef.current && !playbackRateMenuRef.current.contains(e.target)) {
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
      if (voteIndex < votingData.length && Math.floor(video.currentTime) === votingData[voteIndex].time) {
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

  const handleVote = (option) => {
    setVotes((prev) => ({
      ...prev,
      [option === 'A' ? 'A' : 'B']: prev[option === 'A' ? 'A' : 'B'] + 1,
    }));
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-black text-purple-200 p-6">
      <div
        className="relative w-full h-[calc(100vh-48px)] max-w-screen aspect-video"
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
          className="w-full h-full object-contain bg-black"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div
          className={classNames(
            'flex justify-between gap-4 w-full absolute top-2 left-2 px-3 py-1 text-xs font-semibold transition-opacity duration-300',
            {
              'opacity-100': showControls,
              'opacity-0': !showControls,
            }
          )}
        >
          <div>
            <span className="inline-flex items-center">
              <Video className={classNames("mr-1 align-middle",
                {
                  'text-red-600': isLive,
                  'text-white-600': !isLive
                }
                )} size={24} />
              <span className="align-middle text-white text-lg">{isLive ? '실시간' : '녹화본'}</span>
            </span>
          </div>
          <div>
            <button onClick={() => setShowProductInfo(true)} className="hover:text-purple-400 flex items-center gap-1">
                <span className="text-lg">여기를 눌러 정보를 확인해 보세요 </span><span><Info size={22}/></span>
            </button>
          </div>
        </div>
        <div
          className={classNames(
            'absolute bottom-0 left-0 right-0 px-4 pt-4 pb-2 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent text-white',
            {
              'opacity-100': showControls,
              'opacity-0': !showControls,
            }
          )}
        >
        {!isLive && (
          <div className="flex flex-col gap-2 w-full">
            <div
              className="relative w-full h-2 rounded-full bg-white/20 cursor-pointer"
              onMouseDown={(e) => {
                const bar = e.currentTarget;
                const rect = bar.getBoundingClientRect();

                const updatePosition = (clientX) => {
                  const clickX = Math.min(Math.max(clientX - rect.left, 0), rect.width);
                  const newProgress = (clickX / rect.width) * 100;
                  const video = videoRef.current;
                  if (video && video.duration) {
                    const newTime = (newProgress / 100) * video.duration;
                    video.currentTime = newTime;
                    setProgress(newProgress);
                    setCurrentTime(newTime);
                  }
                };

                const handleMouseMove = (moveEvent) => {
                  updatePosition(moveEvent.clientX);
                };

                const handleMouseUp = (upEvent) => {
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
                className="absolute -top-1 w-4 h-4 bg-purple-400 rounded-full shadow-md transform -translate-x-1/2 hover:bg-purple-500"
                style={{ left: `${progress}%` }}
              />
            </div>
            <div className="h-0.5" />
          </div>
        )}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              {!isLive && (
                <button onClick={togglePlay} className="bg-purple-400 hover:bg-purple-500 p-2 rounded-full">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
              )}
              <div
                className="relative flex items-center gap-2 hover:text-purple-400"
                onMouseEnter={() => setShowVolumeBar(true)}
                onMouseLeave={() => setShowVolumeBar(false)}
              >
                <button onClick={toggleMute}>{volume === 0 || isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
                {showVolumeBar && (
                  <div
                    className="relative w-24 h-1.5 bg-white/20 rounded-full cursor-pointer"
                    onMouseDown={(e) => {
                      const bar = e.currentTarget;
                      const rect = bar.getBoundingClientRect();

                      const updateVolume = (clientX) => {
                        const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
                        const newVolume = parseFloat((x / rect.width).toFixed(2));
                        setVolume(newVolume);
                        setIsMuted(newVolume === 0);
                        const video = videoRef.current;
                        if (video) video.volume = newVolume;
                      };

                      const handleMouseMove = (moveEvent) => updateVolume(moveEvent.clientX);
                      const handleMouseUp = (upEvent) => {
                        updateVolume(upEvent.clientX);
                        window.removeEventListener('mousemove', handleMouseMove);
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
                      className="absolute -top-0.75 w-3 h-3 bg-purple-400 rounded-full shadow-md transform -translate-x-1/2 hover:bg-purple-500"
                      style={{ left: `${volume * 100}%` }}
                    />

                    <div
                      className="absolute -top-5 left-1/2 -translate-x-1/2 text-white text-xs px-1 py-1 rounded-full"
                      style={{ left: `${volume * 100}%` }}
                    >
                      {Math.round(volume * 100)}
                    </div>
                  </div>
                )}
              </div>
              <span className="text-xs cursor-pointer text-video-time" onClick={toggleTimeDisplay}>
                {isLive
                  ? `${formatTime(currentTime)}`
                  : showRemaining
                    ? `-${formatTime(duration - currentTime)} / ${formatTime(duration)}`
                    : `${formatTime(currentTime)} / ${formatTime(duration)}`
                }
              </span>
            </div>
            <div className="flex items-center gap-4">
              {!isLive && (
                <div className="relative" ref={playbackRateMenuRef}>
                  <button
                    onClick={() => setPlaybackRateMenuOpen((prev) => !prev)}
                    className="flex items-center gap-1 text-white px-2 py-1 rounded hover:text-purple-400"
                  >
                    <FastForward size={18} />
                    {playbackRate}x
                  </button>
                  {playbackRateMenuOpen && (
                    <div className="absolute bottom-full mb-1 left-0 bg-black/45 text-white rounded shadow-md z-10">
                      {playbackRates.map((rate) => (
                        <button
                          key={rate}
                          onClick={() => {
                            setPlaybackRate(rate);
                            setPlaybackRateMenuOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-1 hover:bg-purple-800/45 rounded shadow-md z-10 ${
                            playbackRate === rate ? 'bg-purple-700/45 font-bold rounded shadow-md z-10' : ''
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                )}
              <button onClick={() => setShowReaction(!showReaction)} className="hover:text-purple-400 flex items-center gap-1">
                <Smile />
              </button>
              <button onClick={() => setShowVote(!showVote)} className="hover:text-purple-400 flex items-center gap-1">
                <Vote />
              </button>
              <button onClick={() => setShowSubtitleMenu((p) => !p)} className="hover:text-purple-400 flex items-center gap-1">
                <Subtitles size={20}/>
              </button>
              <button onClick={handleFullscreenToggle} className="p-2 rounded-full hover:text-purple-400">
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
            </div>
          </div>
        </div>

        {showVote && currentVote && (
          <div className="absolute bottom-20 w-full px-4 flex flex-col items-center space-y-4">
            {/* 버튼 */}
            <div className="flex space-x-4">
              {currentVote.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleVote(i === 0 ? 'A' : 'B')}
                  className="w-55 px-6 py-2 bg-purple-600 rounded text-white font-semibold hover:bg-purple-700"
                >
                  {option}
                </button>
              ))}
            </div>

            {/* 질문 */}
            <div className="bg-[#d6c9f0] w-120 py-4 rounded-xl shadow-md text-center text-black text-lg font-semibold max-w-md w-full">
              {currentVote.question}
              <p className="text-sm">{countdown}초 남음</p>
            </div>

            <div className="absolute bottom-4 right-4 text-xs text-white bg-black/60 w-56 px-3 py-2 rounded-lg shadow-lg space-y-1">
              <p className="text-center font-semibold text-lg">투표 결과</p>
              <p>현재 {totalVotes} 명이 투표에 참여함!</p>

              <div className="flex justify-between text-lg font-bold mb-1">
                <span className="text-red-400">{percentA}%</span>
                <span className="text-sky-500">{percentB}%</span>
              </div>
              <div className="w-full h-6 bg-gray-200 rounded overflow-hidden flex border border-white">
                <div
                  className="bg-red-400 transition-all duration-500"
                  style={{ width: `${percentA}%` }}
                />
                <div
                  className="bg-sky-500 transition-all duration-500"
                  style={{ width: `${percentB}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-red-400">
                  <p>후려친다</p>
                  <p>{votes.A}표</p>
                </span>
                <span className="text-sky-500 text-right">
                  <p>다시 생각한다</p>
                  <p>{votes.B}표</p>
                </span>
              </div>
            </div>
          </div>
        )}

        {showReaction && (
          <div className="absolute bottom-40 w-full px-4 flex justify-center">
            <div className="bg-white/80 p-4 rounded-xl shadow-md max-w-md w-full text-center text-black">
              <p className="mb-2 font-semibold">반응 리모컨</p>
              <div className="flex justify-around text-3xl">
                <button className="hover:scale-124 transition">👏</button>
                <button className="hover:scale-124 transition">🎉</button>
                <button className="hover:scale-124 transition">😂</button>
                <button className="hover:scale-124 transition">😢</button>
                <button className="hover:scale-124 transition">👍</button>
              </div>
            </div>
          </div>
        )}

        {showSubtitleMenu && (
          <div className="absolute bottom-10 right-16 bg-black/80 text-white rounded shadow-md z-10">
            {subtitleOptions.map((opt) => (
              <button
                key={opt.srclang}
                onClick={() => handleSelectSubtitle(opt)}
                className="block px-4 py-2 hover:bg-purple-600 w-full text-left"
              >
                {opt.label}
              </button>
            ))}
            <button
              onClick={() => handleSelectSubtitle(null)}
              className="block px-4 py-2 hover:bg-purple-600 w-full text-left"
            >
              OFF
            </button>
          </div>
        )}

        {showProductInfo && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
              <button
                onClick={() => setShowProductInfo(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {sampleProducts.map((prod) => (
                  <div key={prod.id} className="flex items-start gap-4">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{prod.title}</p>
                      <p className="text-sm text-purple-600">{prod.price}</p>
                      <p className="text-sm text-gray-600">{prod.description}</p>
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
