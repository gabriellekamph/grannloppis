import React from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"

const MapContainer = () => {

  const mapStyles = {
    height: "70vh",
    width: "100%",
  }

  const defaultCenter = {
    lat: 59.23146869560826,
    lng: 18.247962069565833,
  }

  const onLoad = (marker: google.maps.Marker) => {
    console.log('marker: ', marker)
  }

  // Get position data for markers from json file first (and make it work, then use database)
  
  const position: any = {
    lat: 59.23146869560826,
    lng: 18.247962069565833,
  }

  return (
    <div className="container mx-auto mt-8">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}>

        <Marker 
        position={position}
        onLoad={onLoad}
        />
        </GoogleMap>
    </div>

  )
}

export default MapContainer