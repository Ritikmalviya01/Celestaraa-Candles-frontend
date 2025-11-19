import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import BASE_URL from "../../../utils/Base_url"

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  photo: Yup.mixed().required("Photo is required"),
});

const TestimonialForm = () => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("photo", values.photo);

      const response = await axios.post(
        `${BASE_URL}/admin/add-testimonial`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Testimonial added successfully ✅");
        resetForm();
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        toast.error(response.data.message || "Failed to add testimonial ❌");
      }
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast.error("Something went wrong while adding testimonial ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f7f3f0] px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-lg w-full border border-[#e6ddd5]">
        <h2 className="text-2xl font-bold text-[#4b3f34] mb-6 text-center">
          Add Testimonial
        </h2>

        <Formik
          initialValues={{
            name: "",
            description: "",
            photo: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#6a5c4c] mb-1">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 rounded-xl border border-[#e2d7cf] focus:ring-2 focus:ring-[#b08968] focus:outline-none"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#6a5c4c] mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  placeholder="Write testimonial here..."
                  className="w-full px-4 py-2 rounded-xl border border-[#e2d7cf] focus:ring-2 focus:ring-[#b08968] focus:outline-none resize-none"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-[#6a5c4c] mb-2">
                  Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFieldValue("photo", file);
                    setPreview(file ? URL.createObjectURL(file) : null);
                  }}
                  className="block w-full text-sm text-[#4b3f34] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#b08968] file:text-white hover:file:bg-[#8c6c54] cursor-pointer"
                />
                <ErrorMessage
                  name="photo"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />

                {preview && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-full shadow-md border border-[#e6ddd5]"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#b08968] text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-[#8c6c54] transition-all duration-200 shadow-md"
              >
                Submit Testimonial
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TestimonialForm;
