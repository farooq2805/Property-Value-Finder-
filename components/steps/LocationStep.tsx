import React from 'react';
import { PropertyDetails } from '../../types';
import { CITIES } from '../../constants';
import { MapPin, Navigation } from 'lucide-react';

interface Props {
  data: Partial<PropertyDetails>;
  updateData: (data: Partial<PropertyDetails>) => void;
  onNext: () => void;
}

export const LocationStep: React.FC<Props> = ({ data, updateData, onNext }) => {
  const isValid = data.city && data.locality && data.pincode && data.pincode.length === 6;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-xl font-serif font-bold text-brand-950 border-b-2 border-brand-500/20 inline-block pb-2">Property Location</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">City</label>
          <select
            value={data.city || ''}
            onChange={(e) => updateData({ city: e.target.value })}
            className="w-full px-4 py-3.5 rounded-sm border border-gray-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all bg-slate-50 hover:bg-white text-slate-800 font-medium"
          >
            <option value="" disabled>Select City</option>
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Locality / Project</label>
          <div className="relative group">
            <input
              type="text"
              value={data.locality || ''}
              onChange={(e) => updateData({ locality: e.target.value })}
              placeholder="e.g. Bandra West"
              className="w-full px-4 py-3.5 pl-11 rounded-sm border border-gray-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all bg-slate-50 hover:bg-white group-hover:border-gray-300 text-slate-800 font-medium"
            />
            <MapPin className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-brand-500 transition-colors" size={20} />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Pincode</label>
          <div className="relative group">
             <input
              type="text"
              maxLength={6}
              value={data.pincode || ''}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                updateData({ pincode: val });
              }}
              placeholder="e.g. 400050"
              className="w-full px-4 py-3.5 pl-11 rounded-sm border border-gray-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all bg-slate-50 hover:bg-white group-hover:border-gray-300 text-slate-800 font-medium"
            />
            <Navigation className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-brand-500 transition-colors" size={20} />
          </div>
        </div>
      </div>

      <div className="pt-8">
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`w-full py-4 rounded-sm font-bold text-sm uppercase tracking-widest transition-all shadow-lg
            ${isValid 
              ? 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-xl transform hover:-translate-y-0.5' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};