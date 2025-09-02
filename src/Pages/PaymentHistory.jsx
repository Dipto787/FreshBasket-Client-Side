import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "./Authentication/Provider/AuthProvider";
import UseAxiosSecure from "../Components/hooks/UseAxiosSecure";

const PaymentHistory = () => {
  let { user } = useContext(AuthContext);
  let axiosSecure = UseAxiosSecure();

  const { data: payment = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        💳 Payment History
      </h1>

      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md p-4 mb-6">
        <p className="text-lg font-semibold">
          Total Payments: <span className="font-bold">{payment.length}</span>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md border">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {payment.map((pay, index) => (
              <tr
                key={pay._id || index}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                  ${pay.price.toString().slice(0, 5)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {pay.transactionId.toString().slice(0, 20)}...
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      pay.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {pay.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
