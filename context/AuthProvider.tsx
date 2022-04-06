import React, { useEffect, useState } from "react"
import { auth } from "../firebase"

type ContextProps = {
    user: null
    authenticated: boolean
    setUser: any
    loadingAuthState: boolean
}

// Provider to handle authentication status with Firebase

export const AuthContext = React.createContext<Partial<ContextProps>>({})
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null)
  const [loadingAuthState, setLoadingAuthState] = useState(true)

  useEffect(() => {
      auth.onAuthStateChanged((user: any) => {
        setUser(user);
        setLoadingAuthState(false);
    })

  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState
      }}>
        {children} 
    </AuthContext.Provider>
  )
}