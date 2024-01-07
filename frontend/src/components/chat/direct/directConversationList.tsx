import React, { useEffect, useState } from 'react'
import { AppProps, userProps, listConversationDirect } from '@/interface/data';



export default function DirectConversationList({ setReceiver, users, amis, currentUser, Receiver, setStatus_Tow_User, status_tow_user }: { setReceiver: (value: any) => void, users: userProps[], amis: userProps[], currentUser: userProps, Receiver: userProps, setStatus_Tow_User: (value: boolean) => void, status_tow_user: boolean }) {


    const [click, setClick] = useState(false)
    const [liststatus, setliststatus] = useState<number[]>([]);
    const [last_amis, setLastAmis] = useState<Array<userProps>>([])

    // const userData = { id: , createdAt: "", updatedAt: "", email: "", hash: "", username: "", firstName: "", lastName: "", foto_user: "", isOnline: false, userId: 0, flag: false, flag1: false, room: '', won: 0, lost: 0, level: 0 }
    const [currentUser1, setCurrentUser1] = useState<userProps>(currentUser);



    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch('http://localhost:3333/auth/user', {
                        credentials: 'include',
                    });
                    const content = await response.json();
                    setCurrentUser1(content)
                } catch (error) {

                }
            }
        )();
    }, []);


    const [conversationList, setConversationList] = useState<Array<listConversationDirect>>([])
    useEffect(() => {
        (
            async () => {
                try {

                    const response = await fetch(`http://localhost:3333/friends/accepted-friends/${currentUser1.id}`, {
                        credentials: 'include',
                    });
                    const content = await response.json();
                    setLastAmis(content);

                } catch (error) {
                }
            }
        )();
    }, [currentUser1]);
    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch(`http://localhost:3333/chat/getConversationListDirect/${currentUser1.id}/direct`, {
                        credentials: 'include',
                    });
                    if (response.ok) {
                        const content = await response.json();

                        console.log("currentUser1=", currentUser1.id)
                        console.log("conversationList=", content)
                        setConversationList(Array.from(content))
                    }
                } catch (error) {

                }
            }
        )();
    }, [currentUser1, click]);
    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch(`http://localhost:3333/chat/listUserBlockedInChat/${currentUser1.id}`, {
                        credentials: 'include',
                    });
                    if (response.ok) {
                        const content = await response.json();
                        setliststatus((content))
                        // console.log("status_tow_user======", liststatus)
                    }
                } catch (error) {

                }
            }
        )();
    }, [currentUser1, status_tow_user]);
    useEffect(() => {


        // console.log(send)
        let filterstustamis: any = last_amis.filter((user: userProps) => {
            user.flag = true;

            // user.isf = true

            liststatus.filter((usr: any) => {
                if (usr == user.id) {
                    // console.log(user.id, usr)
                    user.flag = false
                }


            })
            return user
        });
        setLastAmis(filterstustamis)

        // console.log("conversationList", conversationList);

    }, [click, liststatus])
    useEffect(() => {


        // console.log(send)



        const filterUser1: Array<listConversationDirect> = conversationList.filter((user: listConversationDirect) => {
            user.flag = false;
            liststatus.filter((usr: any) => {
                if (usr == user.id) {
                    user.flag = true

                }


            })
            return user
        })
        if (filterUser1)
            setConversationList(filterUser1);
        console.log("currentUser1===", currentUser1.id)
        console.log("filterstustamis===", conversationList)

    }, [click, currentUser1, liststatus])


    return (
        <div className=' w-full h-full bgf-black flex justify-center items-center flex-col'>
            {
                !click ? (
                    <button onClick={() => setClick(true)} className=" text-white  bg-blue-400 rounded-[52px] justify-center w-full h-12 items-center  duration-300 hover:scale-105">
                        <div className=" justify-center items-center flex">
                            {/* <h1 className="">Start New Chat</h1> */}
                        </div>
                    </button>
                ) : null
            }

            <div className='overflow-y-scroll scrollbar-hide bfg-blue-500 h-[70vh] w-full'>
                {
                    click ? (

                        <div className=" fbg-sky-300  w-full h-full flex  flex-col items-center justijfy-center shadow-xl drop-shadow-xl   rounded-2xl">
                            {/* <div className=" bfg-slate-600 w-full  mt-2 ml-3 "> */}
                            <button onClick={() => setClick(false)} className="w-full   rounded-full">
                                <img className='w-6 h-6' src='https://cdn-icons-png.flaticon.com/512/66/66847.png'></img>
                            </button>
                            {
                                (last_amis.length != 0) ? last_amis.map((item: userProps) => (
                                    <button onClick={() => setReceiver(item)} className={`h-20 mt-3 w-full md:p-2 ${item.id == Receiver.id ? 'md:bg-blue-300 md:shadow-lg md:shadowf-black ' : 'md:bg-white md:hover:shadow-lg md:hover:bg-sky-100 '}  justify-between items-center inline-flex    md:border border-sky-500   duration-1000  transition shahydow-md rounded-xl`}>
                                        <div className="h-auto  justify-start items-center gap-2.5 flex">
                                            {item.flag && <img className={`w-20 h-20   sm:h-20   sm:w-20  ${item.id == Receiver.id ? ' md:border-0 border-4 border-sky-500  ' : ' md:border-0 border-4 border-white '} shadow-md shadodw-black md:w-16 md:h-16 rounded-full`} src={item.foto_user} />}
                                            {!item.flag && <img className="w-16 h-16 rounded-full" src="https://cdn3.iconfinder.com/data/icons/shape-icons/128/icon48pt_different_account-512.png" />}
                                            <div className="   flex flex-col justify-center items-start space-y-1 ">
                                                <h4 className=" hidden md:flex text-lg md:text-md">{item.username}</h4>
                                            </div>
                                        </div>
                                    </button>
                                )) : null
                            }
                            {/* </div> */}
                        </div>
                    ) : (

                        <div className="  borhder bogjrder-sky-500  flex  flex-col items-center justify-center">
                            {(conversationList.length != 0) ? conversationList.map((item: listConversationDirect) => (
                                <button onClick={() => setReceiver(item)} className={`h-20 mt-3 w-full md:p-2 ${item.id == Receiver.id ? 'md:bg-blue-300 md:shadow-lg md:shadowf-black ' : 'md:bg-white md:hover:shadow-lg md:hover:bg-sky-100 '}  justify-between items-center inline-flex    md:border border-sky-500   duration-1000  transition shahydow-md rounded-xl`}>
                                    <div className="h-auto  w-full bg-blsack justify-center space-x-2 md:justify-start items-center gasp-2.5 flex">
                                        {/* {item.flag && <img className="w-16 h-16 rounded-full" src={item.foto_user} />} */}
                                        {/* {!item.flag && <img className="w-16 h-16 rounded-full" src="https://cdn3.iconfinder.com/data/icons/shape-icons/128/icon48pt_different_account-512.png" />} */}
                                        {!item.flag && <img className={`w-20 h-20   sm:h-20   sm:w-20  ${item.id == Receiver.id ? ' md:border-0 border-4 border-sky-500  ' : ' md:border-0 border-4 border-white '} shadow-md shadodw-black md:w-16 md:h-16 rounded-full`} src={item.foto_user} />}
                                        {item.flag && <img className="w-16 h-16 rounded-full" src="https://cdn3.iconfinder.com/data/icons/shape-icons/128/icon48pt_different_account-512.png" />}
                                        <div className="   flex flex-col justify-center items-start space-y-1 ">
                                            <h4 className="  hidden md:flex text-lg md:text-md">{item.username}</h4>
                                            <p className=" md:flex  hidden   self-stretch h text-neutral-600 text-sm ">Good point. Typ...</p>
                                        </div>
                                    </div>
                                    {/* <div className="flex flex-col self-stretch justify-center space-y-2">
                                        <div className="">15h</div>
                                        <div className=" text-CusColor_light bg-sky-500  rounded-[100px]">2</div>
                                    </div> */}
                                </button>
                            )) : null
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}