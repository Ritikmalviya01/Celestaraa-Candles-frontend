import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "How can I track my candle order?",
    answer:
      "Once your order is shipped, you’ll receive a tracking link via email. You can also check your order status in your account dashboard under 'My Orders'.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 7 days of delivery for unused and undamaged candles. Contact our support team to initiate a return.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, we ship all across India. International shipping will be available soon — stay tuned!",
  },
  {
    question: "Are your candles eco-friendly?",
    answer:
      "Yes! All our candles are made using natural soy wax, lead-free cotton wicks, and recyclable packaging materials.",
  },
  {
    question: "Can I customize candle scents or labels?",
    answer:
      "Absolutely! We offer custom orders for bulk and gift purchases. Just reach out to our team through the contact page.",
  },
];

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-bg min-h-screen text-gray-800 px-6 py-16 md:px-20 lg:px-32 flex flex-col gap-16">
      {/* 🕯 Header */}
      <section className="text-center flex flex-col gap-4">
        <h3 className="text-2xl font-heading tracking-wider text-primary">
          HELP CENTER
        </h3>
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-wider">
          How Can We Assist You?
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          Have questions about your order, shipping, or our products?  
          You’re in the right place — we’ve got all the answers you need below.
        </p>
      </section>

      {/* 🧠 FAQ Section */}
      <section className="max-w-3xl mx-auto w-full flex flex-col gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white/80 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-5 text-left"
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              {openIndex === index ? (
                <FiMinus className="text-primary" size={20} />
              ) : (
                <FiPlus className="text-primary" size={20} />
              )}
            </button>

            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* 💬 Still Need Help Section */}
      <section className="text-center mt-12">
        <h3 className="text-2xl font-heading font-bold text-primary mb-3">
          Still Need Help?
        </h3>
        <p className="text-gray-600 mb-6">
          Can’t find what you’re looking for?  
          Our support team is always ready to assist you.
        </p>
        <a
          href="/contact"
          className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/80 transition duration-300"
        >
          Contact Support
        </a>
      </section>
    </div>
  );
};

export default Help;
