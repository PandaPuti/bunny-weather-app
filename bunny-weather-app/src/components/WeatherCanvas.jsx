import React from 'react';
import { motion } from 'framer-motion';

const WeatherCanvas = ({ weatherState }) => {
  // Destructure our mapping logic (Defaulting to SUNNY)
  const { color, bunnyMood, state } = weatherState;

  // Animation Variants for the Bunny
  const bunnyVariants = {
    SUNNY: { x: 220, y: 180, scale: 1, rotate: 0 },
    CLOUDY: { x: 200, y: 180, scale: 1, rotate: -5 },
    RAINY: { x: 80, y: 175, scale: 0.9, rotate: 0 }, // Near the house
    STORMY: { x: 65, y: 185, opacity: 0, scale: 0.5 } // Hiding inside
  };

  return (
    <div className="relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
      <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        
        {/* SKY - Smooth color transition */}
        <motion.rect 
          width="400" height="225" 
          animate={{ fill: color }} 
          transition={{ duration: 2 }}
        />

        {/* GRASS FIELD */}
        <path d="M0 160 Q 200 130 400 160 V 225 H 0 Z" fill="#4CAF50" />

        {/* THE HOUSE */}
        <g id="house" transform="translate(30, 110)">
          <rect width="60" height="50" fill="#D32F2F" /> {/* Base */}
          <path d="M-5 0 L 30 -30 L 65 0 Z" fill="#3E2723" /> {/* Roof */}
          <rect x="20" y="20" width="20" height="30" fill="#5D4037" /> {/* Door */}
        </g>

        {/* THE SUN - Improved version */}
        {state === 'SUNNY' && (
          <motion.g
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Sun Glow */}
            <circle cx="350" cy="40" r="25" fill="yellow" opacity="0.3" className="animate-pulse" />
            {/* Sun Core */}
            <circle cx="350" cy="40" r="15" fill="#FFD700" />
            {/* Sun Rays (Optional CSS animation) */}
            <g className="animate-[spin_10s_linear_infinite] origin-[350px_40px]">
              {[...Array(8)].map((_, i) => (
                <rect key={i} x="348" y="15" width="4" height="8" fill="#FFD700" transform={`rotate(${i * 45} 350 40)`} />
              ))}
            </g>
          </motion.g>
        )}

        {/* THE CLOTHESLINE */}
        <g id="laundry">
        <path d="M150 100 Q 250 130 350 100" stroke="#5D4037" strokeWidth="1" fill="none" />
        {state !== 'RAINY' && state !== 'STORMY' && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Yellow Shirt */}
            <g transform="translate(180, 115) rotate(5)">
              <rect width="20" height="25" fill="#FFEB3B" className="origin-top animate-[sway_3s_ease-in-out_infinite]" />
              <rect width="2" height="4" x="4" y="-2" fill="#333" /> {/* Peg 1 */}
              <rect width="2" height="4" x="14" y="-2" fill="#333" /> {/* Peg 2 */}
            </g>
            {/* Blue Towel */}
            <g transform="translate(235, 122) rotate(-3)">
              <rect width="18" height="30" fill="#03A9F4" className="origin-top animate-[sway_4s_ease-in-out_infinite_alt]" />
              <rect width="2" height="4" x="8" y="-2" fill="#333" />
            </g>
          </motion.g>
        )}
        </g>

        {/* THE BUNNY */}
        <motion.g
          animate={bunnyVariants[state] || bunnyVariants.SUNNY}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          {/* Ears */}
          <ellipse cx="15" cy="5" rx="4" ry="10" fill="white" />
          <ellipse cx="25" cy="5" rx="4" ry="10" fill="white" />
          {/* Body & Head */}
          <circle cx="20" cy="40" r="15" fill="white" />
          <circle cx="20" cy="20" r="12" fill="white" />
          {/* Eyes */}
          <circle cx="16" cy="18" r="1.5" fill="#333" />
          <circle cx="24" cy="18" r="1.5" fill="#333" />
        </motion.g>

        {/* RAIN PARTICLES (Conditional) */}
        {(state === 'RAINY' || state === 'STORMY') && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[...Array(20)].map((_, i) => (
              <motion.line
                key={i}
                x1={Math.random() * 400}
                y1={-20}
                x2={Math.random() * 400}
                y2={0}
                stroke="white"
                strokeWidth="0.5"
                animate={{ y1: [0, 400], y2: [20, 420] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: Math.random() }}
              />
            ))}
          </motion.g>
        )}
      </svg>
    </div>
  );
};

export default WeatherCanvas;