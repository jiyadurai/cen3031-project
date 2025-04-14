// import React from 'react'
import HomeLogo from '../../public/GatorPulseLogo2.png'

export default function Header() {
  return (
    <section className="flex flex-row justify-between bg-white h-[7.38vh] fixed w-full z-[1] top-[0%] shadow-md">
      <div className="flex items-center ml-[2%]">
        <a href='/'>
          <img className="w-[50px] h-[50px] mr-[8px]" src={HomeLogo}></img>
        </a>
        <a href='/'>
          <div className="text-black font-bold">Gator Pulse - Connecting Gators</div>
        </a>
      </div>
    </section>
  )
}