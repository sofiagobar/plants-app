import http from './base-api-service';

const createOrder= (cart) => {
    console.log('cart:',cart)
    return http.post('/orders', cart)
}

const ordersService = {
    createOrder,
}

export default ordersService;