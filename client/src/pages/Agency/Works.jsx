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
} from "lucide-react";

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
        title: "Asake Oge",
        src: "/asset/video/ai-social-media-videos/asakeOge.mp4",
      },
      {
        title: "Ralph Lauren",
        src: "/asset/video/ai-social-media-videos/Ralph Lauren_.mp4",
      },
      {
        title: "Retrofit",
        src: "/asset/video/ai-social-media-videos/Retrofit.mp4",
      },
      {
        title: "Model 1",
        src: "/asset/video/ai-social-media-videos/Model 1.mp4",
      },
      {
        title: "Model 2",
        src: "/asset/video/ai-social-media-videos/model 2.mp4",
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
    videos: [{ title: "GRWM", src: "/asset/video/ai-tutorials/GRWM_.mp4" }],
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
      className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black perspective-1000"
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

const VideoCard = ({ video }) => {
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

  // Video State
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted like FeaturedVideo? Or unmuted? Featured is often muted autoplay. User said "all video features".
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

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
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onClick={togglePlay}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative w-full aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 group perspective-1000 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-shadow"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 transition-opacity duration-500 ${isPlaying ? "opacity-40" : "opacity-80"}`}
      />

      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-cover"
        muted={isMuted} // Start muted? User didn't specify, but safer for autoplay or initial click.
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
      />

      {/* Play Button Overlay (Visible when paused) */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center z-30"
          >
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Overlay (Visible when playing) */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 right-4 z-40 flex items-center justify-between gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={togglePlay}
              className="p-2 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
            >
              <Pause className="w-4 h-4 text-white fill-white" />
            </button>

            <div className="flex-1 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-3">
              <span className="text-[10px] font-mono text-white/80 w-8 text-right">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-white/80 w-8">
                {formatTime(duration)}
              </span>
            </div>

            <button
              onClick={toggleMute}
              className="p-2 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title Badge (Visible always, maybe fade out on play if preferred, keeping visible for context) */}
      <motion.div
        className="absolute top-4 left-4 z-20"
        animate={{ opacity: isPlaying ? 0 : 1 }}
      >
        <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
          <span className="text-white font-medium text-sm">{video.title}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Works = () => {
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
                <VideoCard key={vIndex} video={video} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Works;
