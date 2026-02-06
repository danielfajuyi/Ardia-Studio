import { motion } from "framer-motion";
import Button from "../ui/Button";

const FinalCTA = () => {
  return (
    <section className="py-32 bg-black relative flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/5">
      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-blue-900/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <h4
          id="close-text"
          className="text-primary font-bold tracking-widest uppercase mb-6 text-sm"
        >
          The Close
        </h4>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter"
        >
          Ready to Make <br /> History?
        </motion.h2>

        <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
          The future of storytelling starts here. Let’s bring your vision to
          life.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button variant="secondary" className="text-lg px-12 py-4">
            Work With Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
