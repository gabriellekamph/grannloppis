import Link from 'next/link'
import { useRouter } from 'next/router'
import LoginBtn from './LoginBtn'
import LogoutBtn from './LogoutBtn'
import { useState, useEffect, useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthProvider'
import { signOut } from 'firebase/auth'
import { SellerContext } from '../context/SellerContext'
import { UserIcon } from '@heroicons/react/solid'
import Image from 'next/image'

const Header = () => {
  const router = useRouter()
  const { area } = router.query
  const { user } = useContext(AuthContext)
  const { loadingAuthState } = useContext(AuthContext)

  const [currentUser, setCurrentUser] = useState('')

  const { activeSeller, setActiveSeller } = useContext<any>(SellerContext)

  useEffect(() => {
    // Get email for current user from local storage

    const getCurrentUser: any = localStorage.getItem('emailForSignIn')
    setCurrentUser(getCurrentUser)

    // Sign out from Firebase if no user is saved in local storage

    if (localStorage.getItem('emailForSignIn') === null) {
      signOut(auth)
    }
  }, [])

  return (
    <>
      <div className="container flex justify-between flex-col">
        <div className="container flex justify-between items-center mb-10">
          <Link href="/">
            <a>
              <Image src="/logos/logo.png" alt="Grannloppis small logotype" width={80} height={50} className="cursor-pointer transition duration-200 hover:scale-105" />
            </a>
          </Link>
          {loadingAuthState ? null : <div>{user ? <LogoutBtn /> : <LoginBtn />}</div>}
        </div>

        <h1 className="text-5xl lg:text-6xl font-bold capitalize mb-1">{area}</h1>

        <div className="flex gap-2">
          {user ? <UserIcon className="w-5" /> : null}
          {loadingAuthState ? null : (
            <p className="container text-sm w-11/12">
              {user
                ? `${currentUser}`
                : 'Logga in för att lägga till eller ta bort dig själv från loppiskartan.'}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default Header