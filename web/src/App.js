import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/users/login/Login";
import Register from "./components/users/register/Register";
import Navbar from "./components/misc/navbar/Navbar";
import PlantList from "./components/plants/plant-list/PlantList";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import PlantDetails from "./components/plants/plant-detail/PlantDetails";
import GoogleCallback from "./components/users/googlecallback/GoogleCallback";
import PayItem from "./components/orders/Payitem";
import Thankyou from "./components/orders/thank-you/Thankyou";
import MyOrders from "./components/orders/my-orders/MyOrders";

function App() {
  const location = useLocation()
  console.log(location.pathname === '/login')
  return (
    <>
    {location.pathname !== '/login' && <Navbar/>}
      <Switch>
        <Route exact path="/plants/:id" component={PlantDetails} />
        <Route exact path="/" component={PlantList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/google/cb" component={GoogleCallback} />
        <Route exact path="/orders" component={PayItem} />
        <Route exact path='/thankyou' component={Thankyou}/>
        <Route exact path='/myorders' component={MyOrders}/>
        <Redirect to="/"/>
      </Switch>
    </>
  );
}

export default App;
