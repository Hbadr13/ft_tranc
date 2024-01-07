import React, { useState } from 'react'
import DirectConversationList from './direct/directConversationList'
import ChannelsList from './channels/channelsList'
import { AppProps, channelProps, userProps } from '@/interface/data';


export default function ConversationList({ amis, setReceiver, setButton, currentUser,Receiver, users, setRoom, setjoinchannel, setStatus_Tow_User, status_tow_user }: { amis: userProps[], setReceiver: (value: any) => void, setButton: (value: boolean) => void, currentUser: userProps, Receiver: userProps, users: userProps[], setRoom: (value: channelProps) => void, setjoinchannel: (value: boolean) => void, setStatus_Tow_User: (value: boolean) => void, status_tow_user: boolean }) {

    const [click, setClick] = useState(true)

    return (
        <div className="  bg-gray-100 p-4 sm:ml-7 ml-2  mt-12 w-[130px]   md:w-[300px] lg:w-[350px] h-[820px]    flex-col justify-start items-start gap-5 inline-flex rounded-xl border  border-sky-500">

            <div className=" bg-bdlack self-stretch  h-20 flex  justify-center items-center gap-3">
                <button onClick={() => setClick(true)} className={` w-40 h-10 ${click ? ' bg-blue-400 text-white' : 'bg-white text-blue-500'} rounded-full justify-center items-center inline-flex duration-1000 hover:bg-blue-400 border border-sky-500`}>
                    <div className="justify-start items-center gap-2 flex">
                        {/* <div className="">Direct</div> */}
                    </div>
                </button>
                <button onClick={() => setClick(false)} className={`w-40  h-10 ${!click ? ' bg-blue-400 text-white' : 'bg-white text-blue-500'} rounded-full justify-center items-center inline-flex duration-1000 hover:bg-blue-400 border border-sky-500`}>
                    <div className="justify-start  items-center gap-2 flex">
                        {/* <div className="">Channels</div> */}
                    </div>
                </button>
            </div>
            <div className='w-full h-ful'>
                {click ? (
                    setButton(false),

                    <DirectConversationList setReceiver={setReceiver} users={users} Receiver={Receiver} amis={amis} currentUser={currentUser} setStatus_Tow_User={setStatus_Tow_User} status_tow_user={status_tow_user} />
                ) : (
                    setButton(true),
                    <ChannelsList  users={users} currentUser={currentUser} setRoom={setRoom} setjoinchannel={setjoinchannel} />
                )}
            </div>
        </div>
    )
}