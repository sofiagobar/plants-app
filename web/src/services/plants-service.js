import http from './base-api-service';

const list = (search, petFriendly) => http.get(`/plants?search=${search}&petFriendly=${petFriendly}`)

const detail = (id) => http.get(`/plants/${id}`)

const plantsService = {
    list,
    detail
}

export default plantsService;