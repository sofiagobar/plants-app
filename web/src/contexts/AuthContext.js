import { nextTick } from 'process'
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
    }, [])

    function login(user) {
        localStorage.setItem('user', user.id)
        setUser(user)
    }

    const value = {
        user,
        login
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}