import React, { useState, useEffect } from "react";
import arrow from "../assets/arrowTestimonial.png";
import axios from "axios";
import BASE_URL from "../utils/Base_url";
import { useSelector } from "react-redux";

const TestimonialCarousel = () => {
 
  const [testimonials, setTestimonials] = useState([])

  const { token } = useSelector((state) => state.auth);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getTestimonials = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/list-testimonials`, {
        headers: { Authorization: `Bearer: ${token}` },
      });
      console.log("Testimonials == ", res.data.data);
      setTestimonials(res.data.data)
    } catch (error) {}
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <section className="py-20 bg-gradient-to-b from-[#F8F4EF] to-[#F2EAE1]">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-14 font-heading">
        What Our <span className="text-primary">Clients Say</span>
      </h2>

      {/* Carousel Wrapper */}
      <div className="relative max-w-6xl mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="w-full flex-shrink-0 flex flex-col md:flex-row items-center md:items-center justify-center text-center md:text-left px-6 sm:px-10"
            >
              <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-700 rounded-3xl border border-gray-100 p-6 sm:p-14 flex flex-col md:flex-row items-center md:space-x-10 space-y-8 md:space-y-0 max-w-5xl mx-auto relative">
                {/* Gradient Accent */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-teal-100 to-transparent opacity-0 hover:opacity-40 rounded-3xl transition-opacity duration-700"></div>

                {/* Avatar */}
                <div className="flex-shrink-0 flex justify-center md:justify-start relative z-10">
                  <img
                    src={t.image?t.image : "snsn"}
                    alt={t.name}
                    className="w-32 h-32 sm:w-44 sm:h-44 rounded-full border-4 border-primary shadow-md object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Text Section */}
                <div className="flex-1 relative z-10">
                  <div className="flex justify-between items-center max-sm:flex-col max-sm:justify-center  gap-4">
                    <div className="">
                      <h3 className="text-3xl  md:text-4xl font-bold text-gray-800 mb-1">
                        {t.name}
                      </h3>
                      <p className="text-gray-600 text-base md:text-lg font-medium">
                        {t.title} • {t.location}
                      </p>
                    </div>

                    {/* Quote Icon */}
                    <svg
                      className="w-10 h-10 text-primary opacity-60  "
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                    </svg>
                  </div>

                  {/* Description */}
                  <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed italic">
                    “{t.description}”
                  </p>

                  {/* Divider Arrow */}
                  {/* <div className="flex justify-center md:justify-start mt-6">
                    <img
                      src={arrow}
                      alt="divider"
                      className="w-28 opacity-60"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-10 space-x-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-primary scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
