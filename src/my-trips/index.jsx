import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './UserTripCardItem';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const MyTrips = () => {

const navigation = useNavigation();
const [userTrips,setUserTrips]= useState([]);
const [showNoTrips, setShowNoTrips] = useState(false);

useEffect(()=>{
 GetUserTrips();
},[])
useEffect(() => {
  if (userTrips && userTrips.length === 0) {
    const timer = setTimeout(() => {
      setShowNoTrips(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup on unmount or userTrips change
  } else {
    setShowNoTrips(false); // Reset if trips are loaded or not empty
  }
}, [userTrips]);

const GetUserTrips=async ()=>{  
    const user=JSON.parse(localStorage.getItem('user'));
    
    if(!user){
        navigation('/');
        return ;
    }
    
    const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email)); //https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
const querySnapshot = await getDocs(q);
setUserTrips([]);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  
  setUserTrips(prevVal=>[...prevVal,doc.data()])
});
}


  return (

  //  <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10' >
  //       <h2 className='font-bold text-3xl'>My Trips</h2>

  //       <div className='grid grid-cols-2 mt-5 md:grid-cols-3 gap-5' >

  //           {userTrips?.length>0?userTrips.map((trip,index)=>(
  //               <UserTripCardItem trip={trip} />
  //           )):
  //           [1,2,3,4,5,6].map((item,index)=>(
  //               <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'></div>

            



  //           ))
  //       }
  //       </div>
  //   </div>
  <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
  <h2 className='font-bold text-3xl'>My Trips</h2>
  <div className='grid grid-cols-2 mt-5 md:grid-cols-3 gap-5'>
    {userTrips === undefined
      ? [1,2,3,4,5,6].map((item, index) => (
          <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
        ))
      : userTrips.length > 0
        ? userTrips.map((trip, index) => (
            <UserTripCardItem key={trip.id || index} trip={trip} />
          ))
        : (
            showNoTrips
              ? <div className='col-span-2 md:col-span-3 flex flex-col items-center justify-center h-[220px] w-full bg-white border rounded-xl'>
                  <h3 className='text-xl font-semibold mb-2'>No trips found</h3>
                  <p className='text-gray-500 mb-4'>You haven't created any trips yet.</p>
                  <Button onClick={() => navigate('/create-trip')}>Create a Trip</Button>
                </div>
              : [1,2,3,4,5,6].map((item, index) => (
                  <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
                ))
          )
    }
  </div>
</div>


  )
}

export default MyTrips