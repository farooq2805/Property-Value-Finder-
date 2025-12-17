import React, { useState, useRef } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StepWizard } from './components/StepWizard';
import { ResultView } from './components/ResultView';
import { PropertyDetails, LeadDetails, ValuationResult } from './types';
import { getPropertyValuation } from './services/geminiService';
import { TrendingUp, ShieldCheck, FileText } from 'lucide-react';

enum AppState {
  LANDING = 'LANDING',
  FORM = 'FORM',
  RESULT = 'RESULT'
}

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [propertyData, setPropertyData] = useState<PropertyDetails | null>(null);
  const [initialFormData, setInitialFormData] = useState<Partial<PropertyDetails> | null>(null);
  
  const [leadData, setLeadData] = useState<LeadDetails | null>(null);
  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const startValuation = (data: Partial<PropertyDetails>) => {
    setInitialFormData(data);
    setAppState(AppState.FORM);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleValuationComplete = async (data: PropertyDetails, lead: LeadDetails) => {
    setPropertyData(data);
    setLeadData(lead);
    setIsLoading(true);
    
    console.log("Lead Captured:", lead);

    try {
      const result = await getPropertyValuation(data);
      setValuationResult(result);
      setAppState(AppState.RESULT);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.error("Valuation Failed:", error);
      let errorMessage = "We encountered an issue analyzing the market data. Please try again.";
      
      if (error.message && (error.message.includes("API Key") || error.message.includes("403"))) {
         errorMessage = "Configuration Error: API Key is invalid or missing.";
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAppState(AppState.LANDING);
    setValuationResult(null);
    setInitialFormData(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      <Header />
      
      <main className="flex-grow">
        {appState === AppState.LANDING && (
          <>
            <Hero onStart={startValuation} />
            
            {/* Methodology Section */}
            <div className="py-24 bg-white relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-900 via-brand-500 to-brand-900 opacity-20"></div>
              
              <div className="max-w-7xl mx-auto px-4 text-center">
                 <span className="text-brand-500 font-bold tracking-widest uppercase text-xs mb-2 block">Why Choose Us</span>
                 <h2 className="text-4xl font-serif font-bold text-brand-950 mb-6">Expert Valuation Methodology</h2>
                 <p className="text-slate-600 max-w-2xl mx-auto mb-16 text-lg font-light leading-relaxed">
                   We combine extensive local market knowledge with real-time data analysis to provide accurate property estimates that banks and investors trust.
                 </p>
                 
                 <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="group p-10 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-500/30 transition-all hover:shadow-2xl hover:shadow-brand-900/5 relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-1 h-full bg-brand-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md text-brand-500 mx-auto group-hover:bg-brand-500 group-hover:text-white transition-colors">
                          <TrendingUp size={28} />
                       </div>
                       <h3 className="font-serif font-bold text-xl mb-3 text-brand-950">Micro-Market Analysis</h3>
                       <p className="text-slate-600 text-sm leading-relaxed">Evaluation based on specific pincode trends, street-level demand, and neighborhood amenities.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="group p-10 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-500/30 transition-all hover:shadow-2xl hover:shadow-brand-900/5 relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-1 h-full bg-brand-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md text-brand-500 mx-auto group-hover:bg-brand-500 group-hover:text-white transition-colors">
                          <ShieldCheck size={28} />
                       </div>
                       <h3 className="font-serif font-bold text-xl mb-3 text-brand-950">Reliable Data Sources</h3>
                       <p className="text-slate-600 text-sm leading-relaxed">Comprehensive study of price appreciation over the last 5 years using verified transaction data.</p>
                    </div>

                    {/* Card 3 */}
                    <div className="group p-10 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-500/30 transition-all hover:shadow-2xl hover:shadow-brand-900/5 relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-1 h-full bg-brand-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md text-brand-500 mx-auto group-hover:bg-brand-500 group-hover:text-white transition-colors">
                          <FileText size={28} />
                       </div>
                       <h3 className="font-serif font-bold text-xl mb-3 text-brand-950">Professional Report</h3>
                       <p className="text-slate-600 text-sm leading-relaxed">Get a detailed breakdown of your property's potential value instantly in a corporate-grade format.</p>
                    </div>
                 </div>
              </div>
            </div>
          </>
        )}

        {appState === AppState.FORM && (
          <div className="bg-slate-50 py-16 px-4 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
             <div ref={formRef} className="w-full max-w-3xl">
               <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-950 mb-3">Property Details</h2>
                 <p className="text-slate-500 font-light">Please provide accurate details to generate a precise valuation report.</p>
               </div>
               <StepWizard 
                  onComplete={handleValuationComplete} 
                  isLoading={isLoading} 
                  initialData={initialFormData}
               />
             </div>
          </div>
        )}

        {appState === AppState.RESULT && valuationResult && propertyData && (
          <div className="bg-slate-50 py-12 px-4 min-h-[calc(100vh-80px)]">
             <ResultView 
               result={valuationResult} 
               inputData={propertyData} 
               onReset={handleReset} 
             />
          </div>
        )}
      </main>

      <footer className="bg-brand-950 text-white py-16 border-t border-brand-900 relative overflow-hidden">
        {/* Subtle decorative circle */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-500 opacity-5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6 text-brand-500">
             <span className="h-px w-8 bg-brand-500"></span>
             <span className="uppercase tracking-widest text-xs font-bold">Est. 2025</span>
             <span className="h-px w-8 bg-brand-500"></span>
          </div>
          <h3 className="font-serif font-bold text-2xl mb-4 text-white">RAVI KEWALRAMANI</h3>
          <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-10">Premium Real Estate Valuation Services</p>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400 mb-10 font-medium">
            <a href="#" className="hover:text-brand-500 transition-colors uppercase tracking-wider text-xs">Privacy Policy</a>
            <a href="#" className="hover:text-brand-500 transition-colors uppercase tracking-wider text-xs">Terms of Service</a>
            <a href="#" className="hover:text-brand-500 transition-colors uppercase tracking-wider text-xs">Contact</a>
          </div>
          
          <p className="text-xs text-slate-600 font-light">&copy; {new Date().getFullYear()} Ravi Kewalramani. All rights reserved.</p>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;