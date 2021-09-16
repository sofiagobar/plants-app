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

/*{cart.products.map((product) => (
    <div className="container">
        <div className="row">
            <div className="col">
                <img
                id="plant-img"
                src={product.picture}
                alt={product.name}
                />               
            </div>
            <div className="col">
                <span>{product.name}</span>
            </div>
            <div className="col">
                <span>{product.quantity} </span>
            </div>
            <div className="col">
                <span className="item-price">{product.price}€</span>
            </div>
        </div>
    </div>
))}
    <div className="mt-2">
        <span className="lighter-text">Total: </span>
        <span className="main-color-text">
            {cart.finalPrice.toFixed(2)}
        </span>
    </div>
*/