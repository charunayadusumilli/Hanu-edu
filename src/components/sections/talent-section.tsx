import React from 'react';
import { motion } from 'framer-motion';

export const TalentSection = () => {
  return (
    <section id="talent" className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/energy-background.jpg')`,
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
                H A N U &nbsp;&nbsp;&nbsp; T a l e n t &nbsp;&nbsp;&nbsp; i s &nbsp;&nbsp;&nbsp; a &nbsp;&nbsp;&nbsp; s p e c i a l i z e d &nbsp;&nbsp;&nbsp; t a l e n t &nbsp;&nbsp;&nbsp; a c q u i s i t i o n &nbsp;&nbsp;&nbsp; d i v i s i o n
              </h2>
              <p className="text-xl md:text-2xl text-white/80 max-w-4xl leading-relaxed">
                Built on expertise from global consulting leaders, we offer a distinct 
                approach to talent acquisition and human capital development, applying 
                strategic insights to identify and develop exceptional professionals.
              </p>
            </div>
            
            <div className="space-y-12 mt-16">
              <p className="text-white/90 text-lg leading-relaxed max-w-4xl">
                We combine deep industry knowledge with innovative recruitment strategies. 
                Our approach leverages cutting-edge assessment tools and behavioral insights 
                to identify high-potential candidates who align with organizational culture and goals.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      E x e c u t i v e &nbsp;&nbsp;&nbsp; S e a r c h
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                      HANU Talent specializes in executive search and leadership placement, 
                      connecting top-tier professionals with organizations seeking transformational leaders. 
                      Our extensive network and rigorous assessment process ensure optimal matches.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      T a l e n t &nbsp;&nbsp;&nbsp; D e v e l o p m e n t
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                      Our talent development programs focus on building capabilities, 
                      enhancing leadership skills, and creating succession planning strategies. 
                      We design customized development pathways for sustained organizational growth.
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