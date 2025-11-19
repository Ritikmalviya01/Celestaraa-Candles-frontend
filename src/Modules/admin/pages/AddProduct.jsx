// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { filterConfigs } from "../components/filterConfigs";

// const AddProduct = () => {
//   const [previewImages, setPreviewImages] = useState([]);

//   // Validation Schema
//   const validationSchema = Yup.object({
//     name: Yup.string().required("Product name is required"),
//     price: Yup.number().required("Price is required").positive(),
//     stock: Yup.number().min(0),
//     category: Yup.string().required("Category is required"),
//     more_details: Yup.object(),
//   });

//   // Initial Values
//   const initialValues = {
//     name: "",
//     image: [],
//     category: "",
//     subCategory: "",
//     unit: "piece",
//     stock: 0,
//     price: "",
//     discount: 0,
//     description: "",
//     more_details: {},
//     publish: true,
//   };

//   // Handle Submit
//  const handleSubmit = async (values, { resetForm }) => {
//   try {
//     const formData = new FormData();

//     const imagesArray = Array.isArray(values.image) ? values.image : [];

//     Object.keys(values).forEach((key) => {
//       if (key === "image") {
//         imagesArray.forEach((file) => {
//           formData.append("images", file);
//         });
//       } else if (key === "more_details") {
//         formData.append("more_details", JSON.stringify(values.more_details));
//       } else {
//         formData.append(key, values[key]);
//       }
//     });

//     const response = await axios.post(
//       "http://localhost:8000/api/admin/addProduct",
//       formData,
//      { withCredentials: true } ,
//     );

//     alert("Product Added Successfully!");
//     resetForm();
//     setPreviewImages([]);
//   } catch (error) {
//     alert("Error adding product");
//     console.error(error);
//   }
// };

//   // Handle Image Upload (local preview)
//   const handleImageUpload = (event, setFieldValue) => {
//     const files = Array.from(event.target.files);

//     // Preview
//     const urls = files.map((file) => URL.createObjectURL(file));
//     setPreviewImages((prev) => [...prev, ...urls]);

//     // For Formik values
//     setFieldValue("image", (prevFiles) => [...(prevFiles || []), ...files]);
//   };

//   return (
//     <div className="max-w-7xl p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-2xl font-bold mb-6">Add Product</h2>

//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ values, setFieldValue }) => (
//           <Form className="space-y-4 grid grid-cols-2 gap-2.5">
//             {/* Basic Info */}
//             <div>
//               <label className="block font-medium">Name</label>
//               <Field name="name" className="w-full border rounded p-2" />
//               <ErrorMessage
//                 name="name"
//                 className="text-red-500 text-sm"
//                 component="div"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Price</label>
//               <Field
//                 name="price"
//                 type="number"
//                 className="w-full border rounded p-2"
//               />
//               <ErrorMessage
//                 name="price"
//                 className="text-red-500 text-sm"
//                 component="div"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Stock</label>
//               <Field
//                 name="stock"
//                 type="number"
//                 className="w-full border rounded p-2"
//               />
//             </div>

//             {/* <div>
//               <label className="block font-medium">Category</label>
//               <Field
//                 name="category"
//                 className="w-full border rounded p-2"
//                 placeholder="Enter category ID"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">SubCategory</label>
//               <Field
//                 name="subCategory"
//                 className="w-full border rounded p-2"
//                 placeholder="Enter subCategory ID"
//               />
//             </div> */}

//             <div>
//               <label className="block font-medium">Description</label>
//               <Field
//                 as="textarea"
//                 name="description"
//                 className="w-full border rounded p-2"
//               />
//             </div>

