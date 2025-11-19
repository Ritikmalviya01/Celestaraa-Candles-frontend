import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import BASE_URL from "../utils/Base_url";

const LandingPageCardsSection = () => {
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/user/products`,
          { withCredentials: true }
        );
        setProductDetails(response.data?.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Show only first 4 products
  const displayedProducts = productDetails.slice(0, 4);

  return (
    <div className="px-6 py-12 bg-bg flex flex-col gap-12">
      <div className="heading">
        <h3 className="text-center text-2xl font-heading tracking-wider">
          TRENDING
        </h3>
        <h2 className="text-center font-heading font-bold text-4xl tracking-wider">
          Shop our popular candle products
        </h2>
      </div>

      {/* ✅ Product Cards */}
      <div className="cardMain grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((eachProduct, i) => (
            <Link to={`/search-candles/${eachProduct._id}`} key={i}>
              <ProductCard eachProduct={eachProduct} />
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products available.
          </p>
        )}
      </div>

      {/* ✅ View All Button */}
      {productDetails.length > 4 && (
        <div className="text-center">
          <Link
            to="/search-candles"
            className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary/80 transition duration-300"
          >
            View All
          </Link>
        </div>
      )}
    </div>
  );
};

export default LandingPageCardsSection;
