import React from 'react';
import { ValuationResult, PropertyDetails } from '../types';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { ArrowLeft, TrendingUp, MapPin, Building, AlertCircle, Phone } from 'lucide-react';

interface Props {
  result: ValuationResult;
  inputData: PropertyDetails;
  onReset: () => void;
}

const formatCurrency = (value: number) => {
  if (value >= 10000000) {
    return `₹ ${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `₹ ${(value / 100000).toFixed(2)} Lac`;
  }
  return `₹ ${value.toLocaleString()}`;
};

export const ResultView: React.FC<Props> = ({ result, inputData, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={onReset}
          className="flex items-center text-gray-500 hover:text-brand-600 transition-colors font-medium"
        >
          <ArrowLeft size={16} className="mr-2" />
          Value Another Property
        </button>
      </div>

      {/* Main Valuation Card */}
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-brand-900 p-8 text-white relative">
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <p className="text-brand-500 font-bold mb-2 uppercase tracking-widest text-xs">Estimated Market Value</p>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-white">
                {formatCurrency(result.minPrice)} - {formatCurrency(result.maxPrice)}
              </h1>
              <p className="text-gray-400 text-sm">
                Average Market Rate: <span className="text-white">₹{result.avgPricePerSqFt.toLocaleString()}/sq.ft</span> in {inputData.locality}
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
               <div className="bg-white/5 backdrop-blur-sm rounded-sm p-4 border border-white/10">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-gray-400 text-sm">Market Trend</span>
                     <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide
                       ${result.marketSentiment === 'Bullish' ? 'bg-green-900 text-green-300' : 
                         result.marketSentiment === 'Bearish' ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'}`}>
                       {result.marketSentiment}
                     </span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-gray-400 text-sm">Confidence Level</span>
                     <div className="flex items-center gap-3">
                        <div className="w-20 h-1.5 bg-gray-700 rounded-full">
                          <div className="h-full bg-brand-500 rounded-full" style={{ width: `${result.confidenceScore}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-brand-500">{result.confidenceScore}%</span>
                     </div>
                   </div>
               </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="text-brand-600" size={20} />
                Price History ({inputData.locality})
              </h3>
              <div className="h-64 w-full border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.trends}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b48a39" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#b48a39" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                    <YAxis hide={true} domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '4px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Price/sq.ft']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#b48a39" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="text-brand-600" size={20} />
                Locality Highlights
              </h3>
              <ul className="space-y-3">
                {result.locationInsights.map((insight, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-700 bg-gray-50 p-3 rounded border-l-2 border-brand-500">
                    {insight}
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 bg-brand-900 text-white p-5 rounded-lg text-center">
                <p className="text-sm text-gray-300 mb-3">Want a more precise valuation?</p>
                <button className="w-full bg-brand-500 text-brand-900 font-bold py-3 rounded-sm hover:bg-white transition-colors uppercase text-xs tracking-wider flex items-center justify-center gap-2">
                  <Phone size={14} /> Contact Ravi Kewalramani
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Summary Strip */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-wrap gap-6 md:justify-between items-center text-sm text-gray-500">
         <div className="flex items-center gap-2">
            <Building size={16} className="text-brand-600" />
            <span className="font-semibold text-gray-900">{inputData.propertyType}</span>
         </div>
         <div className="w-px h-4 bg-gray-300 hidden md:block"></div>
         <div>
            <span className="block text-xs uppercase tracking-wide">Size</span>
            <span className="font-semibold text-gray-900">{inputData.area} sq ft</span>
         </div>
         <div className="w-px h-4 bg-gray-300 hidden md:block"></div>
         <div>
            <span className="block text-xs uppercase tracking-wide">Details</span>
            <span className="font-semibold text-gray-900">
              {inputData.bhk ? `${inputData.bhk} BHK` : 'Plot'} 
              {inputData.floor ? `, Floor ${inputData.floor}` : ''}
            </span>
         </div>
         <div className="w-px h-4 bg-gray-300 hidden md:block"></div>
         <div>
            <span className="block text-xs uppercase tracking-wide">Location</span>
            <span className="font-semibold text-gray-900">{inputData.locality}, {inputData.city}</span>
         </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-gray-50 text-gray-600 rounded-lg text-xs">
        <AlertCircle size={16} className="shrink-0 mt-0.5" />
        <p>
          <strong>Disclaimer:</strong> This automated valuation is an estimate based on current market trends and available data. 
          It does not constitute a legal valuation. For an official valuation report or to list your property, please contact our office directly.
        </p>
      </div>
    </div>
  );
};