import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, title: "Cyberpunk City", category: "AI Short Film", color: "from-purple-500 to-pink-500" },
  { id: 2, title: "Neo Fashion", category: "Commercial", color: "from-blue-500 to-cyan-500" },
  { id: 3, title: "Future Tech", category: "Product Viz", color: "from-emerald-500 to-green-500" },
  { id: 4, title: "Abstract Mind", category: "Music Video", color: "from-orange-500 to-red-500" },
];

const WorkCard = ({ project, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Placeholder Image gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
      
      {/* Content overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
        <span className="text-sm text-gray-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {project.category}
        </span>
        <h3 className="text-2xl font-bold mt-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Our Works.
            </h2>
          </div>
          <button className="text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
            View All Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <WorkCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
