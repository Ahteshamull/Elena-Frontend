import React from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../utils/cn';

const faqItems = [
  {
    question: "How do I book a private chef?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    question: "What is included in the service fee?",
    answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    question: "Can I customize the menu?",
    answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
  },
  {
    question: "How far in advance should I book?",
    answer: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
  },
  {
    question: "What happens if I need to cancel?",
    answer: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-serif text-primary-900 mb-6 italic">Frequently Asked Questions</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Everything you need to know about our elite private chef service. Can't find the answer? Contact our concierge.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={cn(
                  "bg-white rounded-2xl border transition-all duration-300",
                  isOpen ? "border-accent shadow-lg shadow-accent/5" : "border-gray-100"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left"
                >
                  <span className={cn(
                    "text-sm md:text-base font-bold transition-colors",
                    isOpen ? "text-primary-900" : "text-gray-700"
                  )}>
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="text-accent shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400 shrink-0" size={20} />
                  )}
                </button>
                
                <div className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}>
                  <div className="px-6 pb-6 text-sm md:text-base text-gray-500 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 bg-primary-900 rounded-[32px] text-white text-center">
          <h3 className="text-xl font-serif italic mb-2">Still have questions?</h3>
          <p className="text-white/60 text-sm mb-6">We're here to help you create the perfect dining experience.</p>
          <button className="bg-accent text-primary-900 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
