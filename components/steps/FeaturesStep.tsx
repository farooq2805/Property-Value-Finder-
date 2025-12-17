import React from 'react';
import { PropertyDetails, PropertyType } from '../../types';
import { FURNISHING_OPTIONS, POSSESSION_OPTIONS } from '../../constants';
import { ArrowLeft } from 'lucide-react';

interface Props {
  data: Partial<PropertyDetails>;
  updateData: (data: Partial<PropertyDetails>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const FeaturesStep: React.FC<Props> = ({ data, updateData, onSubmit, onBack, isLoading }) => {
  const isValid = data.furnishing && data.possession && data.ageOfProperty !== undefined;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-brand-900">Additional Features</h2>
        <p className="text-gray-500">Details that add value to your property.</p>
      </div>

      <div className="space-y-6">
        {/* Furnishing Status */}
        {data.propertyType !== PropertyType.PLOT && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Furnishing Status</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {FURNISHING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateData({ furnishing: opt.value })}
                  className={`px-3 py-3 rounded-md border text-sm font-medium transition-all
                    ${data.furnishing === opt.value
                      ? 'bg-brand-50 border-brand-500 text-brand-900'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-brand-300'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Possession Status */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Availability / Possession</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {POSSESSION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateData({ possession: opt.value })}
                  className={`px-3 py-3 rounded-md border text-sm font-medium transition-all
                    ${data.possession === opt.value
                      ? 'bg-brand-50 border-brand-500 text-brand-900'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-brand-300'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Age (Years)</label>
          <input
            type="number"
            value={data.ageOfProperty === undefined ? '' : data.ageOfProperty}
            onChange={(e) => updateData({ ageOfProperty: Number(e.target.value) })}
            placeholder="e.g. 5"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
        </div>
      </div>

      <div className="pt-6 flex gap-4">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="px-6 py-4 rounded-md font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={onSubmit}
          disabled={!isValid || isLoading}
          className={`flex-1 py-4 rounded-md font-bold text-sm uppercase tracking-wide transition-all shadow-lg flex items-center justify-center gap-2
            ${isValid 
              ? 'bg-brand-600 text-white hover:bg-brand-700' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          Proceed to Contact
        </button>
      </div>
    </div>
  );
};