import { useContext, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { SellerContext } from "../context/SellerContext";

const RemoveSeller = () => {
  const { activeSeller, setActiveSeller } = useContext<any>(SellerContext);

  const [showModal, setShowModal] = useState<boolean>(false);

  // Remove seller from map (and delete data from database) if they click the "remove me as seller"-button

  const removeConfirmed = async () => {
    const sellersRef = collection(db, "sellers");

    const q: any = query(
      sellersRef,
      where("email", "==", "gabrielle.kamph@gmail.com")
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc: any) => {
      console.log(doc.id, " => ", doc.data());
      deleteDoc(doc.ref);
    });

    localStorage.removeItem("activeSeller");
    setActiveSeller(false);
  };

  return (
    <div className="w-full mt-4">
      <button
          className="px-3 py-2 rounded-lg bg-darkmain hover:bg-lightmain mr-1 mb-1 transition-all duration-100"
          onClick={() => setShowModal(!showModal)}
      >
        Ta bort dig som säljare
      </button>

      {showModal ? (
        <>
          <div className="container max-w-xs h-auto bg-white mx-auto justify-center text-black p-5 m-5 flex overflow-x-hidden inset-x-0 overflow-y-auto z-50 fixed outline-none focus:outline-none rounded-lg px-5">
            <form>
              <h1 className="text-md text-center text-center">
                Är du säker på att du vill ta bort dig som säljare från loppiskartan?
              </h1>
              <div className="flex items-center justify-center text-black pt-6 gap-5">
                <button
                  className="px-3 py-2 rounded-lg bg-lightgray hover:scale-105"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Avbryt
                </button>
                <button
                  className="text-white px-3 py-2 rounded-lg bg-main hover:scale-105"                  
                  type="button"
                  onClick={removeConfirmed}
                >
                  Ja, ta bort mig!
                </button>
              </div>
            </form>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export default RemoveSeller
