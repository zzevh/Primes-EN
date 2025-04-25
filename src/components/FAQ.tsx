"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const faqs = [
    {
      question: "How soon will I receive the purchased services?",
      answer: "Our service provides instant order processing - the average time is as low as 3 minutes! We guarantee that each order will be completed in up to 72 hours from the posting of the payment. With us there are no additional fees for priority - every customer receives the same fast and reliable service."
    },
    {
      question: "Can I stagger my fan growth over time?",
      answer: "Yes, of course! There is a gradual fan growth option where you can set them to add at a certain rate instead of immediately. This is available for a small additional fee and allows your account to grow more naturally. *The option will be available soon!"
    },
    {
      question: "Can I order service for several different accounts at the same time?",
      answer: "Yes, of course! You can order the service for any number of accounts at the same time, without any restrictions. Use as much as you want and as often as you want - full freedom!"
    },
    {
      question: "Can I choose which country the fans should come from?",
      answer: "We are currently working on introducing this feature so that you will soon be able to choose which country you want your fans to come from. Soon this option will be available when you place an order!"
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(1); // Domyślnie otwarty drugi element

  return (
    <section id="faq" className="py-24">
      <div className="max-w-[800px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-[56px] font-bold text-white mb-4">
            FAQ&apos;s
          </h2>
          <p className="text-gray-400 text-lg">
          Frequently asked questions:
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1A1A1A]/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#ffffff]/[0.08]"
            >
              <button
                className="w-full px-8 py-6 text-left text-white flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <motion.div
                  initial={false}
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center w-8 h-8  rounded-full bg-[#a3fc3b] text-black"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 2.33331V11.6666"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2.33331 7H11.6666"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-6 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
