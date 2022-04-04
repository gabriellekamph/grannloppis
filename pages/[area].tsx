import Header from "../components/Header"
import Footer from "../components/Footer"
import AddSeller from "../components/AddSeller"
import React, { useEffect, useState, useContext } from "react"
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import { auth } from "../firebase"
import { AuthContext } from '../context/AuthProvider'
import Map from '../components/Map'
import RemoveSeller from "../components/RemoveSeller"

const Area = () => {

  const { user } = useContext(AuthContext)

  const [activeSeller, setActiveSeller] = useState<boolean>(false)


  useEffect(() => {

    let active;
    if (localStorage.getItem('activeSeller') === 'yes') {
      active = true;
      setActiveSeller(active)
    } else {
      active = false;
    }
  }, [])

  if (typeof window !== "undefined") {

    if (isSignInWithEmailLink(auth, window.location.href)) {

      let email: any = window.localStorage.getItem('emailForSignIn');

      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          
        })
        .catch((error) => {
         
        })
    }
  }

  return (
    <>
      <Header />
      {user && !activeSeller ? <AddSeller /> : <RemoveSeller />}
      <Map />
      <Footer />
    </>
  );
};

export default Area;
