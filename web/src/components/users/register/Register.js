import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import service from "../../../services/users-service"

function Register() {
  const history = useHistory()
  const [error, setError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault()

    service.register({
        name: event.target.name.value,
        surname: event.target.surname.value,
        email: event.target.email.value,
        password: event.target.password.value,
    })
        .then(() => {
            history.push('/login')
        })
        .catch(error => {
            setError(error.response.data.errors)
        })
  }

    return(
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="col-sm-12 justify-content-md-center align">
                    <div className="form-group row-sm">
                        <label>Name</label>
                        <input type="text" name="name" className={`form-control ${error?.name ? 'is-invalid' : ''}`} 
                         placeholder="Name"/>
                        {error?.name && <div className="invalid-feedback">{error?.name}</div>}
                    </div>
                    <div className="form-group row-sm">
                        <label>Surname</label>
                        <input type="text" name="surname" className={`form-control ${error?.surname ? 'is-invalid' : ''}`} 
                         placeholder="Surname"/>
                        {error?.surname && <div className="invalid-feedback">{error?.surname}</div>}
                    </div>
                    <div className="form-group row-sm">
                        <label>Email</label>
                        <input type="email" name="email" className={`form-control ${error?.email ? 'is-invalid' : ''}`} 
                         placeholder="example@example.org"/>
                        {error?.email && <div className="invalid-feedback">{error?.email}</div>}
                    </div>
                    <div className="form-group row-sm">
                        <label>Password</label>
                        <input type="password" name="password" className={`form-control ${error?.password ? 'is-invalid' : ''}`} 
                         placeholder="Password"/>
                        {error?.password && <div className="invalid-feedback">{error?.password}</div>}
                    </div>
                    <button className="btn btn-primary btn-lg rounded-pill mt-3" type="submit">Register</button>
                </div>
                <p className="mt-3">Already registered? <Link to="/login">Log in</Link></p>
            </div>
        </form>
    )
}

export default Register