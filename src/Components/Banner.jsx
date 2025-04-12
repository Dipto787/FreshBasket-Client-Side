import Slider from "./Shared/Swiper"; 
import slide1 from '../assets/Slider/1.jpg'
import slide2 from '../assets/Slider/2.png'
import slide3 from '../assets/Slider/3.jpg'
import { Link } from "react-router-dom";
const Banner = () => {
    return (
        <div className="">
            <div className=" flex  flex-col gap-8 md:gap-28 md:flex-row">
                <Slider img1={slide1} img2={slide2} img3={slide3}></Slider>
              
                <div className="md:w-[50%] px-8 space-y-3 mt-8 ">
                    <h1 className=" text-orange-400  text-xl md:text-2xl font-bold">100% Organic Foods</h1>
                    <p className="md:py-6 py-2 text-4xl md:text-6xl">
                        Organic Veggies & Fresh Foods
                    </p>
                    <Link to={'/shop'} className="btn bg-green-400">Shop Now</Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;