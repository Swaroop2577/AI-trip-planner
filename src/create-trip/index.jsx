//index.jsx

import React,{ useEffect, useState } from 'react' 
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions,SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generateTravelPlan } from '../service/AIMODEL';
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Footer from '@/view-trip/[tripId]/components/Footer';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
 const user=localStorage.getItem('user');
  const [opendialogue,setOpendialogue]=useState(false);
  const [place,setPlace]=useState([]);
 const [loading,setLoading]=useState(false);
const [formData,setFormData]=useState([]);

 
  const navigate= useNavigate();

const handleInputChange = (name,value)=>{
setFormData({
  ...formData,// this copies all the existing formData like
/* if this is like this 
{
  username: 'Swaroop',
  email: 'swaroop@gmail.com'
}
  and i u don't write
  if you [name]:value do this as beow 
 you get
  {
  username: 'SwaroopDev'
}
if you have used spread operator you will get

{

  username: 'SwaroopDev',
  email: 'swaroop@gmail.com'
}
it updates the name leaving all other key:value pairs in tact 
*/

[name]:value //[] used that to get the passed name to the function

})
}
const login = useGoogleLogin({
  onSuccess: (codeResp) => {
    GetUserProfile(codeResp);
  },
  onError: (error) => console.log(error)
});

const OnGenerateTrip = async()=>{


  if (!user) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast("Sign in to generate trip"); 
    localStorage.setItem('tripFormData', JSON.stringify(formData));
    return;
  }


  if(formData?.noOfDays >5 || !formData?.location|| !formData?.budget ||!formData?.traveller){
  toast("Fill all the details")
    console.log("");
  return ;
} 
setLoading(true);
const FINAL_PROMPT=AI_PROMPT
  .replace('{location}', formData?.location?.label)
  .replace('{totalDays}', formData?.noOfDays)
  .replace('{traveler}', formData?.traveller)
  .replace('{budget}', formData?.budget)
  .replace('{totalDays}', formData?.noOfDays);


try {
    const result = await generateTravelPlan(FINAL_PROMPT);
    console.log("AI Result:", result);
    setLoading(false);
    SaveAiTrip(result)
  } catch (err) {
    console.error("Error from AI:", err);
  }
}
// or use comment-json



const SaveAiTrip = async (TripData) => {
  setLoading(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const docID = Date.now().toString();

  try {
    // Clean possible Markdown code block formatting (e.g. ```json ... ```)
    let cleanedTripData = TripData
      .replace(/^\s*```(?:json)?\s*/i, '')   // Remove leading ``` or ```json
      .replace(/\s*```\s*$/, '')            // Remove trailing ```
      .trim();

    const parsedData = JSON.parse(cleanedTripData);

    await setDoc(doc(db, "AITrips", docID), {
      userSelection: formData,
      tripData: parsedData,
      userEmail: user?.email,
      id: docID
    });
  } catch (error) {
    console.error("Error parsing/saving trip:", error);
  } finally {
    setLoading(false);
    navigate('/view-trip/' + docID);
  }
};



useEffect(()=>{
  console.log(formData);
},[formData])

useEffect(() => {
  const savedData = localStorage.getItem('tripFormData');
  if (savedData) {
    setFormData(JSON.parse(savedData)); // Restore form data
    localStorage.removeItem('tripFormData'); // Optional: clean up
  }
}, [user]); // Run this when user changes (i.e., after sign-in)


const GetUserProfile=(tokenInfo)=>{
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
    headers: {
    Authorization: `Bearer ${tokenInfo?.access_token}`,
    Accept: 'Application/json'
}
}).then((resp) => {
    console.log(resp);
localStorage.setItem('user', JSON.stringify(resp.data));
setOpendialogue(false);
OnGenerateTrip();

  })
}
  return (          //sm: small screen; md: medium screen, lg: large screen
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-20'>
      <h2 className='font-bold text-3xl' >Tell us your travell preferences 🏕🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>simply provide your travel goals and preferences, and we'll generate a beautifully customized itinerary made just for you</p>
    <div className='mt-20 flex flex-col gap-10'>
        <div>
            <h2 className='text-xl my-3 font-medium'>Choose your travel destination</h2>
{/* <GooglePlacesAutocomplete
apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
selectProps={{
place,
onChange:(v)=>{setPlace(v);handleInputChange('location',v)}
}
} 
/>*/}
<GooglePlacesAutocomplete
  apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
  selectProps={{
    value: formData?.location || null, 
    onChange: (v) => handleInputChange('location', v)
  }}
/>



<div className='mt-10'>
    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
        {/* <Input placeholder={'EX.3'} type='number'
        onChange={(e)=>{handleInputChange('noOfDays',e.target.value)}} /> */}
        <Input 
  placeholder={'EX.3'} 
  type='number'
  value={formData?.noOfDays || ''} 
  onChange={(e) => handleInputChange('noOfDays', e.target.value)}
/>

</div>
</div>
<div>
    <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
    
<div className='grid grid-cols-3 gap-5 mt-5'>
{SelectBudgetOptions.map((item,index)=>(
    <div key={index} 
    onClick={()=>handleInputChange('budget',item.title)}
    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
    ${(formData?.budget==item.title) &&'shadow-lg border-black'}  
    `}> 
        <h2 className='text-4xl'>{item.icon}</h2>
        <h2 className='font-bold text-lg'>{item.title}</h2>
        <h2 className='text-sm text-gray-500' > {item.desc} </h2>
    </div>
))}
</div>
  </div>

    <div>
    <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with your next adventure?</h2>
    
<div className='grid grid-cols-3 gap-5 mt-5'>
{SelectTravelsList.map((item,index)=>(
    <div key={index}
    onClick={()=>handleInputChange('traveller',item.people)}
    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
    ${(formData?.traveller==item.people) &&'shadow-lg border-black'}  
    `}>
        <h2 className='text-4xl'>{item.icon}</h2>
        <h2 className='font-bold text-lg'>{item.title}</h2>
        <h2 className='text-sm text-gray-500' > {item.desc} </h2>
    </div>
))}
</div>
</div>
    </div>
<div className='my-10 flex justify-end '>
<Button disabled={loading} onClick={()=>{OnGenerateTrip()}} >
   {loading?
   <AiOutlineLoading3Quarters className='w-7 h-7 animate-spin' />:
   
   "Generate Trip"}
  
  </Button> 

</div>

      <div className="pb-5">
    <Footer/>
    </div>
     </div>
  )
}

export default CreateTrip
