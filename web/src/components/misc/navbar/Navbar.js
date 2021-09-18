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

  //const [setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [showUser, setShowUser] = useState(false);

  /*const handleChange = (event) => {
    setQuantity(event.target.value);
  };*/

  function handleLogout() {
    service.logout().then(() => {
      auth.logout();
      history.push("/login");
    });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid mt-2">
      {auth.user ? (
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
        </button> ) : (
          <Link to="/login"><i className="fa fa-user fa-2x"></i> </Link>
        )}

        <h1 className="navbar-brand">
          <Link to="/"> Planty </Link>
        </h1>

        <div className="cart inline my-2 my-lg-0">
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
                    <div className="clearfix mb-3" key={product.id}>
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
                          <div className="counter">
                            <button
                              className="btn-units me-2"
                              onClick={() => editProduct(product.id, "sub")}
                              disabled={product.quantity === 1}
                            >
                              -
                            </button>
                            <span className="me-2">{product.quantity} </span>
                            <button
                              className="btn-units"
                              onClick={() => editProduct(product.id, "add")}
                            >
                              +
                            </button>
                          </div>
                        </span>
                        <span className="item-price">{product.price}€ ({product.quantity * product.price})</span>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                  {cart.finalPrice >= 1 ? (
                    <div className="shopping-cart-bottom">
                      <div className="shopping-cart-total d-flex justify-content-around">
                        <div className="mt-2">
                          <span className="lighter-text">Total: </span>
                          <span className="main-color-text">
                            {cart.finalPrice.toFixed(2)}
                          </span>
                        </div>
                        <Link to="/orders">
                          <button
                            className="btn btn-success"
                            onClick={() => setShowCart(!showCart)}
                          >
                            Checkout
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <p>Nothing in your cart yet!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        
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
                <a className="nav-link active" onClick={handleLogout} href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        
      </div>
    </nav>
  );
}

export default Navbar;
