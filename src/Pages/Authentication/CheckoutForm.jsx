import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import UseCart from "../../Components/Shared/UseCart";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";
import { AuthContext } from "./Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    let [error, setError] = useState("");
    let [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    let [loading, setLoading] = useState(false);
    let { user } = useContext(AuthContext);
    let [transactionId, setTransactionId] = useState("");
    let [cart, refetch] = UseCart();
    let axiosSecure = UseAxiosSecure();
    let navigate = useNavigate("");
    const elements = useElements();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure
                .post("/create-payment-intent", { price: totalPrice })
                .then((res) => {
                    setClientSecret(res.data?.clientSecret);
                });
        }
    }, [totalPrice, axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        let { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError("");
        }

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "anonymous",
                        name: user?.displayName || "anonymous",
                    },
                },
            });

        if (confirmError) {
            setError("Payment failed, please try again.");
        } else {
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cardId: cart.map((item) => item._id),
                    menuItemId: cart.map((item) => item.menuId),
                    status: "pending",
                };

                const res = await axiosSecure.post("/payments", payment);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        title: "Payment Successful",
                        text: "Your order has been placed.",
                        icon: "success",
                        confirmButtonColor: "#16a34a",
                    });
                    navigate("/dashboard/history");
                }
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border"
            >
                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                    💳 Secure Checkout
                </h2>
                <p className="text-center text-gray-500 mt-1 mb-6">
                    Enter your card details to complete your purchase
                </p>

                {/* Price Summary */}
                <div className="mb-6 text-center">
                    <p className="text-lg font-semibold text-gray-700">
                        Total Amount:{" "}
                        <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                    </p>
                </div>

                {/* Card Input */}
                <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
                    <CardElement

                        options={{
                            disableLink: true,
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": {
                                        color: "#aab7c4",
                                    },
                                },
                                invalid: {
                                    color: "#9e2146",
                                },
                            },
                        }}
                    />
                </div>

                {/* Pay Button */}
                <button
                    className="w-full mt-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay ${totalPrice.toFixed(2)}
                </button>

                {/* Error Message */}
                {error && (
                    <p className="mt-4 p-3 text-sm bg-red-100 text-red-600 rounded-lg border border-red-300">
                        ⚠ {error}
                    </p>
                )}

                {/* Success Message */}
                {transactionId && (
                    <p className="mt-4 p-3 text-sm bg-green-100 text-green-600 rounded-lg border border-green-300">
                        ✅ Payment successful! Transaction ID:{" "}
                        <span className="font-semibold">{transactionId}</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default CheckoutForm;
