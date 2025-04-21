// import React from 'react'
import PropTypes from 'prop-types';
import HomeLogo from '../../public/GatorPulseLogo2.png'
import DateSelector from './DateSelector'
import { Link } from 'react-router-dom'
import { useUser } from './UserContext'

export default function Header({page, selectedDate, setSelectedDate}) {
  const {user, setUser} = useUser();
  return (
  <section className="flex flex-row justify-between items-center bg-white h-[7.38vh] fixed w-full z-[1] top-0 shadow-md px-4">
    {/* Left: Logo and Title */}
    <div className="flex items-center gap-2">
      <Link to="/">
        <img className="w-[50px] h-[50px]" src={HomeLogo} alt="Logo" />
      </Link>
      <Link to="/">
        <div className="text-black font-bold text-lg">Gator Pulse - Connecting Gators</div>
      </Link>
      <Link to={`/profile/${user}`}>
        <div className="text-black font-bold text-lg">Profile</div>
      </Link>
    </div>

    {/* Right: Date Selector (if not on home page) */}
    {page == 'feed' && (
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