import type { NextPage } from 'next'
import DropDown from '../components/DropDown'
import React from 'react'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <>
      <div className="container flex flex-col grid justify-items-center mt-48">
        <Image src="/logos/logo.png" alt="Grannloppis logotype" layout="fixed" width={280} height={180} />
        <h1 className="text-5xl lg:text-6xl font-bold text-center mb-14">Grannloppis</h1>
        <DropDown />
      </div>
    </>
  )
}

export default Home
