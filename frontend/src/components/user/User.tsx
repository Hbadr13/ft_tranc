import { userProps } from '@/interface/data';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { any, number, set } from 'zod';
function Mutaulfriends({ user, amis }: { user: userProps, amis: Array<userProps> }) {

    let flag1 = 0;
    const [amis_id, setAmisid] = useState<Array<userProps>>([])

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/accepted-friends/${user.id}`, {
                    credentials: 'include',
                });
                const content = await response.json();

                setAmisid(Array.from(content));

            }
        )();
    }, [user]);
    let filterUser: any = amis_id.filter((user: userProps) => {

        // user.isf = true
        amis.filter((usr: userProps) => {
            if (usr.id == user.id) {
                flag1++;
            }


        })
    })

    return (

        <p className=" indent-0  text-sm text-[#b2b4bc]">{flag1} matual friends
        </p>
    );

}

const User = ({ currentUser, users, amis }: { currentUser: userProps, users: Array<userProps>, amis: Array<userProps> }) => {

    const [allfriends, setallfriends] = useState<any>([])
    const [friend_reciver, setfriend_reciver] = useState<Array<any>>([]);
    const [friend_request, setFriend_request] = useState<Array<any>>([]);
    const [isOpen, setIsOpen] = useState(0)
    let _add: Array<any>
    let flag = true;


    const router = useRouter();

    const profailamis = (username: string, userId: number) => {
        // Implement the functionality for profailamis
        // For example, you can navigate to a new page or perform an action here
        router.push(`/users/${username}.${userId}`);
    };


    const sendRequest = async (numberPart: number) => {
        try {
            const response = await fetch(`http://localhost:3333/friends/send-request/${numberPart}/${currentUser.id}`, {
                method: 'POST',
                credentials: 'include',
            });


            if (response.ok) {
                setIsOpen(1);


                console.log('Friend request sent successfully.');
            } else {
                console.error('Failed to send friend request.');
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    const CanacelRequest = async (numberPart: number) => {
        try {
            const response = await fetch(`http://localhost:3333/friends/delete-friend-request/${numberPart}/${currentUser.id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                setIsOpen(1);

                console.log('delete-friend-request sent successfully.');
            } else {
                console.error('Failed to delete-friend-request.');
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };
    const CanacelRequest1 = async (numberPart: number) => {
        try {
            const response = await fetch(`http://localhost:3333/friends/delete-friend-request/${currentUser.id}/${numberPart}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                setIsOpen(1);

                console.log('delete-friend-request sent successfully.');
            } else {
                console.error('Failed to delete-friend-request.');
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };


    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/${currentUser.id}/received-requests`, {
                    credentials: 'include',
                });
                const counte = await response.json();
                if (response.status == 200) {
                    setfriend_reciver(counte)
                    return;
                }
            }
        )();
    }, [amis, currentUser.id, isOpen]);
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/${currentUser.id}/send-requests`, {
                    credentials: 'include',
                });
                const counte = await response.json();
                if (response.status == 200) {
                    setFriend_request(counte)
                    //   console.log(counte[1]?.receiver);
                    // setrequestt(cont)
                    return;
                }
            }
        )();
    }, [amis, currentUser.id, , isOpen]);
    // useEffect(() => {

    useEffect(() => {
        let freid = 0;
        let filterUser: any = users.filter((user: userProps) => {
            user.flag = true;
            user.flag1 = true;
            amis.filter((usr: userProps) => {

                if (usr.id == user.id) {
                    user.flag = false;


                }

            })
            // useEffect(() => {
            if (Array.isArray(friend_reciver)) {

                friend_reciver.map((use: any) => {
                    if (use.sender.id == user.id) {

                        user.flag = false;

                    }


                });
            } else {

            }
            if (Array.isArray(friend_request)) {
                friend_request.map((use: any) => {
                    if (use.receiver.id == user.id) {
                        user.flag = false;
                    }

                });
            } else {
            }


            return user
        })

        setallfriends(filterUser);
        console.log("aaaaaaa")
        setIsOpen(0)

    }, [amis, currentUser.id, isOpen, friend_reciver, friend_request])

    // console.log("friend_reciver", setfriend_add)

    return (
        <div className='flex justify-center  items-center justify-items-center    h-auto w-auto  flex-col bg-[#f6f6f9]'>

            <div className='flex flex-auto    justify-center flex-col items-center  mt-3 rounded-xl shadow-2xl justify-items-center bg-[#e6e8ec] bg-clip-border p-6 border-4 border-[#c6c0ba] border-solid'>


                <div className=' lg:ml-3 hidden  sm:grid  md:grid
         lg-grid lg:grid-cols-5   lg:space-x-0 lg:space-y-0    lg:gap-x-4 lg:gap-y-4    sm:grid-cols-3  sm:space-x-0  sm:space-y-0    sm:gap-x-4 sm:gap-y-4  md:space-x-0 md:space-y-0    md:gap-x-4 md:gap-y-4    md:grid-cols-4  md:flex-row justify-center  mt-10 '>

                    {


                        (friend_reciver.length) ? friend_reciver.map((user: any) => (
                            <div className='flex    rounded-xl items-start  '>

                                {/* <LevelBar user={user} amis={amis} id={currentUser.id} flag={1} /> */}
                                <div className=' bg-[#f3f4f6] border-4 border-[#dee1e9] w-48 h-[300px] shadow-2xl  rounded-xl  flex  flex-col  '>
                                    <button onClick={() => profailamis(user.sender.username, user.sender.id)}>

                                        <div className='flex justify-center mt-3'>
                                            <img
                                                src={user.sender.foto_user}
                                                alt="Your"
                                                className="w-36  h-36   rounded-[20px] "
                                            />
                                        </div>
                                    </button>

                                    <div className=" indent-0  mt-3 bg-b flex justify-center  items-center flex-col text-back">
                                        {/* <button onClick={() => profailamis(user.sender.username, user.sender.id)} className='normal-case no-underline font-semibold font-serif' >{user.sender.username}</button> */}
                                        <button onClick={() => profailamis(user.sender.username, user.sender.id)} className='normal-case    flex justify-start items-start no-underline   font-semibold font-serif' >
                                            <p className='text-black text-sm'>
                                                {user.sender.username}
                                            </p>
                                        </button>
                                        <Mutaulfriends user={user.sender} amis={amis} />
                                        <div className='flex  justify-center flex-col mt-1 rounded-md bg-xwhite'>

                                            <button>
                                                <div onClick={() => sendRequest(user.sender.id)} className=' flex justify-center items-center  text-sm font-bol bg-blue-400  rounded-md w-36 h-8 hover:bg-slate-100 hover:scale-110 duration-300'>
                                                    <svg fill="#000000" width="20" height="20" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" /></svg>
                                                    <div className=' text-black ml-1'>Confirm</div>
                                                </div>
                                            </button>
                                            <button>

                                                <div onClick={() => CanacelRequest1(user.sender.id)} className=' flex justify-center items-center mt-1 text-sm font-bol bg-[#d6d3d1]  rounded-md w-36 h-8 hover:bg-slate-100 hover:scale-110 duration-300'>
                                                    {/* <svg fill="#000000" width="20" height="20" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" /></svg> */}
                                                    <div className=' text-[#f87171]  ml-1 text-base'>Delete</div>
                                                </div>
                                            </button>
                                        </div>

                                    </div>

                                </div>

                            </div>



                        )) : null
                    }
                </div>
                <div className='  sm:hidden md:hidden flex  justify-center justify-items-center  flex-col  lg:hidden    mt-64 '>

                    {
                        (friend_reciver.length) ? friend_reciver.map((user: any) => (



                            <div className='  w-[300 px]  h-24   shadow-xl   rounded-xl border-[1px] border-[#dee1e9]  mt-4 flex flex-row '>

                                <div className='bg-[#f3f4f6] rounded-l-xl border-r-[2px] w-72 h-24  flex flex-row'>
                                    <button onClick={() => profailamis(user.sender.username, user.sender.id)} >
                                        <div className='flex justify-start items-center  ml-3'>
                                            <img
                                                src={user.sender.foto_user}
                                                alt="Your"
                                                className="w-[80px]  h-[80px]   rounded-[40px]"
                                            />
                                        </div>
                                    </button>
                                    <div className='flex justify-start  flex-col   '>
                                        <button onClick={() => profailamis(user.sender.username, user.sender.id)} >
                                            <div className='normal-case no-underline  flex items-center font-semibold font-serif  ml-3  mt-7' >
                                            <p className='text-black text-sm'>
                                                {user.sender.username}
                                            </p>
                                            
                                            </div>
                                        </button>
                                        <div className='ml-3'>

                                            <Mutaulfriends user={user.sender} amis={amis} />
                                        </div>

                                    </div>

                                </div>

                                <div className=' bg-[#f3f4f6]  h-24 w-32 rounded-r-xl flex flex-col'>
                                    <button>
                                        <div onClick={() => sendRequest(user.sender.id)} className='h-12  hover:bg-white  flex justify-center items-center rounded-r-xl hover:scale-110 duration-300'>
                                            <svg fill="#0284c7" width="20" height="20" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" /></svg>
                                            <div className=' text-[#0369a1]  text-sm ml-1'>Confirm</div>

                                        </div>
                                    </button>
                                    <div className="border-b-2 border-[#dee1e9]..."></div>
                                    <button>
                                        <div onClick={() => CanacelRequest1(user.sender.id)} className='text-[#f87171]  flex  h-10 justify-center rounded-r-xl hover:scale-110 hover:bg-white duration-300 items-center'>
                                            Delete
                                        </div>
                                    </button>
                                </div>


                            </div>

                        )) : null

                    }
                </div>
                <div className=' hidden  sm:grid  md:grid
         lg-grid lg:grid-cols-5   lg:space-x-0 lg:space-y-0    lg:gap-x-4 lg:gap-y-4    sm:grid-cols-3  sm:space-x-0  sm:space-y-0    sm:gap-x-4 sm:gap-y-4  md:space-x-0 md:space-y-0    md:gap-x-4 md:gap-y-4    md:grid-cols-4  md:flex-row justify-center  mt-20 '>

                    {


                        (friend_request.length) ? friend_request.map((user: any) => (
                            <div className='flex    rounded-xl items-start  '>

                                {/* <LevelBar user={user} amis={amis} id={currentUser.id} flag={1} /> */}
                                <div className=' bg-[#f3f4f6] border-4 border-[#dee1e9] w-48 h-[300px] shadow-2xl  rounded-xl  flex  flex-col   '>
                                    <button onClick={() => profailamis(user.receiver.username, user.receiver.id)}>

                                        <div className='flex justify-center mt-3'>
                                            <img
                                                src={user.receiver.foto_user}
                                                alt="Your"
                                                className="w-36  h-36   rounded-[20px] "
                                            />
                                        </div>
                                    </button>

                                    <div className=" indent-0  mt-4 bg-b flex justify-center  items-center flex-col text-back  ">
                                        <button onClick={() => profailamis(user.receiver.username, user.receiver.id)} className='normal-case    flex justify-start items-start no-underline   font-semibold font-serif' >
                                            <p className='text-black text-sm'>
                                                {user.receiver.username}
                                            </p>
                                        </button>
                                        {/* <button onClick={() => profailamis(user.receiver.username, user.receiver.id)} className='normal-case no-underline font-semibold font-serif' >{user.receiver.username}</button> */}
                                        <Mutaulfriends user={user.receiver} amis={amis} />
                                        <div className='flex  justify-center flex-col mt-5 rounded-md bg-xwhite'>


                                            <button>

                                                <div onClick={() => CanacelRequest(user.receiver.id)} className=' flex justify-center items-center mt- text-sm font-bol bg-[#d6d3d1]  rounded-md w-36 h-8 hover:bg-slate-100 hover:scale-110 duration-300'>
                                                    {/* <svg fill="#000000" width="20" height="20" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" /></svg> */}
                                                    <div className=' text-[#f87171] ml-1 text-base'>Cancel request</div>
                                                </div>
                                            </button>
                                        </div>

                                    </div>

                                </div>

                            </div>



                        )) : null
                    }
                </div>
                <div className='  sm:hidden md:hidden flex  justify-center justify-items-center flex-col  lg:hidden    mt-20 '>

                    {
                        (friend_request.length) ? friend_request.map((user: any) => (



                            <div className=' w-[300 px]  h-24   shadow-xl   rounded-xl border-[1px] border-[#dee1e9]  mt-4 flex flex-row '>


                                <div className='bg-[#f3f4f6] rounded-l-xl border-r-[2px] w-72 h-24  flex flex-row '>
                                    <button onClick={() => profailamis(user.receiver.username, user.receiver.id)} >
                                        <div className='flex justify-start items-center ml-3'>
                                            <img
                                                src={user.receiver.foto_user}
                                                alt="Your"
                                                className="w-[80px]  h-[80px]   rounded-[40px]"
                                            />
                                        </div>
                                    </button>
                                    <div className='flex justify-start  flex-col  '>
                                        <button onClick={() => profailamis(user.receiver.username, user.receiver.id)} >
                                            <div className='normal-case no-underline font-semibold font-serif  ml-3 flex justify-start justify-items-center items-start  mt-7' >
                                            <p className='text-black text-sm'>
                                                        {user.receiver.username}
                                                    </p>
                                                </div>
                                        </button>
                                        <div className='ml-3'>

                                            <Mutaulfriends user={user.receiver} amis={amis} />
                                        </div>

                                    </div>

                                    {/* </div> */}


                                </div>
                                <div className=' bg-[#f3f4f6]  h-24 w-32 rounded-r-xl flex flex-col'>

                                    <div className="border-b-2 border-[#dee1e9]..."></div>
                                    <button>
                                        <div onClick={() => CanacelRequest(user.receiver.id)} className='text-[#f87171] flex  h-24 justify-center rounded-r-xl hover:scale-110 hover:bg-white duration-300 items-center'>
                                            Cancel request
                                        </div>
                                    </button>
                                </div>


                            </div>

                        )) : null

                    }
                </div>
                <div className=' hidden  sm:grid  md:grid
         lg-grid lg:grid-cols-5   lg:space-x-0 lg:space-y-0    lg:gap-x-4 lg:gap-y-4    sm:grid-cols-3  sm:space-x-0  sm:space-y-0    sm:gap-x-4 sm:gap-y-4  md:space-x-0 md:space-y-0    md:gap-x-4 md:gap-y-4    md:grid-cols-4  md:flex-row justify-center  mt-20'>

                    {
                        (allfriends.length) ? allfriends.map((user: userProps) => (

                            (user.flag) ?
                                (
                                    <div className='flex    rounded-xl items-start  '>

                                        {/* <LevelBar user={user} amis={amis} id={currentUser.id} flag={1} /> */}
                                        <div className=' bg-[#f3f4f6] border-4 border-[#dee1e9] w-48 h-[300px] shadow-2xl  rounded-xl  flex  flex-col  '>
                                            <div className='flex justify-center mt-3'>
                                                <img
                                                    src={user.foto_user}
                                                    alt="Your"
                                                    className="w-36  h-36   rounded-[20px] "
                                                />
                                            </div>

                                            <div className=" indent-0  mt-3 bg-b  flex  justify-center items-center flex-col text-back">
                                                <button className='normal-case    flex justify-start items-start no-underline   font-semibold font-serif' >
                                                    <p className='text-black text-sm'>
                                                        {user.username}
                                                    </p>
                                                </button>

                                                <Mutaulfriends user={user} amis={amis} />
                                                <div className='flex  justify-center flex-col mt-1 rounded-md bg-xwhite'>

                                                    <button>
                                                        <div onClick={() => sendRequest(user.id)} className=' flex justify-center items-center  text-sm font-bol bg-blue-400  rounded-md w-36 h-8 hover:bg-slate-100 hover:scale-110 duration-300'>
                                                            <svg fill="#000000" width="20" height="20" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" /></svg>
                                                            <div className=' text-black ml-1'>add friend</div>
                                                        </div>
                                                    </button>
                                                    <button>

                                                        <div onClick={() => profailamis(user.username, user.id)} className=' flex justify-center items-center mt-1 text-sm font-bol bg-blue-400  rounded-md w-36 h-8 hover:bg-slate-100 hover:scale-110 duration-300'>
                                                            {/* <svg fill="#000000" width="20" height="20" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" /></svg> */}
                                                            <div className=' text-black ml-1 text-base'>Profail</div>
                                                        </div>
                                                    </button>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                ) : null

                        )) : null

                    }

                </div>
                <div className='  sm:hidden md:hidden   flex justify-center justify-items-center flex-col items-center  lg:hidden    mt-64 '>

                    {
                        (allfriends.length) ? allfriends.map((user: userProps) => (

                            (user.flag) ?
                                (

                                    <div className='       w-[400px]  h-24   shadow-xl   rounded-xl border-[1px] border-[#dee1e9]  mt-4 flex flex-row '>
                                        <div className='bg-[#f3f4f6] rounded-l-xl border-r-[2px] w-72 h-24  flex flex-row'>
                                            <div className='flex justify-start items-center m-4'>
                                                <img
                                                    src={user.foto_user}
                                                    alt="Your"
                                                    className="w-[80px]  h-[80px]   rounded-[40px]"
                                                />
                                            </div>
                                            <div className='flex justify-start  items-start justify-items-start flex-col   '>
                                                <div className='normal-case no-underline font-semibold font-serif  mt-7' >
                                                    <p className='text-black text-sm'>
                                                        {user.username}
                                                    </p>
                                                </div>
                                                <div>

                                                    <Mutaulfriends user={user} amis={amis} />
                                                </div>

                                            </div>

                                        </div>
                                        <div className=' bg-[#f3f4f6]  h-24 w-32 rounded-r-xl flex flex-col'>
                                            <button>
                                                <div onClick={() => sendRequest(user.id)} className='h-12  hover:bg-white  flex justify-center items-center rounded-r-xl hover:scale-110 duration-300'>
                                                    <svg fill="#0284c7" width="20" height="20" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" /></svg>
                                                    <div className=' text-[#0369a1]  text-sm ml-1'>add friend</div>

                                                </div>
                                            </button>
                                            <div className="border-b-2 border-[#dee1e9]..."></div>
                                            <button>
                                                <div onClick={() => profailamis(user.username, user.id)} className='text-[#0369a1] flex  h-10 justify-center rounded-r-xl hover:scale-110 hover:bg-white duration-300 items-center'>
                                                    Profile
                                                </div>
                                            </button>
                                        </div>


                                    </div>
                                ) : null
                        )) : null

                    }
                </div>
            </div>
        </div>
    )
}
export default User;


function strjoin(separator: any, strings: any[]) {
    return strings.join(separator);
}

