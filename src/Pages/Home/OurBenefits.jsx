import { FaTruck, FaShieldAlt, FaExchangeAlt, FaPhone } from "react-icons/fa";
const features = [
    {
        icon: <FaTruck size={40} className="text-white" />,
        title: "Free Shipping",
        description: "Free on order over $300",
    },
    {
        icon: <FaShieldAlt size={40} className="text-white" />,
        title: "Security Payment",
        description: "100% security payment",
    },
    {
        icon: <FaExchangeAlt size={40} className="text-white" />,
        title: "30 Day Return",
        description: "30 day money guarantee",
    },
    {
        icon: <FaPhone size={40} className="text-white" />,
        title: "24/7 Support",
        description: "Support every time fast",
    },
];
const OurBenefits = () => {
    return (
        <div>
            <h1 className="md:text-5xl text-center font-semibold text-2xl ">Our Benefits</h1>
            <div className="flex flex-col md:flex-row justify-between md:space-y-0 space-y-6 px-12  md:px-0  py-10">
                {features.map((feature, index) => (
                    <div key={index} className="bg-gray-100 p-10 rounded-lg shadow-md text-center  ">
                        <div className="bg-yellow-500 p-4 rounded-full inline-block mb-4">
                            {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurBenefits;