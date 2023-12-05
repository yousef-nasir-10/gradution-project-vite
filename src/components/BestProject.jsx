import React from 'react'

const BestProject = ({index, title, departemnt, like, onClick}) => {
  return (
    <div onClick={onClick} className={`flex-1 flex-wrap sm:w-[350px]  w-full sm:min-w-[350px] rounded-[20px] bg-primary shadow-xl px-10 py-16 mt-4 cursor-pointer min-h[350px] ${index===1? "lg:self-center" : index===2? "lg:self-end" : ""} ` }>
        <div className='w-11 h-11 flex-1 flex justify-center items-center bg-secondary rounded-full'>
            <p className='text-white font-palanquin text-xl'>{index +1}</p>
        </div>
        <div className='flex  justify-start '>

          <p className='mt-5 font-palanquin text-3xl leading-normal font-simibold  mr-6 text-secondary'>{departemnt} </p>
          <h3 className='mt-5 font-palanquin text-3xl leading-normal font-simibold text-white'>{title}</h3>
        </div>
        <p className='mt-4 font-palanquin text-xl text-secondary'> <span className='text-white text-2xl font-montserrat'>{
        index === 0? "1st"
        : index===1 ? `2nd` : `3rd`}</span>  Most liked Project With <span className='text-white text-2xl font-montserrat'>{like}</span> likes</p>
    </div>
  )
}

export default BestProject