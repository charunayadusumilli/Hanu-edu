import React from 'react';
import { motion } from 'framer-motion';

export const TalentSection = () => {
  return (
    <section id="talent" className="min-h-screen relative overflow-hidden parallax-bg">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url('/src/assets/energy-background.jpg')`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-[0.3em] leading-[0.8] mb-8">
              T&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;L&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;N&nbsp;&nbsp;&nbsp;T
            </h2>
            <p className="text-xl md:text-2xl text-white/60 font-light tracking-[0.2em] mt-16">
              E x c e p t i o n a l &nbsp;&nbsp;&nbsp; P e o p l e
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};