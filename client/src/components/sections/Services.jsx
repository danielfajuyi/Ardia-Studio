import React from 'react';
import { motion } from 'framer-motion';
import { Video, Zap, Cpu, Search } from 'lucide-react';

const services = [
  {
    icon: <Video className="w-8 h-8 text-purple-400" />,
    title: "AI Video Production",
    description: "End-to-end video creation using state-of-the-art Generative AI models."
  },
  {
    icon: <Zap className="w-8 h-8 text-cyan-400" />,
    title: "Automated Shorts",
    description: "Scale your social presence with high-quality, AI-generated short-form content."
  },
  {
    icon: <Cpu className="w-8 h-8 text-pink-400" />,
    title: "Custom AI Avatars",
    description: "Lifelike digital avatars for corporate training, support, and branding."
  },
  {
    icon: <Search className="w-8 h-8 text-blue-400" />,
    title: "Visual R&D",
    description: "Consulting on the latest AI visual tools and workflows for your business."
  }
];

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 group"
    >
      <div className="mb-6 p-4 rounded-full bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
        {service.icon}
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors">{service.title}</h3>
      <p className="text-gray-400 leading-relaxed">{service.description}</p>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section className="py-20 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Our Expertise
          </h2>
          <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
