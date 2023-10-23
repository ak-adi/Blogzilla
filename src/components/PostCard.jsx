import React from 'react'
//information comes from services, we have to implement query
import appwriteService from "../appwrite/config"
//for adding clicking effect on postcard
import { Link } from 'react-router-dom'

//for displaying card we have to pass some props, when we apply query, we directly get the result from appwrite
// in appwrite the must be pass like this - $id
function PostCard({$id,title,featuredImage}) {
  
  return (
    //whole card is clickable
    <Link to={`/post/${$id}`}>
        <div className='w-64 h-64 bg-gray-200 p-4 flex flex-col items-center justify-center rounded-xl'>
            <div  className='w-full h-3/4'>
                {/* the getFilePreview method returns url which we will be using here, as id we are getting which will use this component, so use it here, post id is this id and image id is with that post*/}
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} 
                className='w-full h-full object-cover object-center rounded-xl'/>
            </div>
            <h2 className='mt-4 text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard