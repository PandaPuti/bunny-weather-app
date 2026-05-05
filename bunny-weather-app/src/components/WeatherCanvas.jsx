import React from 'react';
import { motion } from 'framer-motion';

const WeatherCanvas = ({ weatherState }) => {
  const { color, state } = weatherState;

  const bunnyVariants = {
    SUNNY: { x: 220, y: 160, scale: 1, opacity: 1 },
    CLOUDY: { x: 200, y: 160, scale: 1, opacity: 1 },
    RAINY: { x: 85, y: 160, scale: 0.9, opacity: 1 },
    STORMY: { x: 50, y: 160, scale: 0.8, opacity: 0 }, // Hiding
  };

  return (
    <div className="relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-slate-200">
      <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        
        {/* SKY */}
        <motion.rect 
          width="400" height="225" 
          animate={{ fill: color }} 
          transition={{ duration: 2 }}
        />

        {/* SUN */}
        {state === 'SUNNY' && (
          <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <circle cx="340" cy="40" r="20" fill="yellow" className="animate-pulse" opacity="0.4" />
            <circle cx="340" cy="40" r="12" fill="#FFD700" />
          </motion.g>
        )}

        {/* GRASS FIELD */}
        <path d="M0 180 Q 200 160 400 180 V 225 H 0 Z" fill="#4CAF50" />

        {/* THE HOUSE */}
        <g id="house" transform="translate(30, 130)">
          <rect width="50" height="40" fill="#D32F2F" />
          <path d="M-5 0 L 25 -25 L 55 0 Z" fill="#3E2723" />
          <rect x="18" y="15" width="14" height="25" fill="#5D4037" />
        </g>

        {/* THE CLOTHESLINE */}
        <g id="laundry">
          <path d="M150 110 Q 250 135 350 110" stroke="#5D4037" strokeWidth="1" fill="none" />
          {(state === 'SUNNY' || state === 'CLOUDY') && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <rect x="190" y="122" width="15" height="20" fill="#FFEB3B" className="animate-sway" />
              <rect x="250" y="128" width="18" height="25" fill="#03A9F4" className="animate-sway [animation-delay:0.5s]" />
            </motion.g>
          )}
        </g>

        {/* THE BUNNY */}
        <motion.g
          animate={bunnyVariants[state] || bunnyVariants.SUNNY}
          transition={{ type: 'spring', stiffness: 40 }}
        >
          {/* Ears with Twitch */}
          <ellipse cx="16" cy="10" rx="3" ry="8" fill="white" className="animate-twitch origin-[16px_18px]" />
          <ellipse cx="24" cy="10" rx="3" ry="8" fill="white" className="animate-twitch origin-[24px_18px] [animation-delay:0.2s]" />
          
          <circle cx="20" cy="40" r="15" fill="white" />
          <circle cx="20" cy="22" r="11" fill="white" />
          <circle cx="17" cy="20" r="1.2" fill="#333" />
          <circle cx="23" cy="20" r="1.2" fill="#333" />
        </motion.g>

        {/* RAIN */}
        {/* RAIN PARTICLES */}
        {(state === 'RAINY' || state === 'STORMY') && (
          <g>
            {[...Array(25)].map((_, i) => {
              // We generate a fixed X position for each drop
              const xPos = Math.random() * 400;
              return (
                <motion.line
                  key={i}
                  x1={xPos} 
                  y1={-20} // Start above the canvas
                  x2={xPos} // Keep X1 and X2 the same to ensure it's perfectly vertical
                  y2={-10} // Create a 10px long vertical line
                  stroke="white" 
                  strokeWidth="1" 
                  opacity="0.5"
                  animate={{ 
                    y1: [-20, 225], 
                    y2: [-10, 235] 
                  }}
                  transition={{ 
                    duration: 0.7, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: Math.random() * 1 // Random start times for a natural feel
                  }}
                />
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
};

export default WeatherCanvas;