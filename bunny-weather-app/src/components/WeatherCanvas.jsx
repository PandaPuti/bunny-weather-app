import React from 'react';
import { motion } from 'framer-motion';

const WeatherCanvas = ({ weatherState, isDay, windSpeed }) => {
  const { color, state } = weatherState;

  // Indigo for night, or use the mapping color for day
  const skyColor = isDay ? color : "#1A1A2E";

  const bunnyVariants = {
    SUNNY: { x: 220, y: 160, scale: 1, opacity: 1 },
    CLOUDY: { x: 200, y: 160, scale: 1, opacity: 1 },
    RAINY: { x: 85, y: 160, scale: 0.9, opacity: 1 },
    STORMY: { x: 50, y: 160, scale: 0.8, opacity: 0 },
    FOGGY: { x: 150, y: 160, scale: 1, opacity: 0.8 } // Bunny looks a bit faded in fog
  };

  // Map wind speed to animation duration (e.g., 5s for calm, 0.5s for gale)
  // Wind is usually 0-20 m/s. Let's create a safe range:
  const swingDuration = windSpeed > 0 ? (10 / windSpeed).toFixed(2) : 3;

  return (
    <div className="relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-slate-200">
      <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        
        {/* SKY */}
      <motion.rect width="400" height="225" animate={{ fill: skyColor }} transition={{ duration: 2 }} />

      {/* MOON (Only at Night) */}
      {!isDay && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <circle cx="340" cy="40" r="12" fill="#F0F0F0" />
          <circle cx="348" cy="35" r="12" fill={skyColor} /> {/* Moon Crescent Effect */}
        </motion.g>
      )}

        {/* SUN */}
        {state === 'SUNNY' && (
          <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <circle cx="340" cy="40" r="20" fill="yellow" className="animate-pulse" opacity="0.4" />
            <circle cx="340" cy="40" r="12" fill="#FFD700" />
          </motion.g>
        )}

        {/* CLOUDS - For Cloudy, Rainy, and Foggy states */}
        {(state === 'CLOUDY' || state === 'RAINY' || state === 'FOGGY') && (
          <g>
            {/* Cloud 1 */}
            <motion.g
              initial={{ x: -50 }}
              animate={{ x: 450 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="50" cy="50" r="15" fill="white" opacity="0.8" />
              <circle cx="70" cy="50" r="20" fill="white" opacity="0.8" />
              <circle cx="90" cy="50" r="15" fill="white" opacity="0.8" />
            </motion.g>

            {/* Cloud 2 - Different speed and height */}
            <motion.g
              initial={{ x: 400 }}
              animate={{ x: -100 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="150" cy="80" r="10" fill="white" opacity="0.5" />
              <circle cx="165" cy="80" r="15" fill="white" opacity="0.5" />
              <circle cx="180" cy="80" r="10" fill="white" opacity="0.5" />
            </motion.g>
          </g>
        )}

        {/* FOG/HAZE OVERLAY */}
        {state === 'FOGGY' && (
          <motion.rect
            width="400"
            height="225"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2 }}
          />
        )}

        {/* GRASS FIELD */}
        <path d="M0 180 Q 200 160 400 180 V 225 H 0 Z" fill="#4CAF50" />

        {/* THE HOUSE WINDOW LIGHT*/}
        <g id="house" transform="translate(30, 140)">
          <rect width="50" height="40" fill="#D32F2F" />
          <path d="M-5 0 L 25 -25 L 55 0 Z" fill="#3E2723" />
          <rect x="18" y="15" width="14" height="25" fill="#5D4037" />
          {!isDay && <rect x="35" y="5" width="10" height="10" fill="#FFD700" className="animate-pulse" />}
        </g>

        {/* THE CLOTHESLINE */}
        <g id="laundry">
          <path d="M150 110 Q 250 135 350 110" stroke="#5D4037" strokeWidth="1" fill="none" />
          <rect x="150" y="100" width="10" height="75" fill="#5D4037"></rect>
          <rect x="350" y="105" width="10" height="75" fill="#5D4037"></rect>
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

        {/* CLOTHES WITH DYNAMIC SWING */}
        <motion.g 
          className="origin-top"
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ 
            duration: Math.max(0.4, swingDuration), // Don't go faster than 0.4s
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <rect x="190" y="122" width="15" height="20" fill="#FFEB3B" />
        </motion.g>

        {/* STARS - Only at Night */}
        {!isDay && (
          <g>
            {[...Array(10)].map((_, i) => (
              <motion.circle
                key={i}
                cx={Math.random() * 400}
                cy={Math.random() * 100}
                r={Math.random() * 1}
                fill="white"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};

export default WeatherCanvas;