import React, { useState } from 'react';
import { ArrowRight, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { CITIES, PROPERTY_TYPES } from '../constants';
import { PropertyDetails, PropertyType } from '../types';

interface HeroProps {
  onStart: (data: Partial<PropertyDetails>) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [formData, setFormData] = useState<Partial<PropertyDetails>>({
    city: '',
    locality: '',
    pincode: '',
    propertyType: PropertyType.APARTMENT
  });

  const handleChange = (field: keyof PropertyDetails, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStart = () => {
    if (formData.city && formData.locality) {
      onStart(formData);
    }
  };

  return (
    <div className="relative bg-brand-950 text-white min-h-[650px] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900/95 to-brand-900/80 z-10"></div>
         {/* Using a more 'Mumbai/Corporate' skyline feel if possible, or generic high end real estate */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-brand-500">
               <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
               <span className="text-xs font-bold uppercase tracking-widest text-white">AI-Powered Valuation Engine</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight text-white drop-shadow-lg">
              Unlock the True <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-yellow-300">Value of Your Asset</span>
            </h1>
            
            <p className="text-lg text-slate-300 max-w-lg font-light leading-relaxed border-l-2 border-brand-500 pl-6">
              Instant, data-driven property valuation leveraging advanced market analytics and hyperlocal trends.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-4 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-500" size={20} />
                <span>Bank-Grade Accuracy</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-500" size={20} />
                <span>Real-Time Market Data</span>
              </div>
            </div>
          </div>

          {/* Right Card - Premium Input */}
          <div className="bg-white rounded-sm shadow-2xl p-8 md:p-10 text-slate-900 w-full max-w-md mx-auto border-t-8 border-brand-500 relative transform transition-transform hover:-translate-y-1 duration-500">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <Building2 size={100} />
             </div>
             
             <h3 className="text-2xl font-serif font-bold text-brand-950 mb-8 relative z-10">Get Instant Estimate</h3>
             
             <div className="space-y-5 relative z-10">
                {/* City Selection */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Select City</label>
                  <select
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all font-semibold text-slate-800 appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                  >
                    <option value="" disabled>Choose City</option>
                    {CITIES.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Locality Input */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Locality / Project</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.locality}
                      onChange={(e) => handleChange('locality', e.target.value)}
                      placeholder="e.g. Worli Sea Face"
                      className="w-full p-4 pl-11 bg-slate-50 border border-slate-200 rounded-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all font-semibold text-slate-800 placeholder:font-normal"
                    />
                    <MapPin className="absolute left-4 top-4 text-brand-500" size={18} />
                  </div>
                </div>

                {/* Pincode Input */}
                 <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Pincode</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 400030"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all font-semibold text-slate-800 placeholder:font-normal"
                  />
                </div>

                {/* Property Type Pills */}
                <div className="space-y-2 pt-2">
                   <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Property Type</label>
                   <div className="grid grid-cols-2 gap-3">
                      {PROPERTY_TYPES.slice(0, 4).map(type => (
                        <button
                          key={type.value}
                          onClick={() => handleChange('propertyType', type.value)}
                          className={`p-3 text-xs font-bold uppercase tracking-wider rounded-sm border transition-all flex items-center justify-center gap-2
                            ${formData.propertyType === type.value 
                              ? 'bg-brand-900 text-white border-brand-900 shadow-md' 
                              : 'bg-white text-slate-500 border-slate-200 hover:border-brand-500 hover:text-brand-500'}`}
                        >
                           {type.label.split('/')[0]}
                        </button>
                      ))}
                   </div>
                </div>

                <button 
                  onClick={handleStart}
                  disabled={!formData.city || !formData.locality}
                  className="w-full mt-8 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold py-5 rounded-sm shadow-lg hover:shadow-gold transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest text-xs"
                >
                  Start Valuation <ArrowRight size={16} />
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};