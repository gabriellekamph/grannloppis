import type { NextPage } from 'next'
import Footer from '../components/Footer'
import DropDown from '../components/DropDown'
import React from 'react'
import GrannloppisLogoWhite from '../public/logos/grannloppis_logo_white.svg'

const Home: NextPage = () => {
  return (
    <>
    <div className="container mx-auto mt-32 flex flex-col justify-items-center">
      <GrannloppisLogoWhite className="max-w-lg p-10 mx-auto" />
      <DropDown />
    </div>
    <Footer />
    </>
  )
}

export default Home
