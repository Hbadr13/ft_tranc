import React, { useEffect, useState } from 'react'
import { userProps, messageProps, channelProps, participantsProps, userData } from '@/interface/data'
import { Socket } from 'socket.io-client';
import Link from 'next/link';
import { Constant } from '@/constants/constant';
import { useRouter } from 'next/router';
import Edit from './direct/edit';
import EditChannel from './channels/editChannel';
interface LevelBarpros {
    value: string
}
function LevelBar({ value }: LevelBarpros) {

    const progressWidth = `${value}0%`;

    return (
        <div className="bg-white h-7 mt-2  drop-shadow shadow-md shadow-black    w-full  rounded-lg" >
            <div className=' w-full  flex justify-center items-center'>
                7-68%
            </div>
            <div className="bg-[#0ea5e9]  -mt-6 h-full w-full rounded-lg  flex  justify-center items-center " style={{ width: progressWidth }}>
                {/* <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
              {`${value}%`} */}
                {/* </span> */}
            </div>
        </div >
    );
}



export default function Conversation({ myStatusInRoom, currentUser, setMsg2, users, chatSocket, button, Room, setStatus_Tow_User, status_tow_user }: { myStatusInRoom: participantsProps, currentUser: userProps, setMsg2: (value: string) => void, users: userProps[], chatSocket: Socket, button: boolean, Room: channelProps, setStatus_Tow_User: (value: boolean) => void, status_tow_user: boolean }) {
    const [messages, setMessages] = useState<messageProps[]>([]);
    const [content, setContent] = useState('');
    const [isend, setIsend] = useState(false);
    const [flag, setfalg] = useState(false);
    const [msg, setMsg] = useState('')
    const [receiver, setReceiver] = useState<userProps>(userData)
    let router = useRouter()

    useEffect(() => {

        let id = Number(router.query.user)
        users.map((item) => {
            if (id == item.id)
                setReceiver(item)
        })
    }, [router])

    const [status, setstatus] = useState<any>('');
    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch(`${Constant.API_URL}/chat/statusChatTwoUser/${receiver.id}`, {
                        credentials: 'include',
                    });
                    const content = await response.json();
                    setstatus(content)

                } catch (error) {

                }
            }
        )();
        setContent('')
        setMsg2(msg);
    }, [receiver, isend, msg, status_tow_user]);

    if (!button) {

        useEffect(() => {
            if (receiver.id) {

                (
                    async () => {
                        try {
                            const response = await fetch(`${Constant.API_URL}/chat/getConversationDirect/${receiver.id}`, {
                                credentials: 'include',
                            });
                            const content = await response.json();
                            setMessages(Array.from(content))
                        } catch (error) {

                        }
                    }
                )();
            }
            setContent('')
        }, [receiver, isend, msg, receiver]);
    }
    else {
        useEffect(() => {
            (
                async () => {
                    try {
                        const response = await fetch(`${Constant.API_URL}/chat/allMessagesChannel/${Room.id}`, {
                            credentials: 'include',
                        });
                        const content = await response.json();
                        setMessages(Array.from(content))
                        // console.log("content :", content)
                    } catch (error) {

                    }
                }
            )();
            setContent('')
            router.replace('/chat')
            setReceiver(userData)
        }, [Room, button, isend, msg]);
    }

    useEffect(() => {
        console.log('->>>>>>>>>>>>>>>>>', myStatusInRoom);
    }, [myStatusInRoom])

    useEffect(() => {
        chatSocket?.on('message', (message) => {
            if (message) {
                setMsg(message);
                if (button) {
                    fetch(`${Constant.API_URL}/chat/directMessage/${receiver.id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "content": message,
                        }),
                        credentials: 'include',
                    });
                }
                else {
                    console.log('=>?????????????', Room.id);
                    fetch(`${Constant.API_URL}/chat/sendMessageToChannel/${Room.id}`, {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "content": content,
                        }),
                        credentials: 'include',
                    });
                }
            }
        });
    }, [chatSocket])

    const handleClick = async () => {
        if (content) {
            if (!button) {
                await fetch(`${Constant.API_URL}/chat/directMessage/${receiver.id}`, {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "content": content,
                    }),
                    credentials: 'include',
                });
                chatSocket.emit('message', { senderId: currentUser.id, receiverId: receiver.id, content: content });
            }
            else {

                await fetch(`${Constant.API_URL}/chat/sendMessageToChannel/${Room.id}`, {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "content": content,
                    }),
                    credentials: 'include',
                });
                chatSocket.emit('message', { senderId: currentUser.id, receiverId: Room.id, content: content });
            }
        }
        // const currentDate = new Date();

        // // Extract hours and minutes
        // const hours = String(currentDate.getHours()).padStart(2, '0');
        // const minutes = String(currentDate.getMinutes()).padStart(2, '0');

        // // Format the time as "00:00"
        // const currentTime = `${hours}:${minutes}`;

        // // Print the result
        // console.log('Current time in the local time zone (24-hour clock):', currentTime);
        if (isend == false)
            setIsend(true)
        else if (isend == true)
            setIsend(false)
        setContent('')

    };
    const handleClick1 = async (e: any) => {
        if (e.key == 'Enter') {

            if (content) {
                if (!button) {

                    await fetch(`${Constant.API_URL}/chat/directMessage/${receiver.id}`, {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "content": content,
                        }),
                        credentials: 'include',
                    });
                    chatSocket.emit('message', { senderId: currentUser.id, receiverId: receiver.id, content: content });
                }
                else {


                    await fetch(`${Constant.API_URL}/chat/sendMessageToChannel/${Room.id}`, {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "content": content,
                        }),
                        credentials: 'include',
                    });
                    chatSocket.emit('message', { senderId: currentUser.id, receiverId: Room.id, content: content });
                }
            }
            if (isend == false)
                setIsend(true)
            else if (isend == true)
                setIsend(false)
            setContent('')
        }


    };
    const handltime = (time: string) => {
        const dateObject = new Date(time);
        const formattedTime = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return <div className="text-right text-gray-500 text-xs font-medium font-['Satoshi'] mt-2 ">{formattedTime}</div>
    }

    return (
        <div className="w-[45%] flex-auto fledx h-[820px] mt-12 relative bg-gray-100  border-2  border-sky-400 rounded-xl ">
            {
                ((receiver.id != 0 || Room.id != 0)) ? (
                    <>
                        <div className=' w-full flex justify-center items-center'>

                            <div className=' flex w-[93%] bg-white h-16 rounded-xl border-2 justify-start items-center  border-sky-400 wml-3 mt-2 '>
                                {button == false && <button className="sm:ml-4 w-full flex hover:scale-105 ps-1 space-x-2 h-full  duration-300 justify-center items-center" >
                                    {!status_tow_user && <div className=' mt-1  sm:mt-0 flex h-full flex-col  w-auto  bg-blacsk justify-center items-end  sm:items-center  -space-y-4 sm:space-y-0'>
                                        <div className="w-3 h-3 z-10 flex sm:hidden   bg-green-600 rounded-[20px] " />
                                        <img className="w-14 h-14 rounded-full" src={receiver?.foto_user} />
                                    </div>
                                    }
                                    {status_tow_user && <img className="w-14 h-14 rounded-full" src="https://cdn3.iconfinder.com/data/icons/shape-icons/128/icon48pt_different_account-512.png" />}

                                    <div className="flex flex-col w-full justify-start items-start">
                                        <p className="text-black  text-lg">{receiver?.username}</p>
                                        <div className="justify-start  -mt-1 space-x-1 items-center flex">
                                            <div className=' hidden sm:flex'>
                                                <div className="w-3 h-3  bg-green-600 rounded-[20px] " />
                                                <div className="text-neutral-800  text-sm sm:text-md font-normal">Active Now</div>
                                            </div>
                                        </div>
                                    </div>
                                </button>}
                                {button == true && <div className="ml-4 flex hover:scale-105 p-1 space-x-2 duration-300 justify-center items-center" >
                                    {Room.id && <div className={`flex justify-center items-center w-12 h-12 rounded-full ${Room?.type == 'public' && ' bg-amber-300'}  ${Room?.type == 'private' && 'bg-sky-500'}  ${Room?.type == 'protected' && ' bg-red-500'}`} >
                                        <h1 className='flex items-center justify-center text-[40px] font-bold text-white'>{Room?.name[0].toUpperCase()}</h1>
                                    </div>}
                                    <div className="">
                                        <p className="text-black  text-xl">{Room?.name}</p>
                                    </div>
                                </div>}
                                <div className=' w-full bg-bdlack      flex  lg:hidden justify-end items-center  mr-2'>

                                    {
                                        flag &&
                                        <div className='  flex absolute flex-col bg-blvack bg-blacdk z-30 justify-center items-center mst-5 '>

                                            <button onClick={() => setfalg(false)} className='w-auto h-auto shadow-md rounded-3xl'>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none">
                                                    <path d="M16.9999 13.4098L12.7099 9.16982C12.617 9.07609 12.5064 9.0017 12.3845 8.95093C12.2627 8.90016 12.132 8.87402 11.9999 8.87402C11.8679 8.87402 11.7372 8.90016 11.6154 8.95093C11.4935 9.0017 11.3829 9.07609 11.2899 9.16982L7.04995 13.4098C6.95622 13.5028 6.88183 13.6134 6.83106 13.7352C6.78029 13.8571 6.75415 13.9878 6.75415 14.1198C6.75415 14.2518 6.78029 14.3825 6.83106 14.5044C6.88183 14.6263 6.95622 14.7369 7.04995 14.8298C7.23731 15.0161 7.49076 15.1206 7.75495 15.1206C8.01913 15.1206 8.27259 15.0161 8.45995 14.8298L11.9999 11.2898L15.5399 14.8298C15.7262 15.0146 15.9776 15.1187 16.2399 15.1198C16.3716 15.1206 16.502 15.0954 16.6239 15.0456C16.7457 14.9958 16.8565 14.9225 16.9499 14.8298C17.047 14.7402 17.1254 14.6322 17.1805 14.5122C17.2356 14.3921 17.2664 14.2623 17.271 14.1302C17.2757 13.9982 17.2541 13.8666 17.2076 13.7429C17.161 13.6193 17.0905 13.506 16.9999 13.4098Z" fill="#2D8EE8" />
                                                </svg>
                                            </button>
                                            <div onMouseOut={() => setfalg(false)} onMouseOver={() => setfalg(true)} className=" bg-blfack w-72  absolute z-20 h-[760px]  mr-64 mt-[820px] bg-gray-100  shadow-md shadow-black rounded-2xl p-4">

                                                {button == false &&
                                                    <div className=" bg-bflack w-full h-full flex-col justify-start items-center  bg-blwack  gasp-[26px] flex">
                                                        <Edit users={users} currentUser={currentUser} setStatus_Tow_User={setStatus_Tow_User} status_tow_user={status_tow_user} />
                                                    </div>
                                                }
                                                {button == true &&

                                                    <div className="w-full h-full flex-col justify-start items-center   gasp-[26px] flex">
                                                        <EditChannel users={users} currentUser={currentUser} Room={Room} />
                                                    </div>
                                                    // </div>

                                                }


                                            </div>

                                        </div>
                                    }
                                    {
                                        !flag && <button onMouseOver={() => setfalg(true)} onClick={() => setfalg(true)} className='w-auto h-auto shadow-md rounded-3xl'>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none">
                                                <path d="M16.9999 9.17019C16.8126 8.98394 16.5591 8.87939 16.2949 8.87939C16.0308 8.87939 15.7773 8.98394 15.5899 9.17019L11.9999 12.7102L8.45995 9.17019C8.27259 8.98394 8.01913 8.87939 7.75495 8.87939C7.49076 8.87939 7.23731 8.98394 7.04995 9.17019C6.95622 9.26315 6.88183 9.37375 6.83106 9.49561C6.78029 9.61747 6.75415 9.74818 6.75415 9.88019C6.75415 10.0122 6.78029 10.1429 6.83106 10.2648C6.88183 10.3866 6.95622 10.4972 7.04995 10.5902L11.2899 14.8302C11.3829 14.9239 11.4935 14.9983 11.6154 15.0491C11.7372 15.0998 11.8679 15.126 11.9999 15.126C12.132 15.126 12.2627 15.0998 12.3845 15.0491C12.5064 14.9983 12.617 14.9239 12.7099 14.8302L16.9999 10.5902C17.0937 10.4972 17.1681 10.3866 17.2188 10.2648C17.2696 10.1429 17.2957 10.0122 17.2957 9.88019C17.2957 9.74818 17.2696 9.61747 17.2188 9.49561C17.1681 9.37375 17.0937 9.26315 16.9999 9.17019Z" fill="#2D8EE8" />
                                            </svg>
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className={` overflow-y-scroll scrollbar-hide ${flag == true ? 'blur-sm lg:blur-0' : null}  bg-fblue-100 flex  flex-col-reverse mt-1  p-4 w-full  min-h-80 h-[83%] bg-bdlack `}>

                            {messages.map((item, index) => (
                                <div key={index}>
                                    {
                                        (currentUser.id == item.senderId) ? (<div className='flex-col'>
                                            <div className="w-full h-auto flex flex-col space-x-4 items-end ">
                                                <div className=" mr-16 max-w-[440px] overflow-x-aucto whitesdpace-pre-wrap   break-all w-auto h-auto  bg-blue-400 rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px]  justify-center  p-5 items-center  text-xl  text-white">
                                                    <p className="whitespace-normal"> {item.content}</p>

                                                </div>
                                                <img className="w-12 h-12 -mt-10 rounded-full" src={currentUser.foto_user} />
                                            </div>
                                            <div className="w-full flex justify-end  text-wrap items-end">
                                                {handltime(item.createdAt)}
                                            </div>
                                        </div>) :
                                            (

                                                <div className='flex-col'>
                                                    <div className="w-full h-auto flex flex-col items-start">
                                                        <div className=" max-w-[440px] w-auto h-auto p-5 ml-16  break-all   bg-white rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] justify-center   items-center  text-xl ">
                                                            <p className="whitespace-normal"> {item.content}</p>
                                                        </div>
                                                        {button == false &&
                                                            <>
                                                                {!status_tow_user && <img className="w-12 h-12  -mt-10  rounded-full" src={receiver.foto_user} />}
                                                                {status_tow_user && <img className="w-12 h-12  -mt-10  rounded-full" src="https://cdn3.iconfinder.com/data/icons/shape-icons/128/icon48pt_different_account-512.png" />}
                                                            </>
                                                        }
                                                        {button == true && <img className="w-12 h-12  -mt-10  rounded-full" src={item.foto_user} />}

                                                    </div>
                                                    <div className="w-full flex">
                                                        {handltime(item.createdAt)}
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>
                            ))}
                        </div>


                        {myStatusInRoom.timeMute == null ? <div className={` w-full  break-all   h-12 z-h10 mt-2  ${flag == true ? 'blur-sm  lg:blur-0' : null} lg:${flag == true ? null : null} flex flex-row px-3 bg-blasck`}>

                            {
                                (status.status == "accepted" || !status) &&
                                <div>
                                    <input

                                        onChange={(e) => setContent(e.target.value)}
                                        className=" bg-white rounded-[30px]  text-wrap w-full  items-center  justify-center placeholder:italic bloc  border border-sky-500 px-4 shadow-sm focus:outline-none    sm:text-sm"
                                        type="text"
                                        name='Type here'
                                        value={content}
                                        placeholder="Type here........"
                                        autoComplete='off' onKeyDown={handleClick1}

                                    />
                                    <button
                                        className='hover:scale-110 duration-300'
                                        onClick={() => handleClick()}
                                    ><img src='https://cdn-icons-png.flaticon.com/512/3682/3682321.png' className='h-8 w-8 ml-2' /></button>
                                </div>
                            }
                            <>
                                {
                                    status.status != "accepted" && <>
                                        {
                                            status.userAId == currentUser.id &&

                                            <div className=' w-full h-full  flex justify-center items-center'>
                                                <button className='w-[80%] h-full rounded-full flex hover:scale-105 duration-300  items-center  justify-center   text-md  bg-blue-400 shadow-md text-white border-2 mdl-20 border-white'>Unblocked {receiver.username} </button>
                                            </div>


                                        }
                                        {
                                            status.userBId == currentUser.id &&
                                            <div className=' w-full h-full  flex justify-center items-center'>
                                                <div className='w-[80] h-full  bg-red-500 rounded-full  flex justify-center items-center p-3 text-white '>I'm sorry you cannot provide a message for this user </div>
                                            </div>
                                            // <div className='w-[80] h-20  flex justify-center items-ceenter text-sm text-red-600'>I'm sorry you cannot provide a message for this user</div>

                                        }
                                    </>
                                }
                            </>

                        </div> : <div>i cant your mute hahahaha</div>}


                    </>) : (
                    <div className='flex justify-center items-center'>No conversation select</div>
                )


            }
        </div>
    )
}