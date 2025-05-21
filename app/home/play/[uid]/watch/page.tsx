'use client';

import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, FastForward } from 'lucide-react';
import { FaBolt, FaPoll } from 'react-icons/fa';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
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
  const playbackRateMenuRef = useRef(null);
  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const controlTimeout = useRef(null);
  const countdownInterval = useRef(null);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return hrs > 0 ? `${hrs}:${mins}:${secs}` : `${mins}:${secs}`;
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
    const video = videoRef.current;
    if (video && !isNaN(video.duration)) {
      video.volume = volume;
      video.playbackRate = playbackRate;
    }
  }, [volume, playbackRate]);

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
            'absolute bottom-0 left-0 right-0 px-4 pt-4 pb-2 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent text-white',
            {
              'opacity-100': showControls,
              'opacity-0': !showControls,
            }
          )}
        >
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
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="bg-purple-400 hover:bg-purple-500 p-2 rounded-full">
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
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
                    {/* 채운 볼륨 부분 */}
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
                {showRemaining
                  ? `-${formatTime(duration - currentTime)} / ${formatTime(duration)}`
                  : `${formatTime(currentTime)} / ${formatTime(duration)}`}
              </span>
            </div>
            <div className="flex items-center gap-4">
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
              <button onClick={() => setShowReaction(!showReaction)} className="hover:text-purple-400 flex items-center gap-1">
                <FaBolt />
              </button>
              <button onClick={() => setShowVote(!showVote)} className="hover:text-purple-400 flex items-center gap-1">
                <FaPoll />
              </button>
              <button onClick={handleFullscreenToggle} className="p-2 rounded-full hover:text-purple-400">
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
            </div>
          </div>
        </div>

        {showVote && (
          <div className="absolute bottom-24 w-full px-4 flex justify-center">
            <div className="bg-[#e5e5ff] p-4 rounded-xl shadow-md w-full max-w-2xl text-center text-black">
              <p className="mb-4 font-semibold">연극 내용.. 다음 상황을 어떻게 풀어나가면 좋을까?!<br/>향유자님이 직접 골라주세요!</p>
              <div className="grid grid-cols-2 gap-4">
                {['선택지 A', '선택지 B', '선택지 C', '선택지 D'].map((option, index) => (
                  <button key={index} className="bg-white rounded-lg py-2 hover:bg-blue-100 transition">
                    {option}
                  </button>
                ))}
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
      </div>
    </main>
  );
}