//             {/* Image Upload */}
//             <div>
//               <label className="block font-medium">Product Images</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={(e) => handleImageUpload(e, setFieldValue)}
//                 className="w-full border p-2 rounded"
//               />
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {previewImages.map((src, index) => (
//                   <div
//                     key={index}
//                     className="relative w-24 h-24 border rounded overflow-hidden"
//                   >
//                     <img
//                       src={src}
//                       alt="preview"
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Dynamic Dropdowns */}
//             <h3 className="text-lg font-semibold mt-4">More Details</h3>
//             {filterConfigs.map((filter) => (
//               <div key={filter.key}>
//                 <label className="block font-medium">{filter.title}</label>
//                 {filter.multi ? (
//                   <Field
//                     as="select"
//                     multiple
//                     name={`more_details.${filter.key}`}
//                     className="w-full border rounded p-2"
//                     value={values.more_details[filter.key] || []}
//                     onChange={(e) =>
//                       setFieldValue(
//                         `more_details.${filter.key}`,
//                         Array.from(
//                           e.target.selectedOptions,
//                           (option) => option.value
//                         )
//                       )
//                     }
//                   >
//                     {filter.options.map((opt) => (
//                       <option key={opt} value={opt}>
//                         {opt}
//                       </option>
//                     ))}
//                   </Field>
//                 ) : (
//                   <Field
//                     as="select"
//                     name={`more_details.${filter.key}`}
//                     className="w-full border rounded p-2"
//                   >
//                     <option value="">Select {filter.title}</option>
//                     {filter.options.map((opt) => (
//                       <option key={opt} value={opt}>
//                         {opt}
//                       </option>
//                     ))}
//                   </Field>
//                 )}
//               </div>
//             ))}

//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer"
//             >
//               Add Product
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default AddProduct;
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { filterConfigs } from "../components/filterConfigs";
import BASE_URL from "../../../utils/Base_url"

const AddProduct = () => {
  const [previewImages, setPreviewImages] = useState([]);

  // Initialize more_details properly
  const initialMoreDetails = filterConfigs.reduce((acc, filter) => {
    acc[filter.key] = filter.multi ? [] : "";
    return acc;
  }, {});

  const initialValues = {
    name: "",
    image: [],
    category: "",
    unit: "piece",
    stock: 0,
    price: "",
    discount: 0,
    description: "",
    more_details: initialMoreDetails,
    publish: true,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    price: Yup.number().required("Price is required").positive(),
    stock: Yup.number().min(0),
    category: Yup.string().required("Category is required"),
    more_details: Yup.object(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
 const images = Array.isArray(values.image)
      ? values.image
      : Array.from(values.image || []);

    images.forEach((file) => {
      formData.append("images", file);
    });
      Object.keys(values).forEach((key) => {
        if (key !== "image") {
          if (key === "more_details") {
            formData.append("more_details", JSON.stringify(values.more_details));
          } else {
            formData.append(key, values[key]);
          }
        }
      });
      console.log([...formData.entries()]);

      const response = await axios.post(
        `${BASE_URL}/admin/addProduct`,
        formData,
        { withCredentials: true,
          headers: {
          "Content-Type": "multipart/form-data",
        },
         }
      );

      alert("Product Added Successfully!");
      resetForm();
      setPreviewImages([]);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Error adding product");
    }
  };

  const handleImageUpload = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
     console.log("Selected files:", files);
    setPreviewImages(files.map((f) => URL.createObjectURL(f)));
    setFieldValue("image", files);
  };

  return (
    <div className="max-w-7xl p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block font-medium">Name</label>
              <Field name="name" className="w-full border rounded p-2" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium">Price</label>
              <Field name="price" type="number" className="w-full border rounded p-2" />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Stock */}
            <div>
              <label className="block font-medium">Stock</label>
              <Field name="stock" type="number" className="w-full border rounded p-2" />
            </div>
<div>
  <label>Category</label>
  <Field name="category" className="border rounded p-2" />
  <ErrorMessage name="category" component="div" className="text-red-500" />
</div>
            {/* Description */}
            <div>
              <label className="block font-medium">Description</label>
              <Field as="textarea" name="description" className="w-full border rounded p-2" />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-medium">Product Images</label>
             <input
  type="file"
  name="images"             // ✅ must match upload.array("images")
  accept="image/*"
  multiple
  onChange={(e) => handleImageUpload(e, setFieldValue)}
  className="w-full border p-2 rounded"
/>

              <div className="flex flex-wrap gap-2 mt-3">
                {previewImages.map((src, index) => (
                  <div key={index} className="w-24 h-24 border rounded overflow-hidden">
                    <img src={src} alt="preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Dropdowns */}
            <h3 className="text-lg font-semibold mt-4">More Details</h3>
            {filterConfigs.map((filter) => (
              <div key={filter.key}>
                <label className="block font-medium">{filter.title}</label>
                {filter.multi ? (
                  <Field
                    as="select"
                    multiple
                    name={`more_details.${filter.key}`}
                    className="w-full border rounded p-2"
                    value={values.more_details[filter.key]}
                    onChange={(e) =>
                      setFieldValue(
                        `more_details.${filter.key}`,
                        Array.from(e.target.selectedOptions, (opt) => opt.value)
                      )
                    }
                  >
                    {filter.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Field>
                ) : (
                  <Field as="select" name={`more_details.${filter.key}`} className="w-full border rounded p-2">
                    <option value="">Select {filter.title}</option>
                    {filter.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Field>
                )}
              </div>
            ))}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer"
            >
              Add Product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;

