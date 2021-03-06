import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

// Global variables that contains all markers on the map and all checked categories from the filter function

let markers: any = []
let checkedCategories: any = []

const Map = () => {

  const [sellers, setSellers] = useState<any>([])
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const googleMap: any = useRef(null)

  // Hide Google Maps default pins

  const hidePois = [
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ]

  // Fetch data from firebase and store in sellers state

  useEffect(() => {
    fetchSellers()
  }, [])

  const fetchSellers = async () => {
    const q = await query(collection(db, 'sellers'))

    const getData = onSnapshot(q, (querySnapshot) => {
      let allSellers: any = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        allSellers.push(data)
      })
      setSellers(allSellers)
    })
  }

  // Load Google Maps using js-api-loader

  useEffect(() => {

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    })

    let map: any
    let currentInfoWindow: any = ''

    loader.load().then(() => {
      markers = []
      const google = window.google
      const defaultCenter = { lat: 59.23146869560826, lng: 18.247962069565833 }

      // Create a map with coordinates for Krusboda (stored in the defaultCenter variable)

      map = new google.maps.Map(googleMap.current, {
        center: defaultCenter,
        zoom: 15,
        styles: hidePois,
      })

      // Loop through all sellers in database and get information and coordinates for each seller

      for (let i = 0; i < sellers.length; i++) {
        const seller = sellers[i]
        const lat = parseFloat(seller.location.lat)
        const lng = parseFloat(seller.location.lng)
        const address = seller.address
        const categories = seller.categories
        const info = seller.info

        // Create markers from fetched coordinates and display on map

        let marker = new google.maps.Marker({
          position: { lat: lat, lng: lng },
          icon: 'https://cdn.mapmarker.io/api/v1/font-awesome/v4/pin?icon=fa-circle&size=42&hoffset=0&voffset=-1&background=E86566',
          map,
        })

        markers.push(marker)

        // Create info window

        let infowindow = new google.maps.InfoWindow()

        // Info about selected seller to display in infowindow

        const sellerInfo = `<div>
                <p style="line-height:2"><strong>${address}</strong><br />
                  <p style="line-height:1">${categories.join(', ')}</p> <br />
                <i>${info}</i>
                </p>
                </div>`

        // Close current info window if a new marker is clicked

        google.maps.event.addListener(marker, 'click', function () {
          {
            if (currentInfoWindow != '') {
              currentInfoWindow.close()
              currentInfoWindow = ''
            }
            infowindow.setContent(sellerInfo)
            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: true,
            })
            currentInfoWindow = infowindow
          }
        })

        // Close info window when user click anywhere on the map

        google.maps.event.addListener(map, 'click', function () {
          infowindow.close()
        })
      }
    })
  })

  // Store all checked categories in the state "checkedCategories"

  const handleCheck = (e: any) => {
    let updatedArray = [...checkedCategories]
    if (e.target.checked) {
      updatedArray = [...checkedCategories, e.target.value]
    } else {
      updatedArray.splice(checkedCategories.indexOf(e.target.value), 1)
    }
    checkedCategories = updatedArray
    toggleMarkers()
  }

  // Change color on marker from pink to yellow if checked category matches sellers category

  const toggleMarkers = () => {
    for (let i = 0; i < sellers.length; i++) {
      const seller = sellers[i]
      let isSellerInCheckedCategories: boolean = false

      for (let j = 0; j < sellers[i].categories.length; j++) {
        if (checkedCategories.includes(sellers[i].categories[j])) {
          isSellerInCheckedCategories = true
          break
        }
      }

      if (isSellerInCheckedCategories == true) {
        markers[i].setIcon(
          'https://cdn.mapmarker.io/api/v1/font-awesome/v4/pin?icon=fa-star&size=44&hoffset=0&voffset=-1&background=FFAA00',
        )
      } else {
        markers[i].setIcon(
          'https://cdn.mapmarker.io/api/v1/font-awesome/v4/pin?icon=fa-circle&size=44&hoffset=0&voffset=-1&background=E86566',
        )
      }
    }
  }

  return (
    <>
      <fieldset className="container flex flex-col mt-4 w-full lg:w-3/4 pl-4">
        <legend className="font-bold m-2">Visa hush??ll som s??ljer:</legend>
        <form className="flex flex-wrap gap-x-2 gap-y-2">
          <div>
            <label htmlFor="Damkl??der">
              <input
                id="Damkl??der"
                name="Damkl??der"
                type="checkbox"
                value="Damkl??der"
                defaultChecked={isChecked}
                onChange={handleCheck}
              />
              Damkl??der
            </label>
          </div>

          <div>
            <label htmlFor="Damskor">
              <input
                id="Damskor"
                name="Damskor"
                type="checkbox"
                value="Damskor"
                defaultChecked={isChecked}
                onChange={handleCheck}
              />
              Damskor
            </label>
          </div>

          <div>
            <label htmlFor="Herrkl??der">
              <input
                id="Herrkl??der"
                name="Herrkl??der"
                type="checkbox"
                value="Herrkl??der"
                defaultChecked={isChecked}
                onChange={handleCheck}
              />
              Herrkl??der
            </label>
          </div>

          <div>
            <label htmlFor="Herrskor">
              <input
                id="Herrskor"
                name="Herrskor"
                type="checkbox"
                value="Herrskor"
                defaultChecked={isChecked}
                onChange={handleCheck}
              />
              Herrskor
            </label>
          </div>

          <div>
            <label htmlFor="Barnkl??der">
              <input
                id="Barnkl??der"
                name="Barnkl??der"
                type="checkbox"
                value="Barnkl??der"
                defaultChecked={isChecked}
                onChange={handleCheck}
              />
              Barnkl??der
            </label>
          </div>

          <div>
            <label htmlFor="Barnskor">
              <input
                id="Barnskor"
                name="Barnskor"
                type="checkbox"
                value="Barnskor"
                defaultChecked={isChecked}
                onChange={handleCheck}
              />
              Barnskor
            </label>
          </div>

          <div>
            <label htmlFor="Leksaker">
              <input
                id="Leksaker"
                name="Leksaker"
                type="checkbox"
                value="Leksaker"
                defaultChecked={isChecked}
                onChange={handleCheck}
              />
              Leksaker
            </label>
          </div>

          <div>
            <label htmlFor="??vriga barnartiklar">
              <input
                id="??vriga barnartiklar"
                name="??vriga barnartiklar"
                type="checkbox"
                value="??vriga barnartiklar"
                defaultChecked={isChecked}
                onChange={handleCheck}
              />
              ??vriga barnartiklar
            </label>
          </div>

          <div>
            <label htmlFor="Inredning">
              <input
                id="Inredning"
                name="Inredning"
                type="checkbox"
                value="Inredning"
                onChange={handleCheck}
              />
              Inredning
            </label>
          </div>

          <div>
            <label htmlFor="M??bler">
              <input
                id="M??bler"
                name="M??bler"
                type="checkbox"
                value="M??bler"
                onChange={handleCheck}
              />
              M??bler
            </label>
          </div>

          <div>
            <label htmlFor="Verktyg">
              <input
                id="Verktyg"
                name="Verktyg"
                type="checkbox"
                value="Verktyg"
                onChange={handleCheck}
              />
              Verktyg
            </label>
          </div>

          <div>
            <label htmlFor="Kaffe/Fika">
              <input
                id="Kaffe/Fika"
                name="Kaffe/Fika"
                type="checkbox"
                value="Kaffe/Fika"
                onChange={handleCheck}
              />
              Kaffe/Fika
            </label>
          </div>
        </form>
      </fieldset>
      <div className="map-container text-black m-5 rounded-xl">
        <div id="map" ref={googleMap} />
      </div>
    </>
  )
}

export default Map
