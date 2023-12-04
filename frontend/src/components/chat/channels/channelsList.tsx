import React, { useEffect, useState } from 'react'
import Createchannels from './createChannels'
import { userProps } from '@/interface/data'
import { channelProps } from '@/interface/data'

export default function ChannelsConversationList({ currentUser, setConv }: { currentUser: userProps, setConv: (value: number) => void }) {

  const [click, setClick] = useState(false)
  const [channel, setChannel] = useState<channelProps[]>([]);


  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(`http://localhost:3333/chat/allChannelByUserId/${currentUser.id}`)
          const content = await response.json();
          setChannel(Array.from(content))
        } catch (error) {

        }
      }
    )();
  }, [currentUser.id]);

  return (
    <div>
      <div className="w-[50%] bg-blue-400  justify-center items-center">
        <div className="w-[185px] justify-center items-center gap-2 flex">
          <div className="w-5 h-5 relative" />
          <button className='text-white text-base font-bold' onClick={() => setClick(true)}>create channel</button>
        </div>
      </div>
      {
        click ? (
          <Createchannels currentUser={currentUser} />
        ) : null
      }
      <div className="flex-auto space-y-5">
        {channel.map((item) => (
          <div key={item.id}>
            <button className=' border-collapse' onClick={() => setConv(item.id)}>
              {/* <button className=' border-collapse'> */}
              {item.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
