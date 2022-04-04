import { useContext } from 'react'
import { db } from "../firebase"
import { collection, deleteDoc, query, where, getDocs } from "firebase/firestore"
import { SellerContext } from '../context/SellerContext'

const RemoveSeller = () => {

    const { activeSeller, setActiveSeller } = useContext<any>(SellerContext)

    // Remove seller from map (and delete data from database) if they click the "remove me as seller"-button
    
    const removeSeller = async () => {
        const sellersRef = collection(db, "sellers")

        const q:any = query(sellersRef, where("email", "==", "gabrielle.kamph@gmail.com"))

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc:any) => {
        console.log(doc.id, " => ", doc.data());
        deleteDoc(doc.ref)
        })

        localStorage.removeItem('activeSeller')
        setActiveSeller(false)
    }

    return (
        <div className="w-full flex justify-center mt-4">
            <button
                className="text-white hover:bg-pink-600 text-md px-6 py-3 rounded-md px-4 py-3 border-solid border-2 border-white-200 hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={removeSeller}
                >
                Ta bort dig som säljare
            </button>
        </div>
        
    )
}

export default RemoveSeller