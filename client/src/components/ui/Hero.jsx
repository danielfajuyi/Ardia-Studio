import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Button from "./Button";
import BlurText from "./BlurText";
import ShinyText from "./ShinyText";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos = [
    "/asset/asakeOge.mp4",
    "/asset/proposal.mp4",
    "/asset/Ikigai.mp4",
    "/asset/Dear Ma Li An (黎安)_.mp4",
  ];

  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[120vh] flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Cinematic Video Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <div className="absolute inset-0 bg-black/30 z-10" />{" "}
        {/* Overlay for text readability */}
        <video
          key={videos[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover opacity-80"
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-30 container mx-auto px-6 text-center mt-[-10vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <ShinyText
            text="  The Future of Visuals"
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </motion.div>

        <div className="mb-20 mt-20 items-center justify-center flex flex-col ">
          <p className="text-9xl md:text-8xl text-center font-semibold tracking-tight text-white mb-2">
            ARDIA STUDIO
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Button variant="primary" className="min-w-[160px]">
            Watch Showreel
          </Button>
          <Button variant="secondary" className="min-w-[160px]">
            Explore Academy
          </Button>
        </motion.div>
      </div>

      {/* Floating Elements (Apple Style) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-32 left-0 w-full flex justify-center z-30"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 tracking-widest uppercase">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
