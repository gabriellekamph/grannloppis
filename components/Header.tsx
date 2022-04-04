import Link from "next/link"
import { UserIcon, ArrowNarrowLeftIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"
import LoginBtn from "./LoginBtn"
import { useState, useEffect, useContext } from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../context/AuthProvider'

const Header = () => {
  const router = useRouter()
  const { area } = router.query
  const { user } = useContext(AuthContext)

  const currentUser = localStorage.getItem('emailForSignIn')

  return (
    <div className="container flex justify-between p-2 flex flex-col">
      <div className="container flex justify-between mb-8 p-3">
      <Link href="/">
          <a>
            <ArrowNarrowLeftIcon className="h-8 w-8" />
          </a>
        </Link>
      </div>
        <h1 className="text-5xl font-bold uppercase text-center">{area}</h1>
        <p className="text-center">
          { !!user ? `${currentUser}` : ''}
        </p>
    </div>
  )
}

export default Header