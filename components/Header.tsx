import Link from "next/link"
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"
import LoginBtn from "./LoginBtn"
import { useState, useEffect, useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthProvider'
import { signOut } from 'firebase/auth'

const Header = () => {
  const router = useRouter()
  const { area } = router.query
  const { user } = useContext(AuthContext)

  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    const getCurrentUser:any= localStorage.getItem('emailForSignIn')
    setCurrentUser(getCurrentUser)
    console.log(currentUser)

    if (localStorage.getItem('emailForSignIn') === null) {
      console.log("No user in local storage so sign out from firebase auth")
      signOut(auth);
    }
  }, [])



  return (
    <div className="container flex justify-between p-2 flex flex-col">
      <div className="container flex justify-between mb-8 p-3">
      <Link href="/">
          <a>
            <ArrowNarrowLeftIcon className="h-8 w-8" />
          </a>
        </Link>
      <div>
      {!!user ? null : <LoginBtn /> }
      </div>
      </div>
        <h1 className="text-5xl font-bold uppercase text-center">{area}</h1>
        <p className="text-center">
          { !!user ? `${currentUser}` : ''}
        </p>
    </div>
  )
}

export default Header