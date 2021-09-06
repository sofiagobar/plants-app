import http from './base-api-service';

const login = (email, password) => http.post('/login', { email, password })

const logout = () => http.post('/logout')

const service = {
    login,
    logout
};
export default service;
