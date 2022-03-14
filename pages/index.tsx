import type { NextPage } from 'next'
import Footer from '../components/Footer'
import React from 'react'
import GrannloppisLogoWhite from '../public/logos/grannloppis_logo_white.svg'

const Home: NextPage = () => {
  return (
    <>
    <div className="container mx-auto mt-32">
      <GrannloppisLogoWhite className="max-w-lg p-10 mx-auto" />
      <p className="text-lg text-center">Välj loppis att delta på:</p>
    </div>
    <Footer />
    </>
  )
}

export default Home
