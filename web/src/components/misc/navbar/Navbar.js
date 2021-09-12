import "./Navbar.css"
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../../contexts/AuthContext";
import service from "../../../services/users-service";
import { CartContext } from "../../../contexts/CartContext";

function Navbar({ id, name, picture, price, quantity }) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { cart, createProduct } = useContext(CartContext);

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
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-user fa-2x"></i>
        </button>

        <a className="navbar-brand" href="#">
          Planty
        </a>

        <div className="inline my-2 my-lg-0">
          <button className="btn" id="cart">
            <i className="fa fa-shopping-cart fa-2x"></i>
            <span className="badge bg-dark text-white ms-1 rounded-pill">
              {cart.products.length}
            </span>
          </button>

          <div class="container">
            <div class="shopping-cart">
              <div class="shopping-cart-items">
                {cart.products.map((product) => (
                  <div class="clearfix">
                    <img id="plant-img" src={product.picture} alt={product.name} />
                    <span class="item-name me-2">{product.name}</span>
                    <span class="item-quantity me-2">
                      Units: {product.quantity}
                    </span>
                    <span class="item-price">{product.price}€</span>
                  </div>
                ))}
              </div>
              <div class="shopping-cart-bottom">
                <div class="shopping-cart-total">
                  <span class="lighter-text">Total: </span>
                  <span class="main-color-text">{cart.finalPrice}</span>
                  <a href="#" class="btn btn-info">
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {auth.user ? (
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {auth.user?.name && (
                <li className="nav-item">
                  <span className="nav-link me-3">Hi {auth.user?.name}!</span>
                </li>
              )}
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Profile <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
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
