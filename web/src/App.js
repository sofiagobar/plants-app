import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/users/login/Login";

function App() {
  return (
    <div className="container">
      
        <Switch>
          <Route exact path="/login" component={Login} />
          <Redirect to="/"/>
        </Switch>
    
    </div>
  );
}

export default App;
