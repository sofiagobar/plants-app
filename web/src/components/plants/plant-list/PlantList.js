import "./PlantList.css";
import { useEffect, useState } from "react";
import plantsService from "../../../services/plants-service";
import PlantItem from "../plant-item/PlantItem";
import SearchBar from "../search-bar/Searchbar";

function PlantList() {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [petFriendly, setPetFriendly] = useState('petfriendly');

  useEffect(() => {
    plantsService
      .list(search, petFriendly)
      .then((plants) => {
        setPlants(plants);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, [search, petFriendly]);

  function handleChange() {
    petFriendly ? setPetFriendly('true') : setPetFriendly('false')
  }

  function handleSearch(text) {
    setSearch(text);
  }
  console.log(plants);
  return (
    <div className="container ">
      <div className="my-4">
        <h1>Find your Soul Plant.</h1>
      </div>
      <div className="my-4">
        <SearchBar value={search} onSearch={handleSearch} />
      </div>
      <div className="btn-group-toggle my-4" data-toggle="buttons">
        <button className="btn btn-secondary " onClick={handleChange}>
          <i className="fa fa-paw fa-fg me-2"></i>
          <p>Pet friendly</p>
        </button>
      </div>
      <h3 className="my-4">Featured plants</h3>
      {isLoading ? (
        <i className="fa fa-gear fa-spin"></i>
      ) : (
        <div className="row">
          {plants.map((plant) => (
            <PlantItem key={plant.id} {...plant} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PlantList;
