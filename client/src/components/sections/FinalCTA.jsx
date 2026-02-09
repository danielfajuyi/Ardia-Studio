import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Button from "../ui/Button";
import { ArrowUpRight } from "lucide-react";

const FinalCTA = () => {
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
    <section className="py-32 bg-black relative flex items-center justify-center overflow-hidden perspective-1000">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10 perspective-1000">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          className="relative max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-24 text-center overflow-hidden shadow-2xl"
        >
          {/* Glossy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-white/80">
                Accepting New Projects
              </span>
            </div>

            <h2 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-tight">
              Ready to Shape <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                The Future?
              </span>
            </h2>

            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join industry leaders who are redefining their brand narrative
              with our cinematic AI-driven storytelling.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                variant="primary"
                className="text-lg px-12 py-5 rounded-full shadow-[0_0_40px_-10px_theme(colors.primary.DEFAULT)] hover:shadow-[0_0_60px_-10px_theme(colors.primary.DEFAULT)] transition-shadow duration-500"
              >
                Start Your Project <ArrowUpRight className="ml-2 w-5 h-5" />
              </Button>
              <button className="text-white hover:text-primary transition-colors text-lg font-medium underline decoration-white/30 underline-offset-8 decoration-1 hover:decoration-primary">
                View Pricing
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
