import { channelProps, participantsProps, userProps } from '@/interface/data'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function EditChannel({ Room }: { Room: channelProps }) {
    const [click, setClick] = useState(true)
    const [participants, setParticipants] = useState<participantsProps[]>([])


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
                } catch (error) {

                }
            }
        )();
    }, [Room]);


    return (
        <div className="  bg-gray-100 dark:bg-CusColor_dark   p-6 mt-12  w-[20%] h-[820px]     flex justify-start items-start rounded-[30px] border  border-sky-500">
            <div className="w-full bg-blafck flex-col justify-center items-center">
                <div className="flex-col justify-start items-center flex ">
                    <img className="w-28 h-28 rounded-full " src={'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_640.png'} />
                    <div className="text-zinc-900 text-[32px] font-bold font-['Satoshi']">{Room.name}</div>
                    {/* <h4>{participants}</h4> */}
                </div>
                <div className="flex flex-col">
                    {participants.map((item) => (
                        (item.isAdmin) ? (
                            <div className=" bg-wfhite  items-center inline-flex border rounded-sm space-y-2">
                                <div className="h-auto  justify-start items-center gap-2.5 flex">
                                    <img className="w-8 h-8 rounded-full" src={item.foto_user} />
                                    <div className="   flex flex-col justify-center items-start space-y-1 ">
                                        <h4 className=" text-lg">{item.username}(admin)</h4>
                                    
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex bg-fblue-400 mt-2">
                                <div className="h-auto  justify-start items-center gap-2.5 flex">
                                    <img className="w-8 h-8 rounded-full" src={item.foto_user} />
                                    <div className="   flex flex-col justify-center items-start space-y-1 ">
                                        <h4 className=" text-lg">{item.username}</h4>
                                    </div>
                                </div>
                                <div className='flex justify-end items-end w-full h-8'>
                                    <button className='w-6 h-6 rounded-full'>
                                        <img src='https://cdn2.iconfinder.com/data/icons/clean-minimal-set/16/open-menu-01-512.png' />
                                    </button>
                                </div>
                            </div>
                        )
                        
                    ))}
                </div>
            </div>
        </div>
    )
}
