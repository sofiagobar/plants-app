import '../plant-detail/PlantDetail.css'
import { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";
import plantsService from "../../../services/plants-service";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";

function PlantDetails() {

    const [plant, setPlant] = useState(null);
    const {id} = useParams();
    const history = useHistory();
    const { cart, createProduct} = useContext(CartContext);
    
    useEffect(() => {
        let isMounted = true;
        plantsService.detail(id)
            .then(plant => {
                if (isMounted) {
                    setPlant(plant)
                }
            })
        return () => isMounted = false;
            /*.catch(error => {
                console.error(error);
                if (error.response?.status === 404) {
                    history.push('/404');
                }
            })*/
    }, [id])

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


    return plant && (
        <div>
            <div className="plant-img" style={{backgroundImage: `url(${plant.picture})`}}></div>
            <Link to="/"> <i class="fa fa-angle-left"></i> </Link>
            <div className="card-body text-centered">
                <h5 className="card-title">{plant.name}</h5>
                <p className="card-text">{plant.price}€</p>
                <p className="card-text">{plant.description}</p>
                <button className="btn btn-info" >Add to Cart</button>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{plant.light}</li>
                <li className="list-group-item">{plant.water}</li>
            </ul>
        </div>
    )
}

export default PlantDetails;