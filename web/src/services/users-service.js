import http from './base-api-service';

const login = (email, password) => http.post('/login', { email, password })

const logout = () => http.post('/logout')

const getProfile = () => http.get('/profile')
//const getUser = (id) => http.get('`/users/${id}`')

const service = {
    login,
    logout,
    getProfile
};
export default service;
