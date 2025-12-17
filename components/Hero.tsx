import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-brand-900 text-white pb-20 pt-16 lg:pt-24">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-900 to-brand-800 opacity-95"></div>
         {/* Optional pattern or image could go here */}
         <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <span className="inline-block px-3 py-1 mb-6 text-brand-500 border-b border-brand-500 text-sm font-medium tracking-widest uppercase">
          Market Intelligence Tool
        </span>
        
        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
          Know the True Value <br/>
          <span className="text-brand-500">
             of Your Property
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg text-gray-300 mb-10 font-light">
          Leverage our advanced market analysis algorithms to get a precise valuation estimate for your home in Mumbai, Delhi, and major Indian cities.
        </p>

        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-brand-500 rounded-sm overflow-hidden transition-all hover:bg-white hover:text-brand-900 shadow-xl"
        >
          Start Valuation
          <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" size={20} />
        </button>
        
        <div className="mt-20 border-t border-brand-800 pt-10 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-serif font-bold text-white">5,000+</p>
            <p className="text-xs uppercase tracking-widest text-brand-500 mt-1">Properties Valued</p>
          </div>
          <div>
            <p className="text-3xl font-serif font-bold text-white">98%</p>
            <p className="text-xs uppercase tracking-widest text-brand-500 mt-1">Accuracy</p>
          </div>
          <div>
            <p className="text-3xl font-serif font-bold text-white">12+</p>
            <p className="text-xs uppercase tracking-widest text-brand-500 mt-1">Years Experience</p>
          </div>
          <div>
            <p className="text-3xl font-serif font-bold text-white">24/7</p>
            <p className="text-xs uppercase tracking-widest text-brand-500 mt-1">Instant Reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};