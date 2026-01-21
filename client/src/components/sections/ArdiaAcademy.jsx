import { motion } from 'framer-motion';
import Button from '../ui/Button';

const ArdiaAcademy = () => {
  return (
    <section className="py-24 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="rounded-[2.5rem] bg-[#111] overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
             {/* Left Content */}
             <div className="p-12 md:p-16 flex flex-col justify-center relative z-10">
               <motion.span 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 className="text-primary font-bold tracking-widest uppercase text-sm mb-4"
               >
                 Ardia Academy
               </motion.span>
               
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6 leading-[0.9]"
               >
                 Create. Learn. <br/>
                 Earn, with <br/>
                 <span className="text-gray-500">AI Video.</span>
               </motion.h2>

               <motion.p 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="text-xl text-gray-400 mb-8 max-w-md"
               >
                 Join our 3-Week Premium AI Video Creation Class. Learn cutting-edge tools, build a creative portfolio, and start getting paid for your skills.
               </motion.p>

               <div className="flex flex-col sm:flex-row items-center gap-6">
                 <Button variant="primary" className="w-full sm:w-auto text-lg px-8">
                   Register Now
                 </Button>
                 <div className="text-left">
                   <div className="text-2xl font-bold text-white">₦30,000</div>
                   <div className="text-sm text-primary uppercase tracking-wider font-bold">Three weekends only</div>
                 </div>
               </div>
             </div>

             {/* Right Image/Graphic */}
             <div className="relative h-[400px] lg:h-auto bg-gray-900 border-l border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                
                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/20 rounded-full blur-[80px]" 
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArdiaAcademy;
