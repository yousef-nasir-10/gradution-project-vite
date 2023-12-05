import { IoIosList } from 'react-icons/io'
import { myDecodedToken } from '../APIs'
import {logoGP} from '../assets/images'
import { navLinks, baseURL } from '../constants'
import {  useState } from 'react'
'react-icons/io5'
import { BiHappyBeaming } from "react-icons/bi";




const Nav = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <header className='padding-x py-8 absolute z-10 w-full '>
      <nav className='flex justify-between items-center max-container'>
        <a href='/'>
          <img
            src={logoGP}
            alt='logo'
            width={100}
            height={29}
          />
        </a>

        <ul className='flex-1 flex justify-center items-center gap-16 max-xl:hidden  bg-white border-white h-14 p-4 '>
          {navLinks.map(item => (
            <li key={item.label}>
              <a
                href={`${baseURL}${item.href}`}
                className='text-lg  font-montserrat leading-normal text-black hover:text-primary'

              >
                {item.label}

              </a>
            </li>
          ))}
        </ul>
        <div className='flex justify-center items-center  bg-white border-white h-14 p-4 max-xl:hidden flex-row-reverse '>
          
          {myDecodedToken &&<p  className=' leading-normal font-palanquin  px-6 py-2 flex justify-center items-center text-md hover:text-black    text-center text-secondary' 
                 onClick={() => {
                    localStorage.removeItem("token")
                    window.location.reload(); 
                 }}> <a href={`${baseURL}#logout`} className='cursor-pointer'>Sign Out</a> </p> }
                 {!myDecodedToken &&<p  className=' leading-normal font-palanquin  px-6 py-2 flex justify-center items-center text-md hover:text-black    text-center text-secondary' 
                 onClick={() => {
                    
                 }}> <a href={`${baseURL}#login`} className='cursor-pointer'>Sign in</a> </p> }
            
          
          <p className='text-primary text-md hover:text-secondary flex cursor-pointer ml-2' > 
            Welcome, {myDecodedToken &&  myDecodedToken.firstName} {myDecodedToken && myDecodedToken.lastName} 
          </p>

        </div>

        <div className='hidden max-xl:block max-xl:mr-0 z-10'>
          <IoIosList
            className='text-4xl  text-secondary'
            onClick={() => {setToggle(!toggle)}}
          />

        </div>
        <div className={`${toggle ? 'hidden' : "flex"} absolute top-0 right-0 my-0  z-8  drop-shadow-2xl background-primary xl:w-0 xl:bg-transparent w-full p-4`}>
        <ul className='flex-1 flex flex-col  items-center gap-8 bg-white-100  p-6 lg:hidden  mt-10 min-h-[500px] z-10     '>
          {navLinks.map((item)=>(
            <li className=' rounded-sm p-2 hover:bg-slate-50 hover:text-black text-center ' key={item.label} onClick={()=> setToggle(!toggle)}>
              <a
                href={`${baseURL}${item.href}`}
                className=' leading-normal font-montserrat  p-2 text-left text-2xl hover:text-black   text-white '
              >
                {item.label}

              </a>

            </li>
          ))}
          <li className='  p-0 bg-slate-200 rounded-xl  hover:text-black text-center cursor-pointer'>
                 {myDecodedToken &&<p  className=' leading-normal font-palanquin  px-6 py-2 flex justify-center items-center text-2xl hover:text-black    text-center text-primary' 
                 onClick={() => {
                    localStorage.removeItem("token")
                    window.location.reload(); 
                 }}> <a href={`${baseURL}#login`} className='cursor-pointer'>Sign Out</a> </p> }
                 {!myDecodedToken &&<p  className=' leading-normal font-palanquin  px-6 py-2 flex justify-center items-center text-2xl hover:text-black    text-center text-primary' 
                 onClick={() => {
                    
                 }}> <a href={`${baseURL}#login`} className='cursor-pointer'>Sign in</a> </p> }
                

          
          </li>

             
            <p className='xl:text-tertiary text-secondary max-xl:text-2xl  rounded-3xl p-4 text-xl font-montserrat text-center  ml-2 capitalize flex justify-between items-center' > 
              Hi <BiHappyBeaming className='mx-2 text-4xl'/>   {myDecodedToken && myDecodedToken.firstName} {myDecodedToken &&  myDecodedToken.lastName}
            </p>
            

        </ul>
    

        </div>

      </nav>
      
    </header>
  )
}

export default Nav