import React from 'react';
import { Building2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-900 border-b border-brand-700 sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-500 rounded-sm flex items-center justify-center text-brand-900 shadow-lg">
            <Building2 size={24} />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold tracking-wide text-white leading-none">
              RAVI KEWALRAMANI
            </h1>
            <p className="text-xs text-brand-500 tracking-widest uppercase mt-1">Premium Real Estate</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-brand-500 transition-colors">Properties</a>
          <a href="#" className="hover:text-brand-500 transition-colors">Market Trends</a>
          <a href="#" className="hover:text-brand-500 transition-colors">About Ravi</a>
          <a href="#" className="hover:text-brand-500 transition-colors">Contact</a>
        </nav>
        <button className="bg-brand-500 text-brand-900 px-5 py-2 rounded-sm text-sm font-bold hover:bg-white hover:text-brand-900 transition-all uppercase tracking-wide">
          List Your Property
        </button>
      </div>
    </header>
  );
};