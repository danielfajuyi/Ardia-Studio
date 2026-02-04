import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <section className="py-32 bg-black flex items-center justify-center relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <h4
              id="trust-text"
              className="text-primary font-bold tracking-widest uppercase text-sm mb-12"
            >
              The Trust
            </h4>
          </div>

          <h3 className="text-2xl md:text-4xl font-serif italic text-gray-200 leading-relaxed mb-8">
            "Ardai Studios transformed our vision into a stunning campaign in
            record time. They are truly pioneers in this space."
          </h3>

          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-10 bg-gray-700 rounded-full" />{" "}
            {/* Placeholder for avatar */}
            <div className="text-left">
              <div className="text-white font-bold">Client Name</div>
              <div className="text-sm text-gray-500">Brand / Company</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
