import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    question: "What AI models do you use?",
    answer:
      "We leverage a proprietary blend of Midjourney, Runway Gen-2, Pika, and Stable Diffusion, fine-tuned on our own datasets for maximum consistency.",
  },
  {
    question: "Can I customize the avatars?",
    answer:
      "Absolutely. We can clone your own likeness or create entirely new brand ambassadors from scratch.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Typical turnaround for a 60-second commercial is 3-5 days, compared to weeks for traditional production.",
  },
  {
    question: "Do I own the rights?",
    answer:
      "Yes. Upon final payment, you own full commercial rights to all generated assets and final videos.",
  },
];

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/10">
      <button
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
        onClick={onClick}
      >
        <span className="text-lg font-medium hover:text-primary transition-colors">
          {item.question}
        </span>
        {isOpen ? (
          <Minus className="text-primary" />
        ) : (
          <Plus className="text-gray-500" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2
          id="faq-text"
          className="text-3xl md:text-5xl font-bold mb-12 text-center"
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
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
