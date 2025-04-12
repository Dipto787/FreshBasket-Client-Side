const testimonials = [
    {
        "name": "John Doe",
        "position": "CEO, ExampleCorp",
        "review": "This product has completely transformed our workflow. We are more productive than ever, and the support team is exceptional. Highly recommended!",
        "photo": "https://i.ibb.co.com/pvHN688w/quote-left-1.png",
        "rating": 5
    },
    {
        "name": "Jane Smith",
        "position": "Marketing Director, ABC Ltd.",
        "review": "The quality and service are top-notch. We’ve seen a significant boost in sales since we started using this product. Fantastic job!",
        "photo": "https://i.ibb.co.com/pvHN688w/quote-left-1.png",
        "rating": 4
    },
    {
        "name": "Samuel Lee",
        "position": "Founder, TechWave",
        "review": "I was blown away by the customer support and the results. This product is a game-changer for our business. Don’t hesitate to try it!",
        "photo": "https://i.ibb.co.com/pvHN688w/quote-left-1.png",
        "rating": 5
    },
    {
        "name": "Emma Johnson",
        "position": "Product Manager, DesignCo",
        "review": "We’ve been using this service for months, and it keeps getting better! The interface is smooth, and it integrates perfectly with our systems.",
        "photo": "https://i.ibb.co.com/pvHN688w/quote-left-1.png",
        "rating": 4
    }
]
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ReactStarsRating from 'react-awesome-stars-rating';
const Testimonal = () => {

    return (
        <div className=' mb-12'>
            <h2 className="md:text-5xl text-center font-semibold text-2xl">Testimonials</h2>
            <div>
                <div className='px-14'>

                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper   mt-8">
                        {
                            testimonials.map(test =>

                                <>
                                    <SwiperSlide className='text-center space-y-4'>
                                        <ReactStarsRating className='flex justify-center' size={50} value={test.rating} />
                                        <img className='mx-auto mt-4 ' src={test.photo} alt="" />

                                        <h1 className='text-3xl'>     {test.name}</h1>
                                        <p className='max-w-lg mx-auto'>{test.review}</p>
                                    </SwiperSlide>



                                </>


                            )
                        }
                    </Swiper>

                </div>
            </div>
        </div>
    );
};

export default Testimonal;