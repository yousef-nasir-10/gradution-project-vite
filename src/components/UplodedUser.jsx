import React from 'react'

const UplodedUser = ({id, email, index, textColor}) => {
  return (
    <div className='flex flex-row   m-2 p-1   rounded-sm flex-wrap bg-slate-50'>
        <p className=' text-xl  font-palanquin mr-2'>{index +1}.</p>
        <p className={`${textColor} text-xl font-palanquin`}>  {email} </p>
    </div>
  )
}

export default UplodedUser