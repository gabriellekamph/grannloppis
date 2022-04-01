import React, { useEffect, useState } from "react"
import { auth } from "../firebase"
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import { firebaseApp } from '../firebase'

type ContextProps = {
    user: null
    authenticated: boolean
    setUser: any
    loadingAuthState: boolean
}

export const AuthContext = React.createContext<Partial<ContextProps>>({})
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null)
  const [loadingAuthState, setLoadingAuthState] = useState(true)

  useEffect(() => {
      auth.onAuthStateChanged((user: any) => {
        setUser(user);
        setLoadingAuthState(false)
    })

  }, [])

  if (typeof window !== "undefined") {

    if (isSignInWithEmailLink(auth, window.location.href)) {

      let email: any = window.localStorage.getItem('emailForSignIn');

      // signInWithEmailLink(auth, email, window.location.href)
      //   .then((result) => {
      //     console.log(result.user)
      //     console.log(result.user.email)
      //   })
      //   .catch((error) => {
         
      //   })
    }
  }

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