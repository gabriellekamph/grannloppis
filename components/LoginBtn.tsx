import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { auth } from '../firebase'
import Emoji from './Emoji'

const LoginBtn = () => {
  const router = useRouter()
  const { area } = router.query

  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState<any>('')
  const [submitted, setSubmitted] = useState(false)

  const emailRef = useRef<any>(null)

  const login = (e: any) => {
    e.preventDefault()
    const email: any = emailRef.current.value
    const actionCodeSettings = {
      url: window.location.href,
      // url: `https://grannloppis.vercel.com/${area}/login/`,
      handleCodeInApp: true,
    }

    // Send validation link to users email address

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        console.log('E-postlänk skickad')
        setEmail('')
        setSubmitted(true)
        window.localStorage.setItem('emailForSignIn', email)

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
      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={() => setShowModal(!showModal)}>
        <p className="link link-underline">Logga in</p>
        </button>
      </div>

      {showModal && !submitted ? (
        <>
          <div className="container max-w-xs h-auto bg-white mx-auto text-black p-5 m-5 flex overflow-x-hidden inset-x-0 overflow-y-auto z-50 fixed outline-none focus:outline-none rounded-md px-5">
            <form>
              <p className="font-bold text-lg mb-3">Logga in</p>
              <p>
                Fyll i din e-postadress för att få en inloggningslänk skickad till dig.
                När du har loggat in genom att klicka på länken kan du enkelt lägga till
                eller ta bort dig själv som säljare på loppiskartan.
              </p>
              <input
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="E-postadress"
                className="py-3 placeholder-blueGray-300 mb-3 relative bg-white rounded border border-blueGray-300 w-full pl-3 mt-3"
              />
              <div className="flex justify-center pt-6 gap-5">
                <button
                  className="font-bold px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}>
                  Avbryt
                </button>
                <button
                  className="font-bold px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={login}>
                  Skicka länk
                </button>
              </div>
            </form>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : showModal && submitted ? (
        <>
          <div className="container max-w-min h-auto bg-white mx-auto text-black p-5 m-5 flex flex-col overflow-x-hidden inset-x-0 overflow-y-auto z-50 fixed rounded-md px-5">
            <p className="text-center">
              Inloggningslänk skickad <Emoji symbol="🎉" />
            </p>
            <button
              className="bg-emerald-500 w-32 text-black active:bg-emerald-600 font-bold px-6 py-3 rounded shadow hover:shadow-lg mr-10 ml-10 mt-5 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                setShowModal(false), setSubmitted(false)
              }}>
              Okej!
            </button>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default LoginBtn
