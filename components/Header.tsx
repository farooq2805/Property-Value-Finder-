import React from 'react';
import { Building2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-950 border-b-2 border-brand-500 sticky top-0 z-50 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-yellow-600 rounded-sm flex items-center justify-center text-white shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300">
            <Building2 size={24} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-serif font-bold tracking-wider text-white leading-none">
              RAVI KEWALRAMANI
            </h1>
            <span className="text-[10px] text-brand-500 tracking-[0.2em] uppercase mt-1 font-semibold">
              Premium Real Estate Valuation
            </span>
          </div>
        </div>
        <nav className="hidden md:flex gap-10 text-sm font-medium text-gray-300 items-center">
          <a href="#" className="hover:text-brand-500 transition-colors uppercase tracking-wide text-xs">Properties</a>
          <a href="#" className="hover:text-brand-500 transition-colors uppercase tracking-wide text-xs">Market Trends</a>
          <a href="#" className="hover:text-brand-500 transition-colors uppercase tracking-wide text-xs">About</a>
          <a href="#" className="hover:text-brand-500 transition-colors uppercase tracking-wide text-xs">Contact</a>
        </nav>
        <button className="hidden md:block bg-transparent border border-brand-500 text-brand-500 px-6 py-2.5 rounded-sm text-xs font-bold hover:bg-brand-500 hover:text-white transition-all uppercase tracking-widest">
          List Your Property
        </button>
      </div>
    </header>
  );
};