import React, { useState, useContext } from 'react'
import { db } from '../firebase'
import { collection, serverTimestamp, addDoc } from 'firebase/firestore'
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete'
import { v4 as uuidv4 } from 'uuid'
import { SellerContext } from '../context/SellerContext'

const AddSeller = () => {
  const { activeSeller, setActiveSeller } = useContext<any>(SellerContext)

  const [showModal, setShowModal] = useState(false)

  const [id, setId] = useState<any>(null)
  const [address, setAddress] = useState<string | any>('')
  const [categories, setCategories] = useState<string[]>([])
  const [info, setInfo] = useState<string>('')
  const [location, setlocation] = useState<any>({
    lat: null,
    lng: null,
  })

  const addSeller = (e: any) => {
    e.preventDefault()
    addDoc(collection(db, 'sellers'), {
      id: uuidv4(),
      email: localStorage.getItem('emailForSignIn'),
      address: address,
      info: info,
      categories: categories,
      location: location,
      timestamp: serverTimestamp(),
    })
    setShowModal(false)
    console.log('Data sent to database')
    localStorage.setItem('activeSeller', 'yes')
    setActiveSeller(true)
  }

  const handleChecked = (e: any) => {
    let updatedArray = [...categories]
    if (e.target.checked) {
      updatedArray = [...categories, e.target.value]
    } else {
      updatedArray.splice(categories.indexOf(e.target.value), 1)
    }
    setCategories(updatedArray)
    console.log(updatedArray)
  }

  const handleChange = (address: any) => {
    const selectedAddress = address.label
    setAddress(selectedAddress)

    geocodeByAddress(selectedAddress)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Successfully got latitude and longitude', { lat, lng })
        setlocation({ lat: Number(lat), lng: Number(lng) })
      })
  }

  return (
    <>
      <div className="w-full flex justify-center mt-4">
        <button
          className="text-white hover:bg-pink-600 px-6 py-3 rounded-md px-4 py-3 border-solid border-2 border-white-200 hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}>
          Lägg till dig som säljare
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-5">
            <div className="container max-w-lg bg-white p-5 rounded-lg px-5">
              <div className="container w-auto mb-5">
                <p className="text-xl font-semibold text-black mb-2">
                  Lägg till dig som säljare
                </p>
                <p className="text-black">
                  Vad roligt att du vill vara med och sälja på loppisen! Fyll i din
                  adress, vilken typ av varor du säljer och spara för att läggas till på
                  loppiskartan.
                </p>
              </div>
              <div className="container w-auto text-black">
                <form onSubmit={addSeller} className="text-black">
                  <div className="flex w-full flex-wrap items-stretch mb-2">
                    <label htmlFor="address">Vilken adress säljer du från?</label>
                    <div className="py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded outline-none focus:outline-none focus:ring w-full">
                      <GooglePlacesAutocomplete
                        selectProps={{
                          address,
                          onChange: handleChange,
                          placeholder: 't.ex. Krusboda Torgväg 1',
                        }}
                        autocompletionRequest={{
                          bounds: [
                            { lat: 50, lng: 50 },
                            { lat: 100, lng: 100 }
                          ],
                          componentRestrictions: {
                          country: ['sv', 'se'],
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="relative flex w-96 flex-wrap flex-col items-stretch mb-3 pt-1">
                    <label htmlFor="address" className="mb-2">
                      Vad säljer du?
                    </label>
                    <div className="flex justify-between mr-20">
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
                            name="categories"
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
                    <label htmlFor="address">Eventuella övriga upplysningar</label>
                    <input
                      type="text"
                      onChange={(e) => setInfo(e.target.value)}
                      placeholder="t.ex. särskilda öppettider"
                      className="py-3 placeholder-blueGray-300 relative bg-white rounded border border-blueGray-300 focus:ring w-full pr-10 pl-3 mt-3"
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center text-black justify-end pt-4 gap-5">
                <button
                  className="font-bold px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}>
                  Avbryt
                </button>
                <button
                  className="font-bold px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={addSeller}>
                  Spara
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default AddSeller
