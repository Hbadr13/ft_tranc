import React, { useState } from 'react'
import DirectConversationList from './direct/directConversationList'
import ChannelsList from './channels/channelsList'
import { AppProps, userProps } from '@/interface/data';


export default function ConversationList({ currentUser, users, setConv }: { currentUser: userProps, users: AppProps, setConv: (value: number) => void }) {

    const [click, setClick] = useState(true)

    return (
        <div className='flex-auto w-32 bg-slate-400'>
            <div className='flex  justify-around'>
                <button className={`${click ? 'border-b-4 border-l-indigo-500' : null}`} onClick={() => setClick(true)}>direct</button>
                <button className={`${!click ? 'border-b-4 border-l-indigo-500' : null}`} onClick={() => setClick(false)}>channels</button>
            </div>
            <div className=''>
                {click ? (
                    <DirectConversationList users={users} currentUser={currentUser} />
                ) : (
                    <ChannelsList currentUser={currentUser} setConv={setConv} />
                )}
            </div>
        </div>
    )
}
