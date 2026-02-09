import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import Footer from "../../components/ui/Footer";
import FinalCTA from "../../components/sections/FinalCTA";
import { ArrowDown } from "lucide-react";

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
      viewport={{ once: true }}
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

const TeamMember = ({ name, role, img, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-6">
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
        />
      </div>
      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
        {name}
      </h3>
      <p className="text-gray-400 font-mono text-sm tracking-wider uppercase">
        {role}
      </p>
    </motion.div>
  );
};

const ValueCard = ({ title, desc, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 group"
    >
      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
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

      <motion.img
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
          <p className="text-white font-bold text-lg">Visionary</p>
          <p className="text-xs text-secondary-300">Est. 2024</p>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full animate-spin-slow z-20 mix-blend-difference pointer-events-none" />
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main
      ref={containerRef}
      className="bg-black min-h-screen text-white overflow-hidden"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
          {/* Abstract animated background can go here */}
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] animate-pulse opacity-50" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse opacity-30" />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8 inline-block"
          >
            <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium tracking-wider uppercase text-gray-300">
              Est. 2024
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]">
            <AnimatedText text="We Are" className="justify-center" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white inline-block">
              Ardai Studios.
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Redefining the boundaries of digital storytelling through the lens
            of artificial intelligence and human creativity.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-gray-500"
        >
          <span className="text-xs tracking-widest uppercase">
            Scroll to Explore
          </span>
          <ArrowDown className="animate-bounce" />
        </motion.div>
      </section>

      {/* The Origin Story - Revamped */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            {/* Sticky Image Section */}
            <div className="lg:w-1/2 lg:sticky lg:top-32 order-2 lg:order-1">
              <OriginImage />
            </div>

            {/* Scrollable Text Section */}
            <div className="lg:w-1/2 space-y-12 order-1 lg:order-2">
              <AnimatedText
                text="About Ardai Studios"
                className="text-5xl md:text-7xl font-bold leading-tight mb-8"
              />

              <div className="space-y-8 text-lg text-gray-300 leading-relaxed font-light">
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ margin: "-100px" }}
                >
                  AI has always intrigued me. You know how they say curiosity
                  kills the cat? Well, they never finish the sentence:{" "}
                  <span className="text-white italic font-medium highlight-text">
                    curiosity killed the cat, but satisfaction brought it back.
                  </span>
                  That’s exactly what happened to me.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ margin: "-100px" }}
                >
                  I saw how Artificial Intelligence was quietly reshaping the
                  world, how people in other parts of the globe were using it to
                  create, innovate, and live differently. Having been connected
                  with friends and creators in first-world countries, I saw
                  firsthand just how far they had gone with AI, especially in
                  video.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ margin: "-100px" }}
                >
                  So I got curious. I started learning, experimenting, failing,
                  and trying again. For months, I studied AI video production,
                  not because it was trendy, but because I wanted to understand
                  how technology could empower creativity. Then I started
                  sharing my journey.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ margin: "-100px" }}
                >
                  Surprisingly, people paid attention. They loved the results.
                  And soon, they began asking for my services. What began as a
                  personal experiment evolved into something much bigger, a
                  vision. With the support of my co-founder,{" "}
                  <span className="text-white font-medium">Efe Edjowha</span>,
                  we decided to build something that could shape the future of
                  storytelling on the continent.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ margin: "-100px" }}
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
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ margin: "-100px" }}
                >
                  At Ardai, we blend human imagination with artificial
                  intelligence to help brands, creators, and storytellers move
                  from concept to campaign, faster, smarter, better. So if
                  you’ve got a vision worth sharing, let’s bring it to life.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-white font-medium mt-8 text-2xl"
                >
                  The future of storytelling starts here, at Ardai Studios.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-12 pt-8 border-t border-white/10"
                >
                  <p className="font-handwriting text-3xl rotate-[-2deg] text-primary">
                    Stella Soribe
                  </p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest mt-2">
                    The Audacious Founder
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 border-t border-white/5 bg-zinc-950/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              Our Philosophy
            </span>
            <h2 className="text-4xl md:text-6xl font-bold">
              Built on <span className="text-gray-500">First Principles.</span>
            </h2>
          </div>

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

      <FinalCTA />
      <Footer />
    </main>
  );
};

export default About;
