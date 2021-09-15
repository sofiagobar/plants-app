import "./Navbar.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../../contexts/AuthContext";
import service from "../../../services/users-service";
import { CartContext } from "../../../contexts/CartContext";

function Navbar({ id, name, picture, price }) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { cart, editProduct, deleteProduct } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const handleChange = (event) => {
    setQuantity(event.target.value)
  }

  

  function handleLogout() {
    service.logout().then(() => {
      auth.logout();
      history.push("/login");
    });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowUser(!showUser)}
        >
          <i className="fa fa-user fa-2x"></i>
        </button>
        <a className="navbar-brand" href="#">
          <Link to="/"> Planty </Link>
        </a>

        <div className="inline my-2 my-lg-0">
          <button
            onClick={() => setShowCart(!showCart)}
            className="btn"
            id="cart"
          >
            <i className="fa fa-shopping-cart fa-2x"></i>
            <span className="badge bg-dark text-white ms-1 rounded-pill">
              {cart.products.length}
            </span>
          </button>

          <div className="container">
            <div className="shopping-cart">
              {showCart && (
                <div className="shopping-cart-items">
                  {cart.products.map((product) => (
                    
                      <div className="clearfix" key={product.id}>
                        <img
                          id="plant-img"
                          src={product.picture}
                          alt={product.name}
                        />
                        <span className="item-name me-2 d-flex justify-content-start">
                          {product.name}
                        </span>
                        <div className="d-flex justify-content-around">
                          <span className="item-quantity me-2">
                            Units: {product.quantity}
                            <div className="counter">
                              <div
                                className="btn-units"
                                onClick={() => editProduct(product.id, 'sub')}
                              >
                                -
                              </div>
                              <span
                          
                              >{product.quantity} </span>
                              <div
                                className="btn-units"
                                onClick={() => editProduct(product.id, 'add')}
                              >
                                +
                              </div>
                            </div>
                          </span>
                          <span className="item-price">{product.price}€</span>
                          <button onClick={() => deleteProduct(product.id)}>
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      </div>
                    
                  ))}
                  <div className="shopping-cart-bottom">
                    <div className="shopping-cart-total d-flex justify-content-around">
                      <div className="mt-2">
                        <span className="lighter-text">Total: </span>
                        <span className="main-color-text">
                          {cart.finalPrice.toFixed(2)}
                        </span>
                      </div>
                      <a href="#" className="btn btn-info">
                        Checkout
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {auth.user ? (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {auth.user?.name && (
                <li className="nav-item">
                  <span className="nav-link me-3">Hi {auth.user?.name}!</span>
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  My orders
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogout} href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
