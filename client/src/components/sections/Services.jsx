import { motion } from 'framer-motion';
import { Video, Zap, Globe, Cpu, Layers, Lock } from 'lucide-react';

const services = [
  {
    icon: <Video className="w-6 h-6 text-primary" />,
    title: "AI Video Production",
    description: "End-to-end video creation using state-of-the-art Generative AI models.",
    colSpan: "md:col-span-2",
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Real-time Rendering",
    description: "Ultra-fast processing for immediate creative feedback.",
    colSpan: "md:col-span-1",
  },
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "Global CDN",
    description: "Content delivery at the speed of light, anywhere.",
    colSpan: "md:col-span-1",
  },
  {
    icon: <Cpu className="w-6 h-6 text-primary" />,
    title: "Neural Upscaling",
    description: "Transforming standard footage into 4K/8K masterpieces.",
    colSpan: "md:col-span-2",
  }
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
             Our infrastructure is built on the world's most advanced neural networks.
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
                   <h3 className="text-2xl font-medium text-white mb-2">{service.title}</h3>
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
