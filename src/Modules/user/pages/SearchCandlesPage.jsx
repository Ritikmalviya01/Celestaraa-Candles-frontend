import React, { useEffect, useState, useContext } from "react";
import ProductCard from "../../../components/ProductCard";
import { FaChevronDown, FaChevronUp, FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { SearchQuery } from "../../../components/Context";

import BASE_URL from "../../../utils/Base_url";


// 🧩 Filter Section
import axios from "axios";
import { Link } from "react-router-dom";
import SEO from "../../../components/SEO";

const FilterSection = ({ title, options, selected, onChange }) => {
  const [open, setOpen] = useState(true);

  // Special handling for price (numeric input)
  if (title === "Price") {
    const [min, max] = selected;
    return (
      <div className="border-b border-gray-200 py-4">
        <button
          onClick={() => setOpen(!open)}
          className="flex justify-between items-center w-full text-lg font-semibold tracking-wide"
        >
          {title}
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {open && (
          <div className="mt-3 flex gap-2">
            <input
              type="number"
              placeholder="Min"
              aria-label="Minimum price"
              value={min || ""}
              onChange={(e) =>
                onChange("Price", [
                  e.target.value ? Number(e.target.value) : null,
                  max,
                ])
              }
              className="w-20 px-2 py-1 border rounded"
            />
            <input
              type="number"
              placeholder="Max"
              aria-label="Maximum price"
              value={max || ""}
              onChange={(e) =>
                onChange("Price", [
                  min,
                  e.target.value ? Number(e.target.value) : null,
                ])
              }
              className="w-20 px-2 py-1 border rounded"
            />
          </div>
        )}
      </div>
    );
  }

  // Default for checkbox filters
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-lg font-semibold tracking-wide"
      >
        {title}
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {open && (
        <div className="mt-3 flex flex-col gap-2">
          {options.map((opt, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => {
                  let updated = [...selected];
                  if (updated.includes(opt)) {
                    updated = updated.filter((x) => x !== opt);
                  } else {
                    updated.push(opt);
                  }
                  onChange(title, updated);
                }}
                className="w-4 h-4 accent-[#C9A489] cursor-pointer"
              />
              <span className="text-sm tracking-wide">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// 🕯 Main Page
const SearchCandlesPage = () => {
      const SITE_URL = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

  const [productDetails, setProductDetails] = useState([]);
  const value = useContext(SearchQuery);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // mobile drawer state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/products`, {
          withCredentials: true,
        });
        setProductDetails(response.data?.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Filters state
  const [filters, setFilters] = useState({
    "Aroma Level": [],
    "Aroma Type": [],
    "Product Size": [],
    "Burn Time": [],
    "Wax Type": [],
    "Wick Type": [],
    Color: [],
    "Eco-Friendly": [],
    Rating: [],
    Occasion: [],
    Price: [null, null],
  });

  // handle filter change
  const handleFilterChange = (title, selected) => {
    setFilters((prev) => ({ ...prev, [title]: selected }));
  };

  // Apply filters + search
  const filteredProducts = productDetails.filter((p) => {
    const [minPrice, maxPrice] = filters["Price"];
    if (minPrice !== null && p.price < minPrice) return false;
    if (maxPrice !== null && p.price > maxPrice) return false;

    if (
      filters["Aroma Level"].length > 0 &&
      !filters["Aroma Level"].includes(p.more_details?.aromaLevel)
    )
      return false;

    if (
      filters["Aroma Type"].length > 0 &&
      !filters["Aroma Type"].includes(p.more_details?.aromaType)
    )
      return false;

    if (
      filters["Product Size"].length > 0 &&
      !filters["Product Size"].includes(p.more_details?.size)
    )
      return false;

    if (
      filters["Burn Time"].length > 0 &&
      !filters["Burn Time"].includes(p.more_details?.burnTime)
    )
      return false;

    if (
      filters["Wax Type"].length > 0 &&
      !filters["Wax Type"].includes(p.more_details?.waxType)
    )
      return false;

    if (
      filters["Wick Type"].length > 0 &&
      !filters["Wick Type"].includes(p.more_details?.wickType)
    )
      return false;

    if (filters["Color"].length > 0 && !filters["Color"].includes(p.more_details?.color))
      return false;

    if (
      filters["Eco-Friendly"].length > 0 &&
      !filters["Eco-Friendly"].every((f) => p.more_details?.ecoFriendly.includes(f))
    )
      return false;

    if (filters["Rating"].includes("4★ & up") && p.more_details?.rating < 4) return false;
    if (filters["Rating"].includes("3★ & up") && p.more_details?.rating < 3) return false;

    if (
      filters["Occasion"].length > 0 &&
      !filters["Occasion"].includes(p.more_details?.occasion)
    )
      return false;

    if (value.SearchTerm) {
      const searchLower = value.SearchTerm.toLowerCase();
      if (
        !p.name.toLowerCase().includes(searchLower) &&
        !p.description.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }
    return true;
  });

  const filterConfigs = [
    { title: "Aroma Level", options: ["Soft", "Medium", "Strong"] },
    { title: "Aroma Type", options: ["Fruits", "Floral", "Nature", "Woody", "Spices", "Parfum"] },
    { title: "Product Size", options: ["Small", "Medium", "Large"] },
    { title: "Burn Time", options: ["< 20 hrs", "20–40 hrs", "40+ hrs"] },
    { title: "Wax Type", options: ["Soy", "Beeswax", "Paraffin", "Coconut", "Blend"] },
    { title: "Wick Type", options: ["Single Wick", "Multi Wick", "Wooden Wick"] },
    { title: "Price", options: [] },
    { title: "Color", options: ["White", "Black", "Red", "Pink", "Green", "Orange"] },
    { title: "Eco-Friendly", options: ["Vegan", "Cruelty-Free", "Handmade"] },
    { title: "Rating", options: ["4★ & up", "3★ & up"] },
    { title: "Occasion", options: ["Gift Sets", "Holiday", "Romantic", "Relaxation", "Luxury"] },
  ];

  // SEO Metadata
  const seoTitle = value.SearchTerm
    ? `Search results for "${value.SearchTerm}" | Celestaraa Candles`
    : "Search Candles | Celestaraa";
  const seoDescription = "Find your perfect scented candle by aroma, size, wax type, color, and more.";

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={`${SITE_URL}/search-candles`} />
      <div className="relative flex flex-col gap-6 p-4 bg-bg ">
      {/* 🔘 Mobile Filter Toggle */}
    { !isFilterOpen&& <div className="lg:hidden flex fixed z-50  right-1 justify-end">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2"
        >
          <FaFilter /> Filters
        </button>
      </div>
}
      <div className="main flex gap-6">
          <aside className="hidden lg:block lg:w-1/4 bg-white p-5 rounded-lg border border-gray-200 font-heading shadow-sm h-fit sticky top-4">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          {filterConfigs.map((filter) => (
            <FilterSection
              key={filter.title}
              title={filter.title}
              options={filter.options}
              selected={filters[filter.title]}
              onChange={handleFilterChange}
            />
          ))}
        </aside>

           <div className="w-full lg:w-3/4 grid gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No Candles Found
            </div>
          ) : (
            filteredProducts.map((eachProduct, i) => (
              <Link to={`/search-candles/${eachProduct.slug}`} key={i}>
                <ProductCard eachProduct={eachProduct} />
              </Link>
            ))
          )}
        </div>
      </div>
          {/* 📱 Mobile Filter Drawer */}
      {isFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsFilterOpen(false)}
          ></div>

          <div className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Filters</h2>
              <IoMdClose
                size={24}
                className="cursor-pointer text-gray-600"
                onClick={() => setIsFilterOpen(false)}
              />
            </div>
            <div className="overflow-y-auto p-5 h-full pb-24">
              {filterConfigs.map((filter) => (
                <FilterSection
                  key={filter.title}
                  title={filter.title}
                  options={filter.options}
                  selected={filters[filter.title]}
                  onChange={handleFilterChange}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
      
    </>
  );
};

export default SearchCandlesPage;
