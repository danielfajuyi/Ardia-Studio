import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Button from "./Button";
import BlurText from "./BlurText";
import ShinyText from "./ShinyText";
import ShinyText2 from "./ShinyText2";
import axios from "axios";
import ScrollLine from "./Scroll-Line";
import CloudinaryVideo from "./CloudinaryVideo";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [content, setContent] = useState({});
  const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/cms`);
        setContent(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContent();
  }, []);

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
        <CloudinaryVideo
          key={videos[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover opacity-80"
          src={videos[currentVideoIndex]}
        />
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
          {/* <ShinyText
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
          /> */}
          <p className=" #b5b5b5font-medium tracking-[0.2em] text-sm md:text-base uppercase mb-4">
            {content.hero?.subtitle || "The Future of Visuals"}
          </p>
        </motion.div>

        <div className="mb-20 mt-20 items-center justify-center flex flex-col ">
          <ShinyText2
            text={content.hero?.title || "ARDIA STUDIO"}
            speed={4}
            delay={0}
            color="rgba(255, 255, 255, 0)"
            shineColor="rgba(255, 255, 255, 1)"
            spread={120}
            direction="left"
            strokeWidth="1px"
            strokeColor="rgba(255, 255, 255, 0.6)"
            className="text-8xl md:text-10xl lg:text-[10rem] text-center font-bold tracking-tighter mb-2 text-transparent"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Button variant="primary" className="min-w-[160px]">
            {content.hero?.cta_text || "Watch Showreel"}
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
        <div
          id="hero-scroll-indicator"
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 tracking-widest uppercase">
            Scroll to Explore
          </span>
          {/* <ScrollLine /> */}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
