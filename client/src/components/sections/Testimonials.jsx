import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "Ardai Studios transformed our vision into a stunning campaign in record time. They are truly pioneers in this space.",
    name: "Elena Rodriguez",
    role: "CMO, Solaris Tech",
  },
  {
    text: "The AI-driven workflow they use is unlike anything I've seen. The efficiency and quality are simply unmatched.",
    name: "Marcus Chen",
    role: "Director, Nexus Media",
  },
  {
    text: "From concept to final delivery, the process was seamless. The final video assets blew our engagement metrics out of the water.",
    name: "Sarah Johnson",
    role: "Brand Lead, Aurora Core",
  },
  {
    text: "They don't just make videos; they craft digital experiences. The visual fidelity and creativity are next level.",
    name: "David Okafor",
    role: "Founder, Zenith X",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const getCardStyle = (index) => {
    const diff =
      (index - activeIndex + testimonials.length) % testimonials.length;

    // Active card
    if (diff === 0) {
      return {
        zIndex: 20,
        x: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
      };
    }

    // Next card (right)
    if (diff === 1) {
      return {
        zIndex: 10,
        x: 60, // Reduced overlap
        scale: 0.85,
        opacity: 0.5,
        filter: "blur(2px)",
      };
    }

    // Previous card (left)
    if (diff === testimonials.length - 1) {
      return {
        zIndex: 10,
        x: -60, // Reduced overlap
        scale: 0.85,
        opacity: 0.5,
        filter: "blur(2px)",
      };
    }

    // Hidden cards (behind)
    return {
      zIndex: 0,
      x: 0,
      scale: 0.6,
      opacity: 0,
      filter: "blur(10px)",
    };
  };

  return (
    <section className="py-32 bg-black flex flex-col items-center justify-center relative overflow-hidden min-h-[800px]">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-bold tracking-widest uppercase text-sm mb-16"
        >
          Testimonials
        </motion.h4>

        <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center perspective-1000">
          <AnimatePresence mode="popLayout">
            {testimonials.map((testimonial, index) => {
              const style = getCardStyle(index);
              // Only render active, next, and previous for performance/visual cleanliness if list is long,
              // but with 4 items, all are "relevant" but 1 is hidden behind.

              return (
                <motion.div
                  key={index}
                  initial={false} // Let it animate from the current state rather than initial mount state
                  animate={{
                    zIndex: style.zIndex,
                    x: `${style.x}%`, // Use percentage for responsiveness
                    scale: style.scale,
                    opacity: style.opacity,
                    filter: style.filter,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="absolute p-8 md:p-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center text-center max-w-2xl w-full mx-4"
                  style={{ transformOrigin: "center center" }}
                >
                  <Quote className="w-12 h-12 text-primary/50 mb-6" />

                  <h3 className="text-xl md:text-3xl font-serif italic text-gray-200 leading-relaxed mb-8">
                    "{testimonial.text}"
                  </h3>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-primary font-bold text-lg mb-2">
                      {testimonial.name[0]}
                    </div>
                    <div className="text-white font-bold text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-primary uppercase tracking-wider font-medium">
                      {testimonial.role}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mt-12 z-20">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 text-white transition-all group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:text-primary transition-colors" />
          </button>

          <div className="flex gap-2 items-center">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 bg-primary" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 text-white transition-all group"
          >
            <ChevronRight className="w-6 h-6 group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
