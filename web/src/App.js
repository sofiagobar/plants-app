import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/users/login/Login";
import Register from "./components/users/register/Register";
import Navbar from "./components/misc/navbar/Navbar";
import PlantList from "./components/plants/plant-list/PlantList";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const location = useLocation()
  console.log(location.pathname === '/login')
  return (
    <>
    {location.pathname !== '/login' && <Navbar/>}
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={PlantList} />
        <Redirect to="/"/>
      </Switch>
      
    </>
  );
}

export default App;
