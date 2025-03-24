// import React from 'react'
import Header from './Header'
import HomeScreen from '../../public/UFbackground1.jpg'

export default function Home() {
  return (
    <section className={`bg-cover bg-center h-[100vh] w-[100%] absolute`}  style={{ backgroundImage: `url(${HomeScreen})` }}>
        <Header></Header>
    </section>
  )
}
