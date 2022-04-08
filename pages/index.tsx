import type { NextPage } from 'next'
import DropDown from '../components/DropDown'
import React from 'react'

const Home: NextPage = () => {
  return (
    <>
      <div className="container flex flex-col mt-48">
        <img
          src="/logos/logo.png"
          alt="Grannloppis logotype"
          width="250"
          className="mx-auto"
        />
        <h1 className="text-5xl lg:text-6xl font-bold text-center mb-14">Grannloppis</h1>
        <DropDown />
      </div>
    </>
  )
}

export default Home
