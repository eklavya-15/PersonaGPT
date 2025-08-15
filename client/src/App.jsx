// src/App.js
import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import ChatInterface from './components/ChatInterface';

function App() {
  const [activePersona, setActivePersona] = useState(null);
  
  const personas = [
    {
      id: 1,
      name: "Hitesh Choudhary",
      tagline: "Making the toughest topics easy to understand.",
      description: "Former corporate pro turned full-time YouTuber and Udemy instructor, founder of LearnCodeOnline (acquired), ex-CTO at Teachyst.",
      subscribers: "1M+ subscribers",
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-purple-600/10",
      image: "https://i.ibb.co/XZtX7N84/hitesh.jpg"
    },
    {
      id: 2,
      name: "Piyush Garg",
      tagline: "I build devs, not just apps",
      description: "Full-stack developer, educator and founder of Teachyst with project-based teaching, freelancing experience.",
      subscribers: "37k subscribers",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-amber-500/10 to-orange-600/10",
      image: "https://i.ibb.co/WNrnHcYb/piyush.jpg"
    }
  ];

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 ${!activePersona ? 'flex flex-col' : ''}`}>
      {activePersona ? (
        <ChatInterface 
          persona={personas.find(p => p.id === activePersona)} 
          onBack={() => setActivePersona(null)} 
        />
      ) : (
        <div className="flex-1">
          <HeroSection personas={personas} onSelectPersona={setActivePersona} />
        </div>
      )}
    </div>
  );
}

export default App;
