import React from "react";
import { motion } from "framer-motion";
import { FaDove } from "react-icons/fa";
import './AnimatedBird.css'

const AnimatedBird = () => {
  return (
    <motion.div
      className="bird-container"
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.3 },
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="bird"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.1,
          rotate: [0, 10, -10, 0],
          transition: { duration: 0.5 },
        }}
      >
        <FaDove color="#4a90e2" size={24} />
      </motion.div>

      <motion.div
        className="speech-bubble"
        initial={{ opacity: 0, scale: 0 }}
        whileHover={{ opacity: 1, scale: 1 }}
      >
        Hello!
      </motion.div>
    </motion.div>
  );
};

export default AnimatedBird;