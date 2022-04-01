import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

const Map = () => {

  const [sellers, setSellers] = useState<any>([])

  const googleMap: any = useRef(null)

  const hidePois = [
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ]

  useEffect(() => {
    fetchSellers();
  }, [])

  // Fetch data from firebase and store in sellers state

  const fetchSellers = async () => {
    const q = await query(collection(db, "sellers"))

    const getData = onSnapshot(q, (querySnapshot) => {
      let allSellers: any = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        allSellers.push(data);
      });
      setSellers(allSellers);
    });
  };

  useEffect(() => {
      
    // Load Google Maps

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: "weekly",
    });

    let map: any;

    loader.load().then(() => {
      const google = window.google;
      const defaultCenter = { lat: 59.23146869560826, lng: 18.247962069565833 };

      map = new google.maps.Map(googleMap.current, {
        center: defaultCenter,
        zoom: 15,
        styles: hidePois,
      })

      // Show markers on map from firebase data

      for (let i = 0; i < sellers.length; i++) {
        const seller = sellers[i]
        const lat = parseFloat(seller.location.lat)
        const lng = parseFloat(seller.location.lng)

        const marker = new google.maps.Marker({
          position: { lat: lat, lng: lng },
          map,
        });

        // Open popup on marker click

      const sellerInfo = `<div class="content">
      <p><strong>${seller.address}</strong><br /></p>
      <p>${seller.categories.join(', ')}</p><br />
      <p>${seller.info}</p></div>`

      const infowindow = new google.maps.InfoWindow({
          content: sellerInfo
      })

      marker.addListener('click', () => {
          infowindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
          })
      })
      }

      
    });
  });

  return (
    <div className="map-container text-black">
      <div id="map" ref={googleMap} />
    </div>
  );
};

export default Map;
