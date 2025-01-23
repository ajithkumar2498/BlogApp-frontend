import React from 'react'
import { Link } from 'react-router-dom'
import { FaLocationArrow } from "react-icons/fa6";
import MainCategories from '../components/MainCategories';
import FeaturedPosts from '../components/FeaturedPosts';
import PostList from '../components/PostList';


const HomePage = () => {
  return <>
  
  <div className='mt-4 flex flex-col gap-4'>

     {/* {BreadCrumbs} */}
     <div className='flex gap-4'>
       <Link to="/">Home</Link>
       <span>{">"}</span>
       <span className='text-blue-800'>Blogs and Articles</span>
     </div>
      {/* {Inroduction} */}
      <div className="flex items-center justify-between">
        {/* titles */}
        <div className=''>
            <h1 className='text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold'>Shape the Future With Your Words—Start Your Blogging Journey Today!</h1>
            <p className='mt-8 text-md md:text-xl'>Our platform is designed for creators, thinkers, and storytellers to share their ideas and insights with the world. Whether you're an aspiring writer, a seasoned blogger, or someone looking to explore the art of expression, blogify offers a seamless way to connect with an audience that shares your passion.</p>
        </div>
        {/* ANimated Button */}
        <Link to = "write" className='hidden md:block relative'>
          <svg
            viewBox='0 0 200 200'
            width="200"
            height = "200"
            //animate-spin animatedButton
            className='text-lg tracking-widest animate-spin animatedButton'
          >
            <path
                id="circlePath"
                fill='none'
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">Write Your Story</textPath>
              <textPath href="#circlePath" startOffset="50%">Share Your Idea</textPath>
            </text>
          </svg>
          <button className='absolute top-15 left-14 right-0 bottom-14 m-aut0 w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center'>
             <span className='text-5xl flex items-center justify-center p-5 text-white'><FaLocationArrow /></span>
          </button>
        </Link>
      </div>
      {/* CATEGORIES */}
      <MainCategories/>
      {/* {Featured POst} */}
      <FeaturedPosts/>
      {/* {POST List} */}
      <div className="">
        <h1 className='my-8 text-2xl text-gray-600'>Recent Posts</h1>
        <PostList/>
      </div>
  </div>
  </>
}

export default HomePage