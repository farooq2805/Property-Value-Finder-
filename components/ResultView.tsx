import React from 'react';
import { ValuationResult, PropertyDetails } from '../types';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { ArrowLeft, TrendingUp, MapPin, Building, Phone, Download } from 'lucide-react';

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
          className="flex items-center text-slate-600 hover:text-brand-600 transition-colors font-medium bg-white px-4 py-2 rounded shadow-sm border border-slate-200"
        >
          <ArrowLeft size={16} className="mr-2" />
          New Search
        </button>
        <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">
           Report generated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Main Valuation Card */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden border-t-4 border-brand-500">
        <div className="bg-brand-900 p-8 text-white relative">
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                 <div className="bg-brand-500/20 p-1 rounded">
                   <MapPin size={16} className="text-brand-500" />
                 </div>
                 <span className="text-brand-100 font-bold uppercase tracking-widest text-xs">
                   {inputData.locality}, {inputData.city} {inputData.pincode ? ` - ${inputData.pincode}` : ''}
                 </span>
              </div>
              <h2 className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-1">Estimated Market Value</h2>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">
                {formatCurrency(result.minPrice)} - {formatCurrency(result.maxPrice)}
              </h1>
              <div className="inline-block bg-white/10 rounded px-4 py-2 backdrop-blur-md border border-white/10">
                <p className="text-brand-100 text-sm font-medium">
                   Pincode Avg: <span className="text-white font-bold ml-1">₹{result.avgPricePerSqFt.toLocaleString()}/sq.ft</span>
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
               <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 shadow-inner">
                   <div className="flex justify-between items-center mb-4">
                     <span className="text-brand-200 text-sm font-medium uppercase tracking-wide">Market Sentiment</span>
                     <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm
                       ${result.marketSentiment === 'Bullish' ? 'bg-green-500 text-white' : 
                         result.marketSentiment === 'Bearish' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-yellow-900'}`}>
                       {result.marketSentiment}
                     </span>
                   </div>
                   <div className="space-y-2">
                     <div className="flex justify-between items-center">
                        <span className="text-brand-200 text-xs uppercase tracking-wide">AI Confidence Score</span>
                        <span className="text-sm font-bold text-brand-500">{result.confidenceScore}%</span>
                     </div>
                     <div className="w-full h-2 bg-brand-950 rounded-full overflow-hidden border border-white/10">
                        <div className="h-full bg-brand-500" style={{ width: `${result.confidenceScore}%` }}></div>
                     </div>
                   </div>
               </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-serif font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="text-brand-600" size={20} />
                  Price Appreciation Trend
                </h3>
                <p className="text-sm text-slate-500 mt-1">5-year historical performance for pincode {inputData.pincode}</p>
              </div>
              
              <div className="h-72 w-full border border-slate-200 rounded-lg p-4 bg-slate-50">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.trends}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b48a39" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#b48a39" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} />
                    <YAxis hide={true} domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', backgroundColor: '#1e293b', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Price/sq.ft']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#b48a39" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                      activeDot={{ r: 6, fill: '#b48a39', stroke: '#fff', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-serif font-bold text-slate-800 flex items-center gap-2">
                  <MapPin className="text-brand-600" size={20} />
                  Locality Insights
                </h3>
              </div>
              <ul className="space-y-3">
                {result.locationInsights.map((insight, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-700 bg-slate-50 p-4 rounded border-l-4 border-brand-500 shadow-sm">
                    {insight}
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 bg-slate-800 text-white p-6 rounded-lg text-center shadow-lg border-t-4 border-brand-500">
                <p className="text-brand-100 text-sm mb-4 font-medium uppercase tracking-wide">Professional Assistance</p>
                <button className="w-full bg-brand-500 text-white font-bold py-3 rounded hover:bg-brand-600 transition-colors uppercase text-xs tracking-wider flex items-center justify-center gap-2 mb-3 shadow-md">
                  <Phone size={14} /> Speak to Expert
                </button>
                <button className="w-full border border-slate-600 text-slate-300 font-bold py-3 rounded hover:bg-slate-700 hover:text-white transition-colors uppercase text-xs tracking-wider flex items-center justify-center gap-2">
                  <Download size={14} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Summary Strip */}
      <div className="bg-white rounded-lg shadow-md border-l-4 border-brand-600 p-6 flex flex-wrap gap-6 md:justify-between items-center text-sm text-slate-500">
         <div className="flex items-center gap-2">
            <Building size={16} className="text-brand-600" />
            <span className="font-bold text-slate-800 uppercase tracking-wide">{inputData.propertyType}</span>
         </div>
         <div className="w-px h-6 bg-slate-200 hidden md:block"></div>
         <div>
            <span className="block text-xs uppercase tracking-wide font-medium text-slate-400">Size</span>
            <span className="font-bold text-slate-800">{inputData.area} sq ft</span>
         </div>
         <div className="w-px h-6 bg-slate-200 hidden md:block"></div>
         <div>
            <span className="block text-xs uppercase tracking-wide font-medium text-slate-400">Details</span>
            <span className="font-bold text-slate-800">
              {inputData.bhk ? `${inputData.bhk} BHK` : 'Plot'} 
              {inputData.floor ? `, Floor ${inputData.floor}` : ''}
            </span>
         </div>
         <div className="w-px h-6 bg-slate-200 hidden md:block"></div>
         <div>
            <span className="block text-xs uppercase tracking-wide font-medium text-slate-400">Location</span>
            <span className="font-bold text-slate-800">{inputData.locality}, {inputData.city}</span>
         </div>
      </div>
    </div>
  );
};