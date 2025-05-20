import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import UseCart from "../../Components/Shared/UseCart";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import { AuthContext } from "./Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const CheckoutForm = () => {
    let [error, setError] = useState('');
    let [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    let { user } = useContext(AuthContext);
    let [transactionId, setTransactionId] = useState('');
    let [cart, refetch] = UseCart();
    let axiosSecure = UseAxiosSecure();
    let navigate = useNavigate('');
    const elements = useElements();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data?.clientSecret);
                })
        }
    }, [totalPrice, axiosSecure])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        let { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setError(error.message);
            console.log('[error]', error);
        } else {
            setError('');
            console.log('[PaymentMethod]', paymentMethod);
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });
        if (confirmError) {
            console.log('error')
        } else {
            console.log(paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);


                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cardId: cart.map(item => item._id),
                    menuItemId: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        title: "Success",
                        icon: "success",
                        draggable: true
                    });
                    navigate('/dashboard/history');

                }
            }
        }
    }
    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        disableLink: true,
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm btn-primary my-4" type="submit"
                    disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-500 ">{error}</p>
                {transactionId && <p className="text-green-500">Your TransactionId: {transactionId}</p>}
            </form>
        </div>

    );
};

export default CheckoutForm;