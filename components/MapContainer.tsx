import React from "react"
import { GoogleMap } from "@react-google-maps/api"

const MapContainer = () => {

  const mapStyles = {
    height: "70vh",
    width: "100%",
  }

  const defaultCenter = {
    lat: 59.23146869560826,
    lng: 18.247962069565833,
  }

  return (
    <div className="container mx-auto mt-8">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
      />
    </div>

  )
}

export default MapContainer