import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/autoplay';
const Slider = ({ img1, img2, img3 }) => {
    return (
        <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            autoplay={{
                delay: 1800,
                disableOnInteraction: false
            }}
            loop={true}
            className="mySwiper w-[100%] md:w-[50%]"> 
            <SwiperSlide><img src={img2} alt="" /></SwiperSlide>
            <SwiperSlide><img src={img3} alt="" /></SwiperSlide>
         
        </Swiper>
    );
};

export default Slider;