import queryString from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";

const Categories = ({ label }) => {
    let navigate = useNavigate();
    let [params, setParams] = useSearchParams();
    let category = params.get('category');
    let handleClick = () => {
        let currentQuery = { category: label };
        let url = queryString.stringifyUrl({
            url: '/shop',
            query: currentQuery,
        })

        navigate(url)
    }
    return (
        <div onClick={handleClick} className={`flex 
                flex-col 
                items-center 
                justify-center 
                gap-2
                p-3
                border-b-2
                hover:text-neutral-800
                transition
                cursor-pointer ${label === category && 'border-b-slate-400 text-blue-500 text-neutral-800'}`}>
            <div className='text-sm font-medium'>{label}</div>
        </div>
    );
};

export default Categories;