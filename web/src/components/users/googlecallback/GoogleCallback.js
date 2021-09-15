import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import service from "../../../services/users-service";


function GoogleCallback() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    
    useEffect(() => {
      service.getUser('me')
        .then(user => {
          auth.login(user);
          history.push('/');
        })
    }, [history, auth])
  
    return null;
  }
  
  export default GoogleCallback;