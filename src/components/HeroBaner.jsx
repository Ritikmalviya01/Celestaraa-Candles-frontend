import { useEffect, useState } from "react";
import baner1 from "../assets/baner1.png"
import baner2 from "../assets/baner2.png"
import baner3 from "../assets/baner3.png"
import baner4 from "../assets/baner4.png"
import { Link } from "react-router-dom";


const images = [
  baner1,
  baner2,
  baner3,
  baner4,
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // 4 seconds delay
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Slide ${i}`}
            className="w-full h-[80vh] md:h-[90vh] object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Overlay Content */}
      <div className="absolute p-6 sm:p-2 inset-0 flex flex-col justify-center items-center text-center text-white bg-black/25">
        <h1 className="text-3xl md:text-6xl font-heading  font-bold drop-shadow-lg">
          Celestaraa Candles
        </h1>
        <p className="mt-2 font-text max-w-lg text-sm md:text-lg ">
Every Melt a Story, Every Glow a Promise        </p>
        <div className="mt-4 flex gap-4">
          <Link  to="/search-candles">
          <button className="px-6 py-2 hover:bg-primary hover:text-white text-black rounded-xl shadow bg-bg transition">
            Shop Now
          </button>
          </Link>
          <Link to="/about">
          <button className="px-6 py-2 border hover:border-primary rounded-xl hover:bg-primary hover:text-white transition">
            Learn More
          </button>
          </Link>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-11 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === i ? "bg-white scale-110" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
