import React from 'react'
import { IKImage } from 'imagekitio-react';

const Image = ({src, className, w, h, alt}) => {
  return <>
  
     <div>
     <IKImage 
        urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT} 
        path={src}
        alt={alt}
        loading='lazy'
        className={className}
        lqip={{active:true, quality:20}}
        width={w}
        height={h}
        transformation={[
         {
            width:w,
            height:h
         }
        ]} />
     </div>
  
  </>
}

export default Image