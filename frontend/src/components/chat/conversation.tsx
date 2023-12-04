import React, { useEffect, useState } from 'react'
import { userProps, messageProps } from '@/interface/data'

export default function Conversation({ idRoom, currentUser }: { idRoom: number, currentUser: userProps }) {
    const [messages, setMessages] = useState<messageProps[]>([]);

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch(`http://localhost:3333/chat/allMessagesChannel/${currentUser.id}/${idRoom}`)
                    const content = await response.json();
                    setMessages(Array.from(content))
                } catch (error) {

                }
            }
        )();
    }, [currentUser.id, idRoom]);

    return (
        <div className=' flex flex-auto w-64 bg-slate-500'>
            <div className='flex-auto space-y-10 w-64'>
                {messages.map((item, index) => (
                    <div key={index}>
                        {(currentUser.id == item.senderId) ? (<div className='flex justify-end items-end  h-16 flex-col bg-slhate-50 '>
                            <div className='border-solid border-2 border-black bg-white'>

                                <p>{item.senderId}</p>
                                <p>{item.content}</p>
                                <p>{item.createdAt}</p>
                            </div>
                        </div>) : (
                            <div className='flex h-16 w-56 flex-col'>
                                <div className=' border-solid border-2 border-white bg-black text-white'>
                                    <p>{item.senderId}</p>
                                    <p>{item.content}</p>
                                    <p>{item.createdAt}</p>
                                </div>
                            </div>
                        )}

                    </div>
                ))}
            </div>

        </div>
    )
}
