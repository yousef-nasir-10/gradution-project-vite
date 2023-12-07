import  { useEffect } from 'react'
import Nav from './components/Nav'
import {Hero, BestProjects, ContactUs, Login, Projects} from './sections/index'
import UserRegi from './sections/UserRegi'
import { myDecodedToken } from './APIs'
let currentDate = new Date();

const Home = () => {
  useEffect(() => {
    if (myDecodedToken&& myDecodedToken.exp * 1000 < currentDate.getTime()){
      localStorage.removeItem("token")
      window.location.reload(); 
    }
  

  }, [])
  


  return (
    <main className='relative'>

      <section className='xl:padding-l  '>
        <Hero/>
      </section>
      <section className='padding'>
        <Projects/>
      </section>
      <section className='padding'>
        <BestProjects/>
      </section>

      {/* ADMAIN VS USER HERE CODE  */}
      {!myDecodedToken &&<section className='padding'>
        <Login/>
      </section>}
      {myDecodedToken && myDecodedToken.role === "Admin" ?<section className='padding'>
        <UserRegi/>
      </section> :   ""}

      <section  className='padding-x sm:py-32 py-16 w-full'>
        <ContactUs/> 
      </section>

        
    </main>
  )
}

export default Home
