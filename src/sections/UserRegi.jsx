import { useState } from 'react'
import { POST, myDecodedToken } from '../APIs'
import Button from '../components/Button'
import UplodedUser from '../components/UplodedUser'


const UserRegi = () => {
    const [isUserCreated, setIsUserCreated] = useState("")
    const [formData, setFormData] = useState(
        {   
          id: '',
          password: '',
          email: '',
          firstName: "",
          lastName: ''
        }
    )
    function handleChange (event){
        const {name, value, type, checked} =event.target
        setFormData(prevStat =>{
            return {
            ...prevStat,
            [name]: type === "checkbox"? checked: value,
                
            //[event.target.name] : event.targetvalue
            }
        })
        setIsUserCreated("")
    }


    const [jsonData, setJsonData] = useState()
    const [insertedList, setInsertedList] = useState([])
    const [notInsertedList, setNotInsrtedList] = useState([])

    
    let insertion = []
    let notInsertion = []

    


    const handleSubmit = (event) => {
        event.preventDefault()
        POST("user-login/register", {
            id: formData.id,
            password: formData.password,
            // role: formData.role,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName
        })
        .then(res => {
            console.log(res.data.status);
            if (res.data.status === 200) {
                setFormData({   
                    id: '',
                    password: '',
                    email: '',
                    firstName: "",
                    lastName: ''
                  })
                setIsUserCreated("User has been created")
                
            }else{
                
                setIsUserCreated("Error when creating user!")
            }

        })

    }
    const convertCSVToJson = (csvData) =>{
        const lines = csvData.split("\n")
        const headers = lines[0].split(",")
        const result = []

        for(let i = 1; i <lines.length; i ++){
            const obj = {};
            const currentLine = lines[i].split(",")

            for(let j = 0; j <headers.length; j++){
                obj[headers[j].trim()] = currentLine[j]
            }

            result.push(obj)
        }

        return result

    }

    async function handleFileSubmit(event) {
        event.preventDefault()
        console.log(jsonData);
        for(let i = 0; i< jsonData.length; i++){
            if(jsonData[i].email != undefined){
                POST("user-login/register", {
                    id: jsonData[i].id,
                    password: jsonData[i].password,
                    role: jsonData[i].role,
                    email: jsonData[i].email,
                    firstName: jsonData[i].firstName,
                    lastName: jsonData[i].lastName
                }).then(res => {
                    if (res.data.status === 200){
                        console.log("s",i);
                        insertion.push(jsonData[i])
                        setInsertedList(insertion)

                    }else{
                        console.log("f",i);
                        notInsertion.push(jsonData[i])
                        setNotInsrtedList(notInsertion)

                    }

                })
            }
        }
    }

    const handleCSVInputChange = (event) => {
        try {
            
            const file = event.target.files[0]

            const reader = new FileReader()
    
            reader.onload = (e)=>{
                const csvData = e.target.result
    
                const jsonData = convertCSVToJson(csvData)
                setJsonData(jsonData)
            }
    
            reader.readAsText(file)
        } catch (error) {
            
        }
    }


  return (
    <section className='flex flex-col '>
        <h2 className='text-4xl font-palanquin font-bold text-secondary mb-10'>USER <span className='text-primary'>Registration</span> </h2>
        <div className={`grid xl:grid-cols-2 max-xl:grid-cols-1 ${myDecodedToken? `` : ""} `}>
            <form className='flex flex-row flex-wrap justify-start items-start mb-2 '>
                <div className='border-2 border-primary rounded-md w-2/5 max-xl:w-[80%] m-2  max-xl:mb-4  flex'>
                <input 
                    type='text'
                    className=' m-2 p-2 outline-none'
                    placeholder='Enter ID '
                    value={formData.id}
                    onChange={handleChange}
                    name='id' 
                />
                </div>
                <div className='border-2 border-primary rounded-md w-2/5 max-xl:w-[80%]  max-xl:mb-4 m-2 flex'>
                    <input 
                        type='text'
                        className=' m-2 p-2 outline-none'
                        placeholder='Enter First Name '
                        value={formData.firstName}
                        onChange={handleChange}
                        name='firstName' 
                    />
                </div>
                <div className='border-2 border-primary rounded-md w-2/5 max-xl:w-[80%]  max-xl:mb-4 m-2  flex'>
                    <input 
                        type='text'
                        className=' m-2 p-2 outline-none'
                        placeholder='Enter Last Name '
                        value={formData.lastName}
                        onChange={handleChange}
                        name='lastName' 
                    />
                </div>
                <div className='border-2 border-primary rounded-md w-2/5 max-xl:w-[80%]  max-xl:mb-4 m-2 flex'>
                    <input 
                        type='text'
                        className=' m-2 p-2 outline-none'
                        placeholder='Enter Email '
                        value={formData.email}
                        onChange={handleChange}
                        name='email' 
                    />
                </div>
                <div className='border-2 border-primary rounded-md w-2/5 max-xl:w-[80%]  max-xl:mb-4 m-2 flex'>
                    <input 
                        type='password'
                        className=' m-2 p-2 outline-none'
                        placeholder='Enter password '
                        value={formData.password}
                        onChange={handleChange}
                        name='password' 
                    />
                </div>
                <div className='ml-2 self-center w-full'>

                    <Button
                        label="Create"
                        onClick={handleSubmit}
                    />
                </div>
                
                <p className={`${isUserCreated === "Error when creating user!" ? "text-secondary" : "text-primary"} mt-2 font-montserrat  text-xl`}>{isUserCreated}</p>
                
            </form>
            <form className='p-2  flex justify-start items-start flex-wrap flex-col maxxl:mt-4 max-xl:bg-slate-50  '>
                <div class="mb-3 flex w-full flex-col ">
                    <label
                        for="formFile"
                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200 font-montserrat text-xl"
                        >Or upload a cvc file
                        
                    </label>
                    <input
                        onChange={handleCSVInputChange}
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        type="file"
                        id="formFile"
                    />
                </div>  

                
                <Button
                    label="Create"
                    onClick={handleFileSubmit}

                />
                {insertedList.length != 0 ? <p className='mt-4 font-montserrat font-bold'> Number of Success/es: {insertedList.length} </p> : ""}
                <div className='w-full p-2 flex   flex-wrap'>
                    
                    {insertedList.map((user, index) => (
                        <UplodedUser
                            key={index}
                            id = {user.id}
                            email = {user.email}
                            index = {index}
                            textColor = "text-primary"
                        />
                    ))}
                </div>

                {notInsertedList.length != 0 ? <p className='mt-4 font-montserrat font-bold'> Number of Failure/s: {notInsertedList.length} </p> : ""}
                <div className='w-full p-2 flex  flex-wrap'>
                    
                    {notInsertedList.map((user, index) => (
                        <UplodedUser
                            key={index}
                            id = {user.id}
                            email = {user.email}
                            index = {index}
                            textColor = "text-secondary"
                        />
                    ))}
                </div>

                

            </form>
        </div>

    </section>
  )
}

export default UserRegi
