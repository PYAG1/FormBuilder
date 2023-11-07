import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Main() {
  const navigate = useNavigate()
  return (
<div className=' w-full h-screen'>
<header className=" w-full py-[1em] px-[1.5em]">
        <p className=" text-2xl font-semibold raleway">Form-Builder</p>
      </header>
      <div className=" w-full min-h-[90vh]  flex flex-col justify-center items-center" >
      <div className=" mx-auto md:w-[70%] lg:w-[50%]  h-[60vh] text-center px-[1.5em]">
          <p className=" text-3xl lg:text-4xl font=bold raleway py-3 ">
            {" "}
            Welcome to Formify: The Ultimate Form Builder
          </p>

          <p className=" text-justify">
          Welcome to [Your App Name], the ultimate solution for creating customizable, user-friendly forms without any hassle. Our intuitive and powerful form builder empowers you to design, personalize, and integrate forms seamlessly. Whether you need contact forms, surveys, registration forms, or more, we've got you covered.


          </p>

          <div className=" mt-[1em] w-full flex justify-center gap-[2.5em] ">
          
            <button className=" w-[100px]  font-semibold bg-primary p-3 text-center text-secondary ">
              Sign in
            </button>
            <button  className=" w-[100px]  font-semibold bg-primary p-3 text-center text-secondary " onClick={()=>{navigate('/signup')}}>
              Sign up
            </button>
          </div>
        </div>
      </div>
</div>
  )
}
