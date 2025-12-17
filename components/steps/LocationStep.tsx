import React from 'react';
import { PropertyDetails } from '../../types';
import { CITIES } from '../../constants';
import { MapPin } from 'lucide-react';

interface Props {
  data: Partial<PropertyDetails>;
  updateData: (data: Partial<PropertyDetails>) => void;
  onNext: () => void;
}

export const LocationStep: React.FC<Props> = ({ data, updateData, onNext }) => {
  const isValid = data.city && data.locality && data.pincode && data.pincode.length === 6;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Where is your property located?</h2>
        <p className="text-gray-500">Location is the most important factor in valuation.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <select
            value={data.city || ''}
            onChange={(e) => updateData({ city: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
          >
            <option value="" disabled>Select City</option>
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Locality / Area</label>
          <div className="relative">
            <input
              type="text"
              value={data.locality || ''}
              onChange={(e) => updateData({ locality: e.target.value })}
              placeholder="e.g. Andheri West, Koramangala"
              className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
            />
            <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
          <input
            type="text"
            maxLength={6}
            value={data.pincode || ''}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              updateData({ pincode: val });
            }}
            placeholder="e.g. 400053"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all shadow-lg
            ${isValid 
              ? 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-brand-500/30' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};
