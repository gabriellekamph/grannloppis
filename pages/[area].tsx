import { useRouter } from "next/router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Map from "../components/Map"

const Area = () => {
  const router = useRouter()
  const { area } = router.query

  return (
    <div className="container w-full">
      <Header />
      <div className="container mx-auto text-center mt-20">
        <h1 className="text-2xl font-bold">Loppis: {area}</h1>
      </div>
      <Map />
      <Footer />
    </div>
  )
}

export default Area
