import React from "react";
import SEO from "../components/SEO";
import aboutImage from "../assets/baner1.png";

const About = () => {
  return (
    <div className="bg-bg text-gray-800 px-6 py-16 md:px-20 lg:px-32 flex flex-col gap-16">
      {/* ✅ SEO Metadata */}
      <SEO
        title="About GlowAura Candles | Handcrafted Soy Candles"
        description="GlowAura crafts eco-friendly soy candles designed to bring warmth, calm, and joy to your home."
        image={aboutImage}
        url="https://yourdomain.com/about"
      />

      {/* 🕯️ Section 1 - Intro */}
      <section className="text-center flex flex-col gap-4">
        <h3 className="text-2xl font-heading tracking-wider text-primary">
          ABOUT US
        </h3>
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-wider">
          Every Melt a Story, Every Glow a Promise.
        </h1>
        <p className="max-w-3xl mx-auto font-text text-lg text-gray-600 leading-relaxed">
         At <span className="font-semibold  text-primary">Celestaraa</span>,
         we don’t just make candles we create moments of warmth, light
         , and meaning. Each candle is carefully
          hand-poured, carrying the essence of love,
           elegance, and purpose. As it melts, it tells a

            story; as it glows, it delivers a promise of comfort,
            serenity, and the gentle luxury that transforms any space. Here, every flame is more than light,
             it’s an experience, a memory, and a reminder <span className="font-semibold text-primary">, that beauty shines brightest when shared.</span>

        </p>
      </section>

      {/* 🕯️ Section 2 - Image + Story */}
      <section className="flex flex-col lg:flex-row items-center gap-12">
        <img
          src={aboutImage}
          alt="Candle Making - GlowAura"
          className="w-full lg:w-1/2 rounded-2xl shadow-lg"
        />
        <div className="flex flex-col gap-4 lg:w-1/2">
          <h2 className="text-3xl font-heading font-bold tracking-wider">
            Our Story
          </h2>
          <p className="text-gray-600 font-text leading-relaxed">
            Celestaraa began with a passion for light and creativity. Inspired by the simple yet profound beauty of a candle 
             how it melts selflessly to give light, warmth, and calm the brand was born to create luxury handmade 
            candles that transform ordinary moments into serene, joyful experiences. Each candle is hand-poured with
             care using high-quality wax and natural fragrances, reflecting craftsmanship, elegance, and thoughtful design.
          </p>
          <p className="text-gray-600 font-text leading-relaxed">
            At Celestaraa, candles are more than décor they brighten spaces, soothe the mind, 
            and warm the soul. From scented and soy candles to luxury, festive,
             and personalized creations, every candle embodies our vision: every melt tells a story, 
             and every glow delivers a promise.
          </p>
        </div>
      </section>

      {/* 🕯️ Section 3 - Values */}
      <section className="text-center flex flex-col gap-8">
        <h2 className="text-3xl font-heading font-bold tracking-wider">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Sustainability", desc: "Eco-friendly materials and recyclable packaging in every product we craft." },
            { title: "Craftsmanship", desc: "Hand-poured with love, care, and a passion for aromatic perfection." },
            { title: "Community", desc: "Supporting local artisans and creating candles that bring people together." },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 shadow-md rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🕯️ Section 4 - CTA */}
      <section className="text-center bg-primary text-white rounded-2xl py-12 px-6 flex flex-col items-center gap-4">
        <h2 className="text-3xl font-heading font-bold tracking-wider">
          Light Up Your Mood Today
        </h2>
        <p className="max-w-2xl mx-auto text-white/90">
          Discover the perfect scent that matches your vibe and transforms your
          space into a cozy retreat.
        </p>
        <a
          href="/search-candles"
          className="mt-4 w-fit inline-block bg-white text-primary font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300"
        >
          Explore Collection
        </a>
      </section>
    </div>
  );
};

export default About;
