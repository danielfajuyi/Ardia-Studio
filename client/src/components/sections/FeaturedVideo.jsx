import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
  Settings,
  Maximize,
  Minimize,
} from "lucide-react";

const highlights = [
  {
    id: 1,
    title: "Cinematic AI",
    category: "Short Film",
    video: "/asset/jeff-and-joy.mp4",
    description: "Generative storytelling at scale.",
  },
  {
    id: 2,
    title: "Commercials",
    category: "Brand ID",
    video: "/asset/proposal.mp4",
    description: "High-impact visual identity.",
  },
  {
    id: 3,
    title: "Music Video",
    category: "Production",
    video: "/asset/beard-gang.mp4",
    description: "Rhythm meets neural networks.",
  },

  {
    id: 4,
    title: "Music Video",
    category: "Production",
    video: "/asset/Ikigai.mp4",
    description: "Rhythm meets neural networks.",
  },

  {
    id: 5,
    title: "Music Video",
    category: "Production",
    video: "/asset/model-video-5Jgh9khQ.mp4",
    description: "Rhythm meets neural networks.",
  },
];

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const FeaturedVideo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRefs = useRef([]);
  const progressInterval = useRef(null);
  const DURATION = 9000;
  const INTERVAL_STEP = 50;

  // Handle auto-slide and progress bar
  useEffect(() => {
    if (isPlaying) {
      clearInterval(progressInterval.current);
      return;
    }

    setProgress(0);

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((prevTab) => (prevTab + 1) % highlights.length);
          return 0;
        }
        return prev + (INTERVAL_STEP / DURATION) * 100;
      });
    }, INTERVAL_STEP);

    return () => clearInterval(progressInterval.current);
  }, [activeTab, isPlaying]);

  // Handle video playback including tab switching
  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    // Phase 1: If clicking a non-active slide, switch to it and play
    if (activeTab !== index) {
      // Pause currently playing video if any (sanity check)
      videoRefs.current.forEach((v) => {
        if (v) {
          v.pause();
          v.currentTime = 0;
        }
      });

      setActiveTab(index);
      // We need to wait for state update or force play.
      // Since React state is async, we can attempt to play immediately
      // but the render logic depends on activeTab.
      // However, the video element ref is stable.
      video.muted = isMuted;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => console.error("Video play failed:", err));
      return;
    }

    // Phase 2: Toggle logic for active slide
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      // Pause all other videos (redundant but safe)
      videoRefs.current.forEach((v, i) => {
        if (i !== index && v) {
          v.pause();
          v.currentTime = 0;
        }
      });
      video.muted = isMuted;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => console.error("Video play failed:", err));
    }
  };

  const handleSeek = (index, seconds) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = Math.min(
        Math.max(video.currentTime + seconds, 0),
        video.duration,
      );
    }
  };

  const toggleMute = (e, index) => {
    e.stopPropagation();
    const video = videoRefs.current[index];
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const handleTimeUpdate = (e) => {
    const { currentTime, duration } = e.target;
    setCurrentTime(currentTime);
    if (duration > 0) {
      setVideoProgress((currentTime / duration) * 100);
      setDuration(duration);
    }
  };

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setActiveTab((prev) => (prev + 1) % highlights.length);
  };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (index !== activeTab && video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    // Don't force reset isPlaying to false here if we just switched via togglePlay
    // The togglePlay logic sets isPlaying(true) manually.
    // But if we switch via auto-slide, we want it false.
    // We can check if video at new activeTab is paused.
    const activeVideo = videoRefs.current[activeTab];
    if (activeVideo && activeVideo.paused) {
      setIsPlaying(false);
    }

    setVideoProgress(0);
    setCurrentTime(0);
  }, [activeTab]);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const swipeThreshold = 50;
    const velocityThreshold = 400;

    if (offset < -swipeThreshold || velocity < -velocityThreshold) {
      setActiveTab((prev) => (prev + 1) % highlights.length);
    } else if (offset > swipeThreshold || velocity > velocityThreshold) {
      setActiveTab(
        (prev) => (prev - 1 + highlights.length) % highlights.length,
      );
    }
  };

  return (
    <section className="py-24 bg-background overflow-hidden select-none">
      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xl text-whiten "> Featured Work: </p>
          <h3 className="text-4xl py-1  bg-gradient-to-b from-[#cfcece] to-[#ffffff] bg-clip-text text-transparent  md:text-6xl font-semibold leading-normal tracking-tight">
            Imagination in Motion
          </h3>
        </div>

        {/* Custom Pagination */}
        <div className="hidden md:flex items-center gap-4">
          {highlights.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(index);
                setIsPlaying(false);
                videoRefs.current.forEach((v) => v && v.pause());
              }}
              className="group relative flex items-center justify-center p-2 focus:outline-none"
            >
              <div className="relative h-2 w-12 bg-white/30 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-white/30" />
                {activeTab === index && (
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-white"
                    style={{ width: isPlaying ? "100%" : `${progress}%` }}
                    transition={{ duration: 0.05, ease: "linear" }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full h-[60vh] md:h-[80vh] pl-6 md:pl-[max(2rem,calc(50vw-45vw))]">
        <motion.div
          className="flex gap-6 h-full"
          animate={{
            x: `-${activeTab * (window.innerWidth < 768 ? 92 : 47)}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {highlights.map((item, index) => {
            const isActive = activeTab === index;
            const isSlidePlaying = isActive && isPlaying;

            return (
              <motion.div
                key={item.id}
                className={`relative min-w-[90vw] md:min-w-[45vw] h-full rounded-3xl overflow-hidden transition-all duration-500 cursor-grab active:cursor-grabbing ${
                  isActive
                    ? "opacity-100 scale-105 z-10 border border-white/20 shadow-2xl shadow-blue-500/10"
                    : "opacity-40 scale-90 grayscale-[30%]"
                }`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  // If inactive, switch to it (and play, handled in togglePlay logic if we wanted,
                  // but straightforward click should just switch? User said "play" specifically.
                  // Let's make click on inactive just switch, but Play button click switch+play).
                  if (!isActive) {
                    setActiveTab(index);
                    // Don't play on simple body click, only if play button clicked?
                    // Or consistent behavior?
                    // User said: "I want that when im playing slide 1 or before play, i played slide 2... set slide two to the active since im now playing slide 2"
                    // This implies clicking the PLAY BUTTON or interacting to Play.
                    // Simple tap on card usually just centers it. Let's keep tap = center.
                    setIsPlaying(false);
                  } else {
                    // Tap on active video toggles play usually, or shows controls?
                    // If playing, tap usually pauses or shows controls.
                    // For now, let's keep simple toggle.
                    togglePlay(index);
                  }
                }}
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  playsInline
                  className="w-full h-full object-cover"
                  poster="https://via.placeholder.com/1920x1080/1a1a1a/1a1a1a"
                  onEnded={handleVideoEnded}
                  onPause={handleVideoPause}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                >
                  <source src={item.video} type="video/mp4" />
                </video>

                {/* Dark Overlay & Big Play Button - Only if NOT playing active slide */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/40"
                  animate={{ opacity: isSlidePlaying ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ pointerEvents: isSlidePlaying ? "none" : "auto" }}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(index);
                    }}
                    className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-6 flex items-center justify-center group"
                  >
                    <Play className="w-8 h-8 fill-white text-white pl-1" />
                  </motion.button>
                </motion.div>

                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent"
                  animate={{ opacity: isSlidePlaying ? 0 : 0.8 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Advanced Video Player Controls */}
                <AnimatePresence>
                  {isSlidePlaying && (
                    <motion.div
                      className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4 z-50 pointer-events-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Left Pill: Play/Pause */}
                      <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-2 flex items-center">
                        <button
                          onClick={() => togglePlay(index)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Pause className="w-5 h-5 text-white fill-white" />
                        </button>
                      </div>

                      {/* Center Pill: Seek & Time */}
                      <div className="flex-1 max-w-md bg-black/60 backdrop-blur-md rounded-full px-6 py-2 flex items-center justify-between gap-4">
                        <button
                          onClick={() => handleSeek(index, -10)}
                          className="hover:text-white text-white/70 transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>

                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden mx-2">
                          <motion.div
                            className="h-full bg-white rounded-full"
                            style={{ width: `${videoProgress}%` }}
                          />
                        </div>

                        <span className="text-xs font-medium text-white font-mono min-w-[80px] text-center">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>

                        <button
                          onClick={() => handleSeek(index, 10)}
                          className="hover:text-white text-white/70 transition-colors"
                        >
                          <RotateCw className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Right Pill: Volume & Options */}
                      <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-2 flex items-center gaps-3">
                        <button
                          onClick={(e) => toggleMute(e, index)}
                          className="hover:scale-110 transition-transform mr-3"
                        >
                          {isMuted ? (
                            <VolumeX className="w-5 h-5 text-white" />
                          ) : (
                            <Volume2 className="w-5 h-5 text-white" />
                          )}
                        </button>
                        <button className="hover:scale-110 transition-transform">
                          <Maximize className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Featured Text Content */}
                <motion.div
                  className="absolute bottom-10 left-10 pointer-events-none"
                  initial={false}
                  animate={{
                    opacity: isSlidePlaying ? 0 : 1,
                    y: isSlidePlaying ? 20 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="text-4xl font-bold mb-2">{item.title}</h3>
                  <p className="text-lg text-gray-300">{item.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Mobile Pagination Control */}
      <div className="flex md:hidden justify-center items-center gap-2 mt-8">
        {highlights.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              activeTab === index ? "w-12 bg-white" : "w-2 bg-white/30"
            }`}
          >
            {activeTab === index && (
              <motion.div
                className="h-full bg-white rounded-full"
                style={{ width: isPlaying ? "100%" : `${progress}%` }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeaturedVideo;
