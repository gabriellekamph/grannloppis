import { auth } from '../firebase'
import { AuthContext } from '../context/AuthProvider'
import { signOut } from 'firebase/auth'


// Logout button here with modal telling new confirmation link must be sent to login again

const LogoutBtn = () => {

    const logout = () => {
        console.log("log out")
        signOut(auth)
    }

    return (
        <>
        <button onClick={logout}>LOGGA UT</button>
        </>
    )
}

export default LogoutBtn