import "./PlantItem.css";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";
import { Link } from "react-router-dom";

function PlantItem({ id, name, picture, price, ...plant }) {
  const { createProduct } = useContext(CartContext);

  const handleCreateProduct = () => {
    createProduct({
      name,
      price,
      picture,
      id,
      quantity: 1,
    });
  };

  return (
    <div className="col-6 mb-3 ">
      <div className="card small-shadow">
        <Link to={`/plants/${id}`} {...plant} > <img className="card-img-top img-fluid" src={picture} alt={name}/> </Link>
        <div className="card-body">
          <h5 className="card-title text-center">{name}</h5>
          <div className="d-flex justify-content-around">
            <p className="card-text p-2">{price}€</p>
            <button onClick={handleCreateProduct} className="btn btn-outline-success">
            <i className="fa fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
//imagen y título lleva a detalle de la planta

export default PlantItem;
