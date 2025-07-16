import React from 'react';
import { motion } from 'framer-motion';
import hanuSolutionsEnergyFuture from '@/assets/hanu-solutions-energy-future.jpg';

export const SolutionsSection = () => {
  return (
    <section id="solutions" className="min-h-screen relative overflow-hidden parallax-bg">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${hanuSolutionsEnergyFuture})`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-[0.05em] leading-[0.9] mb-6">
              SOLUTIONS
            </h2>
            <p className="text-lg md:text-xl text-white/60 font-light tracking-[0.1em]">
              Transformative Results
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};