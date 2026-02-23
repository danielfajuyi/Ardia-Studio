import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import Footer from "../../components/ui/Footer";
import FinalCTA from "../../components/sections/FinalCTA";
import {
  ArrowDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
  Maximize,
} from "lucide-react";
import ArdiaAcademy from "../../components/sections/ArdiaAcademy";
import CloudinaryImage from "../../components/ui/CloudinaryImage";
import CloudinaryVideo from "../../components/ui/CloudinaryVideo";

/**
 * Reusable animated text component
 */
const AnimatedText = ({ text, className }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const ScrollReveal = ({ children, className, x = 20, y = 0, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ margin: "-50px", once: false }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ValueCard = ({ title, desc, icon, index }) => {
  return (
    <ScrollReveal
      x={0}
      y={30}
      delay={index * 0.1}
      className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 group"
    >
      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </ScrollReveal>
  );
};

const OriginImage = () => {
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

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      className="relative w-full aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 group perspective-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />

      <CloudinaryImage
        src="/asset/Picture1.jpgsDCAfcds.jpg"
        alt="Ardai Studios Vision"
        style={{ transform: "translateZ(20px) scale(1.1)" }}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Interactive Floating Elements */}
      <motion.div
        style={{ transform: "translateZ(60px)" }}
        className="absolute bottom-10 left-10 z-20"
      >
        <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl">
          <p className="text-white font-bold text-lg">Soribe Stella</p>
          <p className="text-xs text-secondary-300">Founder</p>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full animate-spin-slow z-20 mix-blend-difference pointer-events-none" />
    </motion.div>
  );
};

const OriginVideo = () => {
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
  const [isMuted, setIsMuted] = useState(true);
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
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      // Optionally loop automatically or wait for user?
      // User requested controls and play button.
      // FeaturedVideo loops automatically to next slide.
      // Single video: let's stop at end like standard player, or loop?
      // FeaturedVideo `video` tag doesn't have `loop` attribute, it manages loop manually.
      // I'll add `loop` to video tag for auto-looping simplicity if autoplay is desired,
      // BUT user wanted "press play button before it plays".
      // So NO autoplay. And standard end behavior.
    }
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onClick={togglePlay}
      className="relative w-full aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 group perspective-1000 cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60 pointer-events-none" />

      <CloudinaryVideo
        ref={videoRef}
        src="/asset/Ikigai.mp4"
        className="w-full h-full object-cover"
        muted={isMuted}
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
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Overlay (Visible when playing) */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 left-6 right-6 z-40 flex items-center justify-between gap-4"
            onClick={(e) => e.stopPropagation()} // Prevent card click (togglePlay) when clicking controls
          >
            {/* Play/Pause */}
            <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-2 flex items-center">
              <button
                onClick={togglePlay}
                className="hover:scale-110 transition-transform"
              >
                <Pause className="w-5 h-5 text-white fill-white" />
              </button>
            </div>

            {/* Progress & Time */}
            <div className="flex-1 bg-black/60 backdrop-blur-md rounded-full px-6 py-2 flex items-center gap-4">
              <button
                onClick={(e) => handleSeek(e, -10)}
                className="hover:text-white text-white/70 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-xs font-mono text-white min-w-[80px] text-center">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <button
                onClick={(e) => handleSeek(e, 10)}
                className="hover:text-white text-white/70 transition-colors"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* Volume & Options */}
            <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-3">
              <button
                onClick={toggleMute}
                className="hover:scale-110 transition-transform"
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

      {/* Title (Visible when paused) */}
      {!isPlaying && (
        <motion.div
          style={{ transform: "translateZ(60px)" }}
          className="absolute bottom-10 left-10 z-20 pointer-events-none"
        >
          <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl">
            <p className="text-white font-bold text-lg">Ikigai</p>
            <p className="text-xs text-secondary-300">Featured Work</p>
          </div>
        </motion.div>
      )}

      {/* Decorative Elements (keep them) */}
      <div className="absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full animate-spin-slow z-20 mix-blend-difference pointer-events-none" />
    </motion.div>
  );
};

const AboutHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set((clientX - centerX) / 40); // dampen for subtle effect
    mouseY.set((clientY - centerY) / 40);
  };

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const textX = useTransform(springX, (value) => value * -2);
  const textY = useTransform(springY, (value) => value * -2);

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black perspective-1000"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black" />
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-pulse" />
        <div
          className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating Particles/Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          style={{ x: springX, y: springY }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 inline-block"
          >
            <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium tracking-widest uppercase text-gray-400 shadow-2xl">
              Est. 2024
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.85] perspective-500">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2,
                }}
              >
                We Are
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                style={{ x: textX, y: textY }}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3,
                }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-400 inline-block transform-gpu"
              >
                Ardai Studios.
              </motion.div>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Redefining the boundaries of digital storytelling through the lens
            of artificial intelligence and human creativity.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-gray-600 mix-blend-screen"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-60">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 opacity-60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const containerRef = useRef(null);

  return (
    <main
      ref={containerRef}
      className="bg-black min-h-screen text-white overflow-hidden"
    >
      <AboutHero />

      {/* The Origin Story - Revamped */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            {/* Sticky Image & Video Section */}
            <div className="lg:w-1/2 lg:sticky lg:top-32 order-2 lg:order-1 space-y-8">
              <OriginImage />
              <OriginVideo />
            </div>

            {/* Scrollable Text Section */}
            <div className="lg:w-1/2 space-y-12 order-1 lg:order-2">
              <AnimatedText
                text="About Ardai Studios"
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
              />

              <div className="space-y-8 text-lg text-gray-300 leading-relaxed font-light">
                <ScrollReveal>
                  AI has always intrigued me. You know how they say curiosity
                  kills the cat? Well, they never finish the sentence:{" "}
                  <span className="text-white italic font-medium highlight-text">
                    curiosity killed the cat, but satisfaction brought it back.
                  </span>
                  That’s exactly what happened to me.
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  I saw how Artificial Intelligence was quietly reshaping the
                  world, how people in other parts of the globe were using it to
                  create, innovate, and live differently. Having been connected
                  with friends and creators in first-world countries, I saw
                  firsthand just how far they had gone with AI, especially in
                  video.
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  So I got curious. I started learning, experimenting, failing,
                  and trying again. For months, I studied AI video production,
                  not because it was trendy, but because I wanted to understand
                  how technology could empower creativity. Then I started
                  sharing my journey.
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                  Surprisingly, people paid attention. They loved the results.
                  And soon, they began asking for my services. What began as a
                  personal experiment evolved into something much bigger, a
                  vision. With the support of my co-founder,{" "}
                  <span className="text-white font-medium">Efe Edjowha</span>,
                  we decided to build something that could shape the future of
                  storytelling on the continent.
                </ScrollReveal>
                <ScrollReveal
                  delay={0.4} // scale animation mimicking specific card style?
                  className="p-8 border border-primary/20 bg-primary/5 rounded-2xl backdrop-blur-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <h4 className="text-white font-bold text-2xl mb-4">
                    Our Goal Is Simple:
                  </h4>
                  <p className="italic text-gray-300 text-xl font-serif">
                    "To make video production seamless, where imagination meets
                    acceleration. Because creativity shouldn’t be slowed down by
                    process. And innovation shouldn’t feel out of reach."
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.5}>
                  At Ardai, we blend human imagination with artificial
                  intelligence to help brands, creators, and storytellers move
                  from concept to campaign, faster, smarter, better. So if
                  you’ve got a vision worth sharing, let’s bring it to life.
                </ScrollReveal>
                <ScrollReveal
                  delay={0.6}
                  className="text-white font-medium mt-8 text-2xl"
                >
                  The future of storytelling starts here, at Ardai Studios.
                </ScrollReveal>
                <ScrollReveal
                  delay={0.7}
                  y={20}
                  className="mt-12 pt-8 border-t border-white/10"
                >
                  <p className="font-handwriting text-3xl rotate-[-2deg] text-primary">
                    Stella Soribe
                  </p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest mt-2">
                    The Audacious Founder
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 border-t border-white/5 bg-zinc-950/50">
        <div className="container mx-auto px-6">
          <ScrollReveal y={30} className="text-center mb-20">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              Our Philosophy
            </span>
            <h2 className="text-4xl md:text-6xl font-bold">
              Built on <span className="text-gray-500">First Principles.</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              index={0}
              icon="🔮"
              title="Curiosity"
              desc="We ask 'what if' before we ask 'how'. Curiosity is the engine that drives our exploration of new frontiers."
            />
            <ValueCard
              index={1}
              icon="⚡"
              title="Velocity"
              desc="In the age of AI, speed is a creative tool. We iterate fast, fail forward, and deliver polished work at record pace."
            />
            <ValueCard
              index={2}
              icon="💎"
              title="Excellence"
              desc="We don't just use tools; we master them. Quality is non-negotiable, and we sweat the details others ignore."
            />
          </div>
        </div>
      </section>

      <ScrollReveal className="pb-20">
        <ArdiaAcademy />
        <FinalCTA />
      </ScrollReveal>
      <Footer />
    </main>
  );
};

export default About;
