import http from './base-api-service';

const login = (email, password) => http.post('/login', { email, password })

const logout = () => http.post('/logout')

const getProfile = () => http.get('/profile')

const register = (user) => {
    const data = new FormData()

    data.append('name', user.name)
    data.append('name', user.surname)
    data.append('email', user.email)
    data.append('password', user.password)
    
    return http.post('/register', data)}

const service = {
    login,
    logout,
    getProfile,
    register
};
export default service;
