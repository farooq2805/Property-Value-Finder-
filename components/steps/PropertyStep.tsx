import React from 'react';
import { PropertyDetails, PropertyType } from '../../types';
import { PROPERTY_TYPES, BHK_OPTIONS } from '../../constants';
import { Building2, Home, ArrowLeft } from 'lucide-react';

interface Props {
  data: Partial<PropertyDetails>;
  updateData: (data: Partial<PropertyDetails>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PropertyStep: React.FC<Props> = ({ data, updateData, onNext, onBack }) => {
  const isPlot = data.propertyType === PropertyType.PLOT;
  
  // Validation check
  let isValid = !!(data.propertyType && data.area);
  if (!isPlot) {
    // If not plot, we usually need BHK.
    isValid = isValid && !!data.bhk;
    // If Apartment, we need Floor details as requested
    if (data.propertyType === PropertyType.APARTMENT) {
       isValid = isValid && data.floor !== undefined && data.totalFloors !== undefined;
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-brand-900">Tell us about the property</h2>
        <p className="text-gray-500">The structure and size determine the base value.</p>
      </div>

      <div className="space-y-6">
        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
          <div className="grid grid-cols-2 gap-4">
            {PROPERTY_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => updateData({ propertyType: type.value })}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all
                  ${data.propertyType === type.value
                    ? 'border-brand-500 bg-brand-50 text-brand-900 shadow-sm'
                    : 'border-gray-200 hover:border-brand-200 text-gray-500'
                  }`}
              >
                {type.value === PropertyType.APARTMENT ? <Building2 className="mb-2" /> : <Home className="mb-2" />}
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Configuration (BHK) - Hide for Plots */}
        {!isPlot && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Bedrooms (BHK)</label>
            <div className="flex flex-wrap gap-2">
              {BHK_OPTIONS.map((bhk) => (
                <button
                  key={bhk}
                  onClick={() => updateData({ bhk: typeof bhk === 'string' ? 6 : Number(bhk) })}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition-all
                    ${data.bhk === (typeof bhk === 'string' ? 6 : bhk)
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-brand-400'
                    }`}
                >
                  {bhk} BHK
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Floor Section - Only for Apartments */}
        {data.propertyType === PropertyType.APARTMENT && (
           <div className="bg-brand-50 p-4 rounded-lg border border-brand-100">
              <h3 className="text-sm font-semibold text-brand-900 mb-3 uppercase tracking-wide">Floor Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    1. Which floor the property is at?
                  </label>
                  <input
                    type="number"
                    value={data.floor === undefined ? '' : data.floor}
                    onChange={(e) => updateData({ floor: e.target.value === '' ? undefined : Number(e.target.value) })}
                    placeholder="e.g. 5"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    2. How many floor building has?
                  </label>
                  <input
                    type="number"
                    value={data.totalFloors === undefined ? '' : data.totalFloors}
                    onChange={(e) => updateData({ totalFloors: e.target.value === '' ? undefined : Number(e.target.value) })}
                    placeholder="e.g. 20"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white"
                  />
                </div>
              </div>
           </div>
        )}

        {/* Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isPlot ? 'Plot Area' : 'Super Built-up Area'} (sq ft)
          </label>
          <input
            type="number"
            value={data.area || ''}
            onChange={(e) => updateData({ area: Number(e.target.value) })}
            placeholder="e.g. 1200"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
        </div>
      </div>

      <div className="pt-6 flex gap-4">
        <button
          onClick={onBack}
          className="px-6 py-4 rounded-md font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`flex-1 py-4 rounded-md font-bold uppercase tracking-wide text-sm transition-all shadow-md
            ${isValid 
              ? 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-brand-500/20' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};