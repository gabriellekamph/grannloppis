import React, { useState} from "react"
import { db } from "../firebase"
import { collection, serverTimestamp, addDoc } from "firebase/firestore"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

const AddSeller = () => {
  const [showModal, setShowModal] = useState(false)

  const [address, setAddress] = useState<string>('')
  const [categories, setCategories] = useState<string[]>([])
  const [info, setInfo] = useState<string>('')

  const addSeller = (e: any) => {
    e.preventDefault();
    addDoc(collection(db, "sellers"), {
      address: address,
      info: info,
      categories: categories,
      timestamp: serverTimestamp(),
    })
    setShowModal(false)
    console.log("data sent to database")
  }

  const handleChecked = (e: any) => {
    let updatedArray = [...categories]
    if (e.target.checked) {
        updatedArray = [...categories, e.target.value]
    } else {
        updatedArray.splice(categories.indexOf(e.target.value), 1)
    } setCategories(updatedArray)
    console.log(updatedArray)
  }

  return (
    <>
    <div className="w-full flex justify-center mt-4">
    <button
        className="text-white hover:bg-pink-600 text-md px-6 py-3 rounded-md px-4 py-3 border-solid border-2 border-white-200 hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Anmäl dig som säljare
      </button>
    </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-5">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start flex-col p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black mb-3">
                    Anmäl dig som säljare
                  </h3>
                  <p className="text-sm text-black">Vad roligt att du vill vara med och sälja på loppisen! Fyll i din adress, välj vilken typ av varor du säljer och tryck på Spara för att läggas till på loppiskartan.</p>
                </div>
                <div className="relative p-5 pt-0 flex-auto text-black">
                  <form onSubmit={addSeller} className="text-black">
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <label htmlFor="address">
                        Vilken adress säljer du från?
                      </label>
                      <div className="py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm outline-none focus:outline-none focus:ring w-full pr-10">
                        <GooglePlacesAutocomplete
                          selectProps={{
                            address,
                            onChange: setAddress,
                          }}
                        />
                      </div>
                    </div>

                    <div className="relative flex w-96 flex-wrap flex-col items-stretch mb-3 pt-3">
                      <label htmlFor="address">Vad säljer du?</label>
                      <div className="flex justify-between mr-16">
                        <div className="flex flex-col">
                          <label htmlFor="categories1" className="mr-3">
                            <input
                              type="checkbox"
                              name="categories"
                              value="Damkläder"
                              className="mr-2 mt-1"
                              onChange={handleChecked}
                            />
                            Damkläder
                          </label>
                          <label htmlFor="categories2" className="mr-3">
                            <input
                              type="checkbox"
                              name="categories"
                              value="Damskor"
                              className="mr-2 mt-1"
                              onChange={handleChecked}
                            />
                            Damskor
                          </label>
                          <label htmlFor="categories3" className="mr-3">
                            <input
                              type="checkbox"
                              name="categories"
                              value="Herrkläder"
                              className="mr-2 mt-1"
                              onChange={handleChecked}
                            />
                            Herrkläder
                          </label>
                          <label htmlFor="categories4" className="mr-3">
                            <input
                              type="checkbox"
                              name="categories[]"
                              value="Herrskor"
                              className="mr-2 mt-1"
                              onChange={handleChecked}
                            />
                            Herrskor
                          </label>
                          <label htmlFor="categories5" className="mr-3">
                            <input
                              type="checkbox"
                              name="categories"
                              value="Barnkläder"
                              className="mr-2 mt-1"
                              onChange={handleChecked}
                            />
                            Barnkläder
                          </label>
                          <label htmlFor="categories6" className="mr-3">
                            <input
                              type="checkbox"
                              name="categories"
                              value="Barnskor"
                              className="mr-2 mt-1"
                              onChange={handleChecked}
                            />
                            Barnskor
                          </label>
                        </div>
                        <div className="flex flex-col">
                        <label htmlFor="categories7" className="mr-3">
                            <input
                              type="checkbox"
                              name="categories"
                              value="Leksaker"
                              className="mr-2 mt-1"
                              onChange={handleChecked}
                            />
                            Leksaker
                          </label>
                          <label htmlFor="kids-other" className="mr-3">
                            <input
                              type="checkbox"
                              name="categories"
                              value="Övriga barnartiklar"
                              className="mr-2 mt-1"
                              onChange={handleChecked}
                            />
                            Övriga barnartiklar
                          </label>
                          <label htmlFor="categories8" className="mr-3">
                            <input
                              type="checkbox"
                              name="categories"
                              value="Inredning"
                              className="mr-2 mt-1"
                              onChange={handleChecked}
                            />
                            Inredning
                          </label>
                          <label htmlFor="categories9" className="mr-3">
                            <input
                              type="checkbox"
                              name="categories"
                              value="Möbler"
                              className="mr-2 mt-1"
                              onChange={handleChecked}
                            />
                            Möbler
                          </label>
                        <label htmlFor="categories10" className="mr-3">
                            <input
                              type="checkbox"
                              name="categories"
                              value="Verktyg"
                              className="mr-2 mt-1"
                              onChange={handleChecked}
                            />
                            Verktyg
                          </label>
                          <label htmlFor="categories11" className="mr-3">
                            <input
                              type="checkbox"
                              name="categories"
                              value="Kaffe/Fika"
                              className="mr-2 mt-1"
                              onChange={handleChecked}
                            />
                            Kaffe/Fika
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3 pt-3">
                      <label htmlFor="address">
                        Eventuella övriga upplysningar
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setInfo(e.target.value)}
                        placeholder="t.ex. särskilda öppettider eller om någon kategori saknas ovan."
                        className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pr-10"
                      />
                    </div>
                  </form>
                </div>
                <div className="flex items-center text-black justify-end p-6">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Avbryt
                  </button>
                  <button
                    className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={addSeller}
                  >
                    Spara
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default AddSeller