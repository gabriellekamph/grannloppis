import Map, { Marker } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2FicmllbGxla2FtcGgiLCJhIjoiY2wwcnhpcTJpMDFoZjNpbzVqNjlmM29kbSJ9.oRJWtVkzXeEk0AmmvOfCig'
// Make .env file work instead and get API key from there

const AreaMap = () => {
    
  return (
    <div className="container mx-auto w-11/12 flex flex-col flex-wrap justify-center content-around mt-5"> 
      <Map
        initialViewState={{ // Hardcoded long and lat values for the area of Krusboda
          latitude: 59.23146869560826,
          longitude: 18.247962069565833,
          zoom: 14
        }}
        style={{width: 500, height: 450}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker longitude={-122.4} latitude={37.8} color="red" />
      </Map>
    </div>
  );
};

export default AreaMap
