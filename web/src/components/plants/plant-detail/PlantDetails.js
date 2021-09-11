import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";
import plantsService from "../../../services/plants-service";
//import { useContext } from "react";
//import { CartContext } from "../../../contexts/CartContext";

function PlantDetails() {

    const [plant, setPlant] = useState(null);
    const id = useParams();
    const history = useHistory();
    //const { cart, createProduct} = useContext(CartContext);
    
    useEffect(() => {
        plantsService.detail(id)
            .then(plant => setPlant(plant))
            .catch(error => {
                console.error(error);
                /*if (error.response?.status === 404) {
                    history.push('/404');
                }*/
            })
    }, [id, history])

    /*const handleCreateProduct = () => {
        createProduct({
            name,
            price,
            picture,
            id,
            quantity: 1
        })
        onClick={handleCreateProduct}
    }*/

    return (
        <div className="container">
            <div style={{backgroundImage: `url(${plant.picture})`}}></div>
            <div className="card-body text-centered">
                <h5 className="card-title">{plant.name}</h5>
                <p className="card-text">{plant.price}€</p>
                <button >Add to Cart</button>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{plant.light}</li>
                <li className="list-group-item">{plant.water}</li>
            </ul>
        </div>
    )
}

export default PlantDetails;
//carrito suma +1 al carrito navbar
//Link para volver hacia list plant