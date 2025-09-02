import { useContext } from "react";
import { AuthContext } from "../Authentication/Provider/AuthProvider";
import { TbShoppingCart, TbCash, TbStar } from "react-icons/tb";

const DashboardHome = () => {
    let { user } = useContext(AuthContext);

    // Fake stats - you can replace with real data
    const stats = [
        { title: "Total Orders", value: 12, icon: <TbShoppingCart className="text-4xl text-white" /> },
        { title: "Total Spent", value: "$1,250", icon: <TbCash className="text-4xl text-white" /> },
        { title: "Favorite Product", value: "Wireless Headphones", icon: <TbStar className="text-4xl text-white" /> },
    ];

    const recentOrders = [
        { id: "ORD001", product: "Apple iPhone 15", amount: "$999", status: "Delivered" },
        { id: "ORD002", product: "Nike Sneakers", amount: "$120", status: "Shipped" },
        { id: "ORD003", product: "Smart Watch", amount: "$199", status: "Pending" },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
                Hi, {user?.displayName || "User"} 👋
            </h1>
            <p className="text-gray-600 mb-8">
                Welcome back to your dashboard. Here's a quick summary of your account.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex items-center p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg text-white"
                    >
                        <div className="mr-4">{stat.icon}</div>
                        <div>
                            <h2 className="text-2xl font-bold">{stat.value}</h2>
                            <p className="text-white/80">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-gray-100 rounded-t-xl">
                            <tr>
                                <th className="px-4 py-2 text-left text-gray-600">Order ID</th>
                                <th className="px-4 py-2 text-left text-gray-600">Product</th>
                                <th className="px-4 py-2 text-left text-gray-600">Amount</th>
                                <th className="px-4 py-2 text-left text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-4 py-2">{order.id}</td>
                                    <td className="px-4 py-2">{order.product}</td>
                                    <td className="px-4 py-2">{order.amount}</td>
                                    <td className={`px-4 py-2 font-semibold ${
                                        order.status === "Delivered" ? "text-green-600" :
                                        order.status === "Shipped" ? "text-blue-600" :
                                        "text-yellow-600"
                                    }`}>
                                        {order.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
