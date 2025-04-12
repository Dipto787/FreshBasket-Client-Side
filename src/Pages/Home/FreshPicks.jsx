import banner from '../../assets/Slider/baner-1.png'
const FreshPicks = () => {
    return (
        <div>
            <h1 className="md:text-5xl text-2xl   font-bold text-center">Fresh Picks</h1>
            <div className='bg-[#ffb524]    mt-12'>
                <section className="relative">
                    <div className=' absolute md:bottom-2/3  bottom-60 left-4  md:left-[55%] flex items-center bg-[#ffffff] p-5 rounded-full  '>
                        <div className='text-7xl font-bold'>
                            1
                        </div>

                        <div className='text-xl font-bold'>
                            50$
                            <br />
                            kg
                        </div>
                    </div>
                    <div className="container flex   flex-col justify-center px-12 p-6 mx-auto md:flex-row">
                        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:text-left">
                            <h1 className="text-5xl font-bold max-w-xl leading-none sm:text-6xl"><span className='text-white'>Fresh Sweet Fruits</span>
                                <br />
                                in Our Store
                            </h1>
                            <p className="mt-6 mb-8 text-lg sm:mb-12">Dictum aliquam porta in condimentum ac integer
                                turpis pulvinar, est scelerisque ligula sem
                            </p>
                            <div className="">
                                <button className='btn px-14 py-3 font-bold rounded-xl  bg-transparent border-2 '>Buy</button>
                            </div>
                        </div>
                        <div className="flex    items-center justify-center p-6 mt-8 ">
                            <img src={banner} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FreshPicks;