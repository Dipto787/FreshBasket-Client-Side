import { CiUser } from 'react-icons/ci';
import { TbAward } from 'react-icons/tb';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import { GoPackage } from 'react-icons/go';

const statistics = [
    { title: "SATISFIED CUSTOMERS", value: 1963, icon: <CiUser className='mx-auto' color='#ffb524' size={120} /> },
    { title: "QUALITY OF SERVICE", value: "99%", icon: <TbAward className='mx-auto'  color='#ffb524' size={120} /> },
    { title: "QUALITY CERTIFICATES", value: 33, icon: <HiOutlineBadgeCheck  className='mx-auto' color='#ffb524' size={120} /> },
    { title: "AVAILABLE PRODUCTS", value: 789, icon: <GoPackage className='mx-auto'  color='#ffb524' size={120} /> }
];
const CompanyOverview = () => {
    return (
        <div>
            <h1 className="md:text-5xl text-2xl   font-bold text-center">Company Overview</h1>
            <div className=' px-4 md:px-0'>
                <div className='flex flex-col bg-[#f4f6f8]  gap-4 p-12  mt-12 md:flex-row '>
                    {
                        statistics.map(stat =>
                            <div className='text-center py-8  rounded-xl shadow-xl bg-white'>
                                <div className='' >
                                    {stat.icon}
                                </div>
                                <div>
                                    <h1 className='text-4xl text-[#82c75a] font-semibold'>{stat.title}</h1>
                                </div>
                                <div>
                                    <h2 className='text-4xl'>{stat.value}</h2>
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default CompanyOverview;