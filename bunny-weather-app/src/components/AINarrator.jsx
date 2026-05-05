import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AINarrator = ({ thought, isThinking }) => {
  return (
    <div className="relative h-20 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={thought}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          className="bg-white px-6 py-3 rounded-2xl shadow-lg border-2 border-blue-100 relative max-w-xs text-center"
        >
          <p className="text-sm font-medium text-gray-700 italic">
            {isThinking ? (
              <span className="flex gap-1 justify-center">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce [animation-delay:-0.15s]">.</span>
                <span className="animate-bounce [animation-delay:-0.3s]">.</span>
              </span>
            ) : (
              thought || "Beautiful day for some chores!"
            )}
          </p>
          
          {/* Speech Bubble Tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-blue-100 rotate-45"></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AINarrator;