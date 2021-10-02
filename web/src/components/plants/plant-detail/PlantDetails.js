import '../plant-detail/PlantDetail.css'
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";
import plantsService from "../../../services/plants-service";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";

function PlantDetails() {

    const [plant, setPlant] = useState(null);
    const {id} = useParams();
    const { createProduct} = useContext(CartContext);
    
    useEffect(() => {
        let isMounted = true;
        plantsService.detail(id)
            .then(plant => {
                if (isMounted) {
                    setPlant(plant)
                }
            })
        return () => isMounted = false;
    }, [id])

    const handleCreateProduct = () => {
        createProduct({
            name: plant.name,
            price:plant.price,
            picture: plant.picture,
            id: plant.id,
            quantity: 1
        })
    }

    return plant && (
        <div>
            <div className="plant-img" style={{backgroundImage: `url(${plant.picture})`}}></div>
            <Link to="/"> <i id="angle-icon" class="fa fa-angle-left fa-3x"></i> </Link>
            <div className="card-body text-centered">
                <h1 className="card-title mb-3">{plant.name}</h1>
                <div className="price-cart mb-3">
                    <h3 className="card-price">{plant.price}€</h3>
                    <button className="btn btn-info" onClick={handleCreateProduct} >Add to Cart</button>
                </div >
                <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item"> <i class="fa fa-sun"></i> {plant.light}</li>
                    <li className="list-group-item"> <i class="fa fa-tint fa-2x me-3"></i> {plant.water}</li>
                </ul>
                <p className="card-text mb-2">{plant.description}</p>
                
            </div>
            
        </div>
    )
}

export default PlantDetails;