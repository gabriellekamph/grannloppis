import Link from "next/link"
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"
import LoginBtn from "./LoginBtn"
import LogoutBtn from "./LogoutBtn"
import { useState, useEffect, useContext } from "react"
import { auth } from "../firebase"
import { AuthContext } from "../context/AuthProvider"
import { signOut } from "firebase/auth"
import { SellerContext } from "../context/SellerContext"

const Header = () => {
  const router = useRouter();
  const { area } = router.query;
  const { user } = useContext(AuthContext);
  const { loadingAuthState } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState("");

  const { activeSeller, setActiveSeller } = useContext<any>(SellerContext);

  useEffect(() => {

    // Get email for current user from local storage
    
    const getCurrentUser: any = localStorage.getItem("emailForSignIn");
    setCurrentUser(getCurrentUser)

    // Sign out from Firebase if no user is saved in local storage

    if (localStorage.getItem("emailForSignIn") === null) {
      signOut(auth)
    }
  }, [])

  return (
    <>
      <div className="container flex justify-between p-1 flex flex-col">
        <div className="container flex justify-between mb-8 p-3">
          <Link href="/">
            <a>
              <ArrowNarrowLeftIcon className="h-7 w-8" />
            </a>
          </Link>
          {loadingAuthState ? null : (
            <div>{user ? <LogoutBtn /> : <LoginBtn />}</div>
          )}
        </div>
        <h1 className="text-4xl font-bold uppercase text-center mb-1">
          {area}
        </h1>

        {loadingAuthState ? null : (
          <p className="text-center text-sm">
            {user
              ? `${currentUser}`
              : "Logga in för att lägga till eller ta bort dig själv från loppiskartan."}
          </p>
        )}
      </div>
    </>
  )
}

export default Header