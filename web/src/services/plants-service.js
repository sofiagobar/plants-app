import http from './base-api-service';

const list = () => http.get('/plants')

const detail = (id) => http.get(`/plants/${id}`)

const plantsService = {
    list,
    detail
}

export default plantsService;