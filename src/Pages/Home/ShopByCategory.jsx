import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure"; 
import { Link } from "react-router-dom";
// 
let categories = [
    {
        "category": "Apple",
        "image": "https://i.ibb.co.com/1gpJZ6P/download-79-removebg-preview.png"
    },
    {
        "category": "Banana",
        "image": "https://i.ibb.co.com/nN8wkhpn/download-80-removebg-preview.png"
    },
    {
        "category": "Kiwi",
        "image": "https://i.ibb.co.com/Xk2RZk48/download-81-removebg-preview.png"
    },
    {
        "category": "Mango",
        "image": "https://i.ibb.co.com/wh9fVmTc/download-82-removebg-preview.png"
    },
    {
        "category": "Orange",
        "image": "https://i.ibb.co.com/jvNNfNnt/download-83-removebg-preview.png"
    },
    {
        "category": "Pineapple",
        "image": "https://i.ibb.co.com/ch60vfDq/download-84-removebg-preview.png"
    },
    {
        "category": "Strawberry",
        "image": "https://i.ibb.co.com/67B9BFcn/download-85-removebg-preview.png"
    }
];




const ShopByCategory = () => {
    return (
        <div className="bg-white py-6">
            {/* Centered container */}
            <div className="max-w-7xl  mx-auto flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-6 text-center">
                    Shop by Category
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3   w-full md:grid-cols-5 lg:grid-cols-7 gap-6 text-center">
                    {categories.map((category, idx) => (
                        <Link to={`/shop?category=${category.category}`} key={idx} className="flex flex-col items-center group cursor-pointer">
                            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 shadow-md group-hover:scale-105 transition-transform">
                                <img 
                                    src={category.image} 
                                    alt={category.category} 
                                    className="w-14 h-14 object-contain" 
                                />
                            </div>
                            <p className="mt-3 text-sm font-medium">{category.category}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopByCategory;
