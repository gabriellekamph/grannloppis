import { useState } from "react";

const AddSeller = () => {
  const [showModal, setShowModal] = useState(false);

  const saveSeller = () => {
    alert("new seller saved in database");
  };

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Anmäl dig som säljare
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-5">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start flex-col p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black mb-3">
                    Anmäl dig som säljare
                  </h3>
                  <p className="text-sm text-black">Vad roligt att du vill vara med och sälja på loppisen! Fyll i din adress, välj vilken typ av varor du säljer och tryck på "Spara" för att läggas till på loppiskartan.</p>
                </div>
                <div className="relative p-5 pt-0 flex-auto text-black">
                  <form onSubmit={saveSeller} className="text-black">
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <label htmlFor="address">
                        Vilken adress säljer du från?
                      </label>
                      <input
                        type="text"
                        placeholder="t.ex. Krusboda Torgväg 1"
                        className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pr-10"
                      />
                    </div>

                    <div className="relative flex w-96 flex-wrap flex-col items-stretch mb-3 pt-3">
                      <label htmlFor="address">Vad säljer du?</label>
                      <div className="flex justify-between mr-16">
                        <div className="flex flex-col">
                          {" "}
                          <label htmlFor="womans-clothing" className="mr-3">
                            <input
                              type="checkbox"
                              id="womans-clothing"
                              name="womans-clothing"
                              value="Women's Clothing"
                              className="mr-2 mt-1"
                            />
                            Damkläder
                          </label>
                          <label htmlFor="womans-shoes" className="mr-3">
                            <input
                              type="checkbox"
                              id="womans-shoes"
                              name="womans-shoes"
                              value="Women's Shoes"
                              className="mr-2 mt-1"
                            />
                            Damskor
                          </label>
                          <label htmlFor="mens-clothing" className="mr-3">
                            <input
                              type="checkbox"
                              id="mens-clothing"
                              name="mens-clothing"
                              value="Men's Clothing"
                              className="mr-2 mt-1"
                            />
                            Herrkläder
                          </label>
                          <label htmlFor="mens-shoes" className="mr-3">
                            <input
                              type="checkbox"
                              id="mens-shoes"
                              name="mens-shoes"
                              value="Men's Shoes"
                              className="mr-2 mt-1"
                            />
                            Herrskor
                          </label>
                          <label htmlFor="kids-clothing" className="mr-3">
                            <input
                              type="checkbox"
                              id="kids-clothing"
                              name="kids-clothing"
                              value="Kids Clothing"
                              className="mr-2 mt-1"
                            />
                            Barnkläder
                          </label>
                          <label htmlFor="kids-shoes" className="mr-3">
                            <input
                              type="checkbox"
                              id="kids-shoes"
                              name="kids-shoes"
                              value="Kids shoes"
                              className="mr-2 mt-1"
                            />
                            Barnskor
                          </label>
                        </div>
                        <div className="flex flex-col">
                        <label htmlFor="toys" className="mr-3">
                            <input
                              type="checkbox"
                              id="toys"
                              name="toys"
                              value="Toys"
                              className="mr-2 mt-1"
                            />
                            Leksaker
                          </label>
                          <label htmlFor="kids-other" className="mr-3">
                            <input
                              type="checkbox"
                              id="kids-other"
                              name="kids-other"
                              value="Other kids stuff"
                              className="mr-2 mt-1"
                            />
                            Övriga barnartiklar
                          </label>
                          <label htmlFor="interior" className="mr-3">
                            <input
                              type="checkbox"
                              id="interior"
                              name="interior"
                              value="Interior"
                              className="mr-2 mt-1"
                            />
                            Inredning
                          </label>
                          <label htmlFor="furniture" className="mr-3">
                            <input
                              type="checkbox"
                              id="furniture"
                              name="furniture"
                              value="Furniture"
                              className="mr-2 mt-1"
                            />
                            Möbler
                          </label>
                        <label htmlFor="tools" className="mr-3">
                            <input
                              type="checkbox"
                              id="tools"
                              name="tools"
                              value="Tools"
                              className="mr-2 mt-1"
                            />
                            Verktyg
                          </label>
                          <label htmlFor="coffee" className="mr-3">
                            <input
                              type="checkbox"
                              id="coffee"
                              name="coffee"
                              value="Coffee"
                              className="mr-2 mt-1"
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
                        placeholder="t.ex. särskilda öppettider eller om någon kategori saknas ovan."
                        className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pr-10"
                      />
                    </div>
                  </form>
                </div>
                <div className="flex items-center text-black justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
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
                    onClick={() => setShowModal(false)}
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
