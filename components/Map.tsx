import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import * as React from "react"
import { useState, useMemo } from "react"
import HOUSEHOLDS from "../data.json"
import Pin from "./Pin"

const INITIAL_VIEW_STATE = {
  latitude: 59.23146869560826,
  longitude: 18.247962069565833,
  width: "90vw",
  height: "90vh",
  zoom: 14,
}

const Map = () => {
  const [popupInfo, setPopupInfo] = React.useState<string|any>(null)

  const pins = useMemo(
    () =>
      HOUSEHOLDS.map((address: any, index: any) => (
        <Marker
          key={`marker-${index}`}
          longitude={address.longitude}
          latitude={address.latitude}
          anchor="bottom"
        >
          <Pin onClick={() => {
            console.log(address)
            setPopupInfo(address)
          }
            } />
        </Marker>
      )),
    []
  )

  return (
    <div className="container mx-auto w-11/12 flex flex-col flex-wrap justify-center content-around mt-5">
      <ReactMapGL
        initialViewState={INITIAL_VIEW_STATE}
        style={{ width: 500, height: 450 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              <p className="text-black">{popupInfo.address}</p>
              <p className="text-black">{popupInfo.categories}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  )
}

export default Map