import './CheckoutForm.css'
import { withRouter, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from '../../contexts/AuthContext';
import ordersService from '../../services/orders-service';
import { Link } from 'react-router-dom';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext)
  const history = useHistory()
  const [order, setOrder] = useState()

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
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    ordersService.createOrder(order, cart)
      .then(order => {
        setOrder(order)
        clearCart()
        history.push('/')
      })



    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[paymentMethod]", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="Checkout container">
        <div className="order mb-4">
          <h2>Your Order</h2>
          {cart.products.map((product) => (
            <div className="item mt-4 mb-2">
              <div className="row ">
                <div className="col ">
                  <img id="plant-img" src={product.picture} alt={product.name} />
                </div>
                <div className="col">
                  <span className="name align-middle">{product.name}</span>
                </div>
                <div className="col">
                  <span className="align-middle" >Units: {product.quantity} </span>
                </div>
                <div className="col">
                  <span className="item-price">{product.price}€</span>
                </div>
              </div>
            </div>
          ))}
          <div className="price align-items-end mt-4 ">
            <span className="total lighter-tex me-2">Total: </span>
            <span className="price main-color-text"> {cart.finalPrice.toFixed(2)}€</span>
          </div>
        </div>

        <div className="mt-2 mb-4">
          <h5 >Your contact info</h5>
          <ul className="list-group mt-2">
            <li className="list-group-item">{user.name} {user.surname}</li>
            <li className="list-group-item">{user.email} </li>
            {user.address && <li className="list-group-item">{user.address} </li>}
            {user.city && <li className="list-group-item">{user.city} </li>}
          </ul>
        </div>


        <div className="mt-4">
          <h5 className="mt-4 mb-4">Pay with Card</h5>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  fontFamily: "Roboto, sans-serif",
                  fontSmoothing: "antialiased",
                  color: "#424770",
                  "::placeholder": {
                    color: "#32325d",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <div class="d-grid gap-2 mb-4">
          <Link to="/thankyou"><button className="mt-4 btn btn-success" type="submit" disabled={!stripe}>
              Pay 
            </button> </Link>
          </div>
        </div>
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
