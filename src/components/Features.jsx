import React from "react";
import single1 from "../assets/single-candle1.png";
import single2 from "../assets/single-candle2.png";
import single3 from "../assets/single-candle3.png";

const Features = () => {
  const features = [
    { title: "Therapeutic Scents", img: single1, desc: "Calming aromas that rejuvenate your senses." },
    { title: "Eco-Friendly", img: single2, desc: "Crafted with natural wax and recyclable materials." },
    { title: "Wonderful Designs", img: single3, desc: "Elegant craftsmanship that complements your space." },
  ];

  return (
    <section className="bg-gradient-to-b from-[#F8F4EF] to-[#F2EAE1] py-16 px-4">
      {/* Title */}
      <h2 className="text-center font-heading text-4xl md:text-5xl font-bold text-gray-800 mb-12">
        Why Choose <span className="text-primary">Us</span>
      </h2>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center text-center bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 hover:-translate-y-2"
          >
            {/* Glow effect background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-teal-200 to-pink-200 rounded-2xl transition-opacity duration-500"></div>

            {/* Image */}
            <div className="w-40 h-40 md:w-44 md:h-44 rounded-full border-4 border-primary shadow-md flex items-center justify-center overflow-hidden bg-white transform group-hover:scale-105 transition-transform duration-500">
              <img
                src={feature.img}
                alt={feature.title}
                className="object-contain w-28 h-28 md:w-32 md:h-32 transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Title */}
            <h3 className="mt-6 text-xl md:text-2xl font-semibold text-gray-800 font-heading">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-gray-600 text-sm md:text-base max-w-xs">
              {feature.desc}
            </p>

            {/* Decorative underline */}
            <div className="mt-4 w-16 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
