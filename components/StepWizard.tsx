import React, { useState, useCallback } from 'react';
import { PropertyDetails, LeadDetails, PropertyType, FurnishingStatus, PossessionStatus } from '../types';
import { LocationStep } from './steps/LocationStep';
import { PropertyStep } from './steps/PropertyStep';
import { FeaturesStep } from './steps/FeaturesStep';
import { LeadCaptureStep } from './steps/LeadCaptureStep';
import { Check } from 'lucide-react';

interface StepWizardProps {
  onComplete: (data: PropertyDetails, lead: LeadDetails) => void;
  isLoading: boolean;
}

const STEPS = ['Location', 'Property Details', 'Features', 'Get Report'];

export const StepWizard: React.FC<StepWizardProps> = ({ onComplete, isLoading }) => {
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
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
      {/* Progress Header */}
      <div className="bg-brand-900 px-6 py-4 border-b border-brand-800">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold 
                ${index <= currentStep ? 'bg-brand-500 text-brand-900' : 'bg-brand-800 text-brand-400'}`}>
                {index < currentStep ? <Check size={14} /> : index + 1}
              </div>
              <span className={`ml-2 text-xs font-medium uppercase tracking-wider hidden sm:block 
                ${index <= currentStep ? 'text-white' : 'text-brand-700'}`}>
                {step}
              </span>
              {index < STEPS.length - 1 && (
                <div className={`w-8 h-px mx-2 hidden sm:block ${index < currentStep ? 'bg-brand-500' : 'bg-brand-800'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 min-h-[450px]">
        {renderStep()}
      </div>
    </div>
  );
};