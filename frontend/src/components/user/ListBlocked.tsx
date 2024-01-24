'use client'
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from 'react';
import Friends from "./Friend";
import Rank from "./Rank";
import { fetchAllAmis, fetchCurrentUser } from "@/hooks/userHooks";
import { useRouter } from "next/navigation";
import { AppProps, userProps } from "@/interface/data";
import Image from 'next/image';
import { Constant } from "@/constants/constant";



interface LevelBarpros {
    value: string
}
function LevelBar({ value }: LevelBarpros) {
    let progressWidth;
    if (value.length > 1)
        progressWidth = `${value}%`;
    else
        progressWidth = `${value}0%`;


    return (
        <div className="bg-white h-5  drop-shadow shadow-md shadow-black    w-80 rounded-lg">
        <div className="bg-[#0ea5e9] h-5 rounded-lg " style={{ width: progressWidth }}>
            {/* <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
          {`${value}%`} */}
            {/* </span> */}
        </div>
    </div>
    );
}

const ListBlocked = ({ currentUser }: { currentUser: userProps }) => {
    const [amis, setAmis] = useState<any>([])
    const [query, sequery] = useState("")

    const [isOpen, setIsOpen] = useState(false)
    const falq1 = "https://i.pinimg.com/564x/dc/51/61/dc5161dd5e36744d184e0b98e97d31ba.jpg";
    const flaq2 = "https://i.pinimg.com/564x/30/c7/1b/30c71b3c02f31c2f3747c9b7404d6880.jpg";

    const [check, setCheck] = useState(0);
    const [check1, setCheck1] = useState(0);
    const [check2, setCheck2] = useState(0);
    const [id, setid] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [Isopen, setIsopen] = useState(false)
    const [gender, setGender] = useState('');
    const [foto_user, setFoto_user] = useState("");
    const [username, setUsername] = useState("");
    const [update_email, setupdate_email] = useState("");
    const [update_gender, setupdate_gender] = useState("");
    const [level1, setlevel1] = useState("");
    const [level2, setlevel2] = useState("");
    const [level, setlevel] = useState();
    const [update_name, setupdate_name] = useState("");
    const [update_foto_user, setupdate_foto_user] = useState("");
    const [sendr_blocked, setsendr_blocked] = useState<Array<any>>([]);
    const router = useRouter()
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${Constant.API_URL}/friends/send-blocked`, {
                    credentials: 'include',
                });
                const counte = await response.json();
                if (response.status == 200) {
                    setsendr_blocked(counte)
                    return;
                }
            }
        )();
    }, [currentUser.id, check, check1, Isopen, check2]);
    const Unblockedfriend = async (numberPart: number) => {
        try {
            const response = await fetch(`${Constant.API_URL}/friends/Unblocked-friend/${numberPart}`, {
                method: 'DELETE',
                credentials: 'include',
            });


            if (response.ok) {

                // setIsOpen(true);
                if (Isopen == false)
                    setIsopen(true);
                else if (Isopen == true)
                    setIsopen(false);
                console.log('Friend Unblocked sent successfully.');
            } else {


                console.error('Failed to Unblock friend request.');
            }

        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    }

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${Constant.API_URL}/auth/user`, {
                    credentials: 'include',
                });
                const content = await response.json();
                setFoto_user(content.foto_user);
                setid(content.id);
                setEmail(content.email);
                setUsername(content.username)
                setlevel(content.level)
                const stringValue2: string = String(level);
                const level3 = stringValue2.split('.');

                if (level3[1])
                    setlevel1(level3[1]);
                else
                    setlevel1("0");
                setlevel2(level3[0]);
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
    fetchAllAmis({ setAmis, currentUser });
    return (
        <div className='flex  flex-wrap  justify-center  min-h-screen  bg-blfack w-full items-center   '>
            <div className='   flex-none smr-6 sm:mr-0  z-20  sm:w-[408px]   w-auto mt-[120px] mb-10  h-[100%] drop-shadow-2xl   items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[40px] p-6  text-white'>
                <div className=" w-full flex-col justify-center items-center text-center">
                    <span>My Profile</span>
                    <div className="mt-6 w-full justify-center flex bg-dblack items-center">
                        {foto_user && (
                            <img
                                src={foto_user}
                                alt="Your Image Alt Text"
                                className=" w-52 h-52   border-2 border-[#E3E8EC]  drop-shadow shadow-md shadow-black rounded-[40px] " // Adjust the width as needed
                            />
                        )}
                    </div>
                    <div className='mt-6 w-full flex justify-center items-center flex-col'>
                        <h1 className="text-xl font-bold">{(username)}</h1>
                        <span className="text-sm  font-serif italic flex justify-center mt-3">{email}</span>
                    </div>
                    <div className="mt-8 bg-bflack justify-center flex items-center flex-col w-full  mdl-6">
                        <LevelBar value={level1} />
                        <p className=' mt-4 text-white shadow-sm shadow-black    w-28 font-serif italic uppercase'>level {level2}-{level1}%</p>

                    </div>
                    <div className=" hidden md:flex ">

                        <div className='mt-6'>
                            <Link className="text-base font-bold flex justify-center items-center ml-4 text-blue-600" href={"/profile"}><span className=" py-2 px-32 bg-white  shadow-sm shadow-black   border rounded-xl hover:scale-110 duration-300">Profile</span>
                            </Link>
                            <h1 className="flex  mt-[50px] ">Recent Activities</h1>

                            <img
                                src="https://w0.peakpx.com/wallpaper/616/177/HD-wallpaper-table-tennis-neon-icon-blue-background-neon-symbols-table-tennis-neon-icons-table-tennis-sign-sports-signs-table-tennis-icon-sports-icons.jpg"
                                alt="Your"
                                className="w-80 mt-6 h-60  ml-6 rounded-[32px] inline-block"
                            />
                        </div>
                    </div>
                    <div className=" md:hidden flex  justify-center w-full items-center flex-col mdl-6 ">
                        <Link className="text-base font-bold flex justify-center mt-6 mdr-8 items-center  bg-bslack w-80 h-12 msl-4 text-blue-600" href={"/profile"}><span className=" w-full flex  justify-center items-center  h-full sm:py-2 sm:px-32 bg-white  shadow-sm shadow-black   border rounded-xl hover:scale-110 duration-300">Profile</span>
                        </Link>

                        <div className='mt-6 w-full justify-center   flex-col flex bg-blarck items-center'>
                            <p className="     text-2xl  dmr-52">Settings</p>
                            <Link className=" mt-6   w-80   rounded-xl  h-12  flex justify-center  items-center bg-white hover:scale-110 drop-shadow shadow-md shadow-black  duration-300 text-blue-600 text-sm font-bold" href={"/EditProfile"}> <span className=" flex flex-row  " >Profile_Settings</span></Link>

                            <Link className="text-base w-80  h-12 font-bold flex justify-center items-center text-white" href={"/Listblocked"}><span className=" flex justify-center items-center  mt-10    w-full h-full  border-white  rounded-xl bg-blue-600  drop-shadow shadow-md shadow-black border  hover:scale-110 duration-300">Blocked</span>
                            </Link>

                            <Link className="text-base font-bold w-80 mt-5  h-12  flex justify-center items-center text-blue-600" href={"/Code_QR"}><span className="  mt-10 bg-white flex justify-center items-center w-full h-full     border-white rounded-xl border drop-shadow shadow-md shadow-black hover:scale-110 duration-300">Code_OR</span>
                            </Link>

                        </div>
                    </div>
                    <div className="mt-10 w-full ">
                        {/* <button className="bg-white   w-80  h-12  transition-all shadow-sm shadow-black active:scale-100 rounded-xl border text-blue-600  hover:bg:white hover:texts-white hover:scale-105 duration-300 ">Logout</button> */}
                    </div>
                </div>
            </div>
            <div className="z-10 hidden md:flex">

                <div className=" flex flex-col gap-8     h-full w-64 items-center   drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-[#f9fafb]  mt-[80px] min-h-[845px] rounded-r-[0px] rounded-[0px]">
                    <p className="  text-[25px]  font-bold mt-44  mr-28">Settings</p>

                    <Link className=" mt-5   py-2  w-[257px] h-10  flex justify-center   bg-white hover:scale-110   duration-300 text-blue-600  border    text-base font-bold" href={"/EditProfile"}> <span className="">Profile Settings</span></Link>





                    <Link className="text-base font-bold flex justify-center items-center text-white" href={"/Listblocked"}><span className=" py-2 px-[97px] mt-10  bg-[#3b82f6]  hover:scale-110 duration-300">Blocked</span>
                    </Link>

                    <Link className=" mt-5   py-2  w-[257px] h-10  flex justify-center   bg-white hover:scale-110   duration-300 text-blue-600  border  text-base font-bold" href={"/Code_QR"}> <span className="">Code_QR</span></Link>




                </div>

            </div>
            <div className="  hidden  hidden:sm hidden:md xl:flex shrink  flex-col overflow-y-scroll   scrollbar-hide  items-center  md:opacity-150 bg mt-[80px] min-h-[845px]  bg-blue-50  w-[700px] h-16 rounded-r-2xl rounded-s-[1px] p-6" >
                <div className="flex shrink  flex-col overflow-y-scroll  scrollbar-hide drop-shadow shadow-md shadow-black rounded-lg  border-e border-black items-center bg-white   w-[500px] h-[800px]">

                    {

                        (sendr_blocked.length) ? sendr_blocked.map((user: any) => (
                            <div className=' w-96  h-16  bg-blue-600  drop-shadow-2xl  -m-3 mt-8 rounded-xl border- border-blue-600  flex flex-row '>


                                <div className='bg-white rounded-l-xl border-2   border-blue-600  w-96 h-20  flex flex-row '>
                                    <button  >
                                        <div className='flex justify-start items-center ml-3'>
                                            <img
                                                src={user.receiver.foto_user}
                                                alt="Your"
                                                className="w-[60px]  h-[60px]   border-2 border-white  rounded-3xl"
                                            />
                                        </div>
                                    </button>
                                    <div className='flex justify-start  flex-col  '>
                                        <button  >
                                            <div className='normal-case no-underline font-semibold font-serif  ml-3 flex justify-start justify-items-center items-start  mt-7' >
                                                <p className='text-black text-sm'>
                                                    {user.receiver.username}
                                                </p>
                                            </div>
                                        </button>


                                    </div>



                                </div>
                                <div className=' bg-white  h-20 w-32 rounded-r-xl flex flex-col'>


                                    <button>
                                        <div onClick={() => Unblockedfriend(user.receiver.id)} className=' flex  h-20 justify-center rounded-r-xl hover:scale-110 hover:bg-blue-600 border-2  border-blue-600        duration-300 items-center'>
                                            <div className=' text-sm ml-1'>Unblock</div>
                                        </div>
                                    </button>
                                </div>


                            </div>


                        )) :
                            (
                                <footer className='  w-full  rounded-2xl h-full -mt-28  flex flex-col justify-center items-center space-y-3'>
                                    <div className="mt-20 bg-green-w500 flex items-end -space-x-2">
                                        <div className="">
                                            <Image className='border-2 border-white rounded-full w-[50px] h-[50px]' width={500} height={500} src={'/search/man.png'} alt='woman iamge' />
                                        </div>
                                        <div className=" z-10">
                                            <Image className=' border-2 border-white rounded-full w-[60px] h-[60px]' priority width={600} height={600} src={'/search/woman.png'} alt='woman iamge'></Image>
                                        </div>
                                        <div className="">
                                            <Image className='  border-2 border-white rounded-full w-[50px] h-[50px]' width={500} height={500} src={'/search/boy.png'} alt='woman iamge'></Image>
                                        </div>
                                    </div>
                                    <div className=" w-[50%] text-center  text-xl font-semibold">
                                        <h1>No user found</h1>
                                    </div>
                                    <div className=' w-[50%]   text-center'>
                                        <h2> Sorry, We couldn't find any user </h2>
                                    </div>

                                </footer>

                            )

                    }

                </div>
            </div>
            <div className="  xl:hidden     flex  flex-col overflow-y-scroll   scrollbar-hide  items-center  md:opacity-150 bg mt-[5px] min-h-[845px]   w-full  sm:w-[700px]  h-16 rounded-2xl  " >
                <div className="flex shrink  flex-col overflow-y-scroll  scrollbar-hide drop-shadow shadow-md shadow-black rounded-lg  border-e border-black items-center bg-white  w-96 sm:w-[500px] h-[800px]">

                    {

                        (sendr_blocked.length) ? sendr_blocked.map((user: any) => (
                            <div className=' w-80 sm:w-96  h-16  bg-blue-600  drop-shadow-2xl  -m-3 mt-8 rounded-xl border- border-blue-600  flex flex-row '>


                                <div className='bg-white rounded-l-xl border-2   border-blue-600  w-96 h-20  flex flex-row '>
                                    <button  >
                                        <div className='flex justify-start items-center ml-3'>
                                            <img
                                                src={user.receiver.foto_user}
                                                alt="Your"
                                                className="w-[60px]  h-[60px]   border-2 border-white  rounded-3xl"
                                            />
                                        </div>
                                    </button>
                                    <div className='flex justify-start  flex-col  '>
                                        <button  >
                                            <div className='normal-case no-underline font-semibold font-serif  ml-3 flex justify-start justify-items-center items-start  mt-7' >
                                                <p className='text-black text-sm'>
                                                    {user.receiver.username}
                                                </p>
                                            </div>
                                        </button>


                                    </div>




                                </div>
                                <div className=' bg-white  h-20 w-32 rounded-r-xl flex flex-col'>


                                    <button>
                                        <div onClick={() => Unblockedfriend(user.receiver.id)} className=' flex  h-20 justify-center rounded-r-xl hover:scale-110 hover:bg-blue-600 border-2  border-blue-600        duration-300 items-center'>
                                            <div className=' text-sm ml-1'>Unblock</div>
                                        </div>
                                    </button>
                                </div>


                            </div>


                        )) :
                            (
                                <footer className='  w-full  rounded-2xl h-full  -mt-20 flex flex-col justify-center items-center space-y-3'>
                                    <div className="mt-20 bg-green-w500 flex items-end -space-x-2">
                                        <div className="">
                                            <Image className='border-2 border-white rounded-full w-[50px] h-[50px]' width={500} height={500} src={'/search/man.png'} alt='woman iamge' />
                                        </div>
                                        <div className=" z-10">
                                            <Image className=' border-2 border-white rounded-full w-[60px] h-[60px]' priority width={600} height={600} src={'/search/woman.png'} alt='woman iamge'></Image>
                                        </div>
                                        <div className="">
                                            <Image className='  border-2 border-white rounded-full w-[50px] h-[50px]' width={500} height={500} src={'/search/boy.png'} alt='woman iamge'></Image>
                                        </div>
                                    </div>
                                    <div className=" w-[50%] text-center  text-xl font-semibold">
                                        <h1>No user found</h1>
                                    </div>
                                    <div className=' w-[50%]   text-center'>
                                        <h2> Sorry, We couldn't find any user </h2>
                                    </div>

                                </footer>
                            )

                    }

                </div>
            </div>
        </div>


    );
};

export default ListBlocked;


