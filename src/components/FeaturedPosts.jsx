import React from "react";
import Image from "./Image";
import AxiosService from "../utils/AxiosService";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async () => {
  const res = await AxiosService.get(
    `/posts/all-posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPost"],
    queryFn: () => fetchPost(),
  });
  if (isPending) return "Loading...";
  if (error) return "something went wrong" || error.message;

  const post = data.posts;
  if (!post || post.legth === 0) {
    return;
  }
  if (!data) return "post not found";
  return (
    <>
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* First */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* Image */}
          {  
            post[0].img &&
            <Image
              src={ post[0].img}
              className="rounded-3xl object-cover"
              w="895"
            />
          }
          {/* Details */}
          <div className="flex items-center gap-4">
            <h1 className="font-semibold lg:text-lg">01.</h1>
            <Link className="text-blue-800 lg:text-lg">{post[0].category}</Link>
            <span className="text-gray-500">{format(post[0].createdAt)}</span>
          </div>
          {/* Title */}
          <Link
            to={post[0].slug}
            className="text-xl lg:text-3xl font-semibold lg:font-bold"
          >
           {post[0].title}
          </Link>
        </div>
        {/* others */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* second */}
          {post[1] && <div className="lg:h-1/3 flex justify-between gap-4 mb-4">
            <div className="w-1/3 ">
              {post[1].img &&<Image
                src={post[1].img}
                className="rounded-2xl w-full h-full object-cover aspect-video"
                w="298"
              />}
            </div>
            {/* Details & Titles */}
            <div className="w-2/3">
              {/* details */}
              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold">02.</h1>
                <Link className="text-blue-800">{post[1].category}</Link>
                <span className="text-gray-500 text-sm">{format(post[1].createdAt)}</span>
              </div>
              {/* titles */}
              <Link
                to={post[1].slug}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-xl font-medium"
              >
                {post[1].title}
              </Link>
            </div>
          </div>}
          {/* third */}
          {post[2] &&<div className="lg:h-1/3 flex justify-between gap-4 mb-4">
            <div className="w-1/3 ">
              {post[2].img && <Image
                src={post[2].img}
                className="rounded-2xl w-full h-full object-cover aspect-video"
                w="298"
              />}
            </div>
            {/* Details & Titles */}
            <div className="w-2/3">
              {/* details */}
              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold">03.</h1>
                <Link className="text-blue-800">{post[2].category}</Link>
                <span className="text-gray-500 text-sm">{format(post[2].createdAt)}</span>
              </div>
              {/* titles */}
              <Link
                to={post[2].slug}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-xl font-medium"
              >
               {post[2].title}
              </Link>
            </div>
          </div>}
          {/* fourth */}
          {post[3] &&<div className="lg:h-1/3 flex justify-between gap-4 mb-4">
            <div className="w-1/3">
              {post[3].img && <Image
                src="featured2.jpeg"
                className="rounded-2xl w-full h-full object-cover aspect-video"
                w="298"
              />}
            </div>
            {/* Details & Titles */}
            <div className="w-2/3">
              {/* details */}
              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold">04.</h1>
                <Link className="text-blue-800">{post[3].category}</Link>
                <span className="text-gray-500 text-sm">{format(post[3].createdAt)}</span>
              </div>
              {/* titles */}
              <Link
                to={post[3].slug}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
              >
                {post[3].title}
              </Link>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
};

export default FeaturedPosts;
