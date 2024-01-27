'use client'
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from 'react';
import Friends from "./Friend";
import Rank from "./Rank";
import { fetchAllAmis, fetchCurrentUser } from "@/hooks/userHooks";
import { useRouter } from "next/navigation";
import { AppProps, userProps } from "@/interface/data";
import { Constant } from "@/constants/constant";



interface LevelBarpros {
    value: String
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

const EditProfile = ({ currentUser }: { currentUser: userProps }) => {
    const [amis, setAmis] = useState<any>([])
    const [query, sequery] = useState("")

    const [isOpen, setIsOpen] = useState(false)
    const falq1 = "https://i.pinimg.com/564x/dc/51/61/dc5161dd5e36744d184e0b98e97d31ba.jpg";
    const flaq2 = "https://i.pinimg.com/564x/30/c7/1b/30c71b3c02f31c2f3747c9b7404d6880.jpg";

    const [check, setCheck] = useState(0);
    const [check1, setCheck1] = useState(0);
    const [check2, setCheck2] = useState(0);
    const [level, setlevel] = useState();
    const [level1, setlevel1] = useState("");
    const [level2, setlevel2] = useState("");
    const [id, setid] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState('');
    const [foto_user, setFoto_user] = useState("");
    const [username, setUsername] = useState("");
    const [update_email, setupdate_email] = useState("");
    const [update_gender, setupdate_gender] = useState("");
    const [update_name, setupdate_name] = useState("");
    const [update_foto_user, setupdate_foto_user] = useState("");
    const router = useRouter()
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            // console.log('size: ', selectedFile)
            const reader = new FileReader();

            reader.onload = (event) => {
                // Read the file and store it in the state
                const base64Image = event.target?.result;

                if (typeof base64Image === 'string') {
                    setupdate_foto_user(base64Image);
                } else {
                    // Handle the case when base64Image is not a string, e.g., set a default value
                    setupdate_foto_user(''); // You can set any default value here
                }

                // Create an image element for resizing and display
                const img = new Image();

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Set the desired dimensions (h and w)
                    const newWidth = 800;
                    const newHeight = 700;

                    canvas.width = newWidth;
                    canvas.height = newHeight;

                    ctx?.drawImage(img, 0, 0, newWidth, newHeight);
                    const resizedImageURL = canvas.toDataURL('image/jpeg');

                    // Display the resized image
                    const imageContainer = document.getElementById('image-container') as HTMLImageElement;
                    if (imageContainer) {
                        imageContainer.src = resizedImageURL;
                    }
                    // setupdate_foto_user(resizedImageURL);
                    // console.log(resizedImageURL)
                };

                img.src = base64Image as string;
            };

