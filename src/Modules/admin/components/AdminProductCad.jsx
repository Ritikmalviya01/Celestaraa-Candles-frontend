import React from 'react'
import { IoMdAddCircle } from "react-icons/io";
import candleCardImage from "../../../assets/candleCardImage.svg"
import { FiTrash2 } from "react-icons/fi";

const AdminProductCad = ({eachProduct , onDelete}) => {

  return (
    <div className="card1 h-fit font-heading  flex flex-col gap-6 grid-cols-1">
          <div className="image w-full">
            <img
              className="w-full h-full object-cover"
              src={eachProduct.image?.[0] || candleCardImage} // use actual image if available
              alt={eachProduct.name}
            />
          </div>
    
          <div className="details w-full">
            <div className="nameAndPrice flex w-full justify-between">
              <span className="name max-sm:text-2xl max-lg:text-2xl md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-wider">
                {eachProduct.name}
              </span>
              <span className="price flex items-start text-3xl font-semibold tracking-wider">
                Rs.{eachProduct.price}
              </span>
            </div>
            <div className="desc text-xl tracking-wider h-6 truncate">
              {eachProduct.description}
            </div>
          </div>
    
          <div className="addToCardBtn w-full">
            <button
        onClick={() => onDelete(eachProduct._id)}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition"
      >
        <FiTrash2 /> Delete
      </button>
          </div>
        </div>
  );
};

export default AdminProductCad