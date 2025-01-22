import { useAuth, useUser } from '@clerk/clerk-react';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { FaBookmark, FaRegBookmark, FaRegStar, FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import AxiosService from '../utils/AxiosService';
import { useNavigate } from 'react-router-dom';



const PostMenuActions = ({post}) => {
  const {user} = useUser()
  const {getToken} = useAuth()
  const nav = useNavigate()

  const { isPending, error, data : savedPosts } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken()
      return AxiosService.get(`/users/saved`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
    },
  });
   
  const isAdmin = user?.publicMetadata?.role === "admin" || false
  const isSaved = savedPosts?.data?.some( (p) => p === post._id) || false;

  const deleteMutation = useMutation({
    mutationFn: async ()=>{
      const token = await getToken()
      console.log(token)
      return AxiosService.delete(`/posts/${post._id}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
    },
    onSuccess: ()=>{
      toast.success("post deleted successfully!")
      nav("/")
    },
    onError: (error)=>{
      console.log(error.response.data)
      toast.error(error.response.data)
    }
  })

  const queryClient = useQueryClient()

  const saveMutation = useMutation({
    mutationFn: async ()=>{
      const token = await getToken()
      return AxiosService.patch(`/users/save`, {
        postId: post._id
      }, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
    },
    onSuccess: ()=>{
     queryClient.invalidateQueries({queryKey: ["savedPosts"]})
    },
    onError: (error)=>{
      toast.error(error.response.data)
    }
  })


  const featureMutation = useMutation({
    mutationFn: async ()=>{
      const token = await getToken()
      return AxiosService.patch(`/posts/feature`, {
        postId: post._id
      }, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
    },
    onSuccess: ()=>{
     queryClient.invalidateQueries({queryKey: ["post", post.slug]})
    },
    onError: (error)=>{
      toast.error(error.response.data)
    }
  })

  const handleDelete = ()=>{
    deleteMutation.mutate()
    nav("/")
    toast.success("post deleted successfully")
  }
  const handleSave = ()=>{
    if(!user){
      return nav("/login")
    }
    saveMutation.mutate()
  }

  const handlefeature = ()=>{
    featureMutation.mutate()
     }

  return <>
  
   <div className="">
       <h1>Actions</h1>
      { isPending ? 
        ("Loading..."
        ) : error ? (
         "Saved Post fetching Failed!" 
         ) : (
         <div 
         onClick={handleSave}
         className="flex items-center gap-2 py-2 text-sm cursor-pointer">
         {
           saveMutation.isPending ? isSaved ? "none" : "black" : isSaved ?  <FaBookmark /> : <FaRegBookmark /> 
         }
        <span>Save this post</span>
        {saveMutation.isPending && <span className='text-xs'>(in progress..)</span>}
       </div>
       )}
       {
        isAdmin && (
          <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={ handlefeature}>
              {featureMutation.isPending ? post.isFeatured ? <FaRegStar /> : <FaStar /> : post.isFeatured ? <FaStar /> : <FaRegStar /> }
              <span>Feature</span>
              {featureMutation.isPending && <span className='text-xs'>(in progress..)</span>}
          </div>
        )
       }
       {user && (post.user.userName === user.username || isAdmin) &&  (
        <div 
          onClick={handleDelete}
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"  >
          <RiDeleteBin6Line className='text-red-600'/>
          <span className='text-red-600'>Delete this post</span>
        {
          deleteMutation.isPending && <span className='text-xs'>(in progress)</span>
        }
        </div>
      )}
   </div>
  </>
}

export default PostMenuActions