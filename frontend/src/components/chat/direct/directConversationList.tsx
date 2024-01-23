import React, { useEffect, useState } from 'react'
import { AppProps, userProps, listConversationDirect } from '@/interface/data';
import { Constant } from '@/constants/constant';
import { useRouter } from 'next/router';

export default function DirectConversationList({ msg2, setReceiver, users, amis, currentUser, Receiver, setStatus_Tow_User, status_tow_user }: { msg2: string, setReceiver: (value: any) => void, users: userProps[], amis: userProps[], currentUser: userProps, Receiver: userProps, setStatus_Tow_User: (value: boolean) => void, status_tow_user: boolean }) {

    const [click, setClick] = useState(false)
    const [liststatus, setliststatus] = useState<number[]>([]);
    const [last_amis, setLastAmis] = useState<Array<userProps>>([])

    
    // const userData = { id: , createdAt: "", updatedAt: "", email: "", hash: "", username: "", firstName: "", lastName: "", foto_user: "", isOnline: false, userId: 0, flag: false, flag1: false, room: '', won: 0, lost: 0, level: 0 }
    const [currentUser1, setCurrentUser1] = useState<userProps>(currentUser);
    const [khadmi, setKhadmi] = useState<userProps>()
    const [conversationList, setConversationList] = useState<Array<listConversationDirect>>([])
    
    const router = useRouter()
    useEffect(() => {
        users.map((item) => {
            if (Number(router.query.user) == item.id)
                setKhadmi(item)
        })
        // console.log('->>>>>>>>>>>>>', router.query.user)
    }, [router])

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch(`${Constant.API_URL}/auth/user`, {
                        credentials: 'include',
                    });
                    const content = await response.json();
                    setCurrentUser1(content)
                } catch (error) {

                }
            }
        )();
    }, []);

    useEffect(() => {
        (
            async () => {
                try {

                    const response = await fetch(`${Constant.API_URL}/friends/accepted-friends/${currentUser1.id}`, {
                        credentials: 'include',
                    });
                    const content = await response.json();
                    if (response.ok)
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
                    const response = await fetch(`${Constant.API_URL}/chat/getConversationListDirect/${currentUser1.id}/direct`, {
                        credentials: 'include',
                    });
                    if (response.ok) {
                        const content = await response.json();

                        // console.log("currentUser1=", currentUser1.id)
                        // console.log("conversationList=", content)
                        setConversationList(Array.from(content))
                    }
                } catch (error) {

                }
            }
        )();
    }, [currentUser1, click, msg2, khadmi]);
    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch(`${Constant.API_URL}/chat/listUserBlockedInChat/${currentUser1.id}`, {
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
        // console.log("currentUser1===", currentUser1.id)
        // console.log("filterstustamis===", conversationList)

    }, [click, currentUser1, liststatus])



    return (
        <div className=' w-full h-full bgf-black flex justify-center items-center flex-col'>
            {
                !click ? (
                    <button onClick={() => setClick(true)} className=" text-white  bg-blue-400 rounded-[52px] justify-center w-full h-12 items-center  duration-300 hover:scale-105">
                        <div className=" justify-center items-center flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M8.46002 8.28978C8.27172 8.09617 8.01422 7.98529 7.74416 7.98154C7.47411 7.97779 7.21363 8.08147 7.02002 8.26978C6.82641 8.45808 6.71554 8.71558 6.71179 8.98564C6.70804 9.25569 6.81172 9.51617 7.00002 9.70978L9.34002 11.9998L7.00002 14.2898C6.90629 14.3827 6.8319 14.4933 6.78113 14.6152C6.73036 14.7371 6.70422 14.8678 6.70422 14.9998C6.70422 15.1318 6.73036 15.2625 6.78113 15.3844C6.8319 15.5062 6.90629 15.6168 7.00002 15.7098C7.09298 15.8035 7.20359 15.8779 7.32545 15.9287C7.4473 15.9794 7.57801 16.0056 7.71002 16.0056C7.84203 16.0056 7.97274 15.9794 8.0946 15.9287C8.21646 15.8779 8.32706 15.8035 8.42002 15.7098L11.42 12.7098C11.5138 12.6168 11.5881 12.5062 11.6389 12.3844C11.6897 12.2625 11.7158 12.1318 11.7158 11.9998C11.7158 11.8678 11.6897 11.7371 11.6389 11.6152C11.5881 11.4933 11.5138 11.3827 11.42 11.2898L8.46002 8.28978ZM16.96 11.2898L13.96 8.28978C13.7717 8.10147 13.5163 7.99569 13.25 7.99569C12.9837 7.99569 12.7283 8.10147 12.54 8.28978C12.3517 8.47808 12.2459 8.73348 12.2459 8.99978C12.2459 9.26608 12.3517 9.52147 12.54 9.70978L14.84 11.9998L12.54 14.2898C12.4463 14.3827 12.3719 14.4933 12.3211 14.6152C12.2704 14.7371 12.2442 14.8678 12.2442 14.9998C12.2442 15.1318 12.2704 15.2625 12.3211 15.3844C12.3719 15.5062 12.4463 15.6168 12.54 15.7098C12.633 15.8035 12.7436 15.8779 12.8654 15.9287C12.9873 15.9794 13.118 16.0056 13.25 16.0056C13.382 16.0056 13.5127 15.9794 13.6346 15.9287C13.7565 15.8779 13.8671 15.8035 13.96 15.7098L16.96 12.7098C17.0564 12.6195 17.134 12.511 17.1882 12.3906C17.2424 12.2701 17.2723 12.1401 17.276 12.0081C17.2797 11.8761 17.2572 11.7446 17.2099 11.6213C17.1625 11.498 17.0912 11.3854 17 11.2898H16.96Z" fill="white" />
                            </svg>
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
                                (last_amis.length != 0) ? last_amis?.map((item: userProps, index) => (
                                    <button key={index} onClick={() => { setReceiver(item); router.replace(`/chat?user=${item.id}`) }} className={`h-20 mt-3 w-full md:p-2 ${item.id == khadmi?.id ? 'md:bg-blue-300 md:shadow-lg md:shadowf-black ' : 'md:bg-white md:hover:shadow-lg md:hover:bg-sky-100 '}  justify-between items-center inline-flex    ${khadmi?.id ? 'md:border' : 'border'}  border-sky-500   duration-1000  transition shahydow-md rounded-xl`}>
                                        <div className="h-auto  justify-start items-center gap-2.5 flex">
                                            {item.flag && <img className={`w-20 h-20   sm:h-20   sm:w-20  ${item.id == khadmi?.id ? ' md:border-0 border-4 border-sky-500  ' : ' md:border-0 border-4 border-white '} shadow-md shadodw-black md:w-16 md:h-16 rounded-full`} src={item.foto_user} />}
                                            {!item.flag && <img className="w-16 h-16 rounded-full" src="https://cdn3.iconfinder.com/data/icons/shape-icons/128/icon48pt_different_account-512.png" />}
                                            <div className="   flex flex-col justify-center items-start space-y-1 ">
                                                <h4 className={` ${khadmi?.id ? 'hidden' : null}   md:flex text-lg md:text-md`} >{item.username}</h4>
                                            </div>
                                        </div>
                                    </button>
                                )) : null
                            }
                            {/* </div> */}
                        </div>
                    ) : (

                        <div className="  flex  flex-col items-center justify-center">
                            {(conversationList.length != 0) ? conversationList.map((item: listConversationDirect, index) => (
                                <button key={index} onClick={() => { setReceiver(item); router.replace(`/chat?user=${item.id}`) }} className={`h-20 mt-3 w-full md:p-2 ${item.id == khadmi?.id ? 'md:bg-blue-300 md:shadow-lg md:shadowf-black ' : 'md:bg-white md:hover:shadow-lg md:hover:bg-sky-100 '}  justify-between items-center inline-flex   ${khadmi?.id ? 'md:border' : 'border'}   border-sky-500   duration-1000  transition shahydow-md rounded-xl`}>
                                    <div className={`h-auto  w-full bg-blsack ${khadmi?.id ? 'justify-center' : null}  space-x-2 md:justify-start items-center gasp-2.5 flex`}>
                                        {/* {item.flag && <img className="w-16 h-16 rounded-full" src={item.foto_user} />} */}
                                        {/* {!item.flag && <img className="w-16 h-16 rounded-full" src="https://cdn3.iconfinder.com/data/icons/shape-icons/128/icon48pt_different_account-512.png" />} */}
                                        {!item.flag && <img className={`w-16 h-16 ${Receiver.id ? `${item.id == khadmi?.id ? ' md:border-0 border-4 border-sky-500  ' : ' md:border-0 border-4 border-white '}` : null}   shadow-md shadodw-black md:w-16 md:h-16 rounded-full`} src={item.foto_user} />}
                                        {item.flag && <img className="w-16 h-16 rounded-full" src="https://cdn3.iconfinder.com/data/icons/shape-icons/128/icon48pt_different_account-512.png" />}
                                        <div className="   flex flex-col justify-center items-start space-y-1 ">
                                            <h4 className={` ${khadmi?.id ? 'hidden' : null}   md:flex text-lg md:text-md`} >{item.username}</h4>
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