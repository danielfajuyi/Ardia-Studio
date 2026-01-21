import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: "Cyberpunk City", category: "AI Short Film", image: "https://images.unsplash.com/photo-1614728853913-1e2202349e90?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, title: "Neo Fashion", category: "Commercial", image: "https://images.unsplash.com/photo-1605218427306-72f3a972620f?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, title: "Future Tech", category: "Product Viz", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, title: "Abstract Mind", category: "Music Video", image: "https://images.unsplash.com/photo-1548502621-c529ba42614b?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, title: "Neural Dreams", category: "AI Art", image: "https://images.unsplash.com/photo-1518544806352-a226787372d3?q=80&w=1000&auto=format&fit=crop" },
];

const Works = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-4">
          Recent Masterpieces.
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Infinite Marquee Wrapper */}
        <div className="flex w-fit">
          <motion.div 
            className="flex gap-8 px-4"
            animate={{ x: "-50%" }}
            transition={{ 
              duration: 30, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            {[...projects, ...projects, ...projects].map((project, index) => (
              <div 
                key={`${project.id}-${index}`} 
                className="relative min-w-[300px] md:min-w-[500px] aspect-video rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-primary text-xs uppercase tracking-widest font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Works;
