// import React from 'react'
import PropTypes from 'prop-types';
import HomeLogo from '../../public/GatorPulseLogo2.png'
import DateSelector from './DateSelector'

export default function Header({page, selectedDate, setSelectedDate}) {
  return (
  <section className="flex flex-row justify-between items-center bg-white h-[7.38vh] fixed w-full z-[1] top-0 shadow-md px-4">
    {/* Left: Logo and Title */}
    <div className="flex items-center gap-2">
      <a href="/">
        <img className="w-[50px] h-[50px]" src={HomeLogo} alt="Logo" />
      </a>
      <a href="/">
        <div className="text-black font-bold text-lg">Gator Pulse - Connecting Gators</div>
      </a>
    </div>

    {/* Right: Date Selector (if not on home page) */}
    {page !== 'home' && (
      <div className="flex items-center">
        <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
    )}
  </section>
  )
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
};