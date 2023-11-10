'use client'
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Friends from "./Friend";
import Rank from "./Rank";
import { fetchAllAmis, fetchCurrentUser } from "@/hooks/userHooks";
import { userProps } from "@/interface/data";



interface LevelBarpros {
  value: number
}
function LevelBar({ value }: LevelBarpros) {
  const progressWidth = `${value}%`;



  return (
    <div className="bg-white h-5  drop-shadow-lg  shadow-indigo-500/40    w-80 rounded-2xl">
      <div className="bg-[#0ea5e9] h-5 rounded-full " style={{ width: progressWidth }}>
        {/* <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
          {`${value}%`} */}
        {/* </span> */}
      </div>
    </div>
  );
}

const UseProfile = ({ currentUser }: { currentUser: userProps }) => {
  const [amis, setAmis] = useState<any>([])
  const [query, sequery] = useState("")

  const [isOpen, setIsOpen] = useState(false)

  const [check, setCheck] = useState(0);
  const [check1, setCheck1] = useState(0);
  const [check2, setCheck2] = useState(0);
  const [id, setid] = useState(0);
  const [foto_user, setFoto_user] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    (
      async () => {
        const response = await fetch('http://localhost:3333/auth/user', {
          credentials: 'include',
        });
        const content = await response.json();
        setFoto_user(content.foto_user);
        setid(content.id);
        setEmail(content.email);
        setUsername(content.username)
        // setUsername(content.username);

        // console.log(content.id);
      }
    )();
  });
  useEffect(() => {
    (
      async () => {
        setCheck1(0);
        setCheck2(0);
      }
    )();
  }, [id]);
  const freind_ranck = async (fd: number) => {
    setCheck(fd)
    if (check1 == 0) {
      setCheck1(1);
      setCheck2(0);

    }
    // else if (fd == 2 && check1 == 1)
    //     setCheck1(2);
    // else if (fd == 2 && check1 == 2)
    //     setCheck1(0);
    else if (check1 == 1) {

      setCheck2(0);
      setCheck1(0);
    }

  }
  const freind_ranck1 = async (fd: number) => {
    setCheck(fd)
    if (check2 == 0) {
      setCheck2(1);
      setCheck1(0);
    }
    // else if (fd == 2 && check1 == 1)
    //     setCheck1(2);
    // else if (fd == 2 && check1 == 2)
    //     setCheck1(0);
    else if (check2 == 1) {
      setCheck2(0);
      setCheck1(0);
    }

  };
  useEffect(() => {
    (
      async () => {
        const response = await fetch(`http://localhost:3333/friends/accepted-friends/${id}`, {
          credentials: 'include',
        });
        const content = await response.json();
        setAmis(content);
      }
    )();
  }, [query, amis, id]);

  return (

    <>
      <div className='flex  flex-wrap  justify-center min-h-screen  min-w-screen    items-center p-6 '>
        <div className='  flex-none   z-20 w-96 mt-[120px] mb-10  h-[100%]  shadow-xl  shadow-[#728edb] justify-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[40px] p-6  text-white'>
          <div className="text-center">
            <span>My Profile</span>
            <div className="mt-6">
              <img
                src={foto_user}
                alt="Your Image Alt Text"
                className=" w-52 h-52   border-2 border-[#E3E8EC]  rounded-[40px] inline-block" // Adjust the width as needed
              />
            </div>
            <div className='mt-6'>
              <h1 className="text-xl font-bold">{username}</h1>
              <span className="text-sm  font-serif italic flex justify-center mt-3">{email}</span>
            </div>
            <div className="mt-8">
              <LevelBar value={80} />
              <p className=' mt-4 text-blue-200 font-serif italic uppercase'>level 8-86%</p>
            </div>
            <div className='mt-6'>
              <Link className="text-base font-bold flex justify-center items-center text-[#2c4d82]" href={"/EditProfile"}><span className="underline py-2 px-12 bg-white border rounded-full hover:scale-110 duration-300">Edit Profile</span>
              </Link>
              <h1 className="flex  mt-[40px] ">Recent Activities</h1>

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

          <div className=" flex flex-col    h-full w-64 items-center   drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-[#f9fafb]  mt-[85px] min-h-[845px] rounded-r-[80px]  p-6">
            {(!check || check == 2 || !check1) ? (<div>
              <button onClick={() => freind_ranck(1)} className=" mt-60 px-[99px] py-2 text-base font-bold   bg-black   hover:bg-[#3b82f6] hover:scale-110 duration-300 text-white">Friends</button>
            </div>) : null}
            {(check && check != 2 && check1) ? (<div>
              <button onClick={() => freind_ranck(1)} className=" mt-60 px-[99px] py-2  text-base font-bold   bg-[#3b82f6]  hover:bg-black hover:scale-110 duration-300 text-white">Friends</button>
            </div>) : null}
            {(!check || check == 1 || !check2) ? (<div>
              <button onClick={() => freind_ranck1(2)} className=" mt-60 px-[108px] py-2 text-base font-bold   bg-black   hover:bg-[#3b82f6]  hover:scale-110 duration-300 text-white">Rank</button>
            </div>) : null}
            {(check && check != 1 && check2) ? (<div>
              <button onClick={() => freind_ranck1(2)} className=" mt-60 px-[108px] py-2 text-base font-bold  bg-[#3b82f6]  hover:bg-black  hover:scale-110 duration-300 text-white">Rank</button>
            </div>) : null}


          </div>

        </div>
        {(check && (check1 || check2)) ? (<div className=" flex   justify-start   md:opacity-150 bg mt-[100px] min-h-[845px]    w-[400px] h-16 rounded-r-[50px] p-6"  >
          {
            check === 1 && <Friends amis_id={amis} amis={amis} currentUser={currentUser} />

          }
          {
            check === 2 && <Rank />
          }


        </div>) : null
        }
      </div>
    </>

  );
};

export default UseProfile;