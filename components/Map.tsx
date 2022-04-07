import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const Map = () => {
  const [sellers, setSellers] = useState<any>([])

  const [isChecked, setIsChecked] = useState<boolean>(false)

  const googleMap: any = useRef(null)
  let markers: any = []

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

  useEffect(() => {
    fetchSellers()
  }, [])

  // Fetch data from firebase and store in sellers state

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

  useEffect(() => {
    // Load Google Maps

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    })

    let map: any
    let currentInfoWindow: any = ''

    loader.load().then(() => {
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

  // Change to custom marker (yellow with star icon) if category is selected by checkbox click

  const handleCheck = (e: any) => {
    for (var i = 0; i < sellers.length; i++) {
      if (sellers[i].categories.includes(e.target.id)) {
        if (e.target.checked) {
          markers[i].setIcon('https://cdn.mapmarker.io/api/v1/font-awesome/v4/pin?icon=fa-star&size=44&hoffset=0&voffset=-1&background=FFAA00')
        } else {
          markers[i].setIcon('https://cdn.mapmarker.io/api/v1/font-awesome/v4/pin?icon=fa-circle&size=44&hoffset=0&voffset=-1&background=E86566')
        }
      }
    }
  }



  return (
    <>
      <fieldset className="container flex flex-col mt-4 w-11/12 lg:w-2/3 pl-4">
        <legend className="font-bold m-2">Visa hushåll som säljer:</legend>
        <form className="flex flex-wrap gap-x-2 gap-y-1">
          <div>
            <label htmlFor="Damkläder">
              <input
                className="checkbox mr-1 ml-2"
                id="Damkläder"
                name="Damkläder"
                type="checkbox"
                value="Damkläder"
                defaultChecked={isChecked}
                onChange={handleCheck}
              />
              Damkläder
            </label>
          </div>

          <div>
            {' '}
            <label htmlFor="Damskor">
              {' '}
              <input
                className="checkbox mr-1 ml-2"
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
            {' '}
            <label htmlFor="Herrkläder">
              <input
                className="checkbox mr-1 ml-2"
                id="Herrkläder"
                name="Herrkläder"
                type="checkbox"
                value="Herrkläder"
                defaultChecked={isChecked}
                onChange={handleCheck}
              />
              Herrkläder
            </label>
          </div>

          <div>
            {' '}
            <label htmlFor="Herrskor">
              <input
                className="checkbox mr-1 ml-2"
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
            {' '}
            <label htmlFor="Barnkläder">
              <input
                className="checkbox mr-1 ml-2"
                id="Barnkläder"
                name="Barnkläder"
                type="checkbox"
                value="Barnkläder"
                defaultChecked={isChecked}
                onChange={handleCheck}
              />
              Barnkläder
            </label>
          </div>

          <div>
            {' '}
            <label htmlFor="Barnskor">
              <input
                className="checkbox mr-1 ml-2"
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
            {' '}
            <label htmlFor="Leksaker">
              <input
                className="checkbox mr-1 ml-2"
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
            {' '}
            <label htmlFor="Övriga barnartiklar">
              <input
                className="checkbox mr-1 ml-2"
                id="Övriga barnartiklar"
                name="Övriga barnartiklar"
                type="checkbox"
                value="Övriga barnartiklar"
                defaultChecked={isChecked}
                onChange={handleCheck}
              />
              Övriga barnartiklar
            </label>
          </div>

          <div>
            {' '}
            <label htmlFor="Inredning">
              <input
                className="checkbox mr-1 ml-2"
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
            {' '}
            <label htmlFor="Möbler">
              <input
                className="checkbox mr-1 ml-2"
                id="Möbler"
                name="Möbler"
                type="checkbox"
                value="Möbler"
                onChange={handleCheck}
              />
              Möbler
            </label>
          </div>

          <div>
            {' '}
            <label htmlFor="Kaffe/Fika">
              <input
                className="checkbox mr-1 ml-2"
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
