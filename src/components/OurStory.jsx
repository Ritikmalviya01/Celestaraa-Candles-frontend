import React from "react";
import storyImg from "../assets/footerImages/redLeaf.png"; // ← replace with your own image

const OurStory = () => {
  return (
    <section className="bg-primary py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* 🖼️ Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src={storyImg}
            alt="Our Story"
            className="rounded-2xl shadow-xl w-80 sm:w-96 md:w-[450px] object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* 📝 Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
            Our Story
          </h2>

          {/* Inspirational Line */}
          <p className="text-xl sm:text-2xl font-semibold text-white mb-4 italic">
            “Every great story begins with a spark — ours began with a flame that never fades.”
          </p>

          {/* Description */}
          <p className="text-gray-100 leading-relaxed text-base sm:text-lg">
            What started as a small passion project soon became a mission to spread warmth and positivity. 
            Each candle we craft carries the essence of creativity, care, and connection — designed to make 
            every space feel like home. With every flame, we aim to inspire peace, comfort, and a moment of calm 
            in this fast-moving world.
          </p>

          {/* Decorative Line */}
          <div className="mt-6 w-20 h-1 bg-teal-500 rounded-full mx-auto md:mx-0"></div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
