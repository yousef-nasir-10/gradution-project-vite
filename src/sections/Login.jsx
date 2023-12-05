import { useEffect, useState } from 'react'
import Button from '../components/Button'
import { GET, POST, myDecodedToken } from '../APIs'
import { isExpired, decodeToken } from "react-jwt";
import { Link } from 'react-router-dom';



const Login = () => {
    const [toggoleOTP, setToggoleOTP] = useState(false)
    const [toggoleForm, setToggleForm] = useState(false)
    const [toggoleForgetPassword, setToggleForgetPassword] = useState(false)
    const[count,setCount] = useState(0)
    const[forgetPasswordMsg, setForgetPasswordMsg ] = useState("")

    const[errorMsg, setErrorMsg] = useState({
        loginErrorMsg: false,
        otpLoginMsg: false,
    })
    const [loginFormData, setLoginFormData] = useState(
        {   
          id: '',
          password: '',
          OTP: '',
          email: ''
        }
    )

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        POST("user-login", {
            id: loginFormData.id,
            password: loginFormData.password
        }).then(res => {
            
            if(res.data.status == "OK") {
                setLoginFormData({
                    id: '',
                    password: '',
                    otp: ''
                })

                localStorage.setItem('OTP', res.data.data)

                setToggoleOTP(true)
            }else{
                
                setErrorMsg({
                    otpLoginMsg: false,
                    loginErrorMsg: true
                })
            }
        }) 
    }
    const handleOTPsubmit = (event) => {
        event.preventDefault()
        const OTP = localStorage.getItem('OTP')
        const myDecodedToken = decodeToken(OTP);
        if(loginFormData.OTP === myDecodedToken.otp){
            POST("user-login/verify", {
                id: myDecodedToken.id,
            }).then(res => {
                
                if(res.data.status === "OK"){
                    setToggleForm(true)
                    localStorage.setItem('token', res.data.data)
                    window.location.href = "#home"
                    window.location.reload(); 

                }
            })

        }else{
            setCount(count + 1)
            if(count === 3){
              setToggoleOTP(false)
            }
            setErrorMsg({
                loginErrorMsg: false,
                otpLoginMsg: true
            })
        }

    }
    const handleForgetPasswordSubmit = (event) => {
        event.preventDefault()
        POST("user-login/forget-password", {
            email: loginFormData.email
        })
        .then(res => {
            console.log(res);
            if (res.data.msg) {
                setForgetPasswordMsg(`Message has been sent to ${loginFormData.email}.`)
            }else{
                setForgetPasswordMsg(`email is not found...`)
            }
        })
    }



    function handleChange (event){
  
        const {name, value, type, checked} = event.target
        setLoginFormData(prevStat =>{
            return {
            ...prevStat,
            [name]: type === "checkbox"? checked: value,
            }
      
          })
        
        setErrorMsg({
            otpLoginMsg: false,
            loginErrorMsg: false
        })
          
    }

    
  return (
    <section className={`grid xl:grid-cols-2 max-xl:grid-cols-1 ${myDecodedToken? `hidden` : ""} `} id='login'>
        <div className=' flex flex-col justify-center shadow-sm p-4  '>
            <h2 className='text-4xl font-palanquin font-bold text-secondary mb-4 px-10'>Log <span className='text-primary'>In</span> </h2>
            {!toggoleOTP &&<form className='flex justify-evenly mb-4 max-xl:flex-col max-xl:flex-wrap flex-wrap   '>
                <div className='border-2 border-primary rounded-md w-2/5 max-xl:w-[80%]  max-xl:mb-4  flex'>
                    <input 
                        type='text'
                        className=' m-2 p-2 outline-none'
                        placeholder='Enter your ID '
                        value={loginFormData.id}
                        onChange={handleChange}
                        name='id' 
                    />

                </div>
                <div className='border-2 border-primary rounded-md w-2/5 max-xl:w-[80%]   flex'>
                    <input 
                        
                        className=' m-2 p-2 outline-none  '
                        placeholder='Enter your Password '
                        type='password'
                        value={loginFormData.password}
                        onChange={handleChange}
                        name='password' 



                    />

                </div>
            <div className='xl:px-12 flex flex-col self-start  w-full  '>
            <p className='mb-2  p-2 text-primary font-palanquin  ' onClick={() => setToggleForgetPassword(!toggoleForgetPassword)}>
                <a className='m-2 cursor-pointer'>forget your password?</a>
            </p>
            


            <div className=''>
                <Button
                    label= "Login"
                    onClick = {handleLoginSubmit}
                />
            </div>
            </div>
            
            {errorMsg.loginErrorMsg && <p className='text-md font-montserrat text-red-400 m-4'>Wrong password/username</p>}
        </form>}

        {toggoleForgetPassword &&<form className='flex flex-col justify-center px-10 mb-4 max-xl:flex-col max-xl:flex-wrap flex-wrap' >
            <div className='border-2 border-primary rounded-md w-2/5 max-xl:w-[80%]  max-xl:mb-4  flex'>
                <input 
                    type='email'
                    className=' m-2 p-2 outline-none'
                    placeholder='Enter your email '
                    value={loginFormData.email || ''}
                    onChange={handleChange}
                    name='email' 


                />


            </div>
            <div className='flex mt-2'>
                <Button
                    label="send"
                    onClick={handleForgetPasswordSubmit}
                    
                />
            </div>

            <p className='text-md mt-2 text-primary font-montserrat'>{forgetPasswordMsg}</p>

        </form>}

            
        {toggoleOTP && <form className='flex flex-col justify-start mb-4 max-xl:flex-col max-xl:flex-wrap  xl:px-10 mt-4  '>
            <p className='text-xl text-primary mb-2 font-montserrat'>Enter One Time Password:</p>
            <div className='border-2 border-primary rounded-md w-2/5 max-xl:w-[80%]  max-xl:mb-4  flex'>
                <input 
                    type='number'
                    className=' m-2 p-2 outline-none'
                    placeholder='OTP '
                    value={loginFormData.OTP || ''}
                    onChange={handleChange}
                    name='OTP' 
                    maxlength="4"
                    max={4}

                />

            </div>
            <div className='flex mt-2'>
                <Button
                    label="Confirm"
                    onClick={handleOTPsubmit}
                    herf = "#home"
                />
            </div>
            {errorMsg.otpLoginMsg && <p className='text-md font-montserrat text-red-400 m-4'>You've entered wrong code {count}/3</p>}
        </form>}
            
        </div>
        <div className='flex justify-center items-center flex-col max-xl:items-start max-xl:mt-6 max-xl:bg-slate-50 max-xl:p-6 rounded-xl  shadow-md bg-slate-50'>
            <h1 className='text-2xl font-montserrat text-primary mb-4'> Faced a problem? </h1>
            
            <a href='#contact-us' className='bg-secondary p-4 rounded-full text-white text-xl font-montserrat'>Contact us now!</a>

            
        </div>


    </section>
    
  )
}

export default Login