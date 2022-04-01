import Header from "../components/Header"
import Footer from "../components/Footer"
import AddSeller from "../components/AddSeller"
import MapContainer from "../components/MapContainer"
import React, { useEffect, useState, useContext } from "react"
import { isSignInWithEmailLink, onAuthStateChanged, signInWithEmailLink } from "firebase/auth"
import { auth } from "../firebase"
import { AuthContext } from '../context/AuthProvider'

const Area = () => {

  const { user } = useContext(AuthContext)


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
      {user ? <AddSeller /> : null}
      <MapContainer />
      <Footer />
    </>
  );
};

export default Area;
