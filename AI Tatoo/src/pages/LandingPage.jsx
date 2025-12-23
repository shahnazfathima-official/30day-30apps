import { main } from "framer-motion/client";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate= useNavigate();
  return (
    <main className="max-w-6xl  mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center">
          <h1 className="text-4xl mb-6 text-white font-extrabold tracking-tight leading-tight">
            AI <span className="text-indigo-600">Tattoo</span> Generator
          </h1>
          <p className="text-white">
            Type and idea → get a clean, black-ink tattoo design. No background,
            high contrast, ideal for skin art.
          </p>
        </div>
        <div className="mt-8 text-center">
          <button 
          className="text-white inline-flex bg-indigo-600 hover:bg-indigo-700 font-semibold  px-6 py-3 rounded-xl shadow-md"
          onClick={()=>navigate("/generate")}>
            
            Generate a tattoo 🔥
          </button>
        </div>
        <motion.div>
          <div className="bg-gradient-to-br from-indigo-300 to-pink-300 grid aspect-[4/2] mt-20 place-items-center rounded-xl">
            <div className="text-center">
              <div className="text-7xl mb-3">🖊</div>
              <p className="text-gray-600 mt-10">
                Your AI designed tattoo will look like this.
              </p>
            </div>
            <p className="text-gray-600">
              Built with react + Tailwind + OpenRouter
            </p>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default LandingPage;
