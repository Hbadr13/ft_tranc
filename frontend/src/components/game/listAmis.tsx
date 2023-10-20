import { AppProps, userProps } from '@/interface/data'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';

interface ExtendedAppProps extends AppProps {
    setOpponent: (opponent: string) => void;
}

const ListAmis = ({ onlineUsersss, currentUser, users, amis, socket, setOpponent }: ExtendedAppProps) => {
    const router = useRouter()
    const [flag, setflag] = useState(false)

    const handelChallenge = (e: any) => {
        const uid: string = uuid();
        socket?.emit("areYouReady", {
            OpponentId: e.target.value, currentPlayer: currentUser, pathOfGame: `/game?online=true&rome=${currentUser.id}.${e.target.value}.${uid}`
        })
        socket.emitWithAck('sendMessage', 'Hello, server!', (ack: string) => {
            console.log('Server acknowledged:', ack);
        });

        // console.log("value: ", e.target.value)
        // console.log(currentUser.id)
        // console.log(e.target.value)
        setflag(true)
        setOpponent(e.target.value)
        // router.push(`/game?online=true&rome=${currentUser.id}.${e.target.value}.${uid}`);
    }
    useEffect(() => {
        socket.emit("UserInGame", "data-----")
        socket.on("UserInGame", (data: any) => {
            console.log("data-----", data)
            // console.log("data-----", data)
        })
    })
    return (
        <>
            <div className='  w-full mt-20  flex flex-col space-y-3 justify-center items-center  '>
                <div className='rounded-2xl space-y-4 w-full md:w-[50%] bg-white flex flex-col justify-center items-center '>
                    <div className='border-b-2 w-full flex items-center justify-center p-2'>
                        <h1 className='text-black ' >Friends</h1>
                    </div>
                    {
                        (amis.length) ? amis.map((user: userProps) => (
                            <div key={user.id} className=' bg-white rounded-2xl items-center  space-x-3 p-2 flex  w-full md:w-[100%] shadow-md'>
                                <div className=' w-[20%] flex flex-col py-2 items-center justify-center space-y-4 border-[1px] border-slate-200 border-spacing-9 rounded-3xl'>
                                    <Image
                                        width={2000}
                                        height={2000}
                                        src={user.foto_user}
                                        alt={`image of: ${user.username}`}
                                        className="w-20   rounded-full border-4 border-balck inline-block" // Adjust the width as needed
                                    />
                                    <div className='bg-green-200 rounded-xl bg-blackd w-[80%] h-10  flex items-center justify-center'>
                                        <h1>
                                            Grade
                                        </h1>
                                    </div>
                                </div>
                                <div className='bg-rded-400 w-[80%] rounded-lg h-[100%] space-y-4'>
                                    <div className="">
                                        {user.username}
                                    </div>
                                    <div className="w-[100%] h-10  rounded-xl bg-[#D3E3FC] flex  items-center">
                                        <div className="w-[70%] h-10  rounded-xl bg-[#77A6F7]">
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <button value={`${user.id}`} onClick={handelChallenge} className='bg-[#77A6F7]    rounded-xl px-4 py-2'>Challenge</button>
                                        <button className='bg-white border-black border-2 rounded-xl px-4 py-2'>Historique</button>
                                    </div>
                                </div>
                            </div>
                        )) : null
                    }
                </div>
            </div>
        </>
    )
}

export default ListAmis
