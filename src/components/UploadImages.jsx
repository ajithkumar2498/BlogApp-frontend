import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import {IKContext, IKUpload} from 'imagekitio-react'


const authenticator =  async () => {
    try {
        const response = await fetch(`http://localhost:5000/posts/upload-auth`);
  
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
  
        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

const UploadImages = ({children, type, setProgress, setData}) => {

    const ref = useRef(null)
    const onError = (err)=>{
        toast.error("Image upload failed")
      }
      const onSuccess = (res)=>{
         console.log(res)
         setData(res)
      }
      const onUploadProgress = (progress)=>{
         console.log(progress)
        setProgress(Math.round(progress.loaded / progress.total )* 100)
      }
  return <>
  
  <IKContext 
          publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || "public_+hOK2ki/oJZ8Y4DD+zXOTSjo+fc="} 
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/lhqk4dwpb/"} 
          authenticator={authenticator} >
          {/* ...child components */}
          <IKUpload
          useUniqueFileName
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          className='hidden'
          accept={`${type}/*`}
          ref = {ref}
        />

        <div className='cursor-pointer' onClick={()=>ref.current.click()}>{children}</div>
      </IKContext>
  
  </>
}

export default UploadImages