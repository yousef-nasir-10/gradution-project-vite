import  { useEffect, useState } from 'react'
import { projects } from '../constants'
import BestProject from '../components/BestProject'
import { GET } from '../APIs'



const BestProjects = () => {
  
  
  const [backendProjects, setBackendProjects] = useState([])


  useEffect(() => {
    setInterval(() => {
      
      GET(`projects/top3`)
      .then(res=>{
          
          
          setBackendProjects(res.data.top3)
  
      })
    }, 1*1000);
  

}, [])
  return (
    <section className='max-container flex justify-center flex-wrap gap-9 flex-col ' id='top-projects'>
      <div className='flex flex-col justify-start gap-5'>
        <h2 className='text-4xl font-palanquin font-bold text-secondary'>CSSIT <span className='text-primary'>Top Projects</span> </h2>
        <div className='flex flex-1 max-xl:flex-col items-center justify-between'>
          <p className='lg:max-w-lg mt-2 font-montserrat text-secondary info-text'>Collection  of done projects for all of the department of CCSIT.    </p>
        </div>

      </div>
      <div className='flex items-start justify-center gap-9 flex-wrap xl:h-[700px]  '>

        {backendProjects.map((project, index) => (
          <BestProject
            key={project._id}
            title = {project.title}
            departemnt = {project.catagory}
            like = {project.like.length}
            index = {index}
            onClick = {() => {
              window.location.href = `project/${project._id}`

            }}
          />
        )).slice(0,3)}
      </div>

    </section>
  )
}

export default BestProjects
