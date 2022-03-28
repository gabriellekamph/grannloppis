import React, { useState } from "react"
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"
import HOUSEHOLDS from "../data.json"


const MapContainer = () => {

  const mapStyles = {
    height: "70vh",
    width: "100%",
  }

  const defaultCenter = {
    lat: 59.23146869560826,
    lng: 18.247962069565833,
  }
  
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return
    }
    setActiveMarker(marker)
  }

  // Static data for markers atm - get this from firebase instead

  const markers = [
    {
      id: 1,
      address: "Pärlröksgången 129",
      position: { lng: 18.255076969461385, lat: 59.22964095891195},      
      categories: "barnkläder, damkläder, leksaker",
      info: "säljer mellan 12-14"
    },
    {
      id: 2,
      address: "Krusboda Torg 1",
      position: { lng: 18.25347837355799, lat: 59.23026119395223 },
      categories: "inredning, böcker, trädgårdsredskap",
      info: "ingen övrig info"
    },
    {
      id: 3,
      address: "Pärlröksgången 73",
      position: { lng: 18.25667556644108, lat: 59.23027217146374 },
      categories: "damkläder, herrkläder, barnkläder",
      info: ""
    }
  ]

  return (
    <div className="container mx-auto mt-8">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
      >
        {markers.map(({ id, address, position, categories, info }) => (
          <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div className="container text-black flex flex-col">
                  <span className="font-bold mb-2">{address}</span>
                  <span>{categories}</span>
                  <span>{info}</span>
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