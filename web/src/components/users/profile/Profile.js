import { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext"


function Profile () {
    const auth = useContext(AuthContext)

    return (
        <div className="container">
            <div className="col-6">
                <img src={auth.user?.picture} className="profile-picture" alt="profile-picture"/>
                <h1>{auth.user?.name} {auth.user?.surname}</h1>
                <h3>Information</h3>
                <h5>Email {auth.user?.email}</h5>
                <h5>Direction</h5>
                <p>{auth.user?.direction}</p>
            </div>
        </div>
    )
}

export default Profile;