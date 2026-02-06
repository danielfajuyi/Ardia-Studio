import { motion, useScroll, useTransform } from "framer-motion";
import Button from "../ui/Button";
import { useRef } from "react";

const ArdiaAcademy = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={ref}
      className="py-24 bg-background relative border-t border-white/5"
    >
      <div className="container mx-auto px-6">
        <div className="rounded-[2.5rem] bg-[#111] overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Content */}
            <div className="p-12 md:p-16 flex flex-col justify-center relative z-10">
              <motion.span
                id="academy-text"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-primary font-bold tracking-widest uppercase text-sm mb-4"
              >
                Ardia Academy
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6 leading-[0.9]"
              >
                Create. Learn. <br />
                Earn, with <br />
                <span className="text-gray-500">AI Video.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-400 mb-8 max-w-md"
              >
                Join our 3-Week Premium AI Video Creation Class. Learn
                cutting-edge tools, build a creative portfolio, and start
                getting paid for your skills.
              </motion.p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a href="https://selar.co/76aib665o4">
                  <Button
                    variant="primary"
                    className="w-full sm:w-auto text-lg px-8"
                  >
                    Register Now
                  </Button>
                </a>

                <div className="text-left">
                  <div className="text-2xl font-bold text-white">₦30,000</div>
                  <div className="text-sm text-primary uppercase tracking-wider font-bold">
                    Three weekends only
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image/Graphic */}
            <div className="relative h-[400px] lg:h-auto overflow-hidden">
              <motion.div
                style={{ y }}
                className="absolute inset-0 bg-[url('https://files.selar.co/product-images/2025/products/nwasoribe/3-week-ai-video-content-m-selar.com-69134015d43a0.jpg')] bg-cover bg-center h-[120%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArdiaAcademy;
