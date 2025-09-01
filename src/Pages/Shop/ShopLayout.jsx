
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import bg1 from '../../assets/Slider/bg (1).jpg'
import bg2 from '../../assets/Slider/bg (2).jpg'
import bg3 from '../../assets/Slider/bg (3).jpg'
import bg4 from '../../assets/Slider/bg (4).jpg'
import bg5 from '../../assets/Slider/bg (5).jpg'
import bg7 from '../../assets/Slider/bg (7).jpg'
import bg8 from '../../assets/Slider/bg (8).jpg'
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../Components/hooks/UseAxiosSecure';
import FruitCard from '../../Shared/FruitCard';
import { useState } from 'react';
const ShopLayout = () => {
    const [open, setOpen] = useState(true);
    let axiosSecure = UseAxiosSecure();
   const [selected, setSelected] = useState(null);
    let { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            let { data } = await axiosSecure.get('/categories')
            return data;
        }
    })

    console.log(categories)

    let { data: fruits = [] } = useQuery({
        queryKey: ['fruits'],
        queryFn: async () => {
            let { data } = await axiosSecure.get('/fruits');
            return data;
        }
    })

    let brands = [];
    for (let fruit of fruits) {
        if (!brands.includes(fruit.brand)) {
            brands.push(fruit.brand)
        }
    }
    console.log(brands)

    return (
        <div>
            <div className=''>
                <Swiper
                    slidesPerView={3}   // show 3 slides
                    spaceBetween={20}   // gap between slides
                    loop={true}
                    pagination={{ clickable: true }}
                    navigation={true}   // left & right arrows
                    autoplay={{
                        delay: 400,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img className='' src={bg1} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='' src={bg2} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='' src={bg3} />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img className='' src={bg4} />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img className='' src={bg5} />
                    </SwiperSlide>



                    <SwiperSlide>
                        <img className='' src={bg7} />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src={bg8} />
                    </SwiperSlide>

                </Swiper>
            </div>
            <div className="flex gap-2 my-10 ">
                {/* left side layout */}
                <div className="  text-black w-[25%]">
                    <div className="  rounded-xl p-4">
                        <h2 className='text-xl font-semibold  border-b-4 border-black max-w-24 pb-2'>Categories</h2>
                        {open && (
                            <ul className="mt-3 max-h-52 overflow-y-auto">
                                {categories.map((cat, index) => (
                                    <li
                                        key={index}
                                        className="p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                                    >
                                        {cat.category}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>


                    <div className="  rounded-xl p-4">
                        <h2 className='text-xl font-semibold  border-b-4 border-black max-w-20 pb-2'>Delivery</h2>
                        {open && (
                            <ul className="mt-4 flex items-center gap-2">
                                <input type="checkbox" className="checkbox" />
                                <h1 className='text-lg'>Free Delivery</h1>
                            </ul>
                        )}
                    </div>


                    <div className="mt-12  rounded-xl p-4">
                        <h2 className='text-xl font-semibold  border-b-4 border-black max-w-36 pb-2'>Filter By Brand</h2>
                        {open && (
                            <ul className="mt-3 ">
                                {brands.map((brand, index) => (
                                    <div className='flex items-center gap-2'>
                                           <input       onChange={() => setSelected(brand)} checked={selected === brand} type="checkbox" className="checkbox" />
                                        <li
                                            key={index}
                                            className="p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                                        >
                                            {brand}
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>
                {/* right side layout */}
                <div className=" bg-[#f6f6f6]  w-[75%]">
                    {/*  */}



                    <div className='grid p-4   grid-cols-4 gap-2'>
                        {
                            fruits.map(fruit => <FruitCard fruit={fruit}></FruitCard>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopLayout;