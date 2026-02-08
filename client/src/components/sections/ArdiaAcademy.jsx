import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Button from "../ui/Button";
import { ArrowUpRight, Sparkles, Video, DollarSign } from "lucide-react";
import { useRef } from "react";

const ArdiaAcademy = () => {
  const ref = useRef(null);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 50, damping: 10 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 10 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized position (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="py-32 bg-black relative overflow-hidden perspective-2000">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 flex justify-center">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full max-w-5xl rounded-[3rem] bg-zinc-900/50 border border-white/10 p-12 md:p-20 overflow-visible backdrop-blur-xl shadow-2xl group"
        >
          {/* Glass Highlight */}
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10"
            style={{ transform: "translateZ(50px)" }}
          >
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-bold tracking-wider uppercase"
              >
                <Sparkles size={16} />
                Ardia Academy
              </motion.div>

              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
                Master the <br />
                <span className="text-primary">Future of Video</span>
              </h2>

              <p className="text-xl text-gray-400 max-w-md leading-relaxed">
                Join our 3-Week Premium AI Video Creation Class. Learn
                cutting-edge tools, build a portfolio, and start earning.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
                <a
                  href="https://selar.co/76aib665o4"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    variant="primary"
                    className="px-6 py-3 w-full sm:w-auto"
                  >
                    Start Learning <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>

                <div className="text-left">
                  <div className="text-3xl font-bold text-white">₦30,000</div>
                  <div className="text-xs text-primary/80 uppercase tracking-widest font-bold mt-1">
                    Limited Time Offer
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Floating Elements */}
            <div
              className="relative h-[500px] flex items-center justify-center pointer-events-none"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Floating Badges */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ transform: "translateZ(300px)" }}
                className="absolute top-12 -right-2 bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl flex items-center gap-3 z-[100]"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
                  <Video size={16} />
                </div>
                <div className="z-10">
                  <div className="text-white font-bold text-xs">Create</div>
                  <div className="text-[10px] text-gray-500">Cinematic AI</div>
                </div>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 1.5 }}
                style={{ transform: "translateZ(250px)" }}
                className="absolute bottom-12 left-4 bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl flex items-center gap-3 z-[100]"
              >
                <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center text-green-500">
                  ₦
                </div>
                <div className="z-10">
                  <div className="text-white font-bold text-xs z-10">Earn</div>
                  <div className="text-[10px] text-gray-500 z-10">
                    Monetize Skills
                  </div>
                </div>
              </motion.div>

              {/* Main Visual */}
              <motion.div
                style={{ transform: "translateZ(50px)" }}
                className="w-80 h-[28rem] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl rotate-3 relative "
              >
                <img
                  src="https://files.selar.co/product-images/2025/products/nwasoribe/3-week-ai-video-content-m-selar.com-69134015d43a0.jpg"
                  alt="Course Cover"
                  className="w-full h-full object-cover"
                />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArdiaAcademy;
