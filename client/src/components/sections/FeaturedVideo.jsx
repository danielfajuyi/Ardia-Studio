import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

const highlights = [
  {
    id: 1,
    title: "Cinematic AI",
    category: "Short Film",
    video: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4",
    description: "Generative storytelling at scale."
  },
  {
    id: 2,
    title: "Commercials",
    category: "Brand ID",
    video: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-186-large.mp4",
    description: "High-impact visual identity."
  },
  {
    id: 3,
    title: "Music Video",
    category: "Production",
    video: "https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4",
    description: "Rhythm meets neural networks."
  }
];

const FeaturedVideo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    // Play active video, pause others
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeTab) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeTab]);

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-12 flex items-end justify-between">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
          Get the highlights.
        </h2>
        
        {/* Apple-style Custom Pagination */}
        <div className="hidden md:flex items-center gap-4">
           {highlights.map((_, index) => (
             <button
               key={index}
               onClick={() => setActiveTab(index)}
               className="group relative flex items-center justify-center p-2 focus:outline-none"
             >
               <div 
                 className={`h-2 rounded-full transition-all duration-500 ease-out ${
                   activeTab === index ? "w-8 bg-white" : "w-2 bg-white/30 group-hover:bg-white/50"
                 }`} 
               />
             </button>
           ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full h-[60vh] md:h-[80vh] pl-6 md:pl-[max(2rem,calc((100vw-1200px)/2))]">
        <motion.div 
          className="flex gap-6 h-full"
          animate={{ x: `-${activeTab * 80}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {highlights.map((item, index) => (
            <motion.div 
              key={item.id}
              className={`relative min-w-[90vw] md:min-w-[70vw] h-full rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${
                activeTab === index ? "opacity-100 scale-100" : "opacity-40 scale-95"
              }`}
              onClick={() => setActiveTab(index)}
            >
              <video
                ref={el => videoRefs.current[index] = el}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                poster="https://via.placeholder.com/1920x1080/1a1a1a/1a1a1a" // Fallback
              >
                <source src={item.video} type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              
              <motion.div 
                className="absolute bottom-10 left-10"
                initial={false}
                animate={{ opacity: activeTab === index ? 1 : 0, y: activeTab === index ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                 <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">
                   {item.category}
                 </span>
                 <h3 className="text-4xl font-bold mb-2">{item.title}</h3>
                 <p className="text-lg text-gray-300 flex items-center gap-2">
                   {item.description} <Play className="w-4 h-4 fill-white" />
                 </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile Pagination Control */}
      <div className="flex md:hidden justify-center items-center gap-2 mt-8">
        {highlights.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeTab === index ? "w-8 bg-white" : "w-2 bg-white/30"
            }`} 
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedVideo;
