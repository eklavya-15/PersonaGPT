/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// src/components/ChatInterface.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ChatInterface = ({ persona, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const initialMessage = {
    id: 1,
    text: `Hi there! I'm ${persona.name}. ${persona.tagline} How can I assist you today?`,
    sender: 'persona',
    timestamp: new Date(),
  };

  useEffect(() => {
    // Simulate initial greeting
    setTimeout(() => {
      setMessages([initialMessage]);
    }, 500);
  }, [persona]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    try {
      // Determine the base URL based on environment
      const baseURL = 'https://persona-gpt-delta.vercel.app' // Your deployed API
      // Local development uses proxy

      // Determine which API endpoint to use based on persona
      const endpoint = persona.name === 'Hitesh Choudhary' 
        ? `${baseURL}/api/chat/hitesh`
        : `${baseURL}/api/chat/piyush`;

      // Build conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: conversationHistory
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage = {
          id: messages.length + 2,
          text: data.response,
          sender: 'persona',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Handle error response
        const errorMessage = {
          id: messages.length + 2,
          text: "Sorry, I'm having trouble responding right now. Please try again!",
          sender: 'persona',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting right now. Please make sure the backend server is running!",
        sender: 'persona',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Left Side - Persona Info Panel */}
      <div className="w-full lg:w-1/2 xl:w-2/5 min-h-screen flex flex-col justify-center px-4 sm:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl overflow-hidden shadow-2xl ${persona.bgColor} border border-gray-200/50 h-full max-h-[600px] flex flex-col`}
        >
          <div className="p-6 sm:p-8 h-full flex flex-col">
            {/* Back Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="self-start mb-6 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </motion.button>

            {/* Persona Info */}
            <div className="flex-grow flex flex-col justify-center">
              <div className="text-center mb-8">
                <div className={`w-24 h-24 rounded-2xl ${persona.color} flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg overflow-hidden`}>
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
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">{persona.name}</h1>
                <p className={`text-lg sm:text-xl font-semibold mb-4 ${persona.color.replace('from-', 'text-').split(' ')[0]}`}>
                  {persona.tagline}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">{persona.description}</p>
                <p className="text-sm text-gray-500">{persona.subscribers}</p>
              </div>

              {/* Status Indicator */}
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Online & Ready to Chat
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Chat Interface */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 min-h-screen flex-col">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-full flex flex-col bg-white/80 backdrop-blur-sm border-l border-gray-200/50"
        >
          {/* Chat Header */}
          <div className="py-6 px-8 border-b border-gray-200/50 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-xl ${persona.color} flex items-center justify-center text-white text-xl font-bold shadow-lg overflow-hidden`}>
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
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-800">Chat with {persona.name}</h2>
                <p className="text-sm text-gray-500">Ask me anything about my expertise!</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white/50 to-gray-50/50">
            <div className="max-w-2xl">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-6 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'persona' && (
                    <div className={`w-10 h-10 rounded-xl ${persona.color} flex items-center justify-center text-white font-bold mr-3 shadow-md overflow-hidden`}>
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
                  )}
                  
                  <div className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-lg ${
                    message.sender === 'user' 
                      ? `bg-gradient-to-r ${persona.color} text-white rounded-tr-none` 
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                    <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center text-gray-600 font-bold ml-3 shadow-md">
                      Y
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white/90 backdrop-blur-sm border-t border-gray-200/50">
            <div className="flex gap-3">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message ${persona.name}...`}
                className="flex-1 border border-gray-300 rounded-2xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-sm bg-white/80 backdrop-blur-sm"
                rows={1}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={inputValue.trim() === ''}
                className={`bg-gradient-to-r ${persona.color} text-white px-8 py-4 rounded-2xl font-semibold disabled:opacity-50 shadow-lg hover:shadow-xl transition-all`}
              >
                Send
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Chat Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[70vh] flex flex-col">
          {/* Mobile Chat Header */}
          <div className="py-4 px-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-xl ${persona.color} flex items-center justify-center text-white text-lg font-bold overflow-hidden`}>
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
              <div className="ml-3">
                <h3 className="font-bold text-gray-800">{persona.name}</h3>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user' 
                    ? `bg-gradient-to-r ${persona.color} text-white` 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Mobile Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message ${persona.name}...`}
                className="flex-1 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                disabled={inputValue.trim() === ''}
                className={`bg-gradient-to-r ${persona.color} text-white px-6 py-3 rounded-full font-medium disabled:opacity-50`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
