import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Authentication/CheckoutForm";

let stripePromise=loadStripe('pk_test_51QsykCK8lE58N1cd31sN3Q4gYvHEjIhqL6TVFwCdngwNacVXucpFb3Y0hg7jMGLtkjK0FjwQvEaxxrExR60scGzl007uQ3a8Eq');
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