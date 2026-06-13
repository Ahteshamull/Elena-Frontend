import React from 'react';
import { CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const SummarySidebar = ({
  isSubmitting,
  isSubmittingAPI,
  onPreviewClick,
  onBackClick,
}) => {
  const summaryItems = [
    { label: 'Identity & Background', status: 'VERIFIED', icon: CheckCircle2, active: true },
    { label: 'Culinary Signature', status: 'COMPLETED', icon: CheckCircle2, active: true },
    { label: 'Portfolio Media', status: '12 ASSETS UPLOADED', icon: CheckCircle2, active: true },
  ];

  return (
    <div className="flex flex-col gap-8 lg:sticky lg:top-32 h-fit mt-[180px]">
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 flex flex-col gap-8">
        <h3 className="text-xl font-bold text-primary-900">Onboarding Summary</h3>
        
        <div className="flex flex-col gap-6">
          {summaryItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <item.icon 
                size={18} 
                className={cn(item.active ? "text-[#2E7D32]" : "text-gray-200")} 
              />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-primary-900 leading-tight">
                  {item.label}
                </span>
                <span className={cn(
                  "text-[8px] font-black tracking-widest uppercase mt-1", 
                  item.active ? "text-[#2E7D32]" : "text-red-500"
                )}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-4 border-t border-gray-50">
          <Button 
            type="submit" 
            isLoading={isSubmitting || isSubmittingAPI}
            loadingText="Submitting..."
            className="bg-black hover:bg-gray-900 text-white w-full py-5 rounded-xl font-black text-[9px] tracking-[0.2em] uppercase shadow-xl"
          >
            Submit for Approval
          </Button>
          <Button 
            type="button" 
            onClick={onPreviewClick}
            variant="outline" 
            className="w-full py-5 rounded-xl font-black text-[9px] tracking-[0.2em] uppercase border-gray-100 hover:bg-gray-50"
          >
            Profile Preview
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={onBackClick}
            className="w-full py-5 rounded-xl font-black text-[9px] tracking-[0.2em] uppercase border-gray-100 hover:bg-gray-50"
          >
            Go Back
          </Button>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="bg-[#FAFAFA] rounded-[32px] p-6 border border-gray-100 flex flex-col items-center text-center gap-4">
        <span className="text-[8px] font-black text-gray-400 tracking-[0.2em] uppercase">
          Elite Concierge Trust
        </span>
        <div className="flex gap-6 text-gray-300">
          <ShieldCheck size={20} />
          <Lock size={20} />
          <ShieldCheck size={20} />
        </div>
      </div>
    </div>
  );
};

export { SummarySidebar };
