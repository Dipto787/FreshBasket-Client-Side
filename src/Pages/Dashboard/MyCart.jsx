import React from "react";
import UseCart from "../../Components/Shared/UseCart";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const MyCart = () => {
  let [cart, refetch] = UseCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  let axiosSecure = UseAxiosSecure();

  let handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let { data } = await axiosSecure.delete(`/cart/${id}`);
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been removed.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="w-full p-6">
      {/* Summary Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center justify-between mb-8 border">
        <h1 className="text-xl font-bold text-gray-800">
          🛒 Total Items:{" "}
          <span className="text-green-600">{cart.length}</span>
        </h1>
        <h1 className="text-xl font-bold text-gray-800 mt-3 md:mt-0">
          💰 Total Price:{" "}
          <span className="text-green-600">${totalPrice.toFixed(2)}</span>
        </h1>
        <NavLink
          to={"/dashboard/pay"}
          className="mt-4 md:mt-0 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition"
        >
          Pay Now
        </NavLink>
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-green-600 text-white sticky top-0">
            <tr>
              <th className="hidden lg:table-cell">#</th>
              <th>Item</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((carts, index) => (
              <tr
                key={carts._id}
                className="hover:bg-gray-50 transition border-b"
              >
                {/* Index */}
                <td className="hidden lg:table-cell font-medium text-gray-600">
                  {index + 1}
                </td>

                {/* Product */}
                <td>
                  <div className="flex items-center gap-4">
                    <img
                      src={carts.image}
                      alt={carts.name}
                      className="w-14 h-14 object-cover rounded-lg shadow-md"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {carts.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {carts.category || "Fruit"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="font-semibold text-green-600">
                  ${carts.price.toFixed(2)}
                </td>

                {/* Delete Button */}
                <td>
                  <button
                    onClick={() => handleDelete(carts._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
