import type { NextPage } from "next"
import Footer from "../components/Footer"
import DropDown from "../components/DropDown"
import React from "react"

const Home: NextPage = () => {
  return (
    <>
      <div className="container mx-auto mt-32 flex flex-col justify-items-center">
        <img src="/logos/grannloppis_logo.png" alt="Grannloppis logotype" width="500" className="mx-auto" />
        <DropDown />
      </div>
      <Footer />
    </>
  )
}

export default Home
