import { Button } from '@/components/ui/button'
import React from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

import { useState,useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';



const PlaceCardItem = ({place}) => {
  
   const [photoUrl,setPhotoUrl]=useState();
useEffect(()=>{
place && GetPlacePhoto();

},[place])

const GetPlacePhoto=async()=>{

  const data = {
    textQuery:place.PlaceName
  }

  const result = await GetPlaceDetails(data).then(resp=>{
    console.log(resp.data.places[0].photos[3].name)

 const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
    setPhotoUrl(PhotoUrl);
  })
}

  
  return (

    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.PlaceName} target='_blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={photoUrl?photoUrl:"/img.jpeg"} alt=""
        className='w-[130px] h-[130px] rounded-xl ' />
        <div>
            <h2 className='font-bold text-lg'>{place.PlaceName} </h2>
            <p className='text-sm text-gray-400'>{place.PlaceDetails} </p>
           <h2 className='mt-2' >TravelTime🕙: {place.TravelTime} </h2>
           <h2 className='mt-2' >TicketPrice💸: {place.TicketPricing} </h2>
         {/* <Button size='sm'><FaMapLocationDot /></Button> */}
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem