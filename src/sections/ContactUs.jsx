import  { useRef, useState } from 'react'
import Button from '../components/Button'
import { contactInfo } from '../constants'
import PersonCard from '../components/PersonCard'
import { myDecodedToken } from '../APIs'
import emailjs from '@emailjs/browser'




const ContactUs = () => {
  const [loading, setLoading]  = useState(false)
  const formRef = useRef()

  const [form, setForm] = useState({
    name: `${myDecodedToken && myDecodedToken.firstName} ${myDecodedToken && myDecodedToken.lastName}: ${myDecodedToken && myDecodedToken.userID}` || "Guest",
    email : "",
    message: ""
    
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({...form, [name]: value })
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    setLoading(true)

    emailjs.send(
        "service_e42idth", "template_7ljz4k9",
        {
          from_name: form.name,
          to_name : 'Yousef',
          from_email: form.email,
          to_email: 'yosuf.nasir.10@hotmail.com',
          message: form.message,
        },
        "4Hm31FbK1F0ObH5YH"
      )
      .then(()=> {
        setLoading(false)
        alert('Thank you. We will respond to your message as soon as we could ')

        setForm({
          name: "",
          email: "",
          message: ""

        }, (error) => {
          setLoading(false)
          console.log(error);
          alert('Something went wrong')
        })

      })
  }


  return (
    <section className='flex justify-center items-center flex-col bg-slate-50' id='contact-us'>
      <div className=' w-full  flex justify-start items-center   max-xl:flex-col  '>
        <form 
          className='bg-white mt-8 shadow-1xl w-full rounded-lg max-xl:w-full   p-6 flex flex-col ' 
          ref={formRef}
          onSubmit={handleSubmit}
         > 
        <h2 className='text-4xl font-palanquin font-bold text-secondary'>Get <span className='text-primary'>In Touch</span> </h2>
          <input
            type='email'
            placeholder='Email'
            className=' border-2 p-2 outline-none mt-4 xl:w-[50%] '
            onChange={handleChange}
            value={form.email}
            name='email'
          />
          <textarea className='xl:w-[50%] mt-4 outline-none border-2  max-xl:h-[100px] p-4 ' placeholder='Message'
          name='message'
          onChange={handleChange}
          value={form.message}

          >

          </textarea>
          <div className='mt-4 '>
            <Button
              label={`${loading ? "Sending..." : "Send"}`} 
            />

          </div>
        </form>


      </div>


          <div className='flex flex-col justify-center items-start '>

          <h2 className='text-4xl font-palanquin font-bold text-secondary p-4'>Who <span className='text-primary'>Are We?</span> </h2>
            <div className='flex flex-row flex-wrap '>
              {contactInfo.map((person, index) => (
                <PersonCard
                  key={index}
                  {...person}
                  index = {index}
                />
              ))}
            </div>
          </div>
          




    </section>
  )
}

export default ContactUs