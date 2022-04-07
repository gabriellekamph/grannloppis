import type { NextPage } from 'next'
import DropDown from '../components/DropDown'
import React from 'react'

const Home: NextPage = () => {
  return (
    <>
      <div className="container flex flex-col mt-48">
        <img
          src="/logos/grannloppis_logo.png"
          alt="Grannloppis logotype"
          width="500"
          className="mx-auto"
        />
        <DropDown />
      </div>
    </>
  )
}

export default Home
