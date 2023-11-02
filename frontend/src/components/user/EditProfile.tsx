'use client'
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Friends from "./Friend";
import Rank from "./Rank";
import { fetchAllAmis, fetchCurrentUser } from "@/hooks/userHooks";
import { useRouter } from "next/navigation";
import { AppProps, userProps } from "@/interface/data";



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

const EditProfile = ({ currentUser }: { currentUser: userProps }) => {
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
                    const newWidth = 200;
                    const newHeight = 200;

                    canvas.width = newWidth;
                    canvas.height = newHeight;

                    ctx?.drawImage(img, 0, 0, newWidth, newHeight);
                    const resizedImageURL = canvas.toDataURL('image/jpeg');

                    // Display the resized image
                    const imageContainer = document.getElementById('image-container') as HTMLImageElement;
                    if (imageContainer) {
                        imageContainer.src = resizedImageURL;
                    }
                    setupdate_foto_user(resizedImageURL);
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
            const res = await fetch(`http://localhost:3333/users/update_info/${id}`, {
                method: 'POST',
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
                console.log("_sdsdsdsdf")
                const form = e.target;
             ;
                router.push('/Profile');
            } else {
                
                router.push('/Profile');
                
            }
            
        } catch (error) {
            router.push('/Profile');
          
            console.log("kin wahd error hna: ", error);
        }
    };

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
            }
        )();
    });
    useEffect(() => {
        (
            async () => {
                console.log(update_foto_user);
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
    fetchAllAmis({ setAmis, query, currentUser });
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
                        {foto_user && (
                            <img
                                src={foto_user}
                                alt="Your Image Alt Text"
                                className="w-44 h-auto rounded-full inline-block"
                            />
                        )}
                    </div>
                    <div className='mt-6'>
                        <h1 className="text-xl font-bold">{(username)}</h1>
                        <span className="text-sm  font-serif italic flex justify-center mt-3">{email}</span>
                    </div>
                    <div className="mt-8">
                        <LevelBar value={60} />
                        <p className=' mt-4 text-blue-200 font-serif italic uppercase'>level 8-86%</p>
                    </div>
                    <div className='mt-6'>
                        <Link className="text-base font-bold flex justify-center items-center text-[#2c4d82]" href={"/Profile"}><span className="underline py-2 px-12 bg-white border rounded-full hover:scale-110 duration-300">Profile</span>
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

                <div className=" flex flex-col gap-8    h-full w-64 items-center   drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] bg-[#f9fafb]  mt-[150px] min-h-[845px] rounded-r-[80px] rounded-[0px]">
                    <p className="  text-[25px]  font-bold mt-44  mr-28">Settings</p>

                    <Link className=" mt-5   py-2  w-[257px] h-10  flex justify-center  bg-[#3b82f6] hover:scale-110   duration-300 text-white text-base font-bold" href={"/EditProfile"}> <span className="">Profile Settings</span></Link>





                    <Link className="text-base font-bold flex justify-center items-center text-[#2c4d82]" href={"/Profile"}><span className="underline py-2 px-[102px] mt-10 bg-white border  hover:scale-110 duration-300">Profile</span>
                    </Link>




                </div>

            </div>
            <div className=" flex  flex-col md:opacity-150 bg mt-[160px] min-h-[845px]  bg-blue-50  w-[700px] h-16 rounded-r-[50px] rounded-s-[80px] p-6" >
                <div className="h-10   flex  -ml-16 mt-32 w-auto">
                    <span className=" py-2 px-[102px] font-bold flex  text-blue-500 ">Edit Your Personal Setting</span>
                </div>
                <div>
                </div>

                <div className="inline-block mt-8   ml-20 ">
                    <div className="  inline-block font-bold mr-1 ">Choose photo</div>
                    <form>

                    <input onChange={handleFileChange} className="p-2 block  -mt-6 mb-5 text-xs text-gray-900 border border-gray-900 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  ml-[120px]  w-72" type="File" accept="/image/*" name="File" placeholder="Name" />
                    </form>
                    <img id="image-container" src={update_foto_user} alt="Resized Image" />
                </div>
                <div className="inline-block mt-4   ml-20 ">

                    <div className="  inline-block font-bold mr-10">Full Name</div>
                    <input onChange={(e) => setupdate_name(e.target.value)} className="p-2  rounded-xl  text-gray-900 border border-gray-900 rouncursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 w-72" type="text" name="text" placeholder="Name" />
                </div>
                <div className="inline-block mt-8   ml-20 ">


                    <div className="  inline-block font-bold mr-[74px]">Email</div>
                    <input onChange={(e) => setupdate_email(e.target.value)} className="p-2  rounded-xl text-gray-900 border border-gray-900 rouncursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 w-72" type="Email" name="Email" placeholder="Email" />
                </div>

                <div className="inline-block mt-6   ml-20 ">
                    <label>
                        <div className="  inline-block font-bold mr-[58px]">gender</div>
                        <select required value={gender} onChange={(e) => setupdate_gender(e.target.value)} className="p-2 mt-5 rounded-xl  text-gray-900 border border-gray-900 rouncursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600w-72" >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                </div>
                {/* <div className="4"> */}

                <button className="bg-[#002D74]  mt-24   ml-44 w-44 rounded-xl text-white py-2 hover:scale-105 " onClick={handleSubmit}>Save Changes</button>

                {/* </div> */}


            </div>
        </div>
        //       <div class="grid grid-rows-3 grid-flow-col gap-4">
        //   <div class="row-start-6  row-span-2  bg-black ...">01</div>
        //   <div class="row-end-6 row-span-2 ...">02</div>
        //   <div class="row-start-1 row-end-4 ...">03</div>
        // </div>


    );
};

export default EditProfile;