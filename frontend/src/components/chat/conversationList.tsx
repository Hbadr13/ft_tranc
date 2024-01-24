import React, { useEffect, useState } from 'react'
import DirectConversationList from './direct/directConversationList'
import ChannelsList from './channels/channelsList'
import { AppProps, channelProps, userData, userProps } from '@/interface/data';
import { useRouter } from 'next/router';


export default function ConversationList({ msg2, amis, setButton, users, setRoom, setjoinchannel, setStatus_Tow_User, status_tow_user, Room, setJoinRoom }: { msg2: string, amis: userProps[], setButton: (value: boolean) => void, users: userProps[], setRoom: (value: channelProps) => void, setjoinchannel: (value: boolean) => void, setStatus_Tow_User: (value: boolean) => void, status_tow_user: boolean, Room: channelProps, setJoinRoom: (value: channelProps) => void, }) {

    const [click, setClick] = useState(true)
    const [receiver, setReceiver] = useState<userProps>(userData)
    let router = useRouter()

    useEffect(() => {
        let id = Number(router.query.user)
        users.map((item) => {
            if (id == item.id)
                setReceiver(item)
        })
    }, [router])

    return (
        <div className={` bg-gray-100 p-4  ml-2  mt-12  overflow-hidden ; ${(Room.id != 0 || receiver.id != 0) ? 'sm:ml-7 w-[130px]  md:w-[300px] lg:w-[350px]' : 'w-[350px]'}  ;   h-[820px]    flex-col justify-start items-start gap-5 inline-flex border-2  border-sky-400 rounded-xl`}>

            <div className=" bg-bdlack self-stretch  h-20 flex  justify-center items-center gap-3">
                <button onClick={() => { setClick(true); setButton(false) }} className={` w-40 h-10 ${click ? ' bg-blue-400 text-white' : 'bg-white text-blue-500'} rounded-full justify-center items-center inline-flex duration-1000 hover:bg-blue-400 border-2  border-sky-400 `}>
                    <div className="justify-start items-center gap-2 flex">
                        <div className="">Direct</div>
                    </div>
                </button>
                <button onClick={() => { setClick(false); setButton(true) }} className={`w-40  h-10 ${!click ? ' bg-blue-400 text-white' : 'bg-white text-blue-500'} rounded-full justify-center items-center inline-flex duration-1000 hover:bg-blue-400 border-2  border-sky-400`}>
                    <div className="justify-start  items-center gap-2 flex">
                        <div className="">Channels</div>
                    </div>
                </button>
            </div>
            <div className='w-full h-ful'>
                {click ? (
                    <DirectConversationList msg2={msg2} users={users} amis={amis} setStatus_Tow_User={setStatus_Tow_User} status_tow_user={status_tow_user} />
                ) : (
                    <ChannelsList msg2={msg2} users={users} setRoom={setRoom} setjoinchannel={setjoinchannel} Room={Room} setJoinRoom={setJoinRoom} />
                )}
            </div>
        </div>
    )
}