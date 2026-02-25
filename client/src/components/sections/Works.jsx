import { motion } from "framer-motion";
import React, { useRef } from "react";
import { ArrowUpRight, Play, Pause } from "lucide-react";
import Button from "../ui/Button";
import CloudinaryVideo from "../ui/CloudinaryVideo";

const projects = [
  {
    id: 1,
    title: "Ma Li An",
    category: "AI Short Film",
    video: "/asset/Dear Ma Li An (黎安)_.mp4",
  },
  {
    id: 2,
    title: "Asake Oge",
    category: "Commercial",
    video: "/asset/asakeOge.mp4",
  },
  {
    id: 3,
    title: "Ikigai",
    category: "Product Viz",
    video: "/asset/Ikigai.mp4",
  },
  {
    id: 4,
    title: "Akirah",
    category: "Music Video",
    video: "/asset/Akirah.mp4",
  },
  {
    id: 5,
    title: "The Proposal",
    category: "Storytelling",
    video: "/asset/proposal.mp4",
  },
];

const ProjectCard = ({ project }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {}); // Ignore play errors
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleClick = (e) => {
    // Prevent the modal from opening if they are clicking to pause/play
    // Wait, the ProjectCard itself doesn't have an onClick that opens a modal here...
    // The "View All Projects" button opens it? Actually there is no modal.
    if (isPlaying) {
      handleMouseLeave();
    } else {
      handleMouseEnter();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 5) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      className="group relative w-[350px] aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shrink-0 mx-4 bg-zinc-900 border border-white/5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Video Overlay */}
      <div className="absolute inset-0 z-0">
        <CloudinaryVideo
          ref={videoRef}
          src={project.video}
          className="w-full h-full object-cover transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 transition-opacity"
          muted
          loop={false} // Managed manually for the 5s loop
          playsInline
          onTimeUpdate={handleTimeUpdate}
        />

        {/* Play/Pause Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all duration-300 ${isPlaying ? "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100" : "opacity-100 scale-100"}`}
          >
            {isPlaying ? (
              <Pause className="fill-white text-white" size={24} />
            ) : (
              <Play className="fill-white text-white ml-1" size={24} />
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 z-10" />

      <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center justify-between mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span className="text-primary text-xs font-bold tracking-widest uppercase border border-primary/30 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
            {project.category}
          </span>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
            <ArrowUpRight size={18} />
          </div>
        </div>

        <h3 className="text-3xl font-bold text-white leading-tight">
          {project.title}
        </h3>
      </div>
    </div>
  );
};

const MarqueeRow = ({ items, speed = "40s" }) => {
  return (
    <div className="flex w-fit overflow-hidden py-4 hover-pause">
      <div
        className="flex animate-marquee"
        style={{ "--marquee-duration": speed }}
      >
        {[...items, ...items, ...items, ...items].map((project, index) => (
          <ProjectCard key={`${project.id}-${index}`} project={project} />
        ))}
      </div>
    </div>
  );
};

const Works = () => {
  return (
    <section className="py-32 bg-background overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              Selected Works
            </span>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
              Recent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">
                Masterpieces.
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-sm mb-4">
            A curated selection of our most impactful AI-driven campaigns and
            visual experiences.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full space-y-8">
        {/* All projects moving left continuously */}
        <div className="w-full">
          <MarqueeRow items={projects} direction="left" speed="60s" />
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 flex justify-center">
        <a href="#">
          <Button variant="primary" className="px-8 py-4 text-lg">
            View All Projects <ArrowUpRight className="ml-2 w-5 h-5" />
          </Button>
        </a>
      </div>
    </section>
  );
};

export default Works;
