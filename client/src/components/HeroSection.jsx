/* eslint-disable no-unused-vars */
// src/components/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import FeaturedCarousel from './FeaturedCarousel';

const HeroSection = ({ personas, onSelectPersona }) => {
  return (
  // Changed container to use min-h-screen and full width for full viewport height and responsiveness
<div className="min-h-screen w-full flex flex-col justify-center px-2 sm:px-4 py-8 sm:py-12">
  <FeaturedCarousel />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 sm:mb-16"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Chat with Expert AI Personas
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with industry experts and get personalized guidance on your learning journey
        </p>
      </motion.div>

      {/* Responsive grid, full width on mobile, max width on large screens */}
      <div className="flex-grow w-full grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {personas.map((persona) => (
          <PersonaCard 
            key={persona.id} 
            persona={persona} 
            onSelect={() => onSelectPersona(persona.id)} 
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-10 sm:mt-16 text-center text-gray-500 text-sm"
      >
        <p>Select an expert to start your conversation</p>
        <div className="mt-2 flex justify-center">
          <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
};

const PersonaCard = ({ persona, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl overflow-hidden shadow-xl ${persona.bgColor} border border-gray-200/50 h-full w-full min-w-0 flex flex-col`}
    >
      <div className="p-4 sm:p-8 h-full flex flex-col">
        <div>
          <div className="flex flex-col sm:flex-row items-start mb-4 sm:mb-6 gap-3 sm:gap-0">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl ${persona.color} flex items-center justify-center text-white text-xl sm:text-2xl font-bold overflow-hidden`}>
              {persona.image ? (
                <img 
                  src={persona.image} 
                  alt={persona.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                persona.name.charAt(0)
              )}
            </div>
            <div className="sm:ml-4">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800">{persona.name}</h2>
              <p className={`text-base sm:text-lg font-semibold ${persona.color.replace('from-', 'text-').split(' ')[0]}`}>
                {persona.tagline}
              </p>
            </div>
          </div>

          <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed">{persona.description}</p>
          <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">{persona.subscribers}</p>
        </div>
        {/* Button container with mt-auto to push to bottom */}
        <div className="mt-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelect}
            className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-white bg-gradient-to-r ${persona.color} shadow-lg hover:shadow-xl transition-all`}
          >
            Chat Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
