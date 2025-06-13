import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails,PHOTO_REF_URL } from '@/service/GlobalApi';
function InfoSection({trip}) {

  const [photoUrl,setPhotoUrl]=useState();
useEffect(()=>{
trip && GetPlacePhoto();

},[trip])

const GetPlacePhoto=async()=>{

  const data = {
    textQuery:trip?.userSelection?.location?.label
  }

  const result = await GetPlaceDetails(data).then(resp=>{
    console.log(resp.data.places[0].photos[3].name)

 const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
    setPhotoUrl(PhotoUrl);
  })
}


  return (
    <div >

      <img src={photoUrl?photoUrl:"/img.jpeg"} className='w-full object-cover h-[340px] rounded-xl '/>

      <div className='flex justify-between items-center' >
      <div className='my-5 flex flex-col gap-2'>
     <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label }</h2>
     <div className='flex gap-7'>
      <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> {/* text-xl or md once check */} 
        {trip?.userSelection?.noOfDays} Days 📅</h2> 
      <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
        {trip?.userSelection?.budget}Budget💸 </h2> 
      <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
       🧍 No. of traveller: {trip?.userSelection?.traveller} </h2> 
      
        </div>
      </div>

      <Button><IoIosSend /> </Button>
</div>
    </div>
  )
}

export default InfoSection