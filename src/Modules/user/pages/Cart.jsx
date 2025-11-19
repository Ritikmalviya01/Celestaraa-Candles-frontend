import React, { useEffect } from 'react'
import { useState } from 'react';
import { Plus, Minus, ChevronRight } from 'lucide-react';
import cardImage from "../../../assets/candleCardImage.svg"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../../../utils/Base_url';


const loadRazorpay = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Cart = () => {
  const [cart, setCart] = useState([]);
  
  // ✅ Fixed: Initialize with empty values instead of dummy data
  const [contactInfo, setContactInfo] = useState({
    name: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    cityName: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempContactInfo, setTempContactInfo] = useState(contactInfo);
  const [shippingMethod, setShippingMethod] = useState('express');

  // For location autocomplete
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // ✅ Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/get-cart`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setCart(res.data?.cart);
          console.log(res.data)
        }
      } catch (err) {
        console.error("Error fetching cart:", err.response?.data || err.message);
      }
    };
    fetchCart();
  }, []);

  // ✅ Fetch saved address if exists
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/add-address`, {
          withCredentials: true,
        });
        if (res.data.success && res.data.address) {
          setContactInfo(res.data.address);
          setQuery(res.data.address.cityName || res.data.address.city);
        }
      } catch (err) {
        console.error("Error fetching address:", err.response?.data || err.message);
      }
    };
    fetchAddress();
  }, []);

  const handleEditToggle = async () => {
    if (isEditing) {
      // When clicking "Save"
      try {
        const res = await axios.post(
          `${BASE_URL}/user/add-address`,
          {
            name: tempContactInfo.name,
            phone: tempContactInfo.phone,
            address: tempContactInfo.address,
            city: tempContactInfo.cityName || query,
            zipCode: tempContactInfo.zipCode,
          },
          { withCredentials: true }
        );

        if (res.data.success) {
toast.success("Address saved successfully!");
          setContactInfo({
            ...tempContactInfo,
            cityName: tempContactInfo.cityName || query
          });
        } else {
          toast.error( res.data.message || "Failed to save address");
        }
      } catch (error) {
        console.error("Error saving address:", error);
toast.error("Something went wrong while saving the address");
      }
    } else {
      // When clicking "Edit"
      setTempContactInfo(contactInfo);
      setQuery(contactInfo.cityName || contactInfo.city);
    }

    setIsEditing(!isEditing);
  };

  const removeItem = async (cartItemId) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/user/remove-cart`,
        {
          withCredentials: true,
          data: { cartItemId }
        },
      );

      if (res.data.success) {
        setCart(prevCart => prevCart.filter(item => item._id !== cartItemId));
toast.info(res.data.message);
      }
    } catch (err) {
      console.error("Error removing item from cart:", err.response?.data || err.message);
toast.error("Failed to remove item from cart. Try again.");    }
  };

  const updateQuantity = async (cartItemId, delta) => {
    const item = cart.find(i => i._id === cartItemId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    try {
      const res = await axios.put(
        `${BASE_URL}/user/update-cart`,
        { cartItemId, quantity: newQuantity },
        { withCredentials: true }
      );

      if (res.data.success) {
        setCart(prevCart =>
          prevCart.map(i =>
            i._id === cartItemId ? { ...i, quantity: newQuantity } : i
          )
        );
      }
    } catch (err) {
      console.error("Error updating cart:", err.response?.data || err.message);
    }
  };

  // ✅ Fixed: Calculate subtotal from actual cart data
  const subtotal = cart.reduce((sum, item) => {
    const price = item.product?.price || 0;
    const quantity = item.quantity || 0;
    return sum + (price * quantity);
  }, 0);

  const shippingCost = shippingMethod === 'express' ? 5 : 0;
  const taxes = subtotal > 0 ? (subtotal * 0.18).toFixed(2) : 0; // 18% GST
  const total = parseFloat(subtotal) + parseFloat(shippingCost) + parseFloat(taxes);

  const handleInputChange = (field, value) => {
    setTempContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const isContactInfoComplete = () => {
    return (
      contactInfo.name?.trim() !== '' &&
      contactInfo.address?.trim() !== '' &&
      contactInfo.phone?.trim() !== '' &&
      (contactInfo.city?.trim() !== '' || contactInfo.cityName?.trim() !== '') &&
      contactInfo.zipCode?.trim() !== ''
    );
  };

  // Handle typing for city autocomplete
  const handleInput = async (e) => {
    const value = e.target.value;
    setQuery(value);
    handleInputChange("cityName", value);
    
    if (value.length > 2) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?city=${value}&format=json&addressdetails=1`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // When user clicks a city suggestion
  const handleSelect = (place) => {
    setQuery(place.display_name);
    handleInputChange("cityName", place.display_name);
    setSuggestions([]);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
toast.info("Your cart is empty!");
      return;
    }

    if (!isContactInfoComplete()) {
toast.warning("Please complete all contact information fields!");
      return;
    }

    try {
      const orderRes = await axios.post(
        `${BASE_URL}/user/create-order`,
        {
          items: cart.map((i) => ({
            productId: i.product._id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
          delivery_address: contactInfo._id,
          subTotalAmnt: subtotal,
          totalAmt: total,
        },
        { withCredentials: true }
      );

      if (orderRes.data.success) {
toast.success("Order placed successfully!");
        setCart([]);
        window.location.href = `/cart`;
      }
    } catch (err) {
      console.error("Error placing order:", err.response?.data || err.message);
toast.error("Failed to place order. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-bg p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Cart Items and Contact */}
          <div className="space-y-6">
            {/* Shopping Cart Header */}
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-heading font-semibold text-gray-900">Shopping Cart</h1>
              <span className="bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {cart.length}
              </span>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {cart.length === 0 ? (
                <div className="bg-white p-8 rounded-lg text-center">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-lg">
                    <img
                      src={item.product?.image?.[0] || cardImage}
                      alt={item.product?.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg font-heading text-gray-900">{item.product?.name}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-gray-300 rounded-full">
                          <button
                            onClick={() => updateQuantity(item._id, -1)}
                            className="p-1 hover:bg-gray-100 rounded-l-full"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, 1)}
                            className="p-1 hover:bg-gray-100 rounded-r-full"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-semibold text-gray-900">₹{item.product?.price}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold font-heading text-gray-900">Contact Information</h2>
                <button
                  onClick={handleEditToggle}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Recipient's Name</label>
                    <input
                      type="text"
                      value={tempContactInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Address</label>
                      <input
                        type="text"
                        value={tempContactInfo.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Street address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Phone</label>
                      <input
                        type="text"
                        value={tempContactInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Phone number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-sm text-gray-600 mb-1">City</label>
                      <input
                        type="text"
                        value={query}
                        onChange={handleInput}
                        placeholder="Start typing your city..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />

                      {suggestions.length > 0 && (
                        <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow mt-1 w-full max-h-48 overflow-y-auto">
                          {suggestions.map((s) => (
                            <li
                              key={s.place_id}
                              onClick={() => handleSelect(s)}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                            >
                              {s.display_name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Zip Code</label>
                      <input
                        type="text"
                        value={tempContactInfo.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="Postal code"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {contactInfo.name ? (
                    <>
                      <p className="text-sm text-gray-600 mb-1">Recipient's Name</p>
                      <p className="font-semibold text-gray-900 mb-4">{contactInfo.name}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Address</p>
                          <p className="text-gray-900">{contactInfo.address}</p>
                          <p className="text-gray-900">{contactInfo.cityName || contactInfo.city}</p>
                          <p className="text-gray-900">{contactInfo.zipCode}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Phone</p>
                          <p className="text-gray-900">{contactInfo.phone}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 mb-2">No address saved</p>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-primary hover:text-gray-800 font-semibold"
                      >
                        Add Address
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Checkout */}
          <div className="space-y-6">
            {/* Express Checkout */}
            <div>
              <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">Express Checkout</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-[#502ab9] hover:bg-primary p-4 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">PhonePe</span>
                </button>
                <button className="bg-gray-900 hover:bg-primary p-4 rounded-lg flex items-center justify-center gap-2">
                  <span className="text-white font-semibold">G Pay</span>
                </button>
              </div>
            </div>

            {/* Detail Shop */}
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-heading font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-gray-900">₹{shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes (18% GST)</span>
                  <span className="font-semibold text-gray-900">₹{parseFloat(taxes).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Buttons */}
            <div className="space-y-3">
              <Link to="/search-candles">
                <button className="w-full text-gray-600 py-3 px-6 mb-2 rounded-full border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2">
                  <span>←</span>
                  <span>Return To Search</span>
                </button>
              </Link>
              <button
                onClick={handleCheckout}
                disabled={!isContactInfoComplete() || cart.length === 0}
                className={`w-full py-4 px-6 rounded-full font-semibold transition ${
                  isContactInfoComplete() && cart.length > 0
                    ? 'bg-primary text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                CHECKOUT
              </button>

              {!isContactInfoComplete() && cart.length > 0 && (
                <p className="text-sm text-red-600 text-center">
                  Please complete all contact information fields
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
    </div>
  );
}

export default Cart