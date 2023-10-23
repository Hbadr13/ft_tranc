'use client'
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Friends from "./Friend";
import Rank from "./Rank";


interface LevelBarpros {
  value: number
}
function LevelBar({ value }: LevelBarpros) {

  const progressWidth = `${value}%`;

  return (
    <div className="bg-gray-200 h-5  w-80 rounded-full">
      <div className="bg-cyan-500 h-5 rounded-full relative" style={{ width: progressWidth }}>
        {/* <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
          {`${value}%`} */}
        {/* </span> */}
      </div>
    </div>
  );
}

const UseProfile = () => {
  const [check, setCheck] = useState(1);
  const [isOpen, setIsOpen] = useState(false)
  return (


    // <section className="bg-blue-100 min-h-screen flex items-center justify-center">
    //     <div className= "flex bg-blue-50  rounded-2xl  max-w-5xl p-5 items-center">
    //         <div className="md:w-1/2 px-0 md:px-16">
    //             <div className="flex flex-col  bg-blue-500 rounded-2xl md:px-16" >
    //                 <h2 className="font-bold text-2xl text-[#002D74]">Your Profile</h2>
    //                 <div className=" flex  flex-wrap h-16 w-16 md:block mt-4 ">
    //                     <img className="rounded-full w-full object-cover" src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="Login" />
    //                 </div>
    //             </div>
    //         </div >
    //     </div>
    // </section>
    <div className='flex  flex-wrap  justify-center min-h-screen  min-w-screen   items-start bg-blue-100 p-6 '>
      <div className='  flex-none     w-96 mt-[120px] mb-10  h-[100%]  shadow-2xl  shadow-blue-600 justify-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[40px] p-6  text-white'>
        <div className="text-center">
          <span>My Profile</span>
          <div className="mt-6">
            <img
              src="https://i.pinimg.com/564x/dc/51/61/dc5161dd5e36744d184e0b98e97d31ba.jpg"
              alt="Your Image Alt Text"
              className="w-44 h-auto  rounded-full inline-block" // Adjust the width as needed
            />
          </div>
          <div className='mt-6'>
            <h1 className="text-xl font-bold">mmaqbour</h1>
            <span className="text-sm  font-serif italic flex justify-center mt-3">mmaqbour@gmail.com</span>
          </div>
          <div className="mt-8">
            <LevelBar value={60} />
            <p className=' mt-4 text-blue-200 font-serif italic uppercase'>level 8-86%</p>
          </div>
          <div className='mt-6'>
            <Link className="text-base font-bold flex justify-center items-center text-[#2c4d82]" href={"/register"}><span className="underline py-2 px-12 bg-white border rounded-full hover:scale-110 duration-300">Edit Profile</span>
            </Link>
            <h1 className="flex  mt-[50px] ">Recent Activities</h1>

            <img
              src="https://w0.peakpx.com/wallpaper/616/177/HD-wallpaper-table-tennis-neon-icon-blue-background-neon-symbols-table-tennis-neon-icons-table-tennis-sign-sports-signs-table-tennis-icon-sports-icons.jpg"
              alt="Your"
              className="w-80 mt-6 h-60  rounded-[32px] inline-block"
            />
            {/* <button className="flex justify-center  items-center mt-6  bg-[#f4f5f8] transition-all active:scale-100 rounded-xl text-[#2c4d82] py-2 px-12 hover:scale-105 ">Login</button> */}
          </div>
          <div className="mt-8">
            <button className="bg-[#eceef1]  transition-all active:scale-100 rounded-xl text-[#2c4d82] py-2 px-32 hover:scale-105 ">Logout</button>
          </div>
        </div>
      </div>
      <div className="">

        <div className=" flex flex-col gap-8    h-full w-64 items-center shadow-lg shadow-blue-500 bg-white  mt-[160px] min-h-[845px]  rounded-[0px] p-6">
          <div><button onClick={() => setCheck(1)} className=" mt-60 px-[101px] py-2   g shadow-blue-600  justify-center bg-gradient-to-r from-blue-500 to-cyan-200  text-white">Friends</button></div>
          <div><button onClick={() => setCheck(2)} className=" mt-20  px-[110px] py-2 shadow-blue-600 justify-center bg-gradient-to-r from-blue-500 to-cyan-200    text-white">Rank</button></div>

        </div>

      </div>
      <div className=" flex flex-auto w-[900px]  opacity-50  md:opacity-150 bg-white mt-[160px] min-h-[845px] flex-col   rounded-r-[50px] p-6">
        {
          check === 1 && <Friends />

        }
        {
          check === 2 && <Rank />
        }


      </div>
    </div>
    //       <div class="grid grid-rows-3 grid-flow-col gap-4">
    //   <div class="row-start-6  row-span-2  bg-black ...">01</div>
    //   <div class="row-end-6 row-span-2 ...">02</div>
    //   <div class="row-start-1 row-end-4 ...">03</div>
    // </div>


  );
};

export default UseProfile;