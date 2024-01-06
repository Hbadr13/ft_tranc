import React, { useEffect, useState } from 'react'
import { userProps, messageProps, channelProps, participantsProps } from '@/interface/data'
import { Socket } from 'socket.io-client';

export default function Conversation({ myStatusInRoom, chatSocket, Receiver, button, Room, currentUser }: { myStatusInRoom: participantsProps, chatSocket: Socket, Receiver: userProps, button: boolean, Room: channelProps, currentUser: userProps }) {
    const [messages, setMessages] = useState<messageProps[]>([]);
    const [content, setContent] = useState('');
    const [isend, setIsend] = useState(false);
    const [msg, setMsg] = useState('')

    if (!button) {
        useEffect(() => {
            (
                async () => {
                    try {
                        const response = await fetch(`http://localhost:3333/chat/getConversationDirect/${currentUser.id}/${Receiver.id}`, {
                            credentials: 'include',
                        });
                        const content = await response.json();
                        setMessages(Array.from(content))
                    } catch (error) {

                    }
                }
            )();
            setContent('')
        }, [currentUser.id, Receiver, isend, msg]);
    }
    else {
        useEffect(() => {
            (
                async () => {
                    try {
                        const response = await fetch(`http://localhost:3333/chat/allMessagesChannel/${currentUser.id}/${Room.id}`, {
                            credentials: 'include',
                        });
                        const content = await response.json();
                        setMessages(Array.from(content))
                        console.log("content :", content)
                    } catch (error) {

                    }
                }
            )();
            setContent('')
        }, [currentUser.id, Room, button, isend, msg]);
    }

    useEffect(() => {
        chatSocket?.on('message', (message) => {
            if (message) {
                setMsg(message);
                if (button) {
                    fetch(`http://localhost:3333/chat/directMessage/${currentUser.id}/${Receiver.id}`, {
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
                    fetch(`http://localhost:3333/chat/sendMessageToChannel/${Room.id}/${currentUser.id}`, {
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

                await fetch(`http://localhost:3333/chat/directMessage/${currentUser.id}/${Receiver.id}`, {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "content": content,
                    }),
                    credentials: 'include',
                });
                chatSocket.emit('message', { senderId: currentUser.id, ReceiverId: Receiver.id, content: content });
            }
            else {
                console.log("sssssssssssssssssss")

                await fetch(`http://localhost:3333/chat/sendMessageToChannel/${Room.id}/${currentUser.id}`, {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "content": content,
                    }),
                    credentials: 'include',
                });
                chatSocket.emit('message', { senderId: currentUser.id, ReceiverId: Room.id, content: content });
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

                    await fetch(`http://localhost:3333/chat/directMessage/${currentUser.id}/${Receiver.id}`, {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "content": content,
                        }),
                        credentials: 'include',
                    });
                    chatSocket.emit('message', { senderId: currentUser.id, ReceiverId: Receiver.id, content: content });
                }
                else {


                    await fetch(`http://localhost:3333/chat/sendMessageToChannel/${Room.id}/${currentUser.id}`, {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "content": content,
                        }),
                        credentials: 'include',
                    });
                    chatSocket.emit('message', { senderId: currentUser.id, ReceiverId: Room.id, content: content });
                }
            }
            if (isend == false)
                setIsend(true)
            else if (isend == true)
                setIsend(false)
            setContent('')
        }
        // const currentDate = new Date();

        // // Extract hours and minutes
        // const hours = String(currentDate.getHours()).padStart(2, '0');
        // const minutes = String(currentDate.getMinutes()).padStart(2, '0');

        // // Format the time as "00:00"
        // const currentTime = `${hours}:${minutes}`;

        // // Print the result
        // console.log('Current time in the local time zone (24-hour clock):', currentTime);

    };

    const handltime = (time: string) => {
        const dateObject = new Date(time);
        const formattedTime = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return <div className="text-right text-gray-500 text-xs font-medium font-['Satoshi'] mt-2 ">{formattedTime}</div>
    }


    return (
        <div className="w-[45%] h-[820px] mt-12 relative bg-gray-100  border  border-sky-500 rounded-[30px] ">
            {

                Receiver.id != 0 || Room.id != 0 ? (
                    <>
                        <div className=' flex w-[97%] bg-white h-16 rounded-[30px] border justify-start items-center  border-sky-500 ml-3 mt-2 '>
                            {button == false && <button className="ml-4 flex hover:scale-105 p-1 space-x-2 duration-300 justify-center items-center" >
                                <img className="w-14 h-14 rounded-full" src={Receiver.foto_user} />
                                <div className="flex flex-col justify-start items-start">
                                    <p className="text-black  text-lg">{Receiver.username}</p>
                                    <div className="justify-start  -mt-1 space-x-1 items-center flex">
                                        <div className="w-3 h-3  bg-green-600 rounded-[20px] " />
                                        <div className="text-neutral-800 text-md font-normal">Active Now</div>
                                    </div>
                                </div>
                            </button>}
                            {button == true && <div className="ml-4 flex hover:scale-105 p-1 space-x-2 duration-300 justify-center items-center" >
                                <img className="w-14 h-14 rounded-full" src={'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_640.png'} />
                                <div className="">
                                    <p className="text-black  text-xl">{Room.name}</p>
                                </div>
                            </div>}

                        </div>

                        <div className=' overflow-y-scroll scrollbar-hide  bg-fblue-100 flex  flex-col-reverse mt-1  p-4 w-full  min-h-80 h-[83%] bg-bdlack '>
                            {messages.map((item, index) => (
                                <div key={index}>
                                    {
                                        (currentUser.id == item.senderId) ? (<div className='flex-col'>
                                            <div className="w-full h-auto flex flex-col space-x-4 items-end ">
                                                <div className=" mr-16 max-w-[440px] w-auto h-auto  bg-blue-400 rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px]  justify-center  p-5 items-center  text-xl  text-white">
                                                    {item.content}
                                                </div>
                                                <img className="w-12 h-12 -mt-10 rounded-full" src={currentUser.foto_user} />
                                            </div>
                                            <div className="w-full flex justify-end items-end">
                                                {handltime(item.createdAt)}
                                            </div>
                                        </div>) : (<div className='flex-col'>
                                            <div className="w-full h-auto flex flex-col items-start">
                                                <div className=" max-w-[440px] w-auto h-auto p-5 ml-16  bg-white rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] justify-center   items-center  text-xl ">
                                                    {item.content}
                                                </div>
                                                {button == false && <img className="w-12 h-12  -mt-10  rounded-full" src={Receiver.foto_user} />}
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
                        {
                            myStatusInRoom?.isBanned ? (<div>mute message</div>) : (
                                <div className="w-full h-12 z-h10 mt-2  flex flex-row px-3 bg-bblack">
                                    <input
                                        onChange={(e) => setContent(e.target.value)}
                                        className=" bg-white rounded-[30px] dark:bg-black w-full items-center  dark:text-CusColor_light justify-center placeholder:italic bloc  border border-sky-500 px-4 shadow-sm focus:outline-none    sm:text-sm"
                                        type="text"
                                        name='Type here'
                                        value={content}
                                        placeholder="Type here........"
                                        autoComplete='off' onKeyDown={handleClick1}

                                    />
                                    <button
                                        className='hover:scale-110 duration-300 ml-4'
                                        onClick={() => handleClick()}
                                    >
                                        <svg className='z' xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 20 20" fill="none">
                                            <path d="M18.34 7.32013L4.34 0.320128C3.78749 0.0451374 3.16362 -0.0527612 2.55344 0.03978C1.94326 0.132321 1.37646 0.410798 0.930335 0.837244C0.484207 1.26369 0.180456 1.81735 0.060496 2.42274C-0.059464 3.02813 0.0102046 3.65578 0.260003 4.22013L2.66 9.59013C2.71446 9.71996 2.74251 9.85934 2.74251 10.0001C2.74251 10.1409 2.71446 10.2803 2.66 10.4101L0.260003 15.7801C0.0567034 16.2368 -0.029241 16.7371 0.00998036 17.2355C0.0492018 17.7339 0.212345 18.2145 0.484585 18.6338C0.756825 19.0531 1.12953 19.3977 1.56883 19.6363C2.00812 19.875 2.50009 20 3 20.0001C3.46823 19.9955 3.92949 19.8861 4.35 19.6801L18.35 12.6801C18.8466 12.4303 19.264 12.0474 19.5557 11.5742C19.8474 11.101 20.0018 10.556 20.0018 10.0001C20.0018 9.44424 19.8474 8.89928 19.5557 8.42605C19.264 7.95282 18.8466 7.56994 18.35 7.32013H18.34ZM17.45 10.8901L3.45 17.8901C3.26617 17.9784 3.05973 18.0084 2.85839 17.976C2.65705 17.9436 2.47041 17.8504 2.32352 17.709C2.17662 17.5675 2.07648 17.3845 2.03653 17.1846C1.99658 16.9846 2.01873 16.7772 2.1 16.5901L4.49 11.2201C4.52094 11.1484 4.54766 11.075 4.57 11.0001H11.46C11.7252 11.0001 11.9796 10.8948 12.1671 10.7072C12.3546 10.5197 12.46 10.2653 12.46 10.0001C12.46 9.73491 12.3546 9.48056 12.1671 9.29302C11.9796 9.10549 11.7252 9.00013 11.46 9.00013H4.57C4.54766 8.9253 4.52094 8.85184 4.49 8.78013L2.1 3.41013C2.01873 3.22309 1.99658 3.01568 2.03653 2.8157C2.07648 2.61572 2.17662 2.43273 2.32352 2.29128C2.47041 2.14982 2.65705 2.05666 2.85839 2.02428C3.05973 1.9919 3.26617 2.02186 3.45 2.11013L17.45 9.11013C17.6138 9.19405 17.7513 9.32154 17.8473 9.47857C17.9433 9.63561 17.994 9.81608 17.994 10.0001C17.994 10.1842 17.9433 10.3647 17.8473 10.5217C17.7513 10.6787 17.6138 10.8062 17.45 10.8901V10.8901Z" fill="#1561D2" />
                                        </svg>
                                    </button>
                                </div>
                            )
                        }
                    </>) : (
                    <div className='flex justify-center items-center'>No conversation select</div>
                )
            }
        </div >
    )
}