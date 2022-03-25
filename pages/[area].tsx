import Header from "../components/Header"
import Footer from "../components/Footer"
import AddSeller from "../components/AddSeller"
import MapContainer from '../components/MapContainer'


const Area = () => {

  return (
    <div className="App container w-full">
      <Header />
      <AddSeller />
      <MapContainer />
      <Footer />
    </div>
  );
};

export default Area;
