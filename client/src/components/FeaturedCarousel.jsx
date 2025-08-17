import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const placeholderItems = [
  {
    id: 1,
    image: 'https://via.placeholder.com/600x300?text=Feature+1',
    title: 'Feature One',
    description: 'Brief description of the first featured item.'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/600x300?text=Feature+2',
    title: 'Feature Two',
    description: 'Brief description of the second featured item.'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/600x300?text=Feature+3',
    title: 'Feature Three',
    description: 'Brief description of the third featured item.'
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

export default function FeaturedCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage(([prevPage]) => {
      const newPage = (prevPage + newDirection + placeholderItems.length) % placeholderItems.length;
      return [newPage, newDirection];
    });
  };

  const currentItem = placeholderItems[page];

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 px-4">
      <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
        <AnimatePresence custom={direction}>
<Motion.div
            key={currentItem.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.5 }}
            className="flex flex-col md:flex-row"
          >
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full md:w-1/2 h-48 md:h-auto object-cover rounded-t-xl md:rounded-l-xl md:rounded-r-none"
            />
            <div className="p-6 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">{currentItem.title}</h3>
              <p className="text-gray-600 mb-4">{currentItem.description}</p>
              <button
                className="self-start px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:opacity-90 transition"
                onClick={() => {}}
              >
                Learn More
              </button>
            </div>
</Motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
          aria-label="Previous"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
          aria-label="Next"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
