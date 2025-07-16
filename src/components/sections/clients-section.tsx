import React from 'react';
import { motion } from 'framer-motion';

export const ClientsSection = () => {
  return (
    <section id="clients" className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/maritime-background.jpg')`,
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
                E m p o w e r i n g &nbsp;&nbsp;&nbsp; C l i e n t s , &nbsp;&nbsp;&nbsp; D r i v i n g &nbsp;&nbsp;&nbsp; S u c c e s s .
              </h2>
              <p className="text-xl md:text-2xl text-white/80 max-w-4xl leading-relaxed">
                HANU Clients delivers comprehensive consulting solutions across industries, 
                leveraging our expertise to drive transformational growth and sustainable success for our partners.
              </p>
            </div>
            
            <div className="space-y-12 mt-16">
              {/* Service Areas */}
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      S t r a t e g i c &nbsp;&nbsp;&nbsp; C o n s u l t i n g
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                      Our strategic consulting services help organizations navigate complex challenges, 
                      identify growth opportunities, and develop robust strategies for long-term success. 
                      We work closely with leadership teams to transform vision into actionable plans.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      O p e r a t i o n a l &nbsp;&nbsp;&nbsp; E x c e l l e n c e
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                      We optimize business operations through process improvement, technology integration, 
                      and organizational restructuring. Our approach ensures sustainable efficiency gains 
                      while maintaining quality and customer satisfaction.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      D i g i t a l &nbsp;&nbsp;&nbsp; T r a n s f o r m a t i o n
                    </h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
                      Leading digital transformation initiatives that modernize business models, 
                      enhance customer experiences, and drive innovation. We guide organizations 
                      through technology adoption and cultural change management.
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