import React from 'react'

const PersonCard = ({name, email, image, index}) => {
  return (
    <div className=' flex flex-col  '>
        <div className='flex items-center justify-center flex-col m-2 '>
            <div className='ml-4 flex p-4 m-4 rounded-xl w-full border-l-8 border-secondary border-r-8  bg-white justify-between  flex-col xl:flex-col items-center  '>
                
                

                <div>
                    <img src={image} alt={name} width={80} className='rounded-full' />
                </div>
                <div>
                    <p className='text-2xl font-bold max-sm:text-sm font-montserrat text-primary ml-4 px-2 text-center'> {name}</p>
                    <p className='info-text text-center max-sm:text-sm'>{email}</p>
                </div>

            </div>
            
        </div>

    </div>
  )
}

export default PersonCard
