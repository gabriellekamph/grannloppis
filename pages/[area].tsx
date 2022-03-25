import Header from "../components/Header"
import Footer from "../components/Footer"
import AddSeller from "../components/AddSeller"
import GoogleMap from '../components/GoogleMap'


const Area = () => {

  return (
    <div className="App container w-full">
      <Header />
      <AddSeller />
      <GoogleMap />
      <Footer />
    </div>
  );
};

export default Area;
