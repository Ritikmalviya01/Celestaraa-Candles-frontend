import React from "react";
import cardCandleImage from "../assets/candleCardImage.svg";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import BASE_URL from "../utils/Base_url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ eachProduct }) => {
  const handleAddToCart = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/user/add-to-cart`,
        {
          productId: eachProduct._id,
          quantity: 1,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Successfully added to cart!");
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to Cart Error:", error.response?.data || error.message);
      toast.warn("You must be logged in to add items to cart");
    }
  };

  return (
    <>
      <div
        className="card1 h-fit font-heading flex flex-col gap-6 grid-cols-1"
        role="region"
        aria-label={`Product card for ${eachProduct.name}`}
        itemScope
        itemType="https://schema.org/Product"
      >
        <div className="image w-full" itemProp="image">
          <img
            className="w-full h-full object-cover"
            src={eachProduct?.image?.[0] || cardCandleImage}
            alt={eachProduct.name}
            loading="lazy"
          />
        </div>

        <div className="details w-full">
          <div className="nameAndPrice flex w-full justify-between gap-4">
            <span
              className="name h-16 line-clamp-2 max-sm:text-2xl max-lg:text-2xl md:text-xl lg:text-2xl xl:text-2xl font-bold tracking-wider"
              itemProp="name"
            >
              {eachProduct.name}
            </span>
            <span
              className="price flex text-green-600 items-start text-2xl font-semibold tracking-wider"
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              Rs.{eachProduct.price}
              <meta itemProp="priceCurrency" content="INR" />
              <meta itemProp="price" content={eachProduct.price} />
              <link itemProp="availability" href="https://schema.org/InStock" />
            </span>
          </div>
          <div
            className="desc text-xl line-clamp-2 tracking-wider h-14"
            itemProp="description"
          >
            {eachProduct.description}
          </div>
        </div>

        <div className="addToCardBtn w-full">
          <button
            onClick={handleAddToCart}
            className="w-full py-3 hover:text-white hover:bg-[#4F382E] rounded-full lg:text-base xl:text-xl font-semibold tracking-widest flex gap-4 items-center justify-center border border-[#C9A489]"
            aria-label={`Add ${eachProduct.name} to cart`}
          >
            Add to Cart <IoMdAddCircle />
          </button>
        </div>
      </div>
      {/* Toast container to render the notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default ProductCard;
