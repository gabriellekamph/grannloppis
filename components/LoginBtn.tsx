import React, { useState, useRef } from "react"
import { useRouter } from "next/router"
import {
  sendSignInLinkToEmail,
} from "firebase/auth"
import { auth } from "../firebase"
import Emoji from "./Emoji"

const LoginBtn = () => {

  const router = useRouter()
  const { area } = router.query

  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState<any>('')
  const [submitted, setSubmitted] = useState(false)

  const emailRef = useRef<any>(null)

  const login = (e: any) => {
    e.preventDefault();
    const email: any = emailRef.current.value
    const actionCodeSettings = {
      url: window.location.href,
      // url: `https://grannloppis.vercel.com/${area}/login/`,
      handleCodeInApp: true,
    }

    // Send validation link to users email address

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        console.log("E-postlänk skickad");
        setEmail("")
        setSubmitted(true)
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
          Jag vill vara med och sälja
        </button>
      </div>

      {showModal && !submitted ? (
          <>
        <div className="container max-w-sm h-auto bg-white mx-auto text-black p-5 m-5 flex overflow-x-hidden inset-x-0 overflow-y-auto z-50 fixed outline-none focus:outline-none rounded-md px-5">
            <form>
              <h1 className="font-bold text-lg mb-3">Vill du vara med och sälja på loppisen?</h1>
              <p>Fyll i din e-postadress för att få en verifieringslänk skickad till dig. <br /><br />
              När du har verifierat dig genom att klicka på länken kan du enkelt lägga till dig själv som säljare på loppiskartan. </p>
              <input
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="E-postadress"
                className="py-3 placeholder-blueGray-300 text-blueGray-600 mb-3 relative bg-white rounded text-sm outline-none border border-blueGray-300 focus:outline-none focus:ring w-full pl-3 mt-3"
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
        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : showModal && submitted ? (
          <>
        <div className="container max-w-min h-auto bg-white mx-auto text-black p-5 m-5 flex flex-col overflow-x-hidden inset-x-0 overflow-y-auto z-50 fixed outline-none focus:outline-none rounded-md px-5">
          <p>
            Verifieringslänk skickad <Emoji symbol="🎉" />
          </p>
          <button
            className="bg-emerald-500 w-32 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-10 ml-10 mt-5 mb-1 ease-linear transition-all duration-150"
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
