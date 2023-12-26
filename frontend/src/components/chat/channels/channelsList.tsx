import React, { useEffect, useState } from 'react'
import Createchannels from './createChannels'
import { userProps } from '@/interface/data'
import { channelProps } from '@/interface/data'

export default function ChannelsConversationList({ currentUser, setRoom, setjoinchannel }: { currentUser: userProps, setRoom: (value: channelProps) => void, setjoinchannel: (value: boolean) => void }) {

  const [click, setClick] = useState('')

  const [channel, setChannel] = useState<channelProps[]>([]);
  const [allChannel, setAllchannel] = useState<channelProps[]>([]);

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(`http://localhost:3333/chat/allChannelByUserId/${currentUser.id}`, {
            credentials: 'include',
          })
          const content = await response.json();
          setChannel(Array.from(content))
          console.log(content)
        } catch (error) {

        }
      }
    )();
  }, [currentUser.id,click]);
  const joinchanle = async (item: any) => {
    setRoom(item);
    setjoinchannel(true)

  }
  // 'joinChannel/:idUser/:idRoom/:password'

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(`http://localhost:3333/chat/allChannel`, {
            credentials: 'include',
          })
          const content = await response.json();
          setAllchannel(Array.from(content))
          console.log(content)
        } catch (error) {

        }
      }
    )();
  }, [currentUser.id]);

  return (
    <div className=' w-full h-full bgf-black flex justify-center items-center flex-col'>
      {
        click == '' && <button onClick={() => setClick('create')} className=" text-white  -mt-4 bg-blue-400 rounded-[52px] justify-center w-96 h-12 items-center  duration-300 hover:scale-105">
          <div className=" justify-center items-center flex">
            <h1 className="">Create New Channel</h1>
          </div>
        </button>
      }
      {
        click == '' && <button onClick={() => setClick('start')} className=" mt-4 text-white  bg-blue-400 rounded-[52px] justify-center w-96 h-12 items-center  duration-300 hover:scale-105">
          <div className=" justify-center items-center flex">
            <h1 className="">Start New Channel</h1>
          </div>
        </button>}

      <div className='overflow-y-scrdoll scrolldbar-hide bfg-blue-500 h-[430px] w-full'>
        {
          click == 'create' &&
          <div className=" bg-sky-300 w-full h-full flex  flex-col items-center justify-center shadow-xl drop-shadow-xl   rounded-2xl">
            <div className=" bfg-slate-600 w-full  mt-2 ml-3 ">
              <button onClick={() => setClick('')} className="w-6 h-6  rounded-full">
                <img className=' ' src='https://cdn-icons-png.flaticon.com/512/66/66847.png'></img>
              </button>
            </div>
            <Createchannels currentUser={currentUser} />
          </div>}

        {click == 'start' && <div className=" fbg-sky-300 w-full h-full flex  flex-col items-cfenter justify-cefnter shadowf-xl drop-shadow-fxl   rounded-2xl">
          <div className=" bfg-slate-600 w-full  mt-2 ml-3 ">
            <button onClick={() => setClick('')} className="w-6 h-6 -mt-3 z-20  rounded-full">
              <img className=' -mt-12 ' src='https://cdn-icons-png.flaticon.com/512/66/66847.png'></img>
            </button>
            <div className=' bg-blgack rounded-2xl flex flex-col h-[670px]  -mt-6 overflow-y-scroll shadffow-xl drofp-shadow-xl scrollbar-hide'>

              {
                allChannel.map((item) => (
                  <button onClick={() => joinchanle(item)} className="h-20 mt-3 w-96 px-[15px] shadow-xl drop-shadow-xl  bg-white justify-between items-center inline-flex  hover:shadow-lg   border border-sky-500  hover:bg-sky-100 duration-1000  transition shahydow-md rounded-[20px] ">
                    <div className="h-[70px] justify-start items-center gap-2.5 flex">
                      <img className="w-[58px] h-[58px] rounded-full" src={'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_640.png'} />
                      <div className=" flex-col justify-start items-start gap-0.5 inline-flex my-[20px]">
                        <h4 className="">{item.name} ({item.type})</h4>
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
          </div>
        </div>}

        {
          click == '' &&
          <div className="  bg-sdlate-600 borhder bogjrder-sky-500  flex  flex-col items-center justify-start h-[580px]  mt-1  overflow-y-scroll shadffow-xl drofp-shadow-xl scrollbar-hide">
            {/* <div className=''> */}
            {
              channel.map((item) => (
                <button onClick={() => setRoom(item)} className="h-20 mt-3 w-96 p-2 bg-white justify-between items-center inline-flex  hover:shadow-lg   border border-sky-500  hover:bg-sky-100 duration-1000  transition shahydow-md rounded-[20px] ">
                  <div className="h-auto  justify-start items-center gap-2.5 flex">
                    <img className="w-16 h-16 rounded-full" src={'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_640.png'} />
                    <div className="   flex flex-col justify-center items-start space-y-1 ">
                      <h4 className=" text-lg">{item.name}</h4>
                      <p className="self-stretch h text-neutral-600 text-sm ">Good point. Typography is another ?</p>
                    </div>
                  </div>
                  <div className="flex flex-col self-stretch justify-center space-y-2">
                    <div className="">15h</div>
                    <div className=" text-CusColor_light bg-sky-500  rounded-[100px]">{item.id}</div>
                  </div>
                </button>
              ))
            }
          {/* </div> */}
          </div>}
      </div>
    </div>
  )
}