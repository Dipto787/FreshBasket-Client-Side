import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Authentication/CheckoutForm";

let stripePromise=loadStripe('pk_test_51RL6YARg9lFKOrBm83qp3PklEeNMJAirNnM9Od2tNv7zyHuJNufGjmnmKSefjlJ7EEQ6BgB9ZkITzd943QfowoJF00fUVEH4xD');
const PaymentSystem = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
    );
};

export default PaymentSystem;