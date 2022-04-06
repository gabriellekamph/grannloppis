import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const Map = () => {
  const [sellers, setSellers] = useState<any>([])

  const googleMap: any = useRef(null)

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
          map,
        })

        // Create info window

        let infowindow = new google.maps.InfoWindow()

        // Info about selected seller to display in infowindow

        const sellerInfo = `<div>
                <p style="line-height:2"><strong>${address}</strong><br />
                ${categories.join(', ')} <br />
                <i>${info}</i>
                </p>
                </div>`

        // Close current info window if a new marker is clicked

        google.maps.event.addListener(marker, 'click', function() {
          {
            if (currentInfoWindow != '') {
              currentInfoWindow.close()
              currentInfoWindow = ''
            }
            infowindow.setContent(sellerInfo)
            infowindow.open(map, marker)
            currentInfoWindow = infowindow
          }
        })

        // Close info window when user click anywhere on the map

        google.maps.event.addListener(map, 'click', function() {
          infowindow.close()
        })
      }
    })
  })

  return (
    <div className="map-container text-black mt-6">
      <div id="map" ref={googleMap} />
    </div>
  )
}

export default Map