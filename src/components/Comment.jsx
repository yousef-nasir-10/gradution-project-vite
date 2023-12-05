import dateFormat from "dateformat";


const Comment = ({created, firstName, lastName, text}) => {
    const now = new Date();
  return (
    <div className='flex flex-col mt-4 bg-slate-50 p-2 rounded-e-xl'>
        <div className="flex flex-wrap flex-col w-full  p-2 rounded-xl ">
            <p className="font-bold font-palanquin text-primary">{dateFormat(created, " mmmm dS, yyyy, h:MM TT")}</p>
            <div>
                <div className="flex  ">

                    <p className="font-bold font-palanquin text-secondary mr-2 w-full">{firstName} {lastName}</p>

                </div>

            </div>
            
        </div>
        <p className="p-4 text-xl ">{text}</p>
        
    </div>
  )
}

export default Comment
