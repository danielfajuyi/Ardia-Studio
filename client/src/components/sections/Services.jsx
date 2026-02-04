import { motion } from "framer-motion";
import { Video, Zap, Globe, Cpu, Layers, Lock } from "lucide-react";

const services = [
  {
    icon: <Video className="w-6 h-6 text-primary" />,
    title: "AI Video Production & Editing",
    description:
      "End-to-end video production using generative AI and expert human editing. We handle everything from concept to final cut, ensuring cinematic quality and brand consistency.",
    colSpan: "md:col-span-2",
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: " AI Video Storytelling: ",
    description: "Ultra-fast processing for immediate creative feedback.",
    colSpan: "md:col-span-1",
  },
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "AI avatar and concept development",
    description:
      "Strong ideas are the backbone of any great campaign. We help you develop compelling concepts via our AI-led concept service, shaping fresh directions and refining existing work, utilizing AI pre-visualization, storyboarding and mood films to identify creative angles. We offer support with every step of this campaign and ideation process, ensuring buy-in with stakeholders before production starts.",
    colSpan: "md:col-span-1",
  },
  {
    icon: <Cpu className="w-6 h-6 text-primary" />,
    title: "AI social media video production",
    description:
      "Give your audience a reason to stop scrolling with platform-centric AI social media video content. Covering everything from TikTok videos to Instagram Reels to YouTube Shorts, we create content that super-hooks your intended audience. Our generative video capabilities and future-proof AI editing work mean we create next-level content for social media that is built to perform.",
    colSpan: "md:col-span-2",
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Designed for impact.
          </h2>
          <p className="text-xl text-gray-400">
            Our infrastructure is built on the world's most advanced neural
            networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={`${service.colSpan} p-8 rounded-[2rem] bg-secondary border border-white/5 hover:border-primary/30 transition-all duration-300 relative group overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px]">
                <div className="bg-background/50 w-12 h-12 rounded-full flex items-center justify-center border border-white/10 mb-6 group-hover:bg-primary transition-colors duration-300">
                  <div className="group-hover:text-black transition-colors duration-300">
                    {service.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-medium text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
