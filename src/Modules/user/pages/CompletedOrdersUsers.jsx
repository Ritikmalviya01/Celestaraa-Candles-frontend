import React, { useEffect, useState } from "react";
import { CheckCircle, Package, IndianRupee, AlertCircle, X, ShoppingBag } from "lucide-react";
import image from "../../../assets/candleCardImage.svg";
import axios from "axios";
import BASE_URL from "../../../utils/Base_url";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const CompletedOrdersUsers = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  const fetchCompletedOrders = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${BASE_URL}/user/get-orders`, {
        withCredentials: true,
      });

      const data = response.data;

      if (data.success) {
        // Filter only completed/paid orders
        const completed = data.orders.filter(
          (order) => order.delivery_Status === "completed"
        );
        setCompletedOrders(completed);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load completed orders");
    } finally {
      setLoading(false);
    }
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading completed orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 sm:p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-red-800 font-semibold mb-1">Error</h3>
                <p className="text-red-700 text-sm sm:text-base">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return ( 
    <>
     <div className="flex  lg:hidden w-full justify-between bg-white  sticky top-[100px]">
        {" "}
        <Link className={` ${location.pathname.includes("/pending-orders")?"bg-primary text-white":"bg-white text-primary"} font-semibold w-1/2 h-full px-4 py-3  text-center`} to={"/user/pending-orders"}>Pending</Link>
        <div className="bg-primary w-[1px] h-full"></div>
        <Link className={ `${location.pathname.includes("/completed-orders")?"bg-primary text-white":"bg-white text-primary"} font-semibold w-1/2 h-full px-4 py-3  text-center`} to={"/user/completed-orders"}>Completed</Link>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Completed Orders
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {completedOrders.length} {completedOrders.length === 1 ? 'order' : 'orders'} successfully delivered
            </p>
          </div>

          {completedOrders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 sm:p-16 text-center">
              <div className="max-w-sm mx-auto">
                <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Package size={48} className="text-gray-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                  No Completed Orders
                </h2>
                <p className="text-gray-600">
                  You don't have any completed orders yet.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {completedOrders.map((order) => (
                <div
                  key={order._id}
                  onClick={() => openOrderDetails(order)}
                  className="bg-white shadow-sm hover:shadow-xl rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 sm:px-5 py-3 border-b border-gray-100">
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-xs sm:text-sm text-gray-600 truncate">
                        <span className="font-medium text-gray-800">{order.orderId}</span>
                      </p>
                      <span className="flex items-center gap-1.5 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                        <CheckCircle size={13} />
                        Completed
                      </span>
                    </div>
                  </div>

                  {/* Order Content */}
                  <div className="p-4 sm:p-5">
                    {/* Product Info */}
                    <div className="flex gap-3 sm:gap-4 items-start mb-4">
                      <div className="flex-shrink-0">
                        <img
                          src={order.items[0]?.productId?.image?.[0] || image}
                          alt={order.items[0]?.productId?.name || "Product"}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shadow-sm border border-gray-100"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-semibold text-gray-800 text-sm sm:text-base mb-1.5 line-clamp-2">
                          {order.items[0]?.productId?.name || "Product"}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 mb-2">
                          Quantity: <span className="font-medium text-gray-700">{order.items[0]?.quantity || 0}</span>
                        </p>
                        <p className="text-sm sm:text-base text-gray-800 font-bold flex items-center gap-1">
                          <IndianRupee size={15} className="text-gray-600" />
                          {order.items[0]?.price?.toLocaleString('en-IN') || 0}
                        </p>
                      </div>
                    </div>

                    {/* Additional Items Indicator */}
                    {order.items.length > 1 && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-3 py-2 mb-4 border border-blue-100">
                        <p className="text-xs sm:text-sm text-blue-700 font-medium flex items-center gap-2">
                          <ShoppingBag size={14} />
                          +{order.items.length - 1} more {order.items.length - 1 === 1 ? 'item' : 'items'} (Click to view)
                        </p>
                      </div>
                    )}

                    {/* Order Footer */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Delivered on</p>
                        <p className="text-xs sm:text-sm text-gray-700 font-medium">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-lg">
                        <Package size={18} className="text-gray-600" />
                        <div>
                          <p className="text-xs text-gray-500">Total Amount</p>
                          <p className="text-base sm:text-lg text-gray-800 font-bold">
                            ₹{order.totalAmt?.toLocaleString('en-IN') || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto my-8">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Order Details</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Order ID: <span className="font-semibold">{selectedOrder.orderId}</span>
                </p>
              </div>
              <button
                onClick={closeOrderDetails}
                className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Order Status and Date */}
              <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                  <CheckCircle size={18} className="text-green-600" />
                  <div>
                    <p className="text-xs text-green-700">Status</p>
                    <p className="font-semibold text-green-800">Completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                  <Package size={18} className="text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">Delivered on</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(selectedOrder.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* All Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <ShoppingBag size={20} />
                  Order Items ({selectedOrder.items.length})
                </h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-300 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={item?.productId?.image?.[0] || image}
                          alt={item?.productId?.name || "Product"}
                          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg shadow-sm border border-gray-200"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-base sm:text-lg mb-2">
                          {item?.productId?.name || "Product"}
                        </h4>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">
                            Quantity: <span className="font-semibold text-gray-800">{item?.quantity || 0}</span>
                          </p>
                          <p className="text-base sm:text-lg text-gray-800 font-bold flex items-center gap-1">
                            <IndianRupee size={16} className="text-gray-600" />
                            {item?.price?.toLocaleString('en-IN') || 0}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Subtotal: <span className="font-semibold text-gray-700">
                              ₹{((item?.price || 0) * (item?.quantity || 0)).toLocaleString('en-IN')}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Items Total:</span>
                    <span className="font-semibold">
                      ₹{selectedOrder.items.reduce((sum, item) => 
                        sum + ((item?.price || 0) * (item?.quantity || 0)), 0
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="border-t border-green-300 pt-3 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{selectedOrder.totalAmt?.toLocaleString('en-IN') || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button
                  onClick={closeOrderDetails}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompletedOrdersUsers;