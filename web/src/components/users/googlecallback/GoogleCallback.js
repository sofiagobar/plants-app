import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import service from "../../../services/users-service";


function GoogleCallback() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    console.log('éntro en google callback')
    useEffect(() => {
      service.getProfile()
        .then(user => {
          console.log(user)
          auth.login(user);
          history.push('/');
        })
    }, [history, auth])
  
    return null;
  }
  
  export default GoogleCallback;