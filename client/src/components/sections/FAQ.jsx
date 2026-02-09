import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    id: "01",
    question: "What AI models do you use?",
    answer:
      "We leverage a proprietary blend of Midjourney, Runway Gen-2, Pika, and Stable Diffusion, fine-tuned on our own datasets for maximum consistency.",
  },
  {
    id: "02",
    question: "Can I customize the avatars?",
    answer:
      "Absolutely. We can clone your own likeness or create entirely new brand ambassadors from scratch. Our character consistency pipeline ensures they look the same in every shot.",
  },
  {
    id: "03",
    question: "How long does a project take?",
    answer:
      "Typical turnaround for a 60-second commercial is 3-5 days, compared to weeks for traditional production. We work in agile sprints to deliver updates daily.",
  },
  {
    id: "04",
    question: "Do I own the rights?",
    answer:
      "Yes. Upon final payment, you own full commercial rights to all generated assets and final videos. We transfer all IP and project files to you.",
  },
];

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <motion.div
      initial={false}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
        isOpen
          ? "bg-white/5 border-primary/50 shadow-[0_0_30px_-5px_theme(colors.primary.500/0.2)]"
          : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      <button
        className="w-full py-8 px-8 flex items-center justify-between text-left focus:outline-none"
        onClick={onClick}
      >
        <div className="flex items-center gap-6">
          <span
            className={`text-xl font-mono font-bold transition-colors duration-300 ${isOpen ? "text-primary" : "text-gray-600 group-hover:text-white"}`}
          >
            {item.id}
          </span>
          <span
            className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-300 group-hover:text-white"}`}
          >
            {item.question}
          </span>
        </div>

        <div
          className={`relative flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${isOpen ? "border-primary bg-primary text-black rotate-180" : "border-white/20 text-white group-hover:border-white"}`}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-8 pb-8 pt-0 pl-[4.5rem]">
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Common{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            Everything you need to know about our process and technology.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
