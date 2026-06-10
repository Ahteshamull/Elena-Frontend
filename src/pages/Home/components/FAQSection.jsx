import React from "react";
import { motion } from "framer-motion";
import { Accordion } from "../../../components/ui/Accordion";
import { useGetAllFaqsQuery } from "../../../redux/api/faqApi";

export default function FAQSection() {
  const { data, isLoading } = useGetAllFaqsQuery();
  const faqItems = data?.data?.faqs || [];

  return (
    <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-primary-900 mb-4 md:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
            You can browse our curated list of chefs, select one that matches
            your criteria, and send a booking request. Once the chef accepts,
            you can finalize details and payment through our secure platform.
          </p>
        </div>
        <Accordion
          items={faqItems}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100"
        />
      </motion.div>
    </section>
  );
}
