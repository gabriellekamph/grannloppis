import { useState } from 'react'

const RemoveSeller = () => {

    const [activeSeller, setActiveSeller] = useState<boolean>(false)

    const removeSeller = () => {
        console.log("remove seller from map")
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