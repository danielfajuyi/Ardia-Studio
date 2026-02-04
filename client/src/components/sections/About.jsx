import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects for floating elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotateOrbits = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // 3D Tilt Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
    mouseX.set(x);
    mouseY.set(y);
  };

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), {
    stiffness: 100,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), {
    stiffness: 100,
    damping: 30,
  });

  // Dynamic gradient background based on mouse
  const background = useMotionTemplate`radial-gradient(circle at ${useTransform(mouseX, [-1, 1], ["0%", "100%"])} ${useTransform(mouseY, [-1, 1], ["0%", "100%"])}, rgba(59, 130, 246, 0.15), transparent 50%)`;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-24 perspective-1000"
      style={{ perspective: "1000px" }}
    >
      {/* Background Interactive Gradient */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background }}
      />

      {/* 3D Orbiting Rings (Decorative) */}
      <motion.div
        style={{ rotate: rotateOrbits, scale: 1.5 }}
        className="absolute z-0 w-[600px] h-[600px] border border-white/5 rounded-full"
      />
      <motion.div
        style={{ rotate: rotateOrbits, scale: 1.2, rotateY: 45 }}
        className="absolute z-0 w-[500px] h-[500px] border border-indigo-500/10 rounded-full"
      />

      {/* Main Content Container with 3D Tilt */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 container mx-auto px-6 max-w-5xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, z: 50 }}
              whileInView={{ opacity: 1, z: 0 }}
              transition={{ duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <h4 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm">
                Our Origin
              </h4>
              <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                From Curiosity <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
                  To Innovation.
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(30px)",
              }}
              className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                Ardai Studios was born at the intersection of curiosity and a
                bold vision for the future. After seeing how artificial
                intelligence was reshaping global creativity, our founder,
                <span className="text-white font-semibold"> Stella Soribe</span>
                , embarked on a months-long journey of experimentation and
                learning.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mt-4">
                What began as a personal quest to master AI video production
                quickly evolved into a movement. Together with co-founder{" "}
                <span className="text-white font-semibold">Efe Edjowha</span>,
                Stella founded Ardai Studios—one of Africa’s first AI-driven
                production agencies.
              </p>
            </motion.div>
          </div>

          {/* Right: Abstract 3D Visuals */}
          <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
            {/* Floating Images / Cards */}
            <motion.div
              style={{ y: y1, rotate: -12, z: 20 }}
              className="absolute w-48 h-64 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-2xl opacity-40 top-10 left-10"
            />

            <motion.div
              style={{ y: y2, z: 50 }}
              className="relative w-64 h-80 bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col items-center justify-center overflow-hidden group"
            >
              <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors" />
              <div className="text-6xl mb-4">✨</div>
              <div className="text-white font-bold text-xl">Curiosity</div>
              <div className="text-xs text-gray-500 mt-2 uppercase tracking-wider">
                The Spark
              </div>
            </motion.div>

            <motion.div
              style={{ y: y1, z: 30, rotate: 15 }}
              className="absolute top-20 right-10 w-56 h-72 bg-zinc-800 border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col items-center justify-center"
            >
              <div className="text-6xl mb-4">🚀</div>
              <div className="text-white font-bold text-xl">Innovation</div>
              <div className="text-xs text-gray-500 mt-2 uppercase tracking-wider">
                The Future
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
