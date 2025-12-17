import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StepWizard } from './components/StepWizard';
import { ResultView } from './components/ResultView';
import { PropertyDetails, LeadDetails, ValuationResult } from './types';
import { getPropertyValuation } from './services/geminiService';

enum AppState {
  LANDING = 'LANDING',
  FORM = 'FORM',
  RESULT = 'RESULT'
}

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [propertyData, setPropertyData] = useState<PropertyDetails | null>(null);
  const [leadData, setLeadData] = useState<LeadDetails | null>(null);
  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const startValuation = () => {
    setAppState(AppState.FORM);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleValuationComplete = async (data: PropertyDetails, lead: LeadDetails) => {
    setPropertyData(data);
    setLeadData(lead);
    setIsLoading(true);
    
    // Here you would typically send the lead data to your CRM
    console.log("Lead Captured:", lead);

    try {
      const result = await getPropertyValuation(data);
      setValuationResult(result);
      setAppState(AppState.RESULT);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      alert("We encountered an issue analyzing the market data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAppState(AppState.FORM);
    setValuationResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <Header />
      
      <main className="flex-grow">
        {appState === AppState.LANDING && (
          <>
            <Hero onStart={startValuation} />
            
            <div className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 text-center">
                 <h2 className="text-3xl font-serif font-bold text-brand-900 mb-4">Expert Valuation Methodology</h2>
                 <p className="text-gray-600 max-w-2xl mx-auto mb-16">
                   We combine extensive local market knowledge with real-time data analysis to provide accurate property estimates.
                 </p>
                 <div className="grid md:grid-cols-3 gap-10">
                    <div className="p-8 rounded-sm border border-gray-100 hover:shadow-xl transition-shadow">
                       <h3 className="font-serif font-bold text-xl mb-3 text-brand-900">Micro-Market Analysis</h3>
                       <p className="text-gray-600 text-sm leading-relaxed">Evaluation based on specific pincode trends, street-level demand, and neighborhood amenities.</p>
                    </div>
                    <div className="p-8 rounded-sm border border-gray-100 hover:shadow-xl transition-shadow">
                       <h3 className="font-serif font-bold text-xl mb-3 text-brand-900">Historical Trends</h3>
                       <p className="text-gray-600 text-sm leading-relaxed">Comprehensive study of price appreciation over the last 5 years to forecast future value.</p>
                    </div>
                    <div className="p-8 rounded-sm border border-gray-100 hover:shadow-xl transition-shadow">
                       <h3 className="font-serif font-bold text-xl mb-3 text-brand-900">Comprehensive Report</h3>
                       <p className="text-gray-600 text-sm leading-relaxed">Get a detailed breakdown of your property's potential value instantly without waiting for an appointment.</p>
                    </div>
                 </div>
              </div>
            </div>
          </>
        )}

        {appState === AppState.FORM && (
          <div className="bg-gray-50 py-16 px-4 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
             <div ref={formRef} className="w-full">
               <div className="text-center mb-10">
                 <h2 className="text-3xl font-serif font-bold text-brand-900">Property Details</h2>
                 <p className="text-gray-500 mt-2">Please provide accurate information for the most precise valuation.</p>
               </div>
               <StepWizard onComplete={handleValuationComplete} isLoading={isLoading} />
             </div>
          </div>
        )}

        {appState === AppState.RESULT && valuationResult && propertyData && (
          <div className="bg-gray-50 py-12 px-4 min-h-[calc(100vh-80px)]">
             <ResultView 
               result={valuationResult} 
               inputData={propertyData} 
               onReset={handleReset} 
             />
          </div>
        )}
      </main>

      <footer className="bg-brand-900 text-white py-12 border-t border-brand-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="font-serif font-bold text-xl mb-4">Ravi Kewalramani</h3>
          <p className="text-brand-500 text-sm uppercase tracking-widest mb-8">Premium Real Estate Services</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
          <p className="mt-8 text-xs text-gray-600">&copy; {new Date().getFullYear()} Ravi Kewalramani. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;