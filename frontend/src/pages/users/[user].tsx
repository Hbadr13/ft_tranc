// import React from 'react'

// const Index = () => {
//     const currentFileName = path.basename(__filename);
//     console.log(currentFileName);
//     const name = 'asdfjasdf';
//     return (
//         <div>user</div>
//     )
// }


// export default Index

// export default function singlPage({ products1 }: any) {
//     return (
//         <div>
//             {products1}
//         </div>
//     )
// }

// export async function getServerSideProps(context: any) {
//     console.log(context.query.user)
//     try {

//         const req = await fetch(`https://fakestoreapi.com/products/${context.query.user}`)
//         const products1 = await req.json();
//         return {
//             props: { products1 }
//         }
//     }
//     catch (error) {
//         console.log(error)
//     }
// }



import Friends from '@/components/user/Friend';
import Rank from '@/components/user/Rank';
import { fetchAllAmis, fetchCurrentUser } from '@/hooks/userHooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import path from 'path';
import { useEffect, useState } from 'react';

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

const YourComponent = ({ currentFileName }: any) => {

    const [username, setUsername] = useState("");
    const [level, setLevel] = useState("");
    const [Email, setEmail] = useState("");
    const [foto_user, setFoto_user] = useState("");
    const [check, setCheck] = useState(1);
    const [isOpen, setIsOpen] = useState(false)
    const [isfriend, setisfriend] = useState(false)
    const [id, setid] = useState(0)
    const [query, setQuery] = useState('')
    const [received, setreceived] = useState<Array<any>>([]);
    const [sendr, setsendr] = useState<Array<any>>([]);
    const [amis, setAmis] = useState<any>([])
    const router = useRouter()
    const parts = currentFileName.split('.');
    const numberPart: string = parts[1];
    const usernamePart: string = parts[0];
    if(!numberPart)
    {   return (
        <div className='flex  flex-wrap  justify-center min-h-screen  min-w-screen   items-start bg-blue-100 p-6 '>zid userId</div>)

    }
    const toggleDropdown = () => {
        // setisfriend(!isfriend);
        setIsOpen(false);
    };
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/users/one/${usernamePart}/${numberPart}`, {
                    credentials: 'include',
                });
                const counte = await response.json();
                if (response.status == 200) {

                    setUsername(counte.username)
                    setEmail(counte.email)
                    setFoto_user(counte.foto_user)
                    // setrequestt(cont)
                    return;
                }
            }
        )();
    });

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/${id}/received-requests`, {
                    credentials: 'include',
                });
                const counte = await response.json();
                if (response.status == 200) {
                    setreceived(counte)
                    return;
                }
            }
        )();
    }, [id]);
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/${id}/send-requests`, {
                    credentials: 'include',
                });
                const counte = await response.json();
                if (response.status == 200) {
                    setsendr(counte)
                    //   console.log(counte[1]?.receiver);
                    // setrequestt(cont)
                    return;
                }
            }
        )();
    }, [id]);
    const sendRequestForaccpet = async () => {
        try {

            const response = await fetch(`http://localhost:3333/friends/accept-friend-request/${numberPart}/${id}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Friend request sent successfully.');
                setisfriend(!isfriend);
            } else {
                console.error('Failed to send friend request.');
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };
    const sendRequest = async () => {
        try {
            const response = await fetch(`http://localhost:3333/friends/send-request/${numberPart}/${id}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                setIsOpen(!isOpen);

                console.log('Friend request sent successfully.');
            } else {
                console.error('Failed to send friend request.');
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };
    const CanacelRequest = async () => {
        try {
            const response = await fetch(`http://localhost:3333/friends/delete-friend-request/${numberPart}/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });


            if (response.ok) {
                console.log("sssss");
                setIsOpen(false);
                setFlag2(true)

                console.log('delete-friend-request sent successfully.');
            } else {
                console.error('Failed to delete-friend-request.');
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };


    fetchCurrentUser(setid);
    fetchAllAmis({ setAmis, query, id });
    let flag = true
    let flag1 = true
    const [flag2, setFlag2] = useState(true)

    amis.filter((usr: any) => {

        if (usr.id == numberPart)
            flag = false
    })

    if (Array.isArray(received)) {
        received.map((user: any) => {
            // Your mapping logic here
            if (user.sender.id == numberPart) {
                flag1 = false
            }
        });
    } else {
        // Handle the case when 'received' is not an array (e.g., show an error message)
    }

    useEffect(() => {

        if (Array.isArray(sendr)) {
            sendr.map((user: any) => {
                // Your mapping logic here
                if (user.receiver.id == numberPart) {

                    setFlag2(false)
                }
            });
        } else {
            // Handle the case when 'received' is not an array (e.g., show an error message)
        }
    }, [sendr])



    // console.log(flag2)
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
                    <span>Profile {username}</span>
                    <div className="mt-6">
                        <img
                            src={foto_user}
                            alt="Your Image Alt Text"
                            className="w-44 h-auto  rounded-full inline-block" // Adjust the width as needed
                        />
                    </div>
                    <div className='mt-6'>
                        <h1 className="text-xl font-bold">{username}</h1>
                        <span className="text-sm  font-serif italic flex justify-center mt-3">{Email}</span>
                    </div>
                    <div className="mt-8">
                        <LevelBar value={60} />
                        <p className=' mt-4 text-blue-200 font-serif italic uppercase'>level 8-86%</p>
                    </div>
                    <div className='mt-6'>
                        <div className="text-base font-bold flex justify-around items-center text-[#2c4d82]">
                            {

                                (!flag) ?
                                    (
                                        <div className="text-base font-bold flex items-center  space-x-2  text-[#2c4d82]">
                                            <div className=" py-2 px-5 bg-[#dbeafe]  flex  items-center  space-x-1  border rounded-full hover:scale-110 duration-300">
                                                <svg width="20" height="20" fill="black" enable-background="new 0 0 24 24" id="Layer_1" version="1.0" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><polyline clip-rule="evenodd" fill="none" fill-rule="evenodd" points="  23,7.5 17.7,13 14.9,10.2 " stroke="#000000" stroke-miterlimit="10" stroke-width="2" /><circle cx="9" cy="8" r="4" /><path d="M9,14c-6.1,0-8,4-8,4v2h16v-2C17,18,15.1,14,9,14z" /></svg>
                                                <span className='normal-case'>Friends</span>
                                            </div>
                                            <Link href='/game' content='play' className="py-2 px-7 bg-[#dbeafe] border rounded-full hover:scale-110 duration-300" >Message</Link>
                                            <Link href='/game' content='play' className="py-2 px-7 bg-[#dbeafe]  border rounded-full hover:scale-110 duration-300" >play</Link>
                                        </div>
                                    ) :
                                    (!flag1) ?
                                        (
                                            (!isfriend) ?
                                                (
                                                    <div className="text-base font-bold flex items-center  space-x-2  text-[#2c4d82]">
                                                        <div className=" py-2 px-4 bg-[#dbeafe]  flex  items-center  border rounded-full hover:scale-110 duration-300">
                                                            <svg width="20" height="20" fill="black" enable-background="new 0 0 24 24" id="Layer_1" version="1.0" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><polyline clip-rule="evenodd" fill="none" fill-rule="evenodd" points="  23,7.5 17.7,13 14.9,10.2 " stroke="#000000" stroke-miterlimit="10" stroke-width="2" /><circle cx="9" cy="8" r="4" /><path d="M9,14c-6.1,0-8,4-8,4v2h16v-2C17,18,15.1,14,9,14z" /></svg>
                                                            <button className="py-0 px-4 bg-[#dbeafe] border rounded-full " onClick={sendRequestForaccpet} >Confrim</button>
                                                        </div>
                                                        <button className="py-2 px-7 bg-[#dbeafe] border rounded-full  hover:scale-110 duration-300 " onClick={sendRequestForaccpet}>Delete request</button>

                                                    </div>) :
                                                (<div className="text-base font-bold flex items-center  space-x-2  text-[#2c4d82]">
                                                    <div className=" py-2 px-5 bg-[#dbeafe]  flex  items-center  space-x-1  border rounded-full hover:scale-110 duration-300">
                                                        <svg width="20" height="20" fill="black" enable-background="new 0 0 24 24" id="Layer_1" version="1.0" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><polyline clip-rule="evenodd" fill="none" fill-rule="evenodd" points="  23,7.5 17.7,13 14.9,10.2 " stroke="#000000" stroke-miterlimit="10" stroke-width="2" /><circle cx="9" cy="8" r="4" /><path d="M9,14c-6.1,0-8,4-8,4v2h16v-2C17,18,15.1,14,9,14z" /></svg>
                                                        <span className='normal-case'>Friends</span>
                                                    </div>
                                                    <Link href='/game' content='play' className="py-2 px-7 bg-[#dbeafe] border rounded-full hover:scale-110 duration-300" >Message</Link>
                                                    <Link href='/game' content='play' className="py-2 px-7 bg-[#dbeafe]  border rounded-full hover:scale-110 duration-300" >play</Link>
                                                </div>)
                                        ) :

                                        (
                                            (!flag2) ?
                                                (
                                                    (<button className="py-0 px-4 bg-[#dbeafe] border rounded-full " onClick={CanacelRequest} >Canacel requset</button>)

                                                ) :
                                                (
                                                    (!isOpen) ?
                                                        (
                                                            <button className="py-0 px-4 bg-[#dbeafe] border rounded-full " onClick={sendRequest} >Add friend</button>
                                                        ) :
                                                        (<button className="py-0 px-4 bg-[#dbeafe] border rounded-full " onClick={CanacelRequest} >Canacel requset</button>)
                                                )
                                        )

                            }

                        </div>
                        <h1 className="flex  mt-[50px] ">Recent Activities</h1>

                        <img
                            src="https://w0.peakpx.com/wallpaper/616/177/HD-wallpaper-table-tennis-neon-icon-blue-background-neon-symbols-table-tennis-neon-icons-table-tennis-sign-sports-signs-table-tennis-icon-sports-icons.jpg"
                            alt="Your"
                            className="w-80 mt-6 h-60  rounded-[32px] inline-block"
                        />
                        {/* <button className="flex justify-center  items-center mt-6  bg-[#f4f5f8] transition-all active:scale-100 rounded-xl text-[#2c4d82] py-2 px-12 hover:scale-105 ">Login</button> */}
                    </div>
                    <div className="mt-8">
                        <button className="bg-[#dbeafe]   transition-all active:scale-100 rounded-xl text-[#2c4d82] py-2 px-32 hover:scale-105 ">Logout</button>
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




export async function getServerSideProps(context: any) {
    // const currentFileName = path.basename(__filename);
    const currentFileName = context.query.user;

    return {
        props: {
            currentFileName,
        },
    };
}

export default YourComponent;

function setreceived(counte: any) {
    throw new Error('Function not implemented.');
}