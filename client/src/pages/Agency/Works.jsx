import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import FinalCTA from "../../components/sections/FinalCTA";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
  Maximize,
  ArrowDown,
  X,
} from "lucide-react";
import CloudinaryVideo from "../../components/ui/CloudinaryVideo";

// --- Data Structure ---
const worksData = [
  {
    category: "AI Ad Videos",
    videos: [
      { title: "KCT", src: "/asset/video/ai-ad-videos/KCT.mp4" },
      { title: "Natura Mane", src: "/asset/video/ai-ad-videos/NaturaMane.mp4" },
      {
        title: "Simmer Spec Ad",
        src: "/asset/video/ai-ad-videos/Simmer Spec-ad.mp4",
      },
      {
        title: "Ardai Studios",
        src: "/asset/video/ai-ad-videos/Ardai Studios_.mp4",
      },
      {
        title: "Stella Soribe Jompstart",
        src: "/asset/video/ai-ad-videos/SORIBE Stella _ Jompstart_.mp4",
      },
      {
        title: "Marketing Ad",
        src: "/asset/video/ai-ad-videos/Ad video (Marketing).mp4",
      },
    ],
  },
  {
    category: "AI Influencer",
    videos: [
      {
        title: "Amaya Intro",
        src: "/asset/video/ai-influencer/Amaya Intro video.mp4",
      },
      {
        title: "Amaya & David",
        src: "/asset/video/ai-influencer/Amaya and David_.mp4",
      },
      {
        title: "Amaya Tryons",
        src: "/asset/video/ai-influencer/Amaya tryons.mp4",
      },
      {
        title: "LinkedIn PR",
        src: "/asset/video/ai-influencer/LinkedIn PR package.mp4",
      },
      { title: "Lifestyle", src: "/asset/video/ai-influencer/lifestyle.mp4" },
      { title: "Lovable", src: "/asset/video/ai-influencer/lovable.mp4" },
    ],
  },
  {
    category: "AI Movies",
    videos: [
      { title: "Akirah", src: "/asset/video/ai-movies/Akirah.mp4" },
      {
        title: "Dear Ma Li An",
        src: "/asset/video/ai-movies/Dear Ma Li An (黎安)_.mp4",
      },
      { title: "Jeff & Joy", src: "/asset/video/ai-movies/Jeff and Joy.mp4" },
      {
        title: "Life of James",
        src: "/asset/video/ai-movies/Life of James part 1.mp4",
      },
      {
        title: "Amaya & Dakota",
        src: "/asset/video/ai-movies/Amaya and Dakota EP1.mp4",
      },
      { title: "The Proposal", src: "/asset/video/ai-movies/proposal.mp4" },
      { title: "Beard Gang", src: "/asset/video/ai-movies/Beard gang.mp4" },
    ],
  },
  {
    category: "AI Social Media",
    videos: [
      {
        title: "Ikigai",
        src: "/asset/video/ai-social-media-videos/Ikigai.mp4",
      },

      {
        title: "Ralph Lauren",
        src: "/asset/video/ai-social-media-videos/Ralph Lauren.webm",
      },
      {
        title: "Asake Oge",
        src: "/asset/video/ai-social-media-videos/asakeOge.mp4",
      },
      {
        title: "Retrofit",
        src: "/asset/video/ai-social-media-videos/Retrofit.mp4",
      },
      {
        title: "Model 1",
        src: "/asset/video/ai-social-media-videos/Model 1.webm",
      },
      {
        title: "Model 2",
        src: "/asset/video/ai-social-media-videos/Model 2.webm",
      },
    ],
  },
  {
    category: "AI Music Videos",
    videos: [
      {
        title: "Wetin God No Fit Do",
        src: "/asset/video/ai-music-videos/Wetin God no fit do_.mp4",
      },
      {
        title: "LV 2025",
        src: "/asset/video/ai-music-videos/lv_0_20251214103003.mp4",
      },
    ],
  },
  {
    category: "AI Tutorials",
    videos: [{ title: "GRWM", src: "/asset/video/ai-tutorials/GRWM.webm" }],
  },
];

// --- Components ---

const WorksHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black perspective-1000 mb-12 lg:mb-24"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-30 animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 text-white">
            Selected
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white block md:inline-block md:ml-6">
              Works.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light">
            A collection of our finest AI-driven storytelling, curated by
            category.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// --- Modals & Subcomponents ---

