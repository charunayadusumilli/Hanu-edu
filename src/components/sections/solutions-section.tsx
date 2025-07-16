import React from 'react';
import { motion } from 'framer-motion';

export const SolutionsSection = () => {
  return (
    <section id="solutions" className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/hero-background.jpg')`,
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
                I n n o v a t i v e &nbsp;&nbsp;&nbsp; S o l u t i o n s , &nbsp;&nbsp;&nbsp; T r a n s f o r m a t i v e &nbsp;&nbsp;&nbsp; R e s u l t s .
              </h2>
              <p className="text-xl md:text-2xl text-white/80 max-w-4xl leading-relaxed">
                HANU Solutions delivers comprehensive, integrated solutions that address complex business challenges 
                across industries, combining cutting-edge technology with strategic expertise.
              </p>
            </div>
            
            <div className="space-y-12 mt-16">
              <p className="text-white/90 text-lg leading-relaxed max-w-4xl">
                Our solutions portfolio spans digital transformation, operational optimization, 
                and strategic innovation. We combine industry expertise with technological innovation 
                to deliver sustainable competitive advantages and measurable business impact.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      E n t e r p r i s e &nbsp;&nbsp;&nbsp; T r a n s f o r m a t i o n
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                      HANU Solutions orchestrates comprehensive enterprise transformations, 
                      modernizing technology infrastructure, optimizing processes, and reshaping 
                      organizational capabilities to drive sustainable growth and innovation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      C u s t o m &nbsp;&nbsp;&nbsp; D e v e l o p m e n t
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                      Our custom development services create tailored solutions that address 
                      unique business requirements, leveraging advanced technologies and 
                      industry best practices to deliver optimal performance and scalability.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      I n t e g r a t e d &nbsp;&nbsp;&nbsp; P l a t f o r m s
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                      Comprehensive platform solutions that unify disparate systems, 
                      streamline operations, and provide unified data insights. 
                      Our platforms scale with business growth and evolving requirements.
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