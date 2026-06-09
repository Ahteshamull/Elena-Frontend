import React from 'react';
import { Accordion } from '../../../components/ui/Accordion';

const faqItems = [
  {
    question: "How do I book a chef?",
    answer: "You can browse our curated list of chefs, select one that matches your criteria, and send a booking request. Once the chef accepts, you can finalize details and payment through our secure platform."
  },
  {
    question: "What happens if I have dietary restrictions?",
    answer: "All our chefs are highly experienced and can accommodate any dietary restrictions, allergies, or specific preferences. You can specify these requirements during the booking process."
  },
  {
    question: "Can I tip the chef after the event?",
    answer: "Yes, you have the option to tip the chef directly through our platform after your event is successfully completed and you're fully satisfied with the experience."
  }
];

export default function FAQSection() {
  return (
    <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-serif text-primary-900 mb-4 md:mb-6">Frequently Asked Questions</h2>
      </div>
      <Accordion items={faqItems} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100" />
    </section>
  );
}
