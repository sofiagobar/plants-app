import ordersService from "../../../services/orders-service"

function MyOrders() {
    return(
        <div class="card mb-3" >
            <div class="row g-0">
                <div class="col-md-4">
                <img src="..." class="img-fluid rounded-start" alt="..."/>
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Order confirmed!</h5>
                    <p class="card-text">Order no. {order.id}</p>
                    <a href="#" class="btn btn-primary">See</a>
                </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrders