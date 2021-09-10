import { useEffect, useState } from "react";
import plantsService from '../../../services/plants-service';
import PlantItem from "../plant-item/PlantItem";
import SearchBar from "../search-bar/Searchbar";

function PlantList() {
    const [plants, setPlants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [check, setCheck] = useState(false);

    useEffect(() => {
        plantsService.list()
            .then(plants => setPlants({ plants })
            )
            .catch(error => {
                setIsLoading(false)
                console.error(error)
            })
    }, [])

    function handleChange() {
        setCheck(!check)
    }

    function handleSearch(text) {
        setSearch(text)
    }

    const plantFiltered = plants
        .filter(plant => {
            return plant.name.toLowerCase().includes(setSearch(search).toLowerCase())
        })
        .filter(plant =>{
            return plant.petFriendly
        })

    return(
        
        <div className="container">
            <div>
                <h1>Find your soul plant</h1>
            </div>
            <div>
                <SearchBar value={search} onSearch={handleSearch} />
            </div>
            <div class="btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary active">
                    <input onChange={handleChange} value={check} checked autocomplete={check ? "on" : "off"}/> Pet friendly
                </label>
            </div>
            <h3>Featured plants</h3>
            {isLoading ? (<i className="fa fa-gear fa-spin"></i>) : (
                <div className="row">
                    <div className="col-6">
                        {plantFiltered.map(plant =>
                            <PlantItem key={plant.id} {...plant} />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default PlantList;