import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/users/login/Login";
import Register from "./components/users/register/Register";

function App() {
  return (
    <div className="container">
      
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Redirect to="/"/>
        </Switch>
    
    </div>
  );
}

export default App;

//<Route exact path="/users" component={Register} />