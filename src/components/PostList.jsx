import React from 'react'
import PostListItem from './PostListItem'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import AxiosService from '../utils/AxiosService'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'react-router-dom'

const fetchPosts = async (pageParam, searchParams)=>{

   const searchParamsObject = Object.fromEntries([...searchParams])

   const res = await AxiosService.get("/posts/all-posts", {
      params: { page : pageParam, limit : 10, ...searchParamsObject}
   })
   return res.data
}
const PostList = () => {

   const [searchParams, setSearchParams] = useSearchParams()
   const {
      data,
      error,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      status,
    } = useInfiniteQuery({
      queryKey: ['posts', searchParams.toString()],
      queryFn: ({ pageParam = 1 })=> fetchPosts(pageParam, searchParams),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1: undefined,
    })

    if (status === "loading") return 'Loading...'
  
    if (status === "error") return 'An error has occurred: ' + error.message

   const allPosts = data?.pages?.flatMap((page) => page.posts) || [];
  return<>
     <InfiniteScroll
         dataLength={allPosts.length} 
         next={fetchNextPage}
         hasMore={!!hasNextPage}
         loader={<h4>Loading more posts ...</h4>}
         endMessage={
            <p>
               <b>All posts loaded...</b>
            </p>
         }>
         {allPosts.map(post => (
                     <PostListItem key={post._id} post={post} />
            ))}
      </InfiniteScroll>
       
  </>
}

export default PostList