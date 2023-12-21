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
    <div className=' w-full h-full bgf-black flex justify-center items-center flex-col'>
      {
        !click ? (
          <button onClick={() => setClick(true)} className=" text-white  mft-3   px-5 py-3 bg-blue-400 rounded-[52px] justify-center w-96 items-center  duration-300 hover:scale-105">
            <div className=" justify-center items-center gap-2 flex">
              <h1 className="">Create New Channel</h1>
            </div>
          </button>
        ) : null
      }

      <div className=" w-full">
        {
          click ? (
            <div className=" bg-sky-300 w-full h-full flex  flex-col items-center justify-center shadow-xl drop-shadow-xl   rounded-2xl">
              <div className=" bfg-slate-600 w-full  mt-2 ml-3 ">
                <button onClick={() => setClick(false)} className="w-6 h-6  rounded-full">
                  <img className=' ' src='https://cdn-icons-png.flaticon.com/512/66/66847.png'></img>
                </button>
              </div>
              <Createchannels currentUser={currentUser} />
            </div>

          ) : (

            <div className="  borhder bogjrder-sky-500  flex  flex-col items-center justify-center">
              {
                channel.map((item) => (
                  <button onClick={() => setConv(item.id)} className="h-[90px] mt-6 w-[480px] px-[15px] bg-white justify-between items-center inline-flex  hover:shadow-lg   border border-sky-500  hover:bg-sky-100 duration-1000  transition shahydow-md rounded-[20px] ">
                    <div className="h-[70px] justify-start items-center gap-2.5 flex">
                      <img className="w-[58px] h-[58px] rounded-full" src={'https://cdn3.iconfinder.com/data/icons/34-icons/300/player20-512.png'} />
                      <div className=" flex-col justify-start items-start gap-0.5 inline-flex my-[20px]">
                        <h4 className="">{item.name}</h4>
                        <p className="self-stretch h-[37px] text-neutral-600 text-sm leading-[18px]">Good point. Typography is another ?</p>
                      </div>
                    </div>
                    <div className="flex flex-col self-stretch my-[7px]">
                      <div className=" p-1 mb-1">15h</div>
                      <div className=" text-CusColor_light bg-sky-500 p-1 mb-1 rounded-[100px]">{item.id}</div>
                    </div>
                  </button>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}
