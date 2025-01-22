import React from 'react'
import { LuSearch } from "react-icons/lu";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';


const Search = () => {

  const location = useLocation()
  const nav = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleKeyPress = (e)=>{
    console.log(e.key)
    if(e.key === "Enter"){
      const query = e.target.value
      if(location.pathname === "/posts")
      {
        setSearchParams({...Object.fromEntries(searchParams), search:query})
      }else{
        nav(`/posts?search=${query}`)
      }
    }
  }
  return <>
  
  <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2 ">

          <LuSearch />
          <input type="text"  placeholder='search a post' className='bg-transparent outline-none' onKeyDown={handleKeyPress}/>

  </div>
  
  </>
}

export default Search