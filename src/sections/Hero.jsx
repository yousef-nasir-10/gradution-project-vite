import { libraryCCSIT, logoKFU } from "../assets/images"


const Hero = () => {
  return (
    <section
      id="home"
      className=" w-full flex xl:flex-row flex-col justify-end items-start xl:justify-start xl:items-center min-h-screen gap-10 max-container max-xl:flex-col-reverse padding-x pt-40   "
    >
      
      <div className=" xl:top-9 xl:right-1 xl:absolute  flex-row max-lg:justify-start padding-x ">
        <img
          src={libraryCCSIT}
          alt="CCSIT library"
          width={900}
          className="rounded-lg opacity-80 "
        />

      </div>
      <div className="relative xl:w-2/5 xl:items-start  flex flex-col  w-full padding-x pt-12  xl:left-[-100px] xl:mb-60 ">
        
        <p className="text-lg z-0 font-montserrat text-primary xl:text-2xl  "> Welcome to the website that brings <span className="xl:bg-white xl:rounded-sm  xl:whitespace-nowrap relative z-10 pr-2 text-secondary text-[50px] leading-normal  xl:ml-10 xl:text-[60px] xl:p-2 max-xl:text-2xl ">Graduation Projects</span><br></br> of CCSIT in a single place. </p>
        <p className=" mt-10 p-2  mr-20 text-left info-text font-palanquin xl:w-[400px] max-xl:w-full ">Discover plenty of graduation projects that could be a point of interest to you!</p>

        <div className="flex flex-1 justify-center items-center max-xl:flex-col mt-10 bg-slate-200 p-4 rounded-md w-full ">
          <p className="text-primary text-lg font-bold font-montserrat  capitalize mr-5  ">Inspired by </p>

          <a>
            
            <img
              src={logoKFU}
              alt="KFU logo"
              width={200}
            />
          </a>
        </div>
      </div>



      
    </section>
  )
}

export default Hero
