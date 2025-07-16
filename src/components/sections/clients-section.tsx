import React from 'react';
import { motion } from 'framer-motion';

export const ClientsSection = () => {
  return (
    <section id="clients" className="min-h-screen relative overflow-hidden parallax-bg">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url('/src/assets/maritime-background.jpg')`,
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
              C&nbsp;&nbsp;&nbsp;L&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;N&nbsp;&nbsp;&nbsp;T&nbsp;&nbsp;&nbsp;S
            </h2>
            <p className="text-xl md:text-2xl text-white/60 font-light tracking-[0.2em] mt-16">
              E m p o w e r i n g &nbsp;&nbsp;&nbsp; S u c c e s s
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};