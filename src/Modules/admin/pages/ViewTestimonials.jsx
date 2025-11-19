import React, { useEffect, useState } from "react";
import axios from "axios"
import BASE_URL from "../../../utils/Base_url"
import { ToastContainer, toast } from 'react-toastify';

// Dummy data for now (replace with API/Context data later)
const dummyTestimonials = [
  {
    id: 1,
    name: "Aditi Sharma",
    role: "Customer",
    city: "Mumbai",
    description: "The candles are beautiful and smell divine! Perfect for gifting 💖",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Rohan Verma",
    role: "Designer",
    city: "Delhi",
    description: "Loved the customizable design options. My clients were amazed!",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
   {
    id: 3,
    name: "Aditi Sharma",
    role: "Customer",
    city: "Mumbai",
    description: "The candles are beautiful and smell divine! Perfect for gifting 💖",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 4,
    name: "Rohan Verma",
    role: "Designer",
    city: "Delhi",
    description: "Loved the customizable design options. My clients were amazed!",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const ViewTestimonials = () => {

   const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/list-testimonials`,
          { withCredentials: true } // keep only if route is protected
        );

        // ✅ Access the correct field from backend response
        setTestimonials(response.data?.data || []);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError(err.response?.data?.message || "Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };
useEffect(() => {
    fetchTestimonials();
  }, []);

 const handleDelete = async (_id) => {
  if (!window.confirm("Are you sure you want to delete this testimonial?")) {
    return;
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/admin/delete-testimonial`,
      { testimonialId: _id },
      { withCredentials: true }
    );

    if (response.data.success) {
      toast.success("Testimonial deleted successfully");
      // Refresh list
      fetchTestimonials();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Delete error:", error);
    toast.error("Failed to delete testimonial");
  }
};

  if (loading) return <p>Loading testimonials...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f7f3f0] py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-[#4b3f34] mb-10">
        Customer Testimonials 💬
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-2xl shadow-lg p-6 border border-[#e6ddd5] hover:shadow-xl transition-all flex flex-col items-center "
          >
            {/* Photo */}
            <div className="flex justify-center">
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 object-cover rounded-full shadow-md border border-[#e6ddd5]"
              />
            </div>

            {/* Content */}
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-[#4b3f34]">{t.name}</h3>
             
              <p className="text-gray-600 text-sm mt-3 italic">“{t.description}”</p>
            </div>
            <button onClick={() => handleDelete(t._id)} className="border border-b bg-red-400  w-fit px-3   ">Delete</button>
            
          </div>
          
        ))}
      </div>
            <ToastContainer position="top-right" autoClose={2000} />

    </div>
  );
};

export default ViewTestimonials;
