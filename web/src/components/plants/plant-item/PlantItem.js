import "./PlantItem.css";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";

function PlantItem({ id, name, picture, price }) {
  const { cart, createProduct } = useContext(CartContext);

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
    <div className="col-6 mb-3">
      <div className="card">
        <img className="card-img-top" src={picture} alt={name} />
        <div className="card-body">
          <h5 className="card-title text-center">{name}</h5>
          <div className="d-flex justify-content-around">
            <p className="card-text p-2">{price}€</p>
            <button onClick={handleCreateProduct} className="btn btn-success">
              <i className="fa fa-shopping-cart fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
//imagen y título lleva a detalle de la planta
//carrito suma +1 al carrito navbar
export default PlantItem;
