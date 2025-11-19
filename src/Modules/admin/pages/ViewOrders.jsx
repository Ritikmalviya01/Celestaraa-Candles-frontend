import React, { useEffect, useState } from "react";
import { Loader2, Package } from "lucide-react";
import axios from "axios";
import BASE_URL from "../../../utils/Base_url"

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ShowStatusDropDownIndex, setShowStatusDropDownIndex] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/admin/get-orders`, // your backend API
          { withCredentials: true }
        );

        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const colorMap = {
      Pending: "bg-yellow-100 text-yellow-700",
      Processing: "bg-blue-100 text-blue-700",
      Delivered: "bg-green-100 text-green-700",
      Cancelled: "bg-red-100 text-red-700",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${colorMap[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f7f3f0] py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-[#4b3f34] mb-8 flex items-center justify-center gap-2">
        <Package className="text-amber-600" size={28} />
        View Orders
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-[#4b3f34]">
          <Loader2 className="animate-spin mr-2" />
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-lg">
          No orders found 📦
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-[#e6ddd5] max-w-6xl mx-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f9f6f2] text-[#4b3f34]">
              <tr>
                <th className="py-3 px-4 font-semibold">Order ID</th>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">Address</th>
                <th className="py-3 px-4 font-semibold">Items</th>
                <th className="py-3 px-4 font-semibold">Total</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-white" : "bg-[#fcfaf8]"
                  } hover:bg-[#fefaf7] transition-all`}
                >
                  <td className="py-3 px-4 text-[#4b3f34] font-medium">
                    {order.orderId}
                  </td>
                  <td className="py-3 px-4 text-[#4b3f34]">
                    <div className="flex flex-col">
                      <span>{order.userId?.name || "N/A"}</span>
                      <span className="text-sm text-gray-500">
                        {order.userId?.email || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#4b3f34]">
                    {order.userId?.address_details?.[0]
                      ? ` ${order.userId.address_details[0].address}, ${order.userId.address_details[0].city} - ${order.userId.address_details[0].zipCode}`
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm">
                    {order.items.map((item, i) => (
                      <div key={i}>
                        {item.name} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#4b3f34]">
                    ₹{order.totalAmt}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        if (ShowStatusDropDownIndex === index) {
                          setShowStatusDropDownIndex(null);
                        } else {
                          setShowStatusDropDownIndex(index);
                        }
                      }}
                      className="relative"
                    >
                      <span>{getStatusBadge(order.delivery_Status)}</span>
                      <div
                        className={`absolute bg-white z-20 ${
                          ShowStatusDropDownIndex === index
                            ? "flex flex-col "
                            : "hidden"
                        }`}
                      >
                        {" "}
                        {[
                          "Pending",
                          "Processing",
                          "Shipped",
                          "Delivered",
                          "Cancelled",
                        ].map((status) => (
                          <li className="list-none px-3 py-1 rounded text-xs hover:bg-black hover:text-white">{status}</li>
                        ))}
                      </div>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
