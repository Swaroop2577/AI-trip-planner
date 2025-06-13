import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'
import Footer from '@/view-trip/[tripId]/components/Footer'
function Hero() {
  return (
    <div className=' flex flex-col items-center mx-56 gap-9'>
     <h1 className='font-extrabold text-[60px] text-center mt-10'><span className='text-green-600'>"Explore. Plan. Travel</span> — Smarter, with TravelMate@IITG."</h1>
    <p className='text-xl text-gray-500 text-center mt-3'>"Whether you're heading to the city, the hills, or just planning your next weekend escape — let AI take the stress out of your journey."</p>
   <Link to={'/create-trip'}><Button>Get Started,It's Free</Button></Link> 
   <div className='-z-10 pb-8'>
   <img src='./landing.png'  alt="" />
    </div>
    <div className="pb-5">
    <Footer/>
    </div>
    </div>
  )
}

export default Hero
