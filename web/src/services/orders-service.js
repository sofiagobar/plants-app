import http from './base-api-service';

const createOrder= () => http.post('/orders')

const ordersService = {
    createOrder,
}

export default ordersService;