const VideoCard = ({ video, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const [aspectType, setAspectType] = useState("landscape"); // default assumption

  const handleLoadedMetadata = (e) => {
    const { videoWidth, videoHeight } = e.target;
    if (videoHeight > videoWidth) {
      setAspectType("portrait");
    } else {
      setAspectType("landscape");
    }
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onClick={() => onClick(video)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 group perspective-1000 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-shadow ${
        aspectType === "portrait"
          ? "aspect-[4/5] max-h-[600px]"
          : "aspect-video"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 transition-opacity duration-500 opacity-80 group-hover:opacity-40" />

      <CloudinaryVideo
        src={video.src}
        className="w-full h-full object-cover"
        muted
        playsInline
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-300">
          <Play className="w-6 h-6 text-white fill-white ml-1" />
        </div>
      </div>

      <motion.div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
          <span className="text-white font-medium text-sm">{video.title}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const VideoModal = ({ video, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef(null);

  // Auto-hide controls when playing
  useEffect(() => {
    const bumpControls = () => {
      setShowControls(true);
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
      if (isPlaying) {
        controlsTimeout.current = setTimeout(
          () => setShowControls(false),
          2500,
        );
      }
    };

    bumpControls();
    window.addEventListener("mousemove", bumpControls);
    return () => {
      window.removeEventListener("mousemove", bumpControls);
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    // Escape to close
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
        setIsPlaying(false);
      });
    }
  }, [video]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleSeek = (e, seconds) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        Math.max(videoRef.current.currentTime + seconds, 0),
        videoRef.current.duration,
      );
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100,
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4 md:p-12"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 lg:top-10 lg:right-10 z-[101] p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all group"
      >
        <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="relative w-full max-w-7xl max-h-[85vh] md:max-h-[90vh] bg-black rounded-xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center group"
        onClick={(e) => e.stopPropagation()}
      >
        <CloudinaryVideo
          ref={videoRef}
          src={video.src}
          className="w-full h-full max-h-[85vh] md:max-h-[90vh] object-contain bg-black cursor-pointer"
          muted={isMuted}
          playsInline
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Apple-Sleek Cinematic Controls Overlay */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 md:bottom-10 left-6 right-6 md:left-12 md:right-12 flex flex-col gap-4 pointer-events-none z-50"
            >
              {/* Title & Scrub Bar */}
              <div className="flex flex-col gap-3 pointer-events-auto w-full max-w-3xl mx-auto">
                <div className="flex items-center justify-between text-white/90 text-sm px-2 font-medium drop-shadow-md">
                  <span>{video.title}</span>
                  <span className="font-mono text-xs opacity-70">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div
                  className="h-1.5 md:h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer group/progress relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    if (videoRef.current)
                      videoRef.current.currentTime = percent * duration;
                  }}
                >
                  <motion.div
                    className="h-full bg-white rounded-full group-hover/progress:bg-blue-400 transition-colors"
                    style={{ width: `${progress}%` }}
                  />
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-6 mt-2 pointer-events-auto">
                <button
                  onClick={(e) => handleSeek(e, -10)}
                  className="p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:text-white transition-all transform hover:scale-110"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  onClick={togglePlay}
                  className="p-5 rounded-full bg-white text-black hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center transform active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-black" />
                  ) : (
                    <Play className="w-7 h-7 fill-black ml-1" />
                  )}
                </button>

                <button
                  onClick={(e) => handleSeek(e, 10)}
                  className="p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:text-white transition-all transform hover:scale-110"
                >
                  <RotateCw className="w-5 h-5" />
                </button>
              </div>

              {/* Secondary Actions (Mute/Full) */}
              <div className="absolute right-0 bottom-0 pointer-events-auto flex gap-3">
                <button
                  onClick={toggleMute}
                  className="p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 rounded-full transition-transform hover:scale-110"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 rounded-full transition-transform hover:scale-110 md:hidden"
                >
                  <Maximize className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const Works = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <WorksHero />

      <div className="container mx-auto px-6 py-20 pb-40 space-y-32">
        {worksData.map((section, index) => (
          <section key={index} className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                {section.category}
              </h2>
              <div className="h-1 w-20 bg-primary/50 rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.videos.map((video, vIndex) => (
                <VideoCard
                  key={`${index}-${vIndex}`}
                  video={video}
                  onClick={setActiveVideo}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <FinalCTA />
      <Footer />

      <AnimatePresence>
        {activeVideo && (
          <VideoModal
            video={activeVideo}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Works;
