import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "./Authentication/Provider/AuthProvider";
import UseAxiosSecure from "../Components/hooks/UseAxiosSecure";

const PaymentHistory = () => {
    let { user } = useContext(AuthContext);
    let axiosSecure = UseAxiosSecure();
    const { data: payment = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })
    console.log(payment)
    return (
        <div>
            <h1>Total Payment : {payment.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>price</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payment.map((pay, index) => <tr>
                                <th>{index + 1}</th>
                                <td>${pay.price.toString().slice(0,3)}</td>
                                <td>{pay.transactionId.toString().slice(0,20)}...</td>
                                <td>{pay.status}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;