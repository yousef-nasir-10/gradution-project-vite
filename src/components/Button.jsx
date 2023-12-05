import React from 'react'

const Button = ({label, fullWidth, onClick, href}) => {
  return (
    <button
        onClick={onClick}
        className={`flex justify-center items-center gap-2 px-7 py-2 font-montserrat text-lg leading-normal rounded-full ${fullWidth && "w-full"} max-sm:w-3/5  bg-secondary text-white
        `
        
      }
    >
        {label}
        {href && <a href={href}></a>}

    </button>
  )
}

export default Button
