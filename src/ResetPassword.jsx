import { useEffect, useState } from 'react';
import Button from './components/Button'
import { useParams } from "react-router-dom";
import { GET, POST, myDecodedToken } from './APIs';
import PasswordChecklist from "react-password-checklist"
let currentDate = new Date();



const ResetPassword = () => {
    const {id, token} = useParams()
    
    const [isacceptedPassword, setIsacceptedPassword] = useState(false)

    const [formData, setFormData] = useState(
        {   
          password: '',
          rePassword: ''
        }
    )
    function handleChange (event){
        const {name, value, type, checked} =event.target
        setFormData(prevStat =>{
            return {
            ...prevStat,
            [name]: type === "checkbox"? checked: value,
                
            }
        })
    }

    useEffect(() => {
        if (myDecodedToken&& myDecodedToken.exp * 1000 < currentDate.getTime()) {
            
            GET(`user-login/reset-password/${id}/${token}`)
            .then(res => {
                
                if(!res.data.msg){
                    window.location.href = "/"
    
                }
            })
          } else {
            window.location.href = "/"
          }



    }, [])

    const handleSubmit =  (event) => {
        event.preventDefault()
        if(isacceptedPassword){
            POST(`user-login/reset-password/${id}/${token}`, {
                password: formData.password
            })
            .then(res=>{
                
                if(res.data.msg){
                    
                    window.location.href = '/#login'
                }
            })
        }

    }
    
  return (
    <section className=" relative  min-h-screen xl:py-[140px] flex items-start max-xl:py-[140px] ">
        <div className="  min-h-screen flex flex-col w-full items-center ">
            <div className="flex flex-col w-full   px-[200px] max-xl:px-10 py-16 items-center">
                <p className='text-3xl font-montserrat mb-4 font-semibold '>Reset Password</p>
                <div className='border-2 border-primary rounded-md w-2/5   max-xl:mb-4  flex'>
                    <input 
                        type='password'
                        className=' m-2 p-2 outline-none'
                        placeholder='new password '
                        onChange={handleChange}
                        name='password'
                        value={formData.password}
                        required


                    />
                    


                </div>
                <div className='border-2 border-primary rounded-md w-2/5   max-xl:mb-4 mt-4 mb-4  flex'>
                    <input 
                        type='password'
                        className=' m-2 p-2 outline-none'
                        placeholder='Retype password '
                        onChange={handleChange}
                        name='rePassword'
                        value={formData.rePassword}
                        required


                    />

                </div>
                <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={5}
				value={formData.password}
				valueAgain={formData.rePassword}
				onChange={(isValid) => { setIsacceptedPassword(isValid)}}
			/>
               <Button
                label="Reset"
                onClick={handleSubmit}
               />
            </div>


        </div>
    </section>

  )
}

export default ResetPassword