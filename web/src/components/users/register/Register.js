import { useState } from "react"
import { useHistory } from "react-router-dom"
//import service from "../../services/contacts-service"

function Register() {
  const history = useHistory()
  const [error, setError] = useState()

    return(
        <form>
            <div class="container">
                <div class="col-sm-6 justify-content-md-center align">
                    <div class="form-group row-sm">
                        <label for="formGroupExampleInput">Name</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Name"/>
                    </div>
                    <div class="form-group row-sm">
                        <label for="formGroupExampleInput">Surname</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Surname"/>
                    </div>
                    <div class="form-group row-sm">
                        <label for="formGroupExampleInput">Email</label>
                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Email"/>
                    </div>
                    <div class="form-group row-sm">
                        <label for="formGroupExampleInput2">Password</label>
                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Password"/>
                    </div>
                </div>
            </div>
        </form>
    )


}

export default Register