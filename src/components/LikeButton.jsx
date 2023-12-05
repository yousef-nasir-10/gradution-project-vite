import React from 'react'
import { BiSolidLike } from 'react-icons/bi'

const LikeButton = ({handleLikeButtonClick, numOfLikes, isLiked,TextColor}) => {
  return (
    <div className='flex items-center justify-between'>
        <p className='m-2 font-montserrat text-xl '>{numOfLikes}</p>
            <BiSolidLike 
            onClick={handleLikeButtonClick}
            className={`text-primary z-10  text-2xl mr-2 ${isLiked? "text-secondary" : ""}`}
        />
    </div>

  )
}

export default LikeButton
