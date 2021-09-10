import "./Login.css";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import service from "../../../services/users-service";

function Login() {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  function handleChange(event) {
    const inputName = event.target.name;
    const value = event.target.value;
      setData({
          ...data,
          [inputName]: value
      })
  }

  function handleSubmit(event) {
    event.preventDefault() 

    service.login(data.email, data.password)
      .then((user) => {
        console.log('ÚSUARIO', user)
        auth.login(user)
        history.push("/")
      })
      .catch(() => {
        setError("Incorrect Email or password")
      })
  }

  return (
      <div id="img-login" className="bg-dark py-5" style={{backgroundImage: "url(/img/loginbg.jpg)"}}>
        <div className="container">
          <div className="text-center">
            <h1 className="heading mb-5">Planty</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group mx-sm-3">
                <label>Email</label> 
                <input name="email" type="text" value={data.email} placeholder="example@example.org" onChange={handleChange}
                className={`form-control ${error ? 'is-invalid' : ''}`} />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>

              <div className="form-group mx-sm-3">
                <label>Password</label> 
                <input name="password" type="password" value={data.password} className="form-control col-md-2" onChange={handleChange}
                placeholder="Password" />
              </div>

              <button className="btn btn-primary btn-lg rounded-pill mt-3" type="submit">Log in</button>
            </form>
            

            <a className="btn btn-primary btn-lg rounded-pill mt-4" href="http://localhost:3001/api/authenticate/google"><i className="fa fa-google"></i> Log in with Google</a>
            
            <p className="mt-3">First time here? <Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
  );
}

export default Login;