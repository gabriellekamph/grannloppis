import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useState } from 'react'

// Logout button with modal telling new confirmation link must be sent to login again

const LogoutBtn = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const logoutConfirmed = () => {
    console.log('log out')
    signOut(auth)
  }

  return (
    <>
      <button onClick={() => setShowModal(!showModal)}>
        <p className="link link-underline">Logga ut</p>
      </button>

      {showModal ? (
        <>
          <div className="container max-w-sm h-auto bg-white mx-auto text-black p-5 m-5 flex overflow-x-hidden inset-x-0 overflow-y-auto z-50 fixed outline-none focus:outline-none rounded-md px-5">
            <form>
              <h1 className="font-bold text-md mb-3 text-center">
                Är du säker på att du vill logga ut?
              </h1>
              <p className="text-sm text-center">
                Om du vill logga in på nytt senare behöver du en ny inloggningslänk.
              </p>

              <div className="flex items-center text-black justify-center pt-6">
                <button
                  className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}>
                  Avbryt
                </button>
                <button
                  className="bg-emerald-500 text-black active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={logoutConfirmed}>
                  Ja, jag är säker!
                </button>
              </div>
            </form>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default LogoutBtn
