import ordersService from "../../../services/orders-service";
import { useEffect, useState } from "react";

function MyOrders({ id }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let isMounted = true;
    ordersService
      .list()
      .then((orders) => {
        if (isMounted) {
          setOrders(orders);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return () => (isMounted = false);
  }, [orders]);

  return (
    <div className="container">
      {orders.map((order) => (
        <div className="card border-success mb-3 mt-3" key={order.id} {...order}>
          
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Order confirmed!</h5>
                <p className="card-text">Order no. {order.id}</p>
                <ul className="list-group">
                  {order.products.map((product) => (
                    <li className="list-group-item">{product.name}</li>
                  ))}
                </ul>
                <button className="btn btn-outline-success mt-2">See</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
/*<div className="col-md-4">
              <img src={products[0].image} className="img-fluid rounded-start" alt={order.id} />
            </div>*/
