import React from 'react';
import { motion } from 'framer-motion';

export const PartnershipsSection = () => {
  return (
    <section id="partnerships" className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/montfort-hero-bg.jpg')`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-[0.2em] leading-tight">
                B u i l d i n g &nbsp;&nbsp;&nbsp; S t r a t e g i c &nbsp;&nbsp;&nbsp; A l l i a n c e s , &nbsp;&nbsp;&nbsp; C r e a t i n g &nbsp;&nbsp;&nbsp; V a l u e .
              </h2>
              <p className="text-xl md:text-2xl text-white/80 max-w-4xl leading-relaxed">
                HANU Partnerships forges strategic alliances that drive innovation, expand market reach, 
                and create sustainable competitive advantages for our clients and partners.
              </p>
            </div>
            
            <div className="space-y-12 mt-16">
              <p className="text-white/90 text-lg leading-relaxed max-w-4xl">
                We leverage our extensive network and deep industry expertise to identify, 
                evaluate, and structure partnerships that deliver measurable value. Our approach 
                combines strategic vision with operational excellence to ensure successful collaborations.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      S t r a t e g i c &nbsp;&nbsp;&nbsp; A l l i a n c e s
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                      HANU Partnerships specializes in developing strategic alliances that enhance 
                      market position, accelerate growth, and create new revenue streams. 
                      We structure partnerships that align with long-term business objectives.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      T e c h n o l o g y &nbsp;&nbsp;&nbsp; I n t e g r a t i o n
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                      Our technology partnership programs facilitate seamless integration of 
                      cutting-edge solutions, enabling organizations to leverage advanced capabilities 
                      while maintaining operational efficiency and security.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      G l o b a l &nbsp;&nbsp;&nbsp; N e t w o r k
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                      Access to our global network of industry leaders, innovative companies, 
                      and strategic partners provides unparalleled opportunities for expansion, 
                      collaboration, and market penetration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};