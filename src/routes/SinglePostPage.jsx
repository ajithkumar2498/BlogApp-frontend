import React, { useState } from "react";
import Image from "../components/Image";
import { Link, useParams } from "react-router-dom";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import AxiosService from "../utils/AxiosService";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import sanitizeHtml from "sanitize-html";

const fetchPost = async (slug) => {
  const res = await AxiosService.get(`/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });
  if (isPending) return "Loading...";
  if (error) return "something went wrong" || error.message;
  if (!data) return "post not found";

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* detail */}
        <div className="flex gap-8">
          <div className="lg:w-3/5 flex flex-col gap-8">
            <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
              {data.title}
            </h1>
            <div className=" flex items-center gap-2 text-gray-400 text-sm">
              <span>Written by</span>
              <Link className="text-blue-800">{data.user.userName}</Link>
              <span>on</span>
              <Link className="text-blue-800">{data.category}</Link>
              <span>{format(data.createdAt)}</span>
            </div>
            <p className="text-gray-500 font-medium">{data.desc}</p>
          </div>
          {data.img && (
            <div className="hidden lg:block w-2/5">
              <Image src={data.img} className=" rounded-2xl" w="600" />
            </div>
          )}
        </div>
        {/* content */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* text */}
          <div className="lg:text-lg flex flex-col gap-6 text-justify">
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(data.content),
              }}
            />
          </div>
          {/* menu */}
          <div className="px-4 h-max sticky top-8">
            <h1 className="mt-8 mb-4 text-sm font-medium">Author</h1>
            <div className=" flex flex-col gap-4">
              <div className="flex items-center gap-8">
                {data.user.profileImg && (
                  <Image
                    src={data.user.profileImg}
                    className="w-12 h-12 rounded-full object-cover"
                    h="48"
                    w="48"
                  />
                )}
                <Link className="text-blue-800">{data.user.userName}</Link>
              </div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
              <div className="flex gap-2">
                <Link>
                  <Image src="facebook.svg" />
                </Link>
                <Link>
                  <Image src="instagram.svg" />
                </Link>
              </div>
            </div>
            <PostMenuActions post={data} />
            <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
            <div className="flex flex-col gap-2 text-sm">
              <Link className="underline">All</Link>
              <Link className="underline">Web Design</Link>
              <Link className="underline">Development</Link>
              <Link className="underline">Databases</Link>
              <Link className="underline">Search Engines</Link>
              <Link className="underline">Marketing</Link>
            </div>
            <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
            <Search />
          </div>
        </div>
        <Comments postId={data._id} />
      </div>
    </>
  );
};

export default SinglePostPage;
