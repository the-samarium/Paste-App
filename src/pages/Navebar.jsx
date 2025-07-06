import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex flex-row gap-7 bg-neutral-950 font-mono rounded-t-xl items-start p-4 w-2xl'>
        <NavLink to={'/'} className={"hover:text-blue-500 transition duration-300"}>Home</NavLink>
        <NavLink to={'/pastes'} className={"hover:text-blue-500 transition duration-300"}>Paste List</NavLink>
    </div>
  )
}

export default Navbar