import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

// Logout button with modal telling new confirmation link must be sent to login again

const LogoutBtn = () => {

    const logout = () => {
        console.log("log out")
        signOut(auth)
    }

    return (
        <>
        <button onClick={logout}>Logga ut</button>
        </>
    )
}

export default LogoutBtn