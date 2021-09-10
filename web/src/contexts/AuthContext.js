import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import service from '../services/users-service'

export const AuthContext = React.createContext()

export function AuthContextProvider({ children }) {
    const history = useHistory()
    const [user, setUser] = useState()

    useEffect(() => {
        const userId = localStorage.getItem('user')

        if (!userId) {
            history.push('/login')
        } else {
            service.getProfile()
                .then((user) =>setUser(user))
        } 
    }, [history])

    function login(user) {
        localStorage.setItem('user', user.id)
        setUser(user)
    }

    function logout() {
        localStorage.removeItem('user');
        setUser(null)
      }

    const value = {
        user,
        login, 
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}