import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogIn } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import Image from './Image';
import { Link } from 'react-router-dom';
import {SignedIn, SignedOut, SignInButton, useAuth, UserButton} from "@clerk/clerk-react"

const Navbar = () => {
  const [open,setOpen] = useState(false)

  const {getToken} = useAuth()
  const token =  getToken().then(token => token)


  useEffect(()=>{
    getToken().then(token => token)
  },[])

  return <>
  <div className='w-full h-16 md:h-20 flex items-center justify-between'>
  
    {/* Logo */}
    <Link to={"/"} className='flex items-center gap-1 text-2xl font-bold'>
         <Image src="logo.jpg" alt="blog Logo" w={56} h={42} className="mix-blend-multiply"/>
        <span>blogify</span>
    </Link>
    {/* Mobile Menu */}
    <div className='md:hidden'>
      {/* Mobile Button */}
      <div className='cursor-pointer' onClick={()=> setOpen((prev)=>  !prev)}>
        {open ? <MdClose /> : <GiHamburgerMenu />}
      </div>
        {/* Mobile Link List */}
      <div className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${open ? "-right-0" : "-right-100"}`}>
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/">About</Link>
          <Link to="/write">Add Blog</Link>
          <Link to="/login" >
            <button className='flex py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-400 hover:text-blue-950'>Login <span className='font-xl pt-1'><IoLogIn /></span> </button>
          </Link>
      </div>
    </div>
   
    {/* desktop menu */}
    <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
      <Link to="/">Home</Link>
      <Link to="/">Trending</Link>
      <Link to="/">Most Popular</Link>
      <Link to="/">About</Link>
      <Link to="/write">Add Blog</Link>
      <SignedOut>
      <Link to="/login" >
        <button className='flex py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-400 hover:text-blue-950'>Login <span className='font-xl pt-1'><IoLogIn /></span> </button>
      </Link>        
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </div>

  </>
}

export default Navbar