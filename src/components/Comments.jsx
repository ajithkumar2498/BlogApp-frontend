import Comment from './Comment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AxiosService from '../utils/AxiosService';
import { useAuth, useUser } from '@clerk/clerk-react';
import {toast} from "react-toastify"

const fetchComments = async (postId) => {
  const res = await AxiosService.get(`/comments/${postId}`);
  return res.data;
};

const Comments = ({postId}) => {
  const {user} = useUser()
  const {getToken} = useAuth()
  
  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });
  
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken()
      return AxiosService.post(`/comments/${postId}`, newComment, {
          headers: {
          Authorization : `Bearer ${token}`
        }}
      )
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["comments", postId]})
    },
    onError:(error)=>{
      toast.error(error.res.data)
    }
  })

  if (isPending) return <div>Loading...</div>;
  if (error) return "something went wrong" || error.message;
   const handleSubmit = (e)=>{
    e.preventDefault()
    const formData= new FormData(e.target)
    const data = {
      desc: formData.get("desc")
    }
    mutation.mutate(data)
  }
  return <>
     <div className="flex flex-col gap-8 lg:w-3/5 mb-8">
     
      <h1 className='text-xl text-gray-500 underline'>Comments</h1>
      <form  onSubmit={handleSubmit} className="flex items-center justify-between gap-8 w-full">
        <textarea placeholder="Write your Comment..." name="desc" className='w-full p-4 rounded-xl' id=""></textarea>
        <button  className='bg-blue-800 px-4 py-3 text-white font-medium rounded-xl'>Send</button>
      </form>
        {isPending 
        ? "Loading..." 
        : error 
        ? "Error loading comments" 
        :
        <>
         {
          mutation.isPending && (
            <Comment comment = {{
              desc: `${mutation.variables.desc} (Sending...)`,
              createdAt: new Date(),
              user: {
                    user:user.username,
                    profileImg: user.imageUrl
              }
            }}/>
          )
         }
        {data.map((comment) => (
            <Comment key={comment._id} comment={comment} postId={postId}/>
          ))}
        </>
          
        }
     </div>
  </>
}

export default Comments