import React, { useEffect, useState } from 'react'
import Createchannels from './createChannels'
import { userProps } from '@/interface/data'
import { channelProps } from '@/interface/data'

export default function ChannelsConversationList({ users, currentUser, setRoom, setjoinchannel, Room,setJoinRoom }: { users: userProps[], currentUser: userProps, setRoom: (value: channelProps) => void, setjoinchannel: (value: boolean) => void, Room: channelProps,setJoinRoom: (value: channelProps) => void, }) {

  const [click, setClick] = useState('')

  const [channel, setChannel] = useState<channelProps[]>([]);
  const [allChannel, setAllchannel] = useState<channelProps[]>([]);
  const channelData = { id: 0, type: "", name: "", password: "" }

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(`http://localhost:3333/chat/allChannelByUserId/${currentUser.id}`, {
            credentials: 'include',
          })
          const content = await response.json();
          setChannel(Array.from(content))

        } catch (error) {

        }
      }
    )();
  }, [currentUser.id, click]);
  const joinchanle = async (item: any) => {
    setJoinRoom(item);
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

        } catch (error) {

        }
      }
    )();
  }, [currentUser.id]);
  useEffect(() => {

    setRoom(channelData)

  }, [click])


  return (
    <div className=' w-full h-full bgf-black flex justify-center items-center flex-col'>
      {
        !click && <button onClick={() => setClick('create')} className=" text-white  w-[90%] -mt-4 bg-blue-400 rounded-full justify-center  h-10 items-center  duration-300 hover:scale-105">
          <div className=" justify-center items-center flex space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 11H13V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H11V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19V13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z" fill="white" />
            </svg>
            <h1 className="">Create New Channel</h1>
          </div>
        </button>
      }

      {
        !click && <button onClick={() => setClick('start')} className=" mt-4 text-white  bg-blue-400 rounded-full justify-center w-[90%] h-10 items-center  duration-300 hover:scale-105">
          <div className=" justify-center items-center flex space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15.5 11.2998L9.89995 5.5998C9.49995 5.1998 8.89995 5.1998 8.49995 5.5998C8.09995 5.9998 8.09995 6.5998 8.49995 6.9998L13.4 11.8998L8.49 1995 16.7998C8.29995 16.9998 8.19995 17.1998 8.19995 17.4998C8.19995 18.0998 8.59995 18.4998 9.19995 18.4998C9.49995 18.4998 9.69995 18.3998 9.89995 18.1998L15.6 12.4998C15.9 12.2998 15.9 11.6998 15.5 11.2998Z" fill="white" />
            </svg>
            <h1 className="">Start New Channel</h1>

          </div>
        </button>}

      <div className='overflow-y-scrdoll scrolldbar-hide bfg-blue-500 h-[430px] w-full'>
        {
          click == 'create' &&
          <div className=" bg-white max-w-96 h-auto flex flex-col items-center justify-center rounded-xl border border-sky-200">
            <div className="bg-sgky-400 w-full h-20 flex justify-cenjter items-cejnter">
              <div className='flex justify-start w-full items-center ml-8  text-black'>
                <h1 className=' text-shadow-sm'>New Channel</h1></div>
              <div className='w-full justify-end items-center bg-blhack flex'>
                <button onClick={() => setClick('')} className=" mr-6">
                  <svg width="10" height="10" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="Vector" d="M117.5 100L196.25 21.25C201.25 16.25 201.25 8.75 196.25 3.75C191.25 -1.25 183.75 -1.25 178.75 3.75L100 82.5L21.25 3.75C16.25 -1.25 8.75 -1.25 3.75 3.75C-1.25 8.75 -1.25 16.25 3.75 21.25L82.5 100L3.75 178.75C1.25 181.25 0 183.75 0 187.5C0 195 5 200 12.5 200C16.25 200 18.75 198.75 21.25 196.25L100 117.5L178.75 196.25C181.25 198.75 183.75 200 187.5 200C191.25 200 193.75 198.75 196.25 196.25C201.25 191.25 201.25 183.75 196.25 178.75L117.5 100Z" fill="#376EFA" fill-opacity="0.85" />
                  </svg>
                </button>
              </div>
            </div>
            <div className=' w-full h-[1px] bg-sky-200' />
            <Createchannels users={users} setClick={setClick} currentUser={currentUser} />
          </div>}

        {click == 'start' && <div className=" fbg-sky-300 w-full h-full flex  flex-col items-cfenter justify-cefnter shadowf-xl drop-shadow-fxl   rounded-2xl">
          <div className=" bfg-slate-600 w-full  mt-2 ml-3 ">
            <button onClick={() => setClick('')} className="w-6 h-6 -mt-3 z-20  rounded-full">
              <img className=' -mt-12 ' src='https://cdn-icons-png.flaticon.com/512/66/66847.png'></img>
            </button>
            <div className=' bg-blgack rounded-2xl flex flex-col h-[670px]  -mt-6 overflow-y-scroll shadffow-xl drofp-shadow-xl scrollbar-hide'>
              {
                allChannel.map((item) => (
                  <button onClick={() => joinchanle(item)} className="h-16 mt-3 w-full p-2 bg-white justify-between items-center inline-flex  hover:shadow-lg   border border-sky-500  hover:bg-sky-100 duration-1000  transition shahydow-md rounded-[20px] ">
                    <div className="h-auto  justify-start items-center gap-2.5 flex">
                      <img className="w-12 h-12 rounded-full" src={'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_640.png'} />
                      <div className="   flex flex-col justify-center items-start space-y-1 ">
                        <h4 className="  hidden md:flex text-lg md:text-md">{item.name}</h4>
                      </div>
                    </div>
                    <div className="flex justify-end items-center">
                      {item.type == 'protected' && <img className='w-6 h-6' src="https://cdn3.iconfinder.com/data/icons/security-187/64/privacy-512.png" alt="" />}
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
                <button onClick={() => setRoom(item)} className={`h-20 mt-3 w-full md:p-2 ${item.id == Room.id ? 'md:bg-blue-300 md:shadow-lg md:shadowf-black ' : 'md:bg-white md:hover:shadow-lg md:hover:bg-sky-100 '}  justify-between items-center inline-flex    md:border border-sky-500   duration-1000  transition shahydow-md rounded-xl`}>

                  <div className={`  ${item.type == 'protected' ? '-space-x-7 md:space-x-2'  : null} flex flex-row`}>

                    <div className="h-auto w-full  justify-start items-center gap-2.5 flex">
                      <img className={`w-20 h-20   sm:h-20   sm:w-20  ${item.id == Room.id ? ' md:border-0 border-4 border-sky-500  ' : ' md:border-0 border-4 border-white '} shadow-md shadodw-black md:w-16 md:h-16 rounded-full`} src={'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_640.png'} />
                      <div className="   flex flex-col justify-center items-start space-y-1 ">

                        <h4 className="  hidden md:flex text-lg md:text-md">{item.name}</h4>
                      </div>
                    </div>
                    <div className="flex justify-end bg-lack   mt-12 md:mt-0    z-10 items-center">
                      {item.type == 'protected' && <img className='w-6     z-10 h-6' src="https://cdn3.iconfinder.com/data/icons/security-187/64/privacy-512.png" alt="" />}


                    </div>
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