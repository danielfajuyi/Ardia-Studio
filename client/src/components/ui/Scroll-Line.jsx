import { motion } from "framer-motion";
const ScrollLine = () => {
  return (
    <div className="">
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
      />
    </div>
  );
};

export default ScrollLine;
