import React, { useEffect, useState } from 'react'
import { AppProps, userProps } from '@/interface/data';



export default function DirectConversationList({ setReceiver, users, amis, currentUser }: { setReceiver: (value: userProps) => void, users: userProps[], amis: userProps[], currentUser: userProps }) {


    const [click, setClick] = useState(false)

    interface listConversationDirect {
        updateAt: string,
        id: string,
        username: string,
        foto_user: string,
    }


    const [conversationList, setConversationList] = useState<Array<listConversationDirect>>([])

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch(`http://localhost:3333/chat/getConversationListDirect/${currentUser.id}/direct`, {
                        credentials: 'include',
                    });
                    if (response.ok) {
                        const content = await response.json();
                        setConversationList(Array.from(content))
                    }
                } catch (error) {

                }
            }
        )();
    }, [currentUser, conversationList]);


    return (
        <div className=' w-full h-full bgf-black flex justify-center items-center flex-col'>
            {
                !click ? (
                    <button onClick={() => setClick(true)} className=" text-white  bg-blue-400 rounded-[52px] justify-center w-96 h-12 items-center  duration-300 hover:scale-105">
                        <div className=" justify-center items-center flex">
                            <h1 className="">Start New Chat</h1>
                        </div>
                    </button>
                ) : null
            }

            <div className='overflow-y-scroll scrollbar-hide bfg-blue-500 h-[640PX] w-full'>
                {
                    click ? (

                        <div className=" fbg-sky-300 w-full h-full flex  flex-col items-center justijfy-center shadow-xl drop-shadow-xl   rounded-2xl">
                            {/* <div className=" bfg-slate-600 w-full  mt-2 ml-3 "> */}
                            <button onClick={() => setClick(false)} className="w-full   rounded-full">
                                <img className='w-6 h-6' src='https://cdn-icons-png.flaticon.com/512/66/66847.png'></img>
                            </button>
                            {
                                amis.length !== 0 && amis.map((item: userProps) => (
                                    <button onClick={() => setReceiver(item)} className="h-20 mt-6 w-96 p-2 bg-white justify-between items-center inline-flex  hover:shadow-lg   border border-sky-500  hover:bg-sky-100 duration-1000  transition shahydow-md rounded-[20px] ">
                                        <div className="h-auto  justify-start items-center gap-2.5 flex">
                                            <img className="w-16 h-16 rounded-full" src={item.foto_user} />
                                            <div className="   flex flex-col justify-center items-start space-y-1 ">
                                                <h4 className=" text-lg">{item.username}</h4>
                                            </div>
                                        </div>
                                    </button>
                                ))
                            }
                            {/* </div> */}
                        </div>
                    ) : (

                        <div className="  borhder bogjrder-sky-500  flex  flex-col items-center justify-center">
                            {conversationList.map((item: any) => (
                                <button onClick={() => setReceiver(item)} className="h-20 mt-6 w-96 p-2 bg-white  dark:bg-black justify-between items-center inline-flex  hover:shadow-lg   border border-sky-500  hover:bg-sky-100 duration-1000  transition shahydow-md rounded-[20px] ">
                                    <div className="h-auto  justify-start items-center gap-2.5 flex">
                                        <img className="w-16 h-16 rounded-full" src={item.foto_user} />
                                        <div className="   flex flex-col justify-center items-start space-y-1 ">
                                            <h4 className=" text-lg dark:text-CusColor_light">{item.username}</h4>
                                            <p className="self-stretch h dark:text-blue-200 text-neutral-600 text-sm ">Good point. Typography is another ?</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col self-stretch justify-center space-y-2">
                                        <div className=" dark:text-cyan-50">15h</div>
                                        <div className=" text-CusColor_light bg-sky-500  rounded-[100px]">{item.id}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}
