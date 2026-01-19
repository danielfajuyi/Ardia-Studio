import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Footer from '../../components/ui/Footer';
import { PlayCircle, Users, Award } from 'lucide-react';

const courses = [
  {
    title: "AI Video Mastery",
    level: "Beginner",
    duration: "4 Weeks",
    image: "bg-purple-900",
    price: "$299"
  },
  {
    title: "Advanced Cinematography",
    level: "Advanced",
    duration: "6 Weeks",
    image: "bg-blue-900",
    price: "$499"
  },
  {
    title: "Viral Shorts Automation",
    level: "Intermediate",
    duration: "2 Weeks",
    image: "bg-pink-900",
    price: "$199"
  }
];

const AcademyHome = () => {
  return (
    <div className="w-full pt-20">
      {/* Academy Hero */}
      <section className="relative py-20 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent blur-3xl pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="text-purple-400 tracking-widest uppercase text-sm font-bold mb-4 block">Ardia Academy</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Master the Art of <br /> AI Production</h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of creators learning to build the future of cinema using generative AI tools.
          </p>
          <Button variant="glow" className="px-10 py-4 text-lg">
            Browse Courses
          </Button>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-10 border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: Users, label: "Students", value: "5,000+" },
            { icon: PlayCircle, label: "Lessons", value: "120+" },
            { icon: Award, label: "Certifications", value: "15+" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <stat.icon className="w-8 h-8 text-purple-400 mb-2" />
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
              >
                <div className={`h-48 ${course.image} relative group-hover:scale-105 transition-transform duration-500`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-white/50 group-hover:text-white transition-colors" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-purple-300">{course.level}</span>
                    <span className="text-gray-400 text-sm">{course.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-purple-400 transition-colors">{course.title}</h3>
                  <div className="flex justify-between items-center border-t border-white/10 pt-4">
                    <span className="text-2xl font-bold">{course.price}</span>
                    <Button variant="secondary" className="px-4 py-1 text-sm">Enroll</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AcademyHome;
