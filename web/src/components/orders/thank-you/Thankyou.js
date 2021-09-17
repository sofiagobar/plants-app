import "./Thankyou.css"
import { Link } from "react-router-dom";

function ThankYou () {
    return(
        <div id="img-login" className="bg-dark py-5" style={{backgroundImage: "url(/img/thankyou.jpg)"}}>
            <div className="thanks container-fluid">
                <h1 className="heading text-center">Thank you for your purchase!</h1>
                <Link to="/"><p className="text-center lead">Keep buying</p></Link>
            </div>
        </div>
    )
}

export default ThankYou;