import type { NextPage } from 'next'
import Footer from '../components/Footer'
import DropDown from '../components/DropDown'
import React from 'react'
import GrannloppisLogo from '../public/logos/grannloppis_logo.svg'


const Home: NextPage = () => {
  return (
    <>
    <div className="container mx-auto mt-32 flex flex-col justify-items-center">
      <GrannloppisLogo className="w-96 mx-auto mb-10" />
      <DropDown />
    </div>
    <Footer />
    </>
  )
}

export default Home
