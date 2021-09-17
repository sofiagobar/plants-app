import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
//import { useContext } from 'react';
//import { CartContext } from '../../contexts/CartContext';

//const { cart } = useContext(CartContext);


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY_TEST);

const PayItem = () => {
  return (
    
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PayItem;
