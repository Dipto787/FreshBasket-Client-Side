import Banner from "../../Components/Banner";
import CompanyOverview from "./CompanyOverview";
import FreshPicks from "./FreshPicks";
import OurBenefits from "./OurBenefits";
import SpecialOffers from "./SpecialOffers";
import Testimonal from "./Testimonal";

const Home = () => {
    return (
        <div className="">
            <div className=" pt-20 bg-slate-300 py-8">
                <div className="max-w-7xl mx-auto px-8">
                    <Banner></Banner>
                </div>
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
            <div className="mt-14 max-w-7xl mx-auto">
                <CompanyOverview></CompanyOverview>
            </div>
            <div className="mt-14  max-w-7xl mx-auto">
                 <Testimonal></Testimonal>
            </div>
        </div>
    );
};

export default Home;