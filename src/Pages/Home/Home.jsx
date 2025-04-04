import Banner from "../../Components/Banner";
import FreshPicks from "./FreshPicks";
import OurBenefits from "./OurBenefits";
import SpecialOffers from "./SpecialOffers";

const Home = () => {
    return (
        <div className="">
            <div className="max-w-7xl mx-auto px-8">
                <Banner></Banner>
            </div>
            <div className="mt-14 max-w-7xl mx-auto px-8">
                <OurBenefits></OurBenefits>
            </div>
            <div className="mt-14 max-w-7xl mx-auto px-8">
                <SpecialOffers></SpecialOffers>
            </div>
            <div className="mt-14">
                <FreshPicks></FreshPicks>
            </div>
        </div>
    );
};

export default Home;