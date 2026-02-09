import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

      {/* The Origin Story */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <AnimatedText
                text="From Curiosity To Innovation."
                className="text-5xl md:text-7xl font-bold leading-tight"
              />
              <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                <p>
                  Ardai Studios was born at the intersection of curiosity and a
                  bold vision for the future. After seeing how artificial
                  intelligence was reshaping global creativity, our founder,
                  <span className="text-white font-medium"> Stella Soribe</span>
                  , embarked on a journey of experimentation.
                </p>
                <p>
                  What began as a personal quest to master AI video production
                  quickly evolved into a movement. Together with co-founder{" "}
                  <span className="text-white font-medium">Efe Edjowha</span>,
                  Stella founded Ardai Studios—one of Africa’s first AI-driven
                  production agencies.
                </p>
                <p>
                  Today, we are a collective of futurists, artists, and
                  engineers, united by a single mission: to build the future of
                  visual storytelling.
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/5] md:aspect-square">
              <motion.div
                style={{ y }}
                className="w-full h-full rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10" />
                {/* Placeholder for abstract or team collage */}
                <div className="w-full h-full flex items-center justify-center text-zinc-800 text-9xl font-bold opacity-20">
                  ARDAI
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full animate-spin-slow" />
                <div className="absolute bottom-20 left-10 w-32 h-32 border border-primary/20 rounded-full animate-float" />
              </motion.div>
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

      {/* Team Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-bold mb-4">The Minds</h2>
              <p className="text-gray-400 text-xl">Behind the machines.</p>
            </div>
            <div className="h-px bg-white/10 flex-grow ml-12 hidden md:block" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            <TeamMember
              name="Stella Soribe"
              role="Founder & Creative Director"
              img="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop" // Placeholder
              delay={0.1}
            />
            <TeamMember
              name="Efe Edjowha"
              role="Co-Founder & Head of Ops"
              img="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1975&auto=format&fit=crop" // Placeholder
              delay={0.2}
            />
            {/* Add more members as needed */}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
};

export default About;
