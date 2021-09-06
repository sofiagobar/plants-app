import "./Login.css"
import { useState } from "react"

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
      setData({
          ...data,
          [event.target.name]: event.target.value
      })
  }

  function handleSubmit(event) {
    event.preventDefault() ///el formulario no se envía

    alert('login!!')
  }

  return (
    <header className="masthead text-center text-white">
      <div className="masthead-content">
        <div className="container px-5">
          <h1 className="masthead-heading mb-0">Planty</h1>
          <form onSubmit={handleSubmit}>
            <div>
              Email
              <input name="email" type="text" onChange={handleChange} value={data.email}/>
            </div>

            <div>
              Password
              <input name="password" type="password" onChange={handleChange} value={data.password}/>
            </div>
            <a className="btn btn-primary btn-xl rounded-pill mt-3" href="/login">Log in</a>
          </form>
          
          <a className="btn btn-primary btn-xl rounded-pill mt-5" href="/sign up">
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
}

export default Login;
