import { departments, extractPdf } from '../constants'
import Project from '../components/Project'
import Button from '../components/Button'
import DepartmentRadio from '../components/DepartmentRadio'
import { GET, PATCH, POST, apiBaseURL, myDecodedToken } from '../APIs'
import { createRef, useEffect, useState } from 'react'
import { useParams, useSearchParams } from "react-router-dom";

const Projects = () => {
  const [toogleLike, setToogleLike] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
	const [ search, setSearch] = useState("");
  const [ departemnt, setDepartemnt] = useState("");
  const [toogleUpdate, setToggoleUpdate] = useState(false)
  const [toggoleCreate, setToggoleCReate] = useState(false)
  const [backendProjects, setBackendProjects] = useState([])

  const [formData, setFormData] = useState(
    {   
      title: '',
      year: '',
      supervisor: '', 
      students: '',
      tools: '',
      urls: '',
      catagory: '',
      introduction: '',
      abstract: '',
    }
  )

  function handleChange (event){
    const {name, value, type, checked} = event.target
    setFormData(prevStat =>{
      
      return {
        ...prevStat,
        [name]: type === "checkbox"? checked : value,

      }
    })
    
  }
  const handleSearchChange = event => {
		setSearch(event.target.value)
	  setSearchParams({
      search: event.target.value,
      departemnt: departemnt? event.target.value: ""
     });
	};
  const handleDepartemntChange = event => {
    setDepartemnt(event.target.value)
	  setSearchParams({
      search: search? event.target.value: "",
      departemnt: event.target.value
      });
	};


  const handleCrateProjectSubmit = (event) =>{
    event.preventDefault()
    POST("projects", {
      
      title: formData.title,
      catagory: formData.catagory,
      creationDate: formData.year,
      
      
      superVisors:formData.supervisor.split(","),
      tools: formData.tools.split(","),
      urls: formData.urls.split(","),
      
      students: formData.students.split(","), 
      introduction: formData.introduction,
      abstract: formData.abstract,
    }).
    then(res => {

      setToggoleUpdate(!toogleUpdate)
      if(res.data){
        setFormData({   
          title: '',
          year: '',
          supervisor: '', 
          students: '',
          tools: '',
          urls: '',
          catagory: '',
          introduction: '',
          abstract: '',
        })
      }
    })
  }

  
  const fileInput = createRef()
  async function onFileSubmit(event){
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.set("pdfPoject", fileInput.current.files[0] )
      const response =await fetch(`${apiBaseURL}/files`, {
            method: 'POST',
            body: formData
        })
      const responseJson = await response.json()
      console.log(responseJson);
      const text = await responseJson.data.toLowerCase()

    const title = extractPdf("technology", "a project submitted", text )


    //extract students
    const students = extractPdf("by", "supervised by", text )
    let studentArray = students.split("\n")
     console.log(students);
    let studentsList = studentArray.filter(function (el) {
      return el != "";
    });
    studentsList = studentsList.toString()


    // extract SuperVisors
    let superVisors = extractPdf("supervised by", "date:", text )
    superVisors = superVisors.replace('committee members','');
    let superVisorsArray = superVisors.split("\n")
    // console.log(superVisorsArray);
    let superVisorsList = superVisorsArray.filter(function (el) {
      return el != " ";
    });
    superVisorsList = superVisorsList.toString()

    // extract abstract 

    let abstract  = extractPdf("abstract", "innovation and utility of the project", text)


    // extract abstract 

    let conclution  = extractPdf("conclusion","#end", text)

    setFormData({
      title: title,
      year: "",
      supervisor: superVisorsList,
      students: studentsList,
      tools: "",
      urls: "",
      catagory: "",
      introduction: abstract,
      abstract: conclution
    })

    



      
    } catch (error) {
      
    }

    


  
  }
  


  useEffect(()=>{
		let searchValue = searchParams.get('search');
		setSearch(searchValue)
    let departemntValue = searchParams.get('departemnt');
    setDepartemnt(departemntValue)

{
      GET(`projects/search?title=${search}&catagory=${departemnt}`).then(res=>{
        setBackendProjects(res.data.projects)
        
      })
    }
	}, [search,departemnt, toogleLike, toogleUpdate])




  return (
    <section
      id='projects'
      className='max-container max-sm:mt-12    '
    >
      
      <div className='flex flex-col justify-start gap-5'>
        <h2 className='text-4xl font-palanquin font-bold text-secondary'>CSSIT <span className='text-primary'>Graduation Projects</span> </h2>
        <div className='flex flex-1 max-xl:flex-col items-center justify-between'>
          <p className='lg:max-w-lg mt-2 font-montserrat text-secondary info-text'>Collection  of done projects for all of the department of CCSIT.    </p>
          <form className='flex flex-wrap xl:justify-evenly  w-full '>

            <div className='lg:max-w-[40%] w-full flex items-center max-sm:flex-col gap-5 p-2.5 sm:border border-secondary b   rounded-full sm:mt-4 max-xl:mb-6    h-14 '>
            <input 
              type='text' placeholder='search peoject' className='input bottom-4   '
              onChange={handleSearchChange}
              value={search || ""} 

            />
            {/* <div className='flex max-sm:justify-end items-center max-sm:w-full '>
              <Button
                label={"Search"}
              />


              
            </div> */}

            

            
            </div>

            <div className='flex justify-start items-center max-xl:mt-4 max-xl:flex-wrap mx-4'>
              <p className='text-xl text-primary font-montserrat'>department:</p>
              <ul className="items-center w-full xl:p-2 mt-2 xl:mx-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white flex" >
                <li className="w-full  border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600 xl:mx-2">
                    <div className='flex  items-center ps-3'>
                        <input
                            
                            type='radio'
                            required
                            value=""
                            name="catagory"
                            onChange={handleDepartemntChange}
                            
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> ALL </label>



                    </div>
                </li>
                {departments.map(department => (
                  <DepartmentRadio
                    key={department.for}
                    depatment= {department.dep}
                    title = {department.for}
                    occation= "catagory"
                    value={department.dep}
                    onChange = {handleDepartemntChange}


                  />
                ))}

              </ul>
              
            </div>
            
          </form>

          
        </div>
        {myDecodedToken && myDecodedToken.role === "Admin"
        ? 
        <div className='w-10  max-xl:mt-12'>
          < Button
              label='+ '
              fullWidth
              onClick={()=> {setToggoleCReate(!toggoleCreate)}}
          />
        </div> 
        :
          ""

        
        }
        
          { toggoleCreate &&<form className='flex mt-10 flex-wrap flex-1 '>
          <form class="mb-3 flex w-full background-primary rounded-md p-2 flex-col "
            onSubmit={onFileSubmit}
          >
            
                    <label
                        for="formFile"
                        className="mb-2 inline-block text-white font-montserrat text-xl"
                        >Extract PDF file
                        
                    </label>
                    <input
                        className="file-input  "
                        type='file'
                        name='pdfPoject' 
                        ref={fileInput} 
                    />

                    <div className='h-10 mt-4'>
                      <Button 
                        label="Extract"
                        onClick={onFileSubmit}
                      />
                      
        
                    </div>
                    

          </form>  
            <input
              className=' border-2 rounded-md xl:p-4 max-xl:p-2 outline-none m-2 w-[300px] '
              placeholder='Title'
              required
              name='title'
              value={formData.title}
              onChange={handleChange}

            />
            <input
              className=' border-2 rounded-md xl:p-4 max-xl:p-2 outline-none m-2 w-[300px]  '
              placeholder='Students'
              name='students'
              value={formData.students}
              onChange={handleChange}

            />
            <input
              className=' border-2 rounded-md xl:p-4 max-xl:p-2 outline-none m-2 w-[300px]  '
              placeholder='SuperVisors'
              name='supervisor'
              value={formData.supervisor}
              onChange={handleChange}
            />
            <input
              className=' border-2 rounded-md xl:p-4 max-xl:p-2 outline-none m-2 w-[300px]  '
              placeholder='year'              
              name='year'
              value={formData.year}
              onChange={handleChange}
              
            />
            <input
              className=' border-2 rounded-md xl:p-4 max-xl:p-2 outline-none m-2 w-[300px]  '
              placeholder='tools'
              name='tools'
              value={formData.tools}
              onChange={handleChange}
            />
            <input
              className=' border-2 rounded-md xl:p-4 max-xl:p-2 outline-none m-2 w-[300px]  '
              placeholder='URLs'
              name='urls'
              value={formData.urls}
              onChange={handleChange}
            />

            <div className='flex justify-start items-center mx-4 flex-wrap'>
              <p className='text-xl text-primary font-montserrat'>department:</p>
              <ul className="items-center w-full xl:p-2 m-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white flex" >
                {departments.map(department => (
                  <DepartmentRadio
                    key={department.for}
                    depatment= {department.dep}
                    title = {department.for}
                    occation= "catagory"
                    value={department.dep}
                    onChange = {handleChange}


                  />
                ))}
              </ul>
              
            </div>
            <textarea className='border-2 rounded-md xl:p-4 max-xl:p-2 outline-none m-2 w-[100%] '
              placeholder='Introduction'
              name='introduction'
              value={formData.introduction}
              onChange={handleChange}
            >

            </textarea>
            <textarea className='border-2 rounded-md xl:p-4 max-xl:p-2 outline-none m-2 w-[100%] ' 
              placeholder='Abstract'
              name='abstract'
              value={formData.abstract || ""}
              onChange={handleChange}
            >

            </textarea>
          <div className='flex max-sm:justify-end items-center max-sm:w-full  self-start   '>

            < Button
              label='Create'
              onClick={handleCrateProjectSubmit}
            />
          </div>

          </form>}

      </div>
      <div className='mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-col-2 grid-col-1 sm:gap-6 gap-16 m-6 cursor-pointer'>
        {backendProjects && backendProjects.map(project => (
          <Project
            key={project._id} 
            title = {project.title}
            numOfLikes = {project.like.length}
            department = {project.catagory}
            onClick = {() => 
            { 
              
              window.location.href = `project/${project._id}`
            } }
            isLiked = {project.like.includes(myDecodedToken && myDecodedToken.id)}

            handleLikeButtonClick = {(event) => {
              
              event.cancelBubble = true
              event.stopPropagation()
            
              
              if(myDecodedToken && myDecodedToken.id){

                if(!project.like.includes(myDecodedToken.id)){

                  PATCH(`projects/like/${project._id}`, {
                    id: myDecodedToken.id
                  })
                  setToogleLike(!toogleLike)
                  
                }else{
                  
                  PATCH(`projects/unlike/${project._id}`, {
                    id: myDecodedToken.id
                  })
                  setToogleLike(!toogleLike)
                }
              }else{
                alert("Must be signed in first, Thank you!")
              }
            }}

          />
        ))}

      </div>


    </section>
  )
}

export default Projects