import { channelProps, participantsProps, userProps } from '@/interface/data'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function EditChannel({ setMyStatusInRoom, currentUser, Room }: { setMyStatusInRoom: (value: participantsProps) => void, currentUser: userProps, Room: channelProps }) {
    const [click, setClick] = useState(0)
    const [type, setType] = useState(Room.type)
    const [password, setPassword] = useState(Room.password);
    const [participants, setParticipants] = useState<participantsProps[]>([])
    const [participant, setParticipant] = useState<participantsProps>()
    const [userStatusRoom, setUserStatusRoom] = useState<participantsProps>()


    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch(`http://localhost:3333/chat/allUsersChannel/${Room.id}`, {
                        credentials: 'include',
                    })
                    const content = await response.json();
                    setParticipants(Array.from(content))
                    console.log(content)
                    // setClick(0);
                } catch (error) {

                }
            }
        )();
    }, [Room, click]);


    useEffect(() => {
        setClick(0);

    }, [Room]);

    useEffect(() => {
        setType(Room.type);
        setPassword(Room.password);
        if (Room && participants) {
            participants?.map((item: participantsProps) => {
                if (item.id == currentUser.id) {
                    setUserStatusRoom(item)
                    setMyStatusInRoom(item)
                }
            })
            console.log('wana bagha nghawt', userStatusRoom)
        }
    }, [Room, click, participants]);

    const handlParticipants = async (item: string) => {
        try {
            await fetch(`http://localhost:3333/chat/setAdmin/${Room.id}/${participant?.id}/${item}`, {
                method: 'POST',
                // credentials: 'include',
            })
        } catch (error) {

        }
        setClick(0)
    }

    const handl1 = (item: any) => {
        setClick(2)
        setParticipant(item)
    }
    const upadategroup = async () => {

        try {
            const response = await fetch(`http://localhost:3333/chat/upadteChannel/${currentUser.id}/${Room.id}/${type}/${password}`, {
                credentials: 'include',
            })
            const content = await response.json();
        } catch (error) {

        }
    };


    return (
        <div className='flex  flex-col  w-[20%] h-[820px] border  items-center  mt-12 border-sky-500 rounded-[30px]  '>

            <div className={`  bg-gray-100 dark:bg-CusColor_dark  ${click != 0 ? 'blur-sm' : null}   w-full h-full  rounded-[30px] p-3   flex justify-start items-start `}>


                <div className="w-full h-full bg-blsack flex-col justify-center items-center">
                    <div className="flex-col justify-start items-center flex ">
                        <img className="w-28 h-28 rounded-full " src={'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_640.png'} />
                        <div className="text-zinc-900 text-[32px] font-bold font-['Satoshi']">{Room.name}</div>
                    </div>
                    <div className="flex flex-col">
                        {participants.map((item) => (
                            (item.isAdmin) ? (
                                <div className=" bg-white   space-x-3 h-14 w-full items-center inline-flex border rounded-lg space-y-2">
                                    <div className=" w-full  h-full justify-start items-center gap-2.5 flex">
                                        <img className="w-10 h-10  rounded-full" src={item.foto_user} />
                                        <div className="   flex  h-full  flex-row space-x-2 w-full bg-bldue-600 rounded-lg justify-cente items-center space-y-1 ">
                                            <h4 className=" text-lg">{item.username}</h4>
                                            {
                                                item.isOwner && <div className=' flex  justify-end items-endf w-full'>
                                                    <img className='w-7 h-7' src="https://th.bing.com/th/id/R.d3577ea04a87de8a17a0c4da1599f14f?rik=tyHhffAFBiEkuQ&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_325791.png&ehk=JLU5qFTRDFwXx3RCfbNOak3HCyy3uDphKbj2yWjqR1k%3d&risl=&pid=ImgRaw&r=0" alt="" />
                                                    {
                                                        item.id == currentUser.id && <button onClick={() => setClick(1)} className='flex justify-end items-end w-full '> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24">
                                                            <path d="M 12.0625 0 C 9.773438 0 9.8125 0.21875 9.8125 0.21875 C 9.539063 1.539063 9.253906 2.433594 9.0625 2.96875 C 7.898438 3.351563 6.824219 3.949219 5.90625 4.71875 C 5.351563 4.609375 4.457031 4.40625 3.21875 3.96875 C 3.21875 3.96875 3.050781 3.824219 1.875 5.8125 C 0.695313 7.800781 0.875 7.90625 0.875 7.90625 C 1.789063 8.765625 2.386719 9.425781 2.75 9.875 C 2.59375 10.558594 2.5 11.269531 2.5 12 C 2.5 12.664063 2.558594 13.3125 2.6875 13.9375 C 2.316406 14.378906 1.707031 15.042969 0.78125 15.875 C 0.78125 15.875 0.613281 15.957031 1.75 17.96875 C 2.886719 19.980469 3.03125 19.84375 3.03125 19.84375 C 4.28125 19.429688 5.191406 19.253906 5.75 19.15625 C 6.664063 19.960938 7.730469 20.5625 8.90625 20.96875 C 9.101563 21.496094 9.40625 22.414063 9.6875 23.78125 C 9.6875 23.78125 9.652344 24 11.9375 24 C 14.222656 24 14.21875 23.78125 14.21875 23.78125 C 14.492188 22.464844 14.742188 21.566406 14.9375 21.03125 C 16.101563 20.648438 17.175781 20.050781 18.09375 19.28125 C 18.648438 19.390625 19.542969 19.59375 20.78125 20.03125 C 20.78125 20.03125 20.945313 20.175781 22.125 18.1875 C 23.300781 16.199219 23.125 16.09375 23.125 16.09375 C 22.210938 15.234375 21.613281 14.574219 21.25 14.125 C 21.40625 13.4375 21.5 12.730469 21.5 12 C 21.5 11.335938 21.441406 10.6875 21.3125 10.0625 C 21.683594 9.621094 22.292969 8.957031 23.21875 8.125 C 23.21875 8.125 23.386719 8.042969 22.25 6.03125 C 21.113281 4.019531 20.96875 4.15625 20.96875 4.15625 C 19.71875 4.570313 18.808594 4.746094 18.25 4.84375 C 17.335938 4.042969 16.269531 3.4375 15.09375 3.03125 C 14.902344 2.503906 14.59375 1.585938 14.3125 0.21875 C 14.3125 0.21875 14.347656 0 12.0625 0 Z M 12 4 C 16.417969 4 20 7.582031 20 12 C 20 16.417969 16.417969 20 12 20 C 7.582031 20 4 16.417969 4 12 C 4 7.582031 7.582031 4 12 4 Z M 12 5 C 8.132813 5 5 8.132813 5 12 C 5 15.867188 8.132813 19 12 19 C 15.867188 19 19 15.867188 19 12 C 19 8.132813 15.867188 5 12 5 Z M 12 8 C 14.210938 8 16 9.789063 16 12 C 16 14.210938 14.210938 16 12 16 C 9.789063 16 8 14.210938 8 12 C 8 9.789063 9.789063 8 12 8 Z"></path>
                                                        </svg></button>
                                                    }
                                                </div>
                                            }
                                            {
                                                item.isAdmin && !item.isOwner && <h4 className=" text-lg">Admin</h4>
                                            }

                                        </div>
                                    </div>
                                    {userStatusRoom?.isOwner && !item.isOwner && <div className='flex justify-end items-end w-full h-8'>
                                        <button onClick={() => handl1(item)} className='w-6 h-6 rounded-full'>
                                            <img src='https://cdn2.iconfinder.com/data/icons/clean-minimal-set/16/open-menu-01-512.png' />
                                        </button>
                                    </div>}
                                </div>
                            ) : (
                                <div className="flex bg-fblue-400 mt-2">
                                    <div className="h-auto  justify-start items-center gap-2.5 flex">
                                        <img className="w-8 h-8 rounded-full" src={item.foto_user} />
                                        <div className="   flex flex-col justify-center items-start space-y-1 ">
                                            <h4 className=" text-lg">{item.username}</h4>
                                        </div>
                                    </div>
                                    {(userStatusRoom?.isOwner || userStatusRoom?.isAdmin) && <div className='flex justify-end items-end w-full h-8'>
                                        <button onClick={() => handl1(item)} className='w-6 h-6 rounded-full'>
                                            <img src='https://cdn2.iconfinder.com/data/icons/clean-minimal-set/16/open-menu-01-512.png' />
                                        </button>
                                    </div>}
                                </div>
                            )
                        ))}
                    </div>
                </div>

            </div>
            {
                click != 0 && <div className=' bg-white  dark:bg-gray-700 h-auto w-[87%]  flex-col  rounded-lg flex justify-start items-start  shadow-md sdhadow -mt-[630px] z-30'>
                    <div className=' w-full mr-2 h-10 flex justify-end items-center'>
                        <button onClick={() => setClick(0)}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 30 30">
                                <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                            </svg>

                        </button>
                    </div>
                    {
                        click == 1 && <>

                            <div className=' w-full mr-2 mte-1 h-10 flex justify-end items-center'>


                            </div>
                            <div className=' w-full h-full flex justify-center bg-bwlack'>

                                {
                                    Room.type == "public" && <div className=' flex flex-col bg-whiwte fledx justify-center items-center'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose Type group</label>
                                        <select onChange={(e) => setType(e.target.value)} id="small" className="block  w-28 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            {/* <option selected>Choose Type group</option> */}
                                            <option value="public">Public</option>
                                            <option value="protected">Protected</option>
                                        </select>
                                        {/* <div> */}

                                        {
                                            type == 'protected' &&
                                            <div className='-mt-6'>

                                                <div className="mbw-6 flex flex-row w-full h-16 justify-center items-center space-x-2">
                                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                    <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                                                </div>
                                                {/* <div className="mb-6 flex flex-row w-full h-16 justify-center items-center space-x-">
                                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                            <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                                        </div> */}
                                            </div>
                                            // <label className='mt-2 '>
                                            //     Password:
                                            //     <input required type="password" className=' bg-blue-500' value={password} onChange={(e) => setPassword(e.target.value)} />
                                            // </label>
                                        }
                                        <div className=' w-full mt-2 flex justify-center '>

                                            <button type="submit" onClick={() => upadategroup()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-30  px-5 py-2.5 text-center dark:bg-blue-600 justify-center items-center flex dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                        </div>
                                        {/* </div> */}

                                    </div>

                                }
                                {
                                    Room.type == "protected" && <div className=' flex flex-col bg-whiwte fledx justify-center items-center'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose Type group</label>
                                        <select onChange={(e) => setType(e.target.value)} id="small" className="block  w-28 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            {/* <option selected>Choose Type group</option> */}
                                            <option value="protected">Protected</option>
                                            <option value="public">Public</option>
                                        </select>
                                        {/* <div> */}

                                        {
                                            Room.type == 'protected' && type != "public" &&
                                            <div className='-mt-6'>

                                                <div className="mbw-6 flex flex-row w-full h-16 justify-center items-center space-x-2">
                                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                                                </div>
                                                {/* <div className="mb-6 flex flex-row w-full h-16 justify-center items-center space-x-">
                                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                            <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                                        </div> */}
                                            </div>
                                        }
                                        <div className=' w-full mt-2 flex justify-center '>

                                            <button type="submit" onClick={() => upadategroup()} className="text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-30  px-5 py-2.5 text-center dark:bg-blue-600 justify-center items-center flex dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                        </div>
                                        {/* </div> */}


                                    </div>

                                }
                            </div>
                        </>
                    }

                    {
                        click == 2 && <div className='w-full flex flex-col bg-fslate-400'>
                            <h1 className='-mt-8  flex justify-center text-CusColor_primary w-[90%]'>{participant?.username}</h1>
                            {userStatusRoom?.isOwner && <button className='border p-2' onClick={() => handlParticipants('admin')}>set this user is admin</button>}
                            <button className='border p-2' onClick={() => handlParticipants('kick')}>kick this user</button>
                            {userStatusRoom?.isOwner && <button className='border p-2' onClick={() => handlParticipants('inAdmin')}>inAdmin this user</button>}
                            <button className='border p-2' onClick={() => handlParticipants('mute')}>mute this user</button>
                            <button className='border p-2' onClick={() => handlParticipants('no mute')}>no mute this user</button>
                        </div>
                    }

                </div>

            }
        </div>
    )
}



