import React from 'react'

const DepartmentRadio = ({depatment,title, occation, value, onChange}) => {
  return (
    <li className="w-full xl:mx-2 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className='flex  items-center ps-3'>
            <input
                id={title}
                type='radio'
                required
                value= {value}
                name={occation}
                onChange={onChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label htmlFor={title} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{depatment} </label>



        </div>
    </li>
  )
}

export default DepartmentRadio