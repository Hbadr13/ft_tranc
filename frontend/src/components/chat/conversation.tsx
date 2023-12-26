import React, { useEffect, useState } from 'react'
import { userProps, messageProps, channelProps } from '@/interface/data'
import { Socket } from 'socket.io-client';

export default function Conversation({ chatSocket, Receiver, button, Room, currentUser }: { chatSocket: Socket, Receiver: userProps, button: boolean, Room: channelProps, currentUser: userProps }) {
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

                Receiver.id != 0 ||  Room.id != 0 ? (
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
                                    <p className="text-black  text-xl">{'channel name'}</p>
                                </div>
                            </div>}

                        </div>

                        <div className=' overflow-y-scroll scrollbar-hide  bg-fblue-100 flex  flex-col-reverse mt-1  p-4 w-full  min-h-80 h-[83%] bg-bdlack '>
                            {messages.map((item, index) => (
                                <>
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
                                        </div>) :
                                            (

                                                <div className='flex-col'>
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
                                </>
                            ))}
                        </div>
                        <div className="w-full h-12 z-h10 mt-2  flex flex-row px-3 bg-bblack">
                            <input
                                onChange={(e) => setContent(e.target.value)}
                                className=" bg-white rounded-[30px]  w-full items-center  justify-center placeholder:italic bloc  border border-sky-500 px-4 shadow-sm focus:outline-none    sm:text-sm"
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
                    </>) : (
                    <div className='flex justify-center items-center'>No conversation select</div>
                )
            }
        </div >
    )
}