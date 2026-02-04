import { motion } from "framer-motion";
import { Zap, Globe, Gauge, Infinity as InfinityIcon } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl hover:bg-zinc-800/50 transition-colors"
  >
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const WhyChooseUs = () => {
  const features = [
    {
      icon: Zap,
      title: "Pioneering Tech",
      description:
        "We use world-class AI models to deliver visuals that were previously impossible or too expensive to produce.",
    },
    {
      icon: Globe,
      title: "Cultural Authenticity",
      description:
        "We tell African stories with a global standard. We understand the nuances that make content resonate locally.",
    },
    {
      icon: Gauge,
      title: "Unmatched Speed",
      description:
        "We’ve eliminated the bottlenecks. What used to take months now takes weeks, without sacrificing quality.",
    },
    {
      icon: InfinityIcon,
      title: "Limitless Scale",
      description:
        "No location is out of reach and no concept is 'too big.' If you can imagine it, we can build it.",
    },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <motion.h4
            id="value-text"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-primary font-bold tracking-widest uppercase mb-4 text-sm"
          >
            The Value
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            The Ardai Edge.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
