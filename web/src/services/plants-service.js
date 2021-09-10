import http from './base-api-service';

const list = () => http.get('/plants')

const service = {
    list
}

export default service;