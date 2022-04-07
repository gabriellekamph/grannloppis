import Header from '../components/Header'
import AddSeller from '../components/AddSeller'
import React, { useEffect, useContext } from 'react'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthProvider'
import Map from '../components/Map'
import RemoveSeller from '../components/RemoveSeller'
import { SellerContext } from '../context/SellerContext'

const Area = () => {
  const { user } = useContext(AuthContext)
  const { loadingAuthState } = useContext(AuthContext)

  const { activeSeller, setActiveSeller } = useContext<any>(SellerContext)

  // Check if user is registered as active seller in local storage

  useEffect(() => {
    if (localStorage.getItem('activeSeller') === 'yes') {
      setActiveSeller(true)
    }
  }, [])

  // Check if user access the page from the sent email link

  if (typeof window !== 'undefined') {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email: any = window.localStorage.getItem('emailForSignIn')

      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <>
      {loadingAuthState ? null : (
        <>
          <Header />
          {user && !activeSeller ? <AddSeller /> : null}
          {user && activeSeller ? <RemoveSeller /> : null}
          <Map />
        </>
      )}
    </>
  )
}

export default Area
