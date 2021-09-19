import http from './base-api-service';

const createOrder= (cart) => {
    console.log('cart:',cart)
    return http.post('/orders', cart)
}

const list = () => http.get('/orders') 

const ordersService = {
    createOrder,
    list
}

export default ordersService;