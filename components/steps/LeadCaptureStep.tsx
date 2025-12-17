import React from 'react';
import { LeadDetails } from '../../types';
import { Lock, User } from 'lucide-react';

interface Props {
  data: Partial<LeadDetails>;
  updateData: (data: Partial<LeadDetails>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const LeadCaptureStep: React.FC<Props> = ({ data, updateData, onSubmit, onBack, isLoading }) => {
  const isValid = data.name && data.email && data.phone && data.phone.length >= 10;
  
  // Default user type if not set
  const userType = (data as any).userType || 'Owner';

  const handleUserTypeChange = (type: string) => {
    updateData({ ...data, userType: type } as any);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-brand-900">Get Your Valuation Report</h2>
        <p className="text-gray-500">We will send the detailed pincode analysis to your email.</p>
      </div>

      <div className="space-y-5 max-w-md mx-auto">
        
        {/* User Type Selection */}
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
           <div className="grid grid-cols-3 gap-2">
              {['Owner', 'Agent', 'Buyer'].map((type) => (
                <button
                  key={type}
                  onClick={() => handleUserTypeChange(type)}
                  className={`py-2 px-1 text-sm font-medium rounded border transition-all
                    ${userType === type 
                      ? 'bg-brand-600 text-white border-brand-600' 
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                >
                  {type}
                </button>
              ))}
           </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <input
              type="text"
              value={data.name || ''}
              onChange={(e) => updateData({ name: e.target.value })}
              placeholder="e.g. Rahul Sharma"
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none"
            />
            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="e.g. rahul@example.com"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <div className="flex">
            <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              +91
            </span>
            <input
              type="tel"
              value={data.phone || ''}
              onChange={(e) => {
                 const val = e.target.value.replace(/\D/g, '');
                 updateData({ phone: val });
              }}
              placeholder="98765 43210"
              maxLength={10}
              className="flex-1 px-4 py-3 rounded-r-md border border-gray-300 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 text-center">
         <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-6">
           <Lock size={12} />
           <span>Your details are kept strictly confidential.</span>
         </div>

         <div className="flex gap-4">
            <button
              onClick={onBack}
              disabled={isLoading}
              className="px-6 py-4 rounded-md font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={onSubmit}
              disabled={!isValid || isLoading}
              className={`flex-1 py-4 rounded-md font-bold text-lg uppercase tracking-wide transition-all shadow-lg flex items-center justify-center gap-2
                ${isValid 
                  ? 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-brand-500/20' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              {isLoading ? (
                <>Analyzing Market...</>
              ) : (
                <>Show Valuation Report</>
              )}
            </button>
         </div>
      </div>
    </div>
  );
};