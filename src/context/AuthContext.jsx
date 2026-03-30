import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  function login(email, password) {
    const loggedUser = loginUser(email, password)
    setUser(loggedUser)
    return loggedUser
  }

  function register(name, email, password) {
    const newUser = registerUser(name, email, password)
    return newUser
  }

  function logout() {
    logoutUser()
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}