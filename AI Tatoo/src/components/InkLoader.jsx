import React from "react";
import { motion } from "framer-motion";

const InkLoader = ({label="Generating..."}) => {
  const dots = [0, 1, 2];
  return (
    <div className="h-64 grid place-items-center">
      <div>
        <div className="flex gap-3">
          {dots.map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-indigo-600 rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.9,
                delay: i * 0.12,
              }}
            />
          ))}
        </div>
        <p className="text-gray-300 justify-center">{label}</p>
      </div>
    </div>
  );
};

export default InkLoader;
