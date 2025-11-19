import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import candleImg from "../../../assets/candleCardImage.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../../components/ProductCard";
import BASE_URL from "../../../utils/Base_url";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet-async";

const SingleCandleDetails = () => {
  const { slug} = useParams();
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productDetails, setProductDetails] = useState([]);

  // Fetch all products for "More Candles" section
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/user/products`,
          { withCredentials: true }
        );
        setProductDetails(response.data?.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/user/singleProduct/${slug}`,
          { withCredentials: true } // optional if your backend uses cookies
        );
        setProduct(response.data?.product);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAddToCart = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}user/add-to-cart`,
        { productId: product._id, quantity },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("✅ Successfully added to cart!");
      } else {
        toast.error("❌ Failed to add to cart");
      }
    } catch (err) {
      console.error(err);
      toast.warn("⚠️ You must be logged in to add items to cart");
    }
  };

  return (
    <div className="bg-bg">
      <Helmet>
        <title>{product.name} - Buy Candles Online</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={`Candles, ${product.name}, Aroma, Wax`} />
        <meta name="author" content="Your Company Name" />
      </Helmet>

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-bg p-6 md:p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <img
              src={product.image?.[0] || candleImg}
              alt={product.name}
              className="w-full sm:h-[545px] rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Product Details Section */}
          <div className="w-full lg:w-1/2 space-y-4">
            {/* Title and Price */}
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-serif text-gray-900">{product.name}</h1>
              <div className="text-right">
                <span className="text-3xl font-semibold text-gray-900">
                  Rs.{product.price}
                </span>
              </div>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber-600">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">
                {product.more_details?.rating || "No rating"} ({product.reviews || 0} Reviews)
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 mt-6">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">
                  <Minus size={20} />
                </button>
                <span className="mx-6 text-lg font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">
                  <Plus size={20} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white hover:text-black hover:border border-primary rounded-full py-3 px-8 font-medium hover:bg-white transition"
                aria-label={`Add ${product.name} to cart`}
              >
                ADD TO CART
              </button>
            </div>

            {/* Accordion Sections */}
            <div className="mt-8 space-y-4">
              {["description", "ingredients", "howto", "howtofeel"].map((section) => (
                <div key={section} className="border-b border-gray-300">
                  <button
                    onClick={() => toggleSection(section)}
                    className="w-full flex justify-between items-center py-4 text-left"
                  >
                    <span className="text-xl font-medium text-gray-900">
                      {section === "description" ? "Description" :
                       section === "ingredients" ? "Ingredients" :
                       section === "howto" ? "How To Use?" : "How To Feel?"}
                    </span>
                    <Plus className={`transform transition-transform ${openSection === section ? "rotate-45" : ""}`} />
                  </button>
                  {openSection === section && (
                    <div className="pb-4 text-gray-600">
                      {section === "description" && <p>{product.description}</p>}
                      {section === "ingredients" && (
                        <p>
                          Made with {product.more_details?.waxType}, Aroma Type "{product.more_details?.aromaType}", cotton wick, and eco-friendly fragrance blend.
                        </p>
                      )}
                      {section === "howto" && (
                        <p>
                          Light the wick and let burn for 2-3 hours on first use. Trim wick to 1/4 inch before each use for optimal performance.
                        </p>
                      )}
                      {section === "howtofeel" && (
                        <p>
                          You are like being under a pine tree at the foot of the hill. The smell of earth mixed with rain will cool you.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* More Candles */}
      <div className="similar-cards">
        <h2 className="flex justify-center font-heading text-5xl my-10">More Candles</h2>
        <div className="cardMainRight p-6 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-x-hidden">
          {productDetails.filter(p => p.slug !== slug).slice(0, 4).map((eachProduct) => (
            <Link key={eachProduct.slug} to={`/search-candles/${eachProduct.slug}`}>
              <ProductCard eachProduct={eachProduct} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleCandleDetails;
