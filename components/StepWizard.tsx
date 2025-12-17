import React, { useState, useCallback, useEffect } from 'react';
import { PropertyDetails, LeadDetails, PropertyType, FurnishingStatus, PossessionStatus } from '../types';
import { LocationStep } from './steps/LocationStep';
import { PropertyStep } from './steps/PropertyStep';
import { FeaturesStep } from './steps/FeaturesStep';
import { LeadCaptureStep } from './steps/LeadCaptureStep';
import { Check } from 'lucide-react';

interface StepWizardProps {
  onComplete: (data: PropertyDetails, lead: LeadDetails) => void;
  isLoading: boolean;
  initialData?: Partial<PropertyDetails> | null;
}

const STEPS = ['Location', 'Details', 'Features', 'Get Report'];

export const StepWizard: React.FC<StepWizardProps> = ({ onComplete, isLoading, initialData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const [propertyData, setPropertyData] = useState<Partial<PropertyDetails>>({
    city: 'Mumbai',
    propertyType: PropertyType.APARTMENT,
    furnishing: FurnishingStatus.SEMI_FURNISHED,
    possession: PossessionStatus.READY_TO_MOVE,
    bhk: 2,
    ageOfProperty: 5
  });

  const [leadData, setLeadData] = useState<Partial<LeadDetails>>({});

  useEffect(() => {
    if (initialData) {
      setPropertyData(prev => ({ ...prev, ...initialData }));
      if (initialData.city && initialData.locality) {
        setCurrentStep(1);
      }
    }
  }, [initialData]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (propertyData && leadData.name && leadData.email && leadData.phone) {
      onComplete(propertyData as PropertyDetails, leadData as LeadDetails);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updatePropertyData = useCallback((data: Partial<PropertyDetails>) => {
    setPropertyData(prev => ({ ...prev, ...data }));
  }, []);

  const updateLeadData = useCallback((data: Partial<LeadDetails>) => {
    setLeadData(prev => ({ ...prev, ...data }));
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <LocationStep data={propertyData} updateData={updatePropertyData} onNext={handleNext} />;
      case 1:
        return <PropertyStep data={propertyData} updateData={updatePropertyData} onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <FeaturesStep data={propertyData} updateData={updatePropertyData} onSubmit={handleNext} onBack={handleBack} isLoading={isLoading} />;
      case 3:
        return <LeadCaptureStep data={leadData} updateData={updateLeadData} onSubmit={handleSubmit} onBack={handleBack} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-none md:rounded-lg shadow-2xl overflow-hidden border-t-4 border-brand-500">
      {/* Progress Header */}
      <div className="bg-white px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between relative">
           {/* Connecting Line */}
           <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-100 -z-10 transform -translate-y-1/2 mx-4"></div>
           
           {STEPS.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative bg-white px-2">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 border-2
                ${index < currentStep 
                  ? 'bg-brand-500 border-brand-500 text-white' 
                  : index === currentStep
                    ? 'bg-white border-brand-500 text-brand-500 shadow-gold'
                    : 'bg-white border-gray-200 text-gray-300'}`}>
                {index < currentStep ? <Check size={18} /> : index + 1}
              </div>
              <span className={`mt-2 text-[10px] font-bold uppercase tracking-widest transition-colors
                ${index <= currentStep ? 'text-brand-900' : 'text-gray-300'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-10 min-h-[400px]">
        {renderStep()}
      </div>
    </div>
  );
};