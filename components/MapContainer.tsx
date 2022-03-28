import React, { useState, useEffect } from "react"
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"
import { collection, query, getDocs } from "firebase/firestore"
import { db } from "../firebase"

const MapContainer = () => {

  const mapStyles = {
    height: "70vh",
    width: "100%",
  }

  const defaultCenter = {
    lat: 59.23146869560826,
    lng: 18.247962069565833,
  }
  
  const [activeMarker, setActiveMarker] = useState(null)
  const [sellers, setSellers] = useState<any>([])

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return
    }
    setActiveMarker(marker)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async() => {

    let allSellers:any = []
    const q = await query(collection(db, 'sellers'))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      allSellers.push(data)
    })
    setSellers(allSellers)
  }


  return (
    <div className="container mx-auto mt-8">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
      >
        {sellers && sellers.map((data: any) => (
          <Marker
            key={data.id}
            position={data.location}
            onClick={() => handleActiveMarker(data.id)}
          >
            {activeMarker === data.id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div className="container text-black flex flex-col">
                  <span className="font-bold mb-2">{data.address}</span>
                  <span>{data.categories}</span>
                  <span>{data.info}</span>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}

        </GoogleMap>
    </div>

  )
}

export default MapContainer