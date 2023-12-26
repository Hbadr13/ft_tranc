import React, { useState } from 'react'
import DirectConversationList from './direct/directConversationList'
import ChannelsList from './channels/channelsList'
import { AppProps, channelProps, userProps } from '@/interface/data';


export default function ConversationList({ amis, setReceiver, setButton, currentUser, users, setRoom,setjoinchannel }: { amis: userProps[], setReceiver: (value: userProps) => void, setButton: (value: boolean) => void, currentUser: userProps, users: userProps[], setRoom: (value: channelProps) => void,setjoinchannel: (value: boolean) => void }) {

    const [click, setClick] = useState(true)

    return (
        <div className="  bg-gray-100 p-4 ml-6 mt-12 md:[400px] lg:min-w-[420px] h-[820px]    flex-col justify-start items-start gap-5 inline-flex rounded-[30px] border  border-sky-500">

            <div className=" bg-bdlack self-stretch  h-20 flex  justify-center items-center gap-3">
                <button onClick={() => setClick(true)} className={` w-40 h-12 ${click ? ' bg-blue-400 text-white' : 'bg-white text-blue-500'} rounded-[52px] justify-center items-center inline-flex duration-1000 hover:bg-blue-400 border border-sky-500`}>
                    <div className="justify-start items-center gap-2 flex">
                        <div className="">Direct</div>
                    </div>
                </button>
                <button onClick={() => setClick(false)} className={`w-40  h-12 ${!click ? ' bg-blue-400 text-white' : 'bg-white text-blue-500'} rounded-[52px] justify-center items-center inline-flex duration-1000 hover:bg-blue-400 border border-sky-500`}>
                    <div className="justify-start  items-center gap-2 flex">
                        <div className="">Channels</div>
                    </div>
                </button>
            </div>
            <div className='w-full h-ful'>
                {click ? (
                    setButton(false),

                    <DirectConversationList setReceiver={setReceiver} users={users} amis={amis} currentUser={currentUser} />
                ) : (
                    setButton(true),
                    <ChannelsList currentUser={currentUser} setRoom={setRoom} setjoinchannel={setjoinchannel} />
                )}
            </div>
        </div>
    )
}