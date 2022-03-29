import React, { useState, useRef } from "react"
import {
  sendSignInLinkToEmail,
} from "firebase/auth"
import { auth } from "../firebase"
import Emoji from "./Emoji"

const LoginBtn = () => {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)

  const emailRef = useRef<any>(null)

  const login = (e: any) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const actionCodeSettings = {
      url: window.location.href,
      //url: 'https://test-diveboard.firebaseapp.com',
      handleCodeInApp: true,
    }
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        console.log("E-postlänk skickad");
        setEmail("");
        setSubmitted(true);
        window.localStorage.setItem("emailForSignIn", email)

        if (showModal === false) {
          setSubmitted(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="w-full flex justify-end text-black">
        <button
          className="text-white hover:bg-pink-600 text-md rounded-md px-4 border-solid border-2 border-white-200 hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(!showModal)}
        >
          Logga in
        </button>
      </div>

      {showModal && !submitted ? (
          <>
        <div className="container w-auto h-auto bg-white text-black p-5 flex overflow-x-hidden overflow-y-auto fixed z-50 outline-none focus:outline-none m-5 absolute top-10 right-0 rounded-md px-5">
          <div className="signin">
            <form>
              <h1 className="font-bold text-lg">Logga in</h1>
              <p>Fyll i din e-postadress för att få en inloggningslänk. </p>
              <input
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="E-postadress"
                className="py-3 placeholder-blueGray-300 text-blueGray-600 mb-3 relative bg-white rounded text-sm outline-none border border-blueGray-300 focus:outline-none focus:ring w-full pr-10 pl-3 mt-3"
              />
              <div className="flex items-center text-black justify-end pt-6">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Avbryt
                </button>
                <button
                  className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={login}
                >
                  Skicka länk
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : showModal && submitted ? (
          <>
        <div className="container flex flex-col w-auto h-auto bg-white text-black p-5 flex overflow-x-hidden overflow-y-auto fixed z-50 outline-none focus:outline-none m-5 absolute top-10 right-0 rounded-md px-5">
          <p>
            Inloggningslänk skickad <Emoji symbol="🎉" />
          </p>
          <button
            className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-5 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
              setShowModal(false), setSubmitted(false)
            }}
          >
            Okej!
          </button>
        </div>
        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) 
      : null}
    </>
  )
}

export default LoginBtn
