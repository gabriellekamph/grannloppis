import * as React from "react"
import { useGoogleMaps } from "react-hook-google-maps"

const GoogleMap = () => {
  const { ref, map, google } = useGoogleMaps(
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    {
      center: { lat: 0, lng: 0 },
      zoom: 3,
    },
  );
  console.log(map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
  console.log(google); // google API object (easily get google.maps.LatLng or google.maps.Marker or any other Google Maps class)
  return <div ref={ref} className="container mx-auto mt-8" style={{ width: 400, height: 300 }} />
};

export default GoogleMap