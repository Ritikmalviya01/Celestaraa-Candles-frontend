import React, { useState,useEffect } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import SEO from "../components/SEO";
// import axios from "axios"; // uncomment later when backend is ready
// import BASE_URL from "../../utils/Base_url"; // optional if you have one

const Contact = () => {
  // 🧠 Step 1: State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
   
  useEffect(() => {
   console.log(formData)
  }, [formData])
  

  // 🧠 Step 2: Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🧠 Step 3: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic front-end validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all required fields!");
      return;
    }

    try {
      // 📡 Step 4: Placeholder for API call (you’ll integrate later)
      // Example:
      // await axios.post(`${BASE_URL}/contact`, formData);

      console.log("Form Submitted:", formData);
      alert("Message sent successfully! (API integration pending)");

      // Clear form after success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="bg-bg text-gray-800 px-6 py-16 md:px-20 lg:px-32 flex flex-col gap-16">
      {/* ✨ Section 1 - Heading */}

        <SEO
    title="Contact GlowAura Candles | Reach Out to Us"
    description="Get in touch with GlowAura Candles. Questions, feedback, or just a hello — our team is here to help!"
    image="/assets/contact.png"
    url="https://yourdomain.com/contact"
  />
      <section className="text-center flex flex-col gap-4">
        <h3 className="text-2xl font-heading tracking-wider text-primary">
          CONTACT US
        </h3>
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-wider">
          We'd Love to Hear From You
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          Whether you have a question, feedback, or just want to say hello — our team at
          <span className="text-primary font-semibold"> GlowAura Candles</span> is always here to help.
        </p>
      </section>

      {/* ✨ Section 2 - Contact Info */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {[
          {
            icon: <FiMail className="text-3xl text-primary mx-auto mb-3" />,
            title: "Email Us",
            desc: "support@glowaura.com",
          },
          {
            icon: <FiPhone className="text-3xl text-primary mx-auto mb-3" />,
            title: "Call Us",
            desc: "+91 98765 43210",
          },
          {
            icon: <FiMapPin className="text-3xl text-primary mx-auto mb-3" />,
            title: "Visit Us",
            desc: "123 Serenity Lane, Pune, India",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/70 shadow-md rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
          >
            {item.icon}
            <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ✨ Section 3 - Contact Form */}
      <section className="bg-white rounded-2xl shadow-md p-8 md:p-12 max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-heading font-bold text-center mb-8 tracking-wider text-primary">
          Send Us a Message
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary/80 transition duration-300 w-fit mx-auto"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
