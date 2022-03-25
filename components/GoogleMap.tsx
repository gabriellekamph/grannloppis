import * as React from "react"
import { useGoogleMaps } from "react-hook-google-maps"

const GoogleMap = () => {
  const { ref, map, google } = useGoogleMaps(
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    {
      center: { lat: 59.23146869560826, lng: 18.247962069565833 },
      zoom: 14,
    },
  );
  console.log(map)
  console.log(google)
  return <div ref={ref} className="container mx-auto mt-8 w-full" style={{ width: 400, height: 350 }} />
};

export default GoogleMap