import React from 'react';

const PolicySection = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-serif font-bold text-primary-900 mb-4">{title}</h2>
    <div className="text-gray-600 space-y-3 leading-relaxed">
      {children}
    </div>
  </section>
);

export default function CancellationPolicy() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-serif text-primary-900 leading-tight mb-4">
            Cancellation & Refund Policy
          </h1>
          <div className="h-1 w-20 bg-accent rounded-full mb-6"></div>
          <p className="text-gray-500 text-lg">
            Our priority is to ensure a fair and transparent experience for both our customers and chefs. Please review our policies regarding cancellations, refunds, and deposits below.
          </p>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <PolicySection title="Customer Cancellation Policy">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-gray-800">More than 14 days before the event:</strong> Full refund.</li>
              <li><strong className="text-gray-800">7-14 days before the event:</strong> 50% refund.</li>
              <li><strong className="text-gray-800">Less than 7 days before the event:</strong> No refund.</li>
              <li><strong className="text-gray-800">Within 48 hours of the event:</strong> No refund.</li>
            </ul>
          </PolicySection>

          <PolicySection title="Booking Deposits">
            <ul className="list-disc pl-5 space-y-2">
              <li>A booking is confirmed once the client pays the deposit.</li>
              <li>The deposit is non-refundable after 7 days before the event date.</li>
              <li>The remaining balance is released to the chef after the event is successfully completed.</li>
            </ul>
          </PolicySection>

          <PolicySection title="Chef Cancellation Policy">
            <ul className="list-disc pl-5 space-y-2">
              <li>If a chef cancels at any time, the customer receives a <strong>100% refund</strong>.</li>
              <li>Tableli will attempt to find a replacement chef.</li>
              <li>Repeated chef cancellations may result in suspension or removal from the platform.</li>
            </ul>
          </PolicySection>

          <PolicySection title="Force Majeure">
            <ul className="list-disc pl-5 space-y-2">
              <li>Natural disasters, government restrictions, severe weather, or other circumstances beyond either party's control may qualify for a refund or rescheduling, subject to review by Tableli.</li>
            </ul>
          </PolicySection>

          <PolicySection title="Platform Fees">
            <ul className="list-disc pl-5 space-y-2">
              <li>Payment processing fees are non-refundable once a booking is confirmed.</li>
              <li>Tableli reserves the right to review disputes and make the final decision regarding refunds.</li>
            </ul>
          </PolicySection>
        </div>
      </div>
    </div>
  );
}