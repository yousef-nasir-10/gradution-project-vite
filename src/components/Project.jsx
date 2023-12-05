import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
import {projectBg} from '../assets/images'
import { BiSolidLike } from 'react-icons/bi'
import { PATCH, myDecodedToken } from '../APIs'
import { useState } from 'react'
import LikeButton from './LikeButton'


const Project = ({title, numOfLikes, department, onClick, isLiked, handleLikeButtonClick}) => {


  const handleLikeClick = (event) => {
    if(myDecodedToken && myDecodedToken.id){
      event.cancelBubble = true;
    if(event.stopPropagation) event.stopPropagation();
      PATCH(`projects/like/${myDecodedToken.id}`)
      .then(res => {
        console.log(res);
      })
    }else{
      alert("Must be signed in first, Thank you!")
    }
  }
  
  return (
    <div className='w-full flex flex-1   flex-col hover:drop-shadow-2xl
    p-2 ' onClick={onClick}>
        <div className='flex  flex-col w-full max-sm:w-full bg-gradient-to-r from-secondary to-secondary-500 h-[10px] drop-shadow-lg justify-center items-center '>

        </div>
        <div className='flex  flex-col w-full max-sm:w-full bg-gradient-to-l from-primary to-secondary-500 h-[10px] drop-shadow-lg justify-center items-center'>
            
        </div>
        <div className='flex flex-1 justify-between items-center font-montserrat'>
            <h1 className='p-4 font-montserrat text-lg'>{department}</h1>
            <div className='flex items-center justify-between'>
              <p className='m-2 font-montserrat text-xl '>{numOfLikes}</p>
                  <BiSolidLike 
                  onClick={handleLikeButtonClick}
                  className={`text-primary z-10  text-2xl mr-2 ${isLiked? "text-secondary" : ""}`}
              />
            </div>


        </div>
        <h1 className='text-white font-montserrat text-center mt-0 sm:mt-0 text-lg font-semibold bg-primary p-4 h-[100px]  '>{title}</h1>
        <div className='flex  flex-col w-full max-sm:w-full bg-gradient-to-r from-primary to-secondary-500 h-[10px] drop-shadow-lg justify-center items-center'>

</div>

    </div>
  )
}

export default Project
