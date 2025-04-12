import bg from '../../assets/nav bg.png'
const Shop = () => {
    return (
        <div className=''>
            <div className='pt-20 '>
                <div
                    className=""
                    style={{
                        backgroundSize:'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat:'no-repeat',
                        backgroundImage: `url(${bg})`,
                    }}>
                    <div className=""></div>
                    <div className=" text-center">
                        <div className="py-8 ">
                            <h1 className="mb-5 text-orange-600 text-5xl font-bold"> Our Shop</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;