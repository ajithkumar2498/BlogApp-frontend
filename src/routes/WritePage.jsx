import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import ReactQuill from 'react-quill';
import { useMutation, useQuery } from '@tanstack/react-query';
import 'react-quill/dist/quill.snow.css';
import {toast} from "react-toastify"
import AxiosService from '../utils/AxiosService';
import { useNavigate } from 'react-router-dom';
import UploadImages from '../components/UploadImages';

const WritePage = () => {
  const nav = useNavigate()

  const {getToken} = useAuth()
  const [value, setValue] = useState('')
  const [cover, setCover] = useState('')
  const [img, setImg] = useState('')
  const [video, setVideo] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(()=>{
      img && setValue(prev =>prev+ `<p><image src=${img.url}></image></p>`)
  },[img])
  useEffect(()=>{
      video && setValue(prev =>prev+ `<p><iframe class="ql-video"  src=${video.url}></iframe></p>`)
  },[video])

  const {isLoaded, isSignedIn} =useUser()

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken()
      return AxiosService.post('/posts/add-post', newPost,
        {
          headers: {
          Authorization : `Bearer ${token}`
        }}
      )
    },
    onSuccess:(res)=>{
      toast.success("Post has been created")
      nav(`/${res.data.slug}`)
    }
  })

  if(!isLoaded){
    return <div className=''>Loading...</div>
  }

  if(isLoaded && !isSignedIn){
    return <div className=''>You Should Login!</div>
  }

  const handleSubmit = e =>{
    e.preventDefault()
    const formData = new FormData(e.target)

    const data = {
      img: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    }
    console.log(data)
    mutation.mutate(data)
  }


  return <>
   <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">

    <h1 className='text-xl font-light'>Create New Post</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-6'>
       <UploadImages type="image" setProgress={setProgress} setData={setCover}>
        <span className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'>Add a Cover Image</span>
       </UploadImages>
      <input type="text"  name="title" className="text-4xl font-semibold bg-transparent outline-none" placeholder='My Awesome Story' />
      <div className="flex items-center gap-4">
        <label htmlFor="" className='text-sm '>Choose a Category:</label>
        <select  name="category" id="" className='p-2 rounded-xl bg-white shadow-md'>
          <option value="general">General</option>
          <option value="web-design">Web Design</option>
          <option value="development">Development</option>
          <option value="databases">Databases</option>
          <option value="seo">Search Engines</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
      <textarea name="desc" placeholder='A Short Description'className='p-4 rounded-xl bg-white shadow-md' id=""/>
      <div className="flex flex-1">
          <div className="flex flex-col gap-2 justify-center mr-2">
               <UploadImages type="image" setProgress={setProgress} setData={setImg}>
                   🏞️
               </UploadImages>
               <UploadImages type="video" setProgress={setProgress} setData={setVideo}>
                   ▶️
               </UploadImages>
          </div>
          <ReactQuill 
          theme="snow" 
          value ={value} 
          className='flex-1 rounded-xl bg-white shadow-md' 
          onChange={setValue} 
          readOnly={0 < progress && progress < 100}
          />
      </div>
      <button disabled={mutation.isPending ||( 0 < progress && progress < 100)} className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-300 disabled:cursor-not-allowed'>
        {mutation.isPending ? "loading..." : "send" }
      </button>
      {"progress:" + progress}
      {
        mutation.isError && <span>{mutation.error.message}</span>
      }
    </form>
   </div>
  
  </>
}

export default WritePage