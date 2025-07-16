import React from 'react';
import { motion } from 'framer-motion';

export const AcademySection = () => {
  return (
    <section id="academy" className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/hanu-hero-bg.jpg')`,
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
                A d v a n c i n g &nbsp;&nbsp;&nbsp; K n o w l e d g e , &nbsp;&nbsp;&nbsp; E m p o w e r i n g &nbsp;&nbsp;&nbsp; F u t u r e s .
              </h2>
              <p className="text-xl md:text-2xl text-white/80 max-w-4xl leading-relaxed">
                HANU AI Academy pioneers the future of learning through artificial intelligence, 
                offering cutting-edge educational programs that prepare professionals for tomorrow's challenges.
              </p>
            </div>
            
            <div className="space-y-12 mt-16">
              <p className="text-white/90 text-lg leading-relaxed max-w-4xl">
                Our diversified educational approach combines theoretical foundations with practical applications, 
                from AI fundamentals to advanced machine learning implementations. We leverage industry expertise 
                to create immersive learning experiences that drive real-world impact.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      A I &nbsp;&nbsp;&nbsp; F u n d a m e n t a l s
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                      HANU AI Academy provides comprehensive AI education covering machine learning, 
                      neural networks, and data science. Our curriculum is designed by industry experts 
                      to ensure practical relevance and immediate applicability.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      P r o f e s s i o n a l &nbsp;&nbsp;&nbsp; C e r t i f i c a t i o n
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                      Our certification programs validate expertise in AI technologies and methodologies. 
                      These credentials are recognized by leading organizations and provide competitive 
                      advantages in the evolving job market.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      C o r p o r a t e &nbsp;&nbsp;&nbsp; T r a i n i n g
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                      Customized AI training programs for organizations seeking to upskill their workforce. 
                      We design tailored curricula that align with business objectives and industry requirements.
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