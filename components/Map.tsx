import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"


const Map = () => {


    const [activeMarker, setActiveMarker] = useState(null)
    const [sellers, setSellers] = useState<any>([])

  const googleMap: any = useRef(null)

  const hidePois = [
    {
      featureType: "poi",
      stylers: [
          {
            visibility: "off",
          }
      ]
    }
  ]

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return
    }
    setActiveMarker(marker)
  }

  useEffect(() => {
    fetchSellers()
  }, [])

  const fetchSellers = async() => {

    const q = await query(collection(db, 'sellers'))

    const getData = onSnapshot(q, (querySnapshot) => {
      let allSellers:any = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        allSellers.push(data)
      })
      setSellers(allSellers)
    })
  }

  useEffect(() => {

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    })

    let map

    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googleMap.current, {
        center: {lat: 59.23146869560826, lng: 18.247962069565833},
        zoom: 15,
        styles: hidePois
      })
    })
  })

  return (
      <div className="map-container">
        <div id="map" ref={googleMap} />
      </div>

  )
}

export default Map