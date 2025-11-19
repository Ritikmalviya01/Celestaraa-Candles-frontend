import React, { useEffect, useState } from "react";
import cardCandleImage from "../../../assets/candleCardImage.svg";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios" 
import ProductCard from "../../../components/ProductCard";
import AdminProductCad from "../components/AdminProductCad";
import BASE_URL from "../../../utils/Base_url";


const ViewProduct = () => {
const [prductDetails , setProductDetails] = useState([])
const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `${BASE_URL}/admin/delete-product`,
        { 
          data: { productId },
          withCredentials: true }
      );

      if (res.data.success) {
        alert(res.data.message);
        // Remove deleted product from state
        setProductDetails((prev) => prev.filter((p) => p._id !== productId));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/listed-products`,
          {withCredentials: true,}
         );
        setProductDetails(response.data?.products); 
        console.log(response.data)// use response.data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // call the async function
  }, []); 

  return (
    <div className="px-6 py-12 bg-bg flex flex-col gap-12">
      <div className="heading">
        <h3 className="text-center text-4xl font-heading  tracking-wider">
          LISTED PRODUCTS
        </h3>
      
      </div>

      <div className="cardMain grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-8">
        {prductDetails.map((eachProduct,i) => (
          <AdminProductCad key={i} 
          eachProduct={eachProduct} 
          onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default ViewProduct;
