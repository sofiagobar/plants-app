import { useEffect, useState } from "react";
import service from '../../../services/plants-service';
import PlantItem from "../plant-item/PlantItem";

function PlantList() {
    const [plants, setPlants] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        service.list()
            .then(plants => 
                setPlants({ plants}),
                setIsLoading(false)
            )
            .catch(error => 
                setIsLoading(false)
            )
    }, [])


    return(
        plants &&
        <div className="container">
            <div>
                <h1>Find your soul plant</h1>
            </div>
            <div>
                <input type="text" placeholder="Encuentra tu planta"/>
            </div>
            <h3>Featured plants</h3>
            {isLoading === false ? (<i className="fa fa-gear fa-spin"></i>) : (
                <div className="row">
                    <div className="col-6">
                        {plants.map(plant =>
                            <div key={plant.id} className="card" style={{ width: "18rem" }}>
                                <PlantItem {...plant} />
                            </div>
                        )}
                    </div>
                    <div className="col-6">
                    planta
                    </div>
                    <div className="col-6">
                    planta
                    </div>
                    <div className="col-6">
                    planta
                    </div>
                    <div className="col-6">
                    planta
                    </div>
                    <div className="col-6">
                    planta
                    </div>
                </div>
            )}
        </div>
    )
}

export default PlantList;