            reader.readAsDataURL(selectedFile);
        }
    };


    const handleSubmit = async (e: any) => {
        // console.log(update_gender);

        try {
            const res = await fetch(`${Constant.API_URL}/users/update_info`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": update_email,
                    "username": update_name,
                    "foto_user": update_gender
                }),
            });

            if (res.status == 200) {
                // console.log("_sdsdsdsdf")
                const form = e.target;
                router.push('/profile');
            } else {

                router.push('/profile');

            }

        } catch (error) {
            router.push('/profile');

        }
    };

    useEffect(() => {
        (
            async () => {
                try {
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
                } catch (error) {

                }
            }
        )();
    });
    useEffect(() => {
        (
            async () => {
                // console.log(update_foto_user);
                if (update_foto_user)
                    setupdate_gender(update_foto_user)
                else if (!update_foto_user && (foto_user == falq1 || foto_user == flaq2) && update_gender)
                    setupdate_gender(update_gender)
                else
                    setupdate_gender(foto_user)
                if (!update_email)
                    setupdate_email(email);
                if (!update_name)
                    setupdate_name(username);
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
        else if (check2 == 1) {
            setCheck2(0);
            setCheck1(0);
        }

    };
    fetchAllAmis({ setAmis, currentUser });
    return (

        <div className='flex  flex-wrap  justify-center  min-h-screen  w-full items-center  ps-6 '>
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
                        <p className=' mt-4 text-white shadow-sm shadow-black  mfl-28  w-28 font-serif italic uppercase'>level {level2}-{level1}%</p>

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
                            <Link className=" mt-6   w-80   rounded-xl  h-12  flex justify-center  items-center bg-blue-600  hover:scale-110 drop-shadow shadow-md shadow-black  duration-300 text-white text-sm border border-white font-bold" href={"/EditProfile"}> <span className=" flex flex-row  " >Profile Settings</span></Link>

                            <Link className="text-base w-80  h-12 font-bold flex justify-center items-center text-blue-600" href={"/Listblocked"}><span className=" flex justify-center items-center  mt-10    w-full h-full  border-white  rounded-xl bg-white  drop-shadow shadow-md shadow-black border  hover:scale-110 duration-300">Blocked</span>
                            </Link>

                            <Link className="text-base font-bold w-80 mt-5  h-12  flex justify-center items-center text-blue-600" href={"/Code_QR"}><span className="  mt-10 bg-white flex justify-center items-center w-full h-full     border-white rounded-xl border drop-shadow shadow-md shadow-black hover:scale-110 duration-300">Code_OR</span>
                            </Link>

                        </div>
                    </div>
                    <div className="mt-10 w-full ">
                        {/* <button className="bg-white   w-80  h-12  transition-all shadow-sm shadow-black active:scale-100 rounded-xl border text-blue-600  hover:bg:white hover:texts-white hover:scale-105 duration-300 "></button> */}
                    </div>
                </div>
            </div>
            <div className="z-10 hidden md:flex">

                <div className=" flex flex-col gap-8     h-full w-64 items-center   drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-[#f9fafb]  mt-[80px] min-h-[845px] rounded-r-[0px] rounded-[0px]">
                    <p className="  text-[25px]  font-bold mt-44  mr-28">Settings</p>

                    <Link className=" mt-5   py-2  w-[257px] h-10  flex justify-center  bg-[#3b82f6] hover:scale-110   duration-300 text-white text-base border border-blue-600 font-bold" href={"/EditProfile"}> <span className="">Profile Settings</span></Link>





                    <Link className="text-base font-bold flex justify-center items-center  text-blue-600" href={"/Listblocked"}><span className=" py-2 px-[96px] mt-10 bg-white border   hover:scale-110 duration-300">Blocked</span>
                    </Link>

                    <Link className="text-base font-bold flex justify-center items-center  text-blue-600" href={"/Code_QR"}><span className=" py-2 px-[92px] mt-10 bg-white border   hover:scale-110 duration-300">Code_OR</span>
                    </Link>



                </div>

            </div>
            <div className=" hidden  md:flex  sm:flex-col justify-center items-center md:opacity-150 bg mt-[80px] min-h-[845px]  bg-blue-50  w-[700px] h-16 rounded-2xl rounded-s-[1px] p-6" >
                <div className="h-10   flex  bg-blue-600 drop-shadow shadow-lg  rounded-lg  w-auto">
                    <span className=" py-2 px-[102px] font-bold flex  text-sm text-white">Edit Your Personal Setting</span>
                </div>
                <div>
                </div>

                <div className=" flex flex-row  mt-28  space-x-5   ">
                    <div className="  flex justify-center items-center font-bold text-sm  drop-shadow shadow-lg bg-blue-600  h-8 w-44  rounded-lg    text-white">Choose photo</div>
                    <form>

                        <input onChange={handleFileChange}

                            className=" p-2   bg-white rounded-lg  -mt-2   drop-shadow shadow-lg  dark:text-gray-900  dark:white  mb-4  h-12 flex justify-center items-center  w-96 borser border-black
                                file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                             file:bg-blue-600 file:h-8 file:text-white 
                                             hover:file:bg-violet-100"
                            type="File" accept="/image/*" name="File" placeholder="Name" />
                    </form>

                </div>
                <div className="flex flex-row space-x-5 mt-8    ">

                    <div className=" flex justify-center items-center font-bold text-sm   drop-shadow shadow-lg bg-blue-600  h-8 w-44  rounded-lg    text-white">Full Name</div>
                    <input onChange={(e) => setupdate_name(e.target.value)} className="p-2  rounded-lg  drop-shadow shadow-lg -mt-2 text-black  rouncursor-pointer bg-white dark:text-black focus:outline-none dark:bg-white dark:border-black h-12 w-96" type="text" name="text" placeholder="Name" />
                </div>
                <div className="flex flex-row mt-12  space-x-5   ">


                    <div className="  flex justify-center items-center font-bold text-sm   drop-shadow shadow-lg bg-blue-600  h-8 w-44  rounded-lg    text-white ">Email</div>
                    <input onChange={(e) => setupdate_email(e.target.value)} className="p-2  rounded-lg  drop-shadow shadow-lg -mt-2 text-black  rouncursor-pointer bg-white dark:text-black focus:outline-none dark:bg-white dark:border-black h-12 w-96" type="Email" name="Email" placeholder="Email" />
                </div>

                <div className="flex flex-row  mt-12  text-sm  space-x-5  ">
                    <div className="flex justify-center items-center font-bold text-sm   drop-shadow shadow-lg bg-blue-600  h-8 w-44  rounded-lg    text-white ">Gender</div>
                    <label>
                        <select required value={gender} onChange={(e) => setupdate_gender(e.target.value)} className="p-2  rounded-lg  drop-shadow shadow-lg -mt-2 text-black  rouncursor-pointer bg-white dark:text-black focus:outline-none dark:bg-white dark:border-black h-12 w-96" >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                </div>

                <button className="bg-blue-600  mt-16    drop-shadow shadow-lg    w-80 rounded-lg text-white py-2 hover:scale-105 hover:bg-blue-600 duration-500 " onClick={handleSubmit}>Save Changes</button>




            </div>
            <div className="md:hidden flex-none    flex flex-col justify-center items-center md:opacity-150  min-h-[845px] w-full  ml-5 sm:min-w-[200px] bg-blue-50 sm:w-[500px] h-16 rounded-2xl  p-6" >
                <div className="h-10   flex  bg-blue-600 drop-shadow shadow-lg  mt-20 rounded-lg  w-auto">
                    <span className=" py-2 px-[102px] font-bold flex  text-sm text-white ">Edit Your Personal Setting</span>
                </div>
                <div>
                </div>

                <div className=" flex flex-col   mt-16  space-y-10   ">
                    <div className="   font-bold text-sm  drop-shadow shadow-lg bg-blue-600  h-10 mt-1 rounded-lg    flex justify-center items-center  text-white">Choose photo</div>
                    <form>

                        <input onChange={handleFileChange}

                            className=" p-2   bg-white rounded-lg  -mt-4   drop-shadow shadow-lg  dark:text-gray-900  dark:white  mb-4  h-12 flex justify-center items-center  w-96 borser border-black
                                file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                             file:bg-blue-600 file:h-8 file:text-white 
                                             hover:file:bg-violet-100"
                            type="File" accept="/image/*" name="File" placeholder="Name" />
                    </form>

                </div>
                <div className="flex flex-col space-y-5 mt-6   ">

                    <div className="  flex drop-shadow shadow-lg  bg-blue-600 h-10 font-bold text-sm  rounded-lg  justify-center items-center text-white">Full Name</div>
                    <input onChange={(e) => setupdate_name(e.target.value)} className="p-2  rounded-lg  -mt-2 text-black borsder  border-black drop-shadow shadow-lg  rouncursor-pointer bg-white dark:text-black focus:outline-none dark:bg-white dark:border-black h-12 w-96" type="text" name="text" placeholder="Name" />
                </div>
                <div className="flex flex-col mt-10  space-y-5   ">


                    <div className="  flex drop-shadow shadow-lg  bg-blue-600   h-10 font-bold text-sm  rounded-lg  justify-center items-center text-white">Email</div>
                    <input onChange={(e) => setupdate_email(e.target.value)} className="p-2  rounded-lg   text-black borsder  border-black drop-shadow shadow-lg  rouncursor-pointer bg-white dark:text-black focus:outline-none dark:bg-white dark:border-black h-12 w-96" type="Email" name="Email" placeholder="Email" />
                </div>

                <div className="flex flex-col  mt-10  text-sm  space-y-5  ">
                    <div className="   flex drop-shadow shadow-lg  bg-blue-600 h-10 font-bold text-sm  rounded-lg  justify-center items-center text-white">Gender</div>
                    <label>
                        <select required value={gender} onChange={(e) => setupdate_gender(e.target.value)} className="p-2  rounded-lg   text-black borsder  border-black drop-shadow shadow-lg  rouncursor-pointer bg-white dark:text-black focus:outline-none dark:bg-white dark:border-black h-12 w-96" >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                </div>

                <button className="bg-blue-700  mt-10     w-72 rounded-lg drop-shadow shadow-lg  text-white py-2 hover:scale-105 " onClick={handleSubmit}>Save Changes</button>




            </div>
        </div>



    );
};

export default EditProfile;
