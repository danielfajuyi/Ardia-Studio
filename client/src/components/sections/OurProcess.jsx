import { motion } from "framer-motion";

const Step = ({ number, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true, margin: "-50px" }}
    className="flex gap-8 relative pb-20 last:pb-0"
  >
    {/* Line connector */}
    <div className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-white/10 last:hidden" />

    <div className="relative shrink-0 w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center bg-black z-10">
      <span className="text-sm font-bold text-primary">{number}</span>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const OurProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Vision & Strategy",
      description: "We align on your goals and the story you want to tell.",
    },
    {
      number: "02",
      title: "AI-Powered Concepting",
      description: "Rapid storyboarding and visual style development.",
    },
    {
      number: "03",
      title: "Intelligent Production",
      description: "Blending AI generation with expert creative direction.",
    },
    {
      number: "04",
      title: "Refinement & Delivery",
      description:
        "Fine-tuning every frame for a cinematic, professional finish.",
    },
  ];

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="sticky top-32 h-fit">
          <h4
            id="process-text"
            className="text-primary font-bold tracking-widest uppercase mb-4 text-sm"
          >
            The How-To
          </h4>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Our Process
          </h2>
          <p className="text-gray-400 text-lg max-w-md">
            We seamlessly blend human creativity with AI efficiency to deliver
            results faster.
          </p>
        </div>

        <div className="flex flex-col">
          {steps.map((step, index) => (
            <Step key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
