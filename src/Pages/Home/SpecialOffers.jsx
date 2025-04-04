let specialOffersCard =
    [
        {
            "name": "Fresh Apples",
            "offer": "20% OFF",
            "category": "Fruits",
            "image": "https://i.ibb.co.com/8nT3Cr17/featur-1.jpg",
            "color": "#76B041",
            "bottom_color": "#ffb524"
        },
        {
            "name": "Tasty Fruits",
            "offer": "Free delivery",
            "category": "Fruits",
            "image": "https://i.ibb.co.com/d42QW1fq/featur-2.jpg",
            "color": "#D0D5D9",
            "bottom_color": "#45595b"
        },
        {
            "name": "Exotic Vegetable",
            "offer": "Discount 30$",
            "category": "Vegetables",
            "image": "https://i.ibb.co.com/7JNWy4MH/featur-3.jpg",
            "color": "#F4A43C",
            "bottom_color": "#81c408"
        }
    ];

const SpecialOffers = () => {

    return (
        <div>
            <h1 className="md:text-5xl text-2xl font-semibold text-center">Special Offers on Fresh Produce</h1>
            <div className="flex flex-col md:flex-row px-4 md:px-0  mt-10 gap-8">
                {
                    specialOffersCard.map(card =>
                        <div
                            className="relative"
                            style={{
                                borderRadius: 5,
                                border: `1px solid ${card.bottom_color}`
                            }}>

                            <div className="p-5">
                                <img src={card.image} alt="" />
                            </div>
                            <div className="flex   justify-center">

                                <div className="w-[50%] p-5 rounded-xl absolute    bottom-16" style={{ background: card.color }}>
                                    <h1 className="text-xl text-center text-white font-semibold">{card.name}</h1>
                                    <h1 className="text-2xl font-bold text-center   ">{card.offer}</h1>
                                </div>
                            </div>

                            <div className="py-12" style={{
                                background: `${card.bottom_color}`
                            }}>

                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default SpecialOffers;