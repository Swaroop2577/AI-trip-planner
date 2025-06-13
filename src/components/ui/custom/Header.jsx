import React, { useEffect,useState } from 'react'
import { Button } from '../button'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { googleLogout, useGoogleLogin } from '@react-oauth/google';



function Header() {

const user=JSON.parse(localStorage.getItem('user'));
 const [opendialogue,setOpendialogue]=useState(false);
useEffect(() => {
  console.log(user)
}, [])
const login = useGoogleLogin({
  onSuccess: (codeResp) => {
    GetUserProfile(codeResp);
  },
  onError: (error) => console.log(error)
});

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
window.location.reload();

  })
}

  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5 mt-[-35px]'>
    <a href="/" className='cursor-pointer hover:scale-105'>
    <img src='/logo.svg'/>
    </a>
    <div>
      {user?
      <div className='flex items-center gap-3 '>
                <a href="/create-trip">
<Button variant="outline" className='rounded-full cursor-pointer'>+ Create Trip</Button>
</a>
        <a href="/my-trips">
<Button variant="outline" className='rounded-full cursor-pointer'>My Trips</Button>
</a>
<Popover>
  <PopoverTrigger><img src={user?.picture} className='h-[35px] w-[35px] rounded-full' alt="" /></PopoverTrigger>
  <PopoverContent><h2 onClick={()=>{
    googleLogout();
    localStorage.clear();
   window.location.href='/'
  }} className='cursor-pointer' >Logout</h2></PopoverContent>
</Popover>
      </div>
      :
      <Dialog>
  <DialogTrigger><Button onClick={()=>setOpendialogue(true)} > Sign in</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogDescription>
         <img src="/logo.svg"/>
  <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
  <p>Sign in to the App with Google authentication securely</p>
  <Button  onClick={login} className="w-full mt-5 flex gap-4 items-center"> 
  
    <FcGoogle className='h-7 w-7' />Sign In With Google
    </Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
      
}
    </div>
       {/* <Dialog open={opendialogue}>
  
  <DialogContent>
    <DialogHeader>
      <DialogDescription>
  <img src="/logo.svg"/>
  <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
  <p>Sign in to the App with Google authentication securely</p>
  <Button  onClick={login} className="w-full mt-5 flex gap-4 items-center"> 
  
    <FcGoogle className='h-7 w-7' />Sign In With Google
    </Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog> */}




    </div>
  )
}

export default Header
