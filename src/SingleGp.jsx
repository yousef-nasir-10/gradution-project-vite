import { Link, useParams } from "react-router-dom";
import { GET, PATCH, PUT, myDecodedToken } from "./APIs";
import { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaTools } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import Button from "./components/Button";
import Comment from "./components/Comment";
import LikeButton from "./components/LikeButton";





const SingleGp = () => {
    
    const [backendProjects, setBackendProjects] = useState({})
    const [studentsList, setStudentsList] = useState([])
    const [superVisorsList, setSuperVisorsList] = useState([])
    const [toolsList, setToolsList] = useState([])
    const [urlsList, setUrlsList] = useState([])
    const [toogleLike, setToogleLike] = useState(false)
    const [numOfLikes, setNumOfLikes] = useState()


    const [comment, setComment] = useState("")
    const [toogleNewComment, setToogleNewComment] = useState(false)
    const [commentsList, setCommentsList] = useState([])

    const [isLiked, setisLiked] = useState(false)
    
    let {searchParm} = useParams()
    useEffect(() => {
        GET(`projects/id/${searchParm}`)
        .then(res=>{

            setBackendProjects(res.data.project)
            setStudentsList(res.data.project.students)
            setToolsList(res.data.project.tools)
            setSuperVisorsList(res.data.project.superVisors)
            setUrlsList(res.data.project.urls)

            setisLiked(res.data.project.like.includes(myDecodedToken && myDecodedToken.id))
            setNumOfLikes(res.data.project.like.length)


            
            
        })
      

    }, [toogleLike])

    useEffect(() => {
      GET(`projects/comment/${searchParm}`)
      .then(res =>{

        setCommentsList(res.data.comments)
      })

    }, [toogleNewComment])


    const handleCommentChange = event => {
		setComment(event.target.value)
	};

    const handleCommentSubmit = (event) => {
        event.preventDefault()
        if(myDecodedToken && myDecodedToken.id){
            PUT(`projects/comment/${searchParm}`, {
                sentBy: myDecodedToken.id,
                text: comment
            })
            .then(res => {
                if(res.status === 200){
                    setToogleNewComment(!toogleNewComment)
                    setComment("")
    
                }
            })

        }else{
            alert("You must be signed in first, Thank you! ")
        }
    }

    const handleLikeButtonClick = () => {

        if(myDecodedToken && myDecodedToken.id){

          if(!backendProjects.like.includes(myDecodedToken.id)){

            PATCH(`projects/like/${backendProjects._id}`, {
              id: myDecodedToken.id
            })
            setToogleLike(!toogleLike)
            
          }else{
            
            PATCH(`projects/unlike/${backendProjects._id}`, {
              id: myDecodedToken.id
            })
            setToogleLike(!toogleLike)
          }
        }else{
          alert("Must be signed in first, Thank you!")
        }
      }


      const getBaseUrl =  (url) => {
        if (url) {
          var parts = url.split('://');
          
          if (parts.length > 1) {
            return parts[0] + '://' + parts[1].split('/')[0] + '/';
          } else {
            return parts[0].split('/')[0] + '/';
          }
        }
      };

    
    

  return (
    <section className=" relative  min-h-screen xl:py-[140px] flex items-start max-xl:py-[140px] ">
      <div className="  min-h-screen flex flex-col w-full  ">
        {/* Project */}
        <div className="py-5 xl:px-20  max-xl:px-10 max  w-full flex max-xl:flex-row justify-evenly max-xl:justify-evenly flex-wrap items-center bg-primary">

            <h1 className="text-white font-montserrat text-4xl text-center  max-xl:text-2xl w-full">{backendProjects.title}</h1>
            <p className="text-white font-montserrat text-3xl text-center max-xl:text-2xl">{backendProjects.catagory}</p>
            <p className="text-white font-montserrat text-3xl text-center max-xl:text-2xl">{backendProjects.year}</p>
            <div className='flex items-center justify-between'>
                <p className='m-2 font-montserrat text-xl text-white '>{numOfLikes}</p>
                    <BiSolidLike 
                    onClick={handleLikeButtonClick}
                    className={` z-10 cursor-pointer  text-2xl mr-2 ${isLiked? "text-secondary" : "text-white"}`}
                />
        </div>
            
        </div>
        {/*  Intro */}
        <div className="flex flex-col  px-[200px] max-xl:px-10 py-16">

            <div className=" flex justify-center items-center max-xl:flex-col max-xl:items-start  ">
                <h1 className="text-2xl font-montserrat xl:mx-2 font-bold w-2/6 text-primary">Introduction</h1>
                <div className="bg-secondary w-full h-6 rounded-sm "/>
            </div>
            <div className=" flex   text-2xl leading-[40px] text-justify mt-8 max-xl:text-xl max-xl:leading-normal ">
                <p className="">{backendProjects.introduction}</p>
            </div>
        </div>
        {/*  abstract */}
        <div className="flex flex-col  px-[200px] max-xl:px-10 py-16">

            <div className=" flex justify-center items-center max-xl:flex-col max-xl:items-start  ">
                <h1 className="text-2xl font-montserrat xl:mx-2 font-bold w-2/6 text-primary ">Abstract</h1>
                <div className="bg-secondary w-full h-6 rounded-sm "/>
            </div>
            <div className=" flex   text-2xl leading-[40px] text-justify mt-8 max-xl:text-xl max-xl:leading-normal ">
                <p className="">{backendProjects.abstract}</p>
            </div>
        </div>
        {/* Project Detiles div */}
        <div className="flex flex-col  px-[200px] max-xl:px-10 py-16">
            <div className=" flex justify-center items-center max-xl:flex-col max-xl:items-start mb-6 ">
                <h1 className="text-2xl font-montserrat xl:mx-2 font-bold w-2/6  text-primary">Project Details</h1>
                <div className="bg-secondary w-full h-6 rounded-sm "/>
            </div>

            <div className="flex   justify-evenly flex-wrap shadow-3xl   ">
                
                <div className="flex flex-col justify-center items-center p-4 rounded-lg shadow-xl flex-1 ">
                    
                    <PiStudentBold className="text-3xl text-secondary"/>
                    <div className="flex  flex-col">
                        {studentsList.map(student => (
                            <p className="text-md  font-montserrat text-primary text-center " key={student}>
                                {student}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center p-4 rounded-lg shadow-xl flex-1  ">
                    
                    <MdOutlineSupervisorAccount className="text-3xl text-secondary"/>
                    <div className="flex flex-col  ">
                        {superVisorsList.map(superVisor => (
                            <p className="text-md m-2 font-montserrat text-primary text-center  ">
                                {superVisor}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center p-4 rounded-lg shadow-xl flex-1 ">
                    
                    <FaTools className="text-3xl text-secondary"/>
                    <div className="flex flex-col">
                        {toolsList.map(tool => (
                            <p className="text-md m-2 font-montserrat text-primary text-center ">
                                {tool}
                            </p>
                        ))}
                    </div>
                </div>

                
                <div className="flex flex-col justify-center items-center p-4 rounded-lg shadow-xl flex-1  ">
                
                <IoIosLink className="text-3xl text-secondary"/>
                <div className="flex flex-col  ">
                    {urlsList.map(url => (
                        <Link to={url} className="text-md m-2 font-montserrat text-primary text-center  ">
                            {getBaseUrl(url)}
                        </Link>
                    ))}
                </div>
            </div>

            </div>
            
        </div>
        {/* comments div */}
        <div className="flex flex-col  px-[200px] max-xl:px-10 py-16">
            <div className=" flex justify-center items-center max-xl:flex-col max-xl:items-start mb-6 ">
                <h1 className="text-2xl font-montserrat xl:mx-2 font-bold w-2/6  text-primary">Comments</h1>
                <div className="bg-secondary w-full h-6 rounded-sm "/>
            </div>
                <form className="flex w-full flex-col ">
                    <textarea 
                        name="comment" 
                        id="" 
                        placeholder="Leave a comment"
                        onChange={handleCommentChange}
                        value={comment}

                        className="border-2 w-full p-4 mt-6 outline-none rounded-full flex justify-center items-center max-h-16"
                    >
                    </textarea>
                    <div className="  z-10   mt-8 self-end ">

                        <Button
                            label="Send"
                            onClick={handleCommentSubmit}

                        />
                    </div>
                </form>
                <div className="flex w-full flex-col-reverse">
                    {commentsList.map((comment, index) => (
                        <Comment
                            key={index}
                            {...comment}
                        />
                    ))}
                </div>
        </div>

        


        

    </div>
      
      
    </section>
  )
}

export default SingleGp
