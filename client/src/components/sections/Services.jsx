import { motion } from "framer-motion";
import { Video, PenTool, Tv, MonitorPlay } from "lucide-react";

const ServiceItem = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative border-t border-white/10 py-12 flex flex-col md:flex-row md:items-start gap-6 hover:bg-white/5 transition-colors px-6 rounded-xl"
  >
    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
      <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed max-w-2xl">{description}</p>
    </div>
  </motion.div>
);

const Services = () => {
  const services = [
    {
      icon: Video,
      title: "AI Video Production",
      description:
        "High-end cinematic commercials and brand films driven by AI.",
    },
    {
      icon: PenTool,
      title: "Concept-to-Campaign Strategy",
      description:
        "We take your raw ideas and build a full visual roadmap and strategy.",
    },
    {
      icon: Tv,
      title: "Rapid Prototyping & VFX",
      description:
        "Hyper-realistic previews and visual effects to test ideas before full execution.",
    },
    {
      icon: MonitorPlay,
      title: "Digital Content for Brands",
      description:
        "Bespoke AI-generated content tailored for social impact and digital growth.",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h4
            id="offer-text"
            className="text-primary font-bold tracking-widest uppercase mb-4 text-sm"
          >
            The Offer
          </h4>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Our Services
          </h2>
        </div>

        <div className="flex flex-col">
          {services.map((service, index) => (
            <ServiceItem key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
