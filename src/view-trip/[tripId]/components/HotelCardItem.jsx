import { GetPlaceDetails,PHOTO_REF_URL } from '@/service/GlobalApi';
import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';


const HotelCardItem = ({hotel}) => {

  const [photoUrl,setPhotoUrl]=useState();
useEffect(()=>{
hotel && GetPlacePhoto();

},[hotel])

const GetPlacePhoto=async()=>{

  const data = {
    textQuery:hotel?.HotelName
  }

  const result = await GetPlaceDetails(data).then(resp=>{
    console.log(resp.data.places[0].photos[3].name)

 const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
    setPhotoUrl(PhotoUrl);
  })
}



  return (
     <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.HotelName+","+hotel.HotelAddress} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer'>
              <img src={photoUrl?photoUrl:"/img.jpeg"} alt="" className='rounded-xl h-[200px] w-[260px]'/>
              <div className='my-2 flex flex-col gsp-2'>
                <h2 className='font-medium'>{hotel?.HotelName}</h2>
                <h2 className='text-xs text-gray-500'>📍{hotel?.HotelAddress}</h2>
                <h2 className='text-sm' >💰 {hotel?.Price}</h2>
                <h2 className='text-sm' >⭐ {hotel?.Rating}</h2>
             
              </div>
            </div>
            </Link>
  )
}

export default HotelCardItem