import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

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
      <LoadScript
        googleMapsApiKey="AIzaSyBVQe5X9fDymMlDm7FoWAAsxpYwXy2c1Fg" // Put this in the .env file and make it work later
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={defaultCenter}
        />
      </LoadScript>
    </div>

  )
}

export default MapContainer