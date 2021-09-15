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
    <i className="navbar-toggler-icon fa fa-user fa-2x"></i>
  </button>

  <a className="navbar-brand" href="#">
    Planty
  </a>

  <div className="inline my-2 my-lg-0">
    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuClickable" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
      <i className="fa fa-shopping-cart fa-2x"></i>
      <span className="badge bg-dark text-white ms-1 rounded-pill">
        {cart.products.length}
      </span>
    </button>

    <div className="container">
      <div className="shopping-cart">
        <div className="dropdown-menu shopping-cart-items" aria-labelledby="dropdownMenuClickable" >
          {cart.products.map((product) => (
            <div className="dropdown-item">
              <img id="plant-img" src={product.picture} alt={product.name} />
              <span className="item-name me-2">{product.name}</span>
              <span className="item-quantity me-2">
                Units: {product.quantity}
              </span>
              <span className="item-price">{product.price}€</span>
            </div>
          ))}
        </div>
        <div className="shopping-cart-bottom">
          <div className="shopping-cart-total">
            <span className="lighter-text">Total: </span>
            <span className="main-color-text">{cart.finalPrice}</span>
            <a href="#" className="btn btn-info">
              Checkout
            </a>
          </div>
        </div>
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
        <li className="nav-item active">
          <a className="nav-link" href="#">
            Profile <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item active">
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