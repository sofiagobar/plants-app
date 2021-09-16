import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

const CheckoutForm = () => {
  const stripe = useStripe();
  const {cart} = useContext(CartContext)
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });


    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[este es tu]', cart);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="Checkout">
            <h5 className="mt-2 mb-3">Pay with Card</h5>
            <CardElement 
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        fontFamily: 'Roboto, sans-serif',
                        fontSmoothing: "antialiased",
                        color: '#424770',
                        '::placeholder': {
                        color: '#32325d',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                    },
                }}
            />
            <button className="mt-4" type="submit" disabled={!stripe}>
                Pay
            </button>
        </div>
    </form>
  );
};

export default withRouter(CheckoutForm);


/*// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY_TEST);

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};*/