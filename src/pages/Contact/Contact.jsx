import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { useCreateContactMutation } from '../../redux/api/contactApi';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [createContact] = useCreateContactMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    const names = data.name.trim().split(" ");
    const firstName = names[0];
    const lastName = names.slice(1).join(" ") || "User"; // Backend requires lastName
    
    const apiFormData = new FormData();
    apiFormData.append("firstName", firstName);
    apiFormData.append("lastName", lastName);
    apiFormData.append("email", data.email);
    apiFormData.append("subject", data.subject);
    apiFormData.append("message", data.message);
    
    try {
      await createContact(apiFormData).unwrap();
      
      console.log("Form submitted successfully");
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#FAFAFA]">
      {/* 1. Hero Section */}
      <section className="w-full max-w-4xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-6">
          BESPOKE SERVICE
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-gray-900 mb-8 leading-tight">
          Contact Our Concierge
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed">
          Experience bespoke service tailored to your most refined desires. Our
          dedicated team is at your disposal to craft every detail of your
          journey.
        </p>
      </section>

      {/* 2. Inquiry Form & Direct Assistance */}
      <section
        id="inquiry-form"
        className="w-full max-w-7xl mx-auto px-6 pb-20 md:pb-32"
      >
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Inquiry Form (Left) */}
          <div className="col-span-1 lg:col-span-8 bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-serif font-medium text-gray-900 mb-12">
              Inquiry Form
            </h2>

            {isSubmitted ? (
              <div className="flex flex-col items-center py-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-medium text-gray-900 mb-4">
                  Message Received
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Thank you for reaching out. Our concierge team will review
                  your request and contact you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-xs font-bold tracking-widest uppercase text-[#D4AF37] hover:text-black transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-gray-900">
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Julian Vane"
                      className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-gray-900 text-gray-900 placeholder-gray-300 transition-colors bg-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-gray-900">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="concierge@epicurean.com"
                      className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-gray-900 text-gray-900 placeholder-gray-300 transition-colors bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-gray-900">
                    Subject
                  </label>
                  <input
                    name="subject"
                    type="text"
                    required
                    placeholder="Private Dining Experience"
                    className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-gray-900 text-gray-900 placeholder-gray-300 transition-colors bg-transparent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-gray-900">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    placeholder="How can we assist you with your next request?"
                    rows={4}
                    className="w-full border-b border-gray-200 py-3 text-sm focus:outline-none focus:border-gray-900 text-gray-900 placeholder-gray-300 transition-colors bg-transparent resize-none"
                  />
                </div>

                <div className="mt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    className="bg-black hover:bg-gray-800 text-white rounded-full px-10 py-4 text-xs font-bold tracking-widest uppercase flex items-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? "SENDING..." : "SEND INQUIRY"}{" "}
                    <span className="text-lg leading-none">→</span>
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Direct Assistance (Right) */}
          <div className="col-span-1 lg:col-span-4 bg-[#F5F5F0] rounded-3xl p-8 md:p-10 flex flex-col items-center gap-6 shadow-sm">
            {/* <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 shadow-lg border border-white/50">
              <img 
                src="/cnt_2.png" 
                alt="Concierge Avatar" 
                className="w-full h-full object-cover object-top"
              />
            </div> */}
            <div className="flex flex-col items-center sm:items-start lg:items-center xl:items-start text-center sm:text-left lg:text-center xl:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Direct Assistance
              </h3>
              <p className="text-sm text-gray-600 italic mb-4">
                Available 24/7 for our priority members.
              </p>
              
              <div className="flex flex-col gap-3 mb-8 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Email: </span>
                  <a
                    href="mailto:elenatableli@gmail.com"
                    className="hover:text-[#D4AF37] hover:underline transition-all"
                  >
                    elenatableli@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">WhatsApp: </span>
                  <a
                    href="https://wa.me/13059058841"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#D4AF37] hover:underline transition-all"
                  >
                    +1 (305) 905-8841
                  </a>
                </div>
              </div>

              <button
                onClick={() =>
                  document
                    .getElementById("inquiry-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-[#D4AF37] hover:text-gray-900 transition-all duration-300"
              >
                REQUEST ASSISTANCE
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom Banner Image */}
      {/* <section className="w-full max-w-7xl mx-auto px-6 pb-20 md:pb-32">
        <div className="relative w-full rounded-3xl overflow-hidden aspect-[4/3] md:aspect-video lg:aspect-[2/1] lg:min-h-[500px]">
          <img 
            src="/cnt_1.png" 
            alt="The Art of Living Well" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 flex flex-col gap-4 max-w-lg z-10">
            <h2 className="text-3xl md:text-5xl font-serif text-white font-medium">
              The Art of Living Well
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              From hard-to-get reservations to private yacht charters, we handle the complexities of a life well-lived.
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
}
