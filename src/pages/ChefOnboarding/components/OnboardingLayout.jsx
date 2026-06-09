import React from 'react';
import { cn } from '../../../utils/cn';

const Stepper = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'BASIC' },
    { id: 2, name: 'PORTFOLIO' },
    { id: 3, name: 'PUBLISH' },
  ];

  return (
    <div className="flex items-center gap-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center gap-1">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
              currentStep === step.id 
                ? "bg-black text-white" 
                : "bg-gray-100 text-gray-400"
            )}>
              {step.id}
            </div>
            <span className={cn(
              "text-[10px] font-bold tracking-widest",
              currentStep === step.id ? "text-primary-900" : "text-gray-300"
            )}>
              {step.name}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="h-[2px] w-12 bg-gray-100 mb-4" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const OnboardingLayout = ({ children, currentStep = 1, title = "Artisan Onboarding", wider = false, noCard = false }) => {
  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col items-center pt-32 pb-20 px-6">
      {/* Header */}
      <div className={cn(
        "w-full flex justify-between items-center mb-12",
        wider ? "max-w-6xl" : "max-w-4xl"
      )}>
        <span className="text-sm font-bold text-primary-900 uppercase tracking-widest">{title}</span>
        <Stepper currentStep={currentStep} />
      </div>

      {/* Content */}
      {noCard ? (
        <div className={cn("w-full", wider ? "max-w-6xl" : "max-w-4xl")}>
          {children}
        </div>
      ) : (
        <div className={cn(
          "w-full bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 md:p-16",
          wider ? "max-w-6xl" : "max-w-4xl"
        )}>
          {children}
        </div>
      )}
    </div>
  );
};

export { OnboardingLayout };
