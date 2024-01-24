import React, { useEffect, useState } from 'react'
import Createchannels from './createChannels'
import { userProps, channelData, channelProps } from '@/interface/data'
import { Constant } from '@/constants/constant'

export default function ChannelsConversationList({ msg2, users, setRoom, setjoinchannel, Room, setJoinRoom }: { msg2: string, users: userProps[], setRoom: (value: channelProps) => void, setjoinchannel: (value: boolean) => void, Room: channelProps, setJoinRoom: (value: channelProps) => void, }) {

  const [click, setClick] = useState('')
  const [channel, setChannel] = useState<channelProps[]>([]);
  const [allChannel, setAllchannel] = useState<channelProps[]>([]);


  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(`${Constant.API_URL}/chat/allChannelByUserId`, {
            credentials: 'include',
          })
          const content = await response.json();
          setChannel(Array.from(content))
        } catch (error) {

        }
      }
    )();
  }, [click, msg2]);
  const joinchanle = async (item: any) => {
    setJoinRoom(item)
    setjoinchannel(true)

  }
  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(`${Constant.API_URL}/chat/allChannel`, {
            credentials: 'include',
          })
          const content = await response.json();
          setAllchannel(Array.from(content))
        } catch (error) {

        }
      }
    )();
  }, [click, allChannel]);

  useEffect(() => {

    setRoom(channelData)

  }, [click])


  return (
    <div className=' w-full h-full flex justify-start items-center flex-col'>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M8.46002 8.28978C8.27172 8.09617 8.01422 7.98529 7.74416 7.98154C7.47411 7.97779 7.21363 8.08147 7.02002 8.26978C6.82641 8.45808 6.71554 8.71558 6.71179 8.98564C6.70804 9.25569 6.81172 9.51617 7.00002 9.70978L9.34002 11.9998L7.00002 14.2898C6.90629 14.3827 6.8319 14.4933 6.78113 14.6152C6.73036 14.7371 6.70422 14.8678 6.70422 14.9998C6.70422 15.1318 6.73036 15.2625 6.78113 15.3844C6.8319 15.5062 6.90629 15.6168 7.00002 15.7098C7.09298 15.8035 7.20359 15.8779 7.32545 15.9287C7.4473 15.9794 7.57801 16.0056 7.71002 16.0056C7.84203 16.0056 7.97274 15.9794 8.0946 15.9287C8.21646 15.8779 8.32706 15.8035 8.42002 15.7098L11.42 12.7098C11.5138 12.6168 11.5881 12.5062 11.6389 12.3844C11.6897 12.2625 11.7158 12.1318 11.7158 11.9998C11.7158 11.8678 11.6897 11.7371 11.6389 11.6152C11.5881 11.4933 11.5138 11.3827 11.42 11.2898L8.46002 8.28978ZM16.96 11.2898L13.96 8.28978C13.7717 8.10147 13.5163 7.99569 13.25 7.99569C12.9837 7.99569 12.7283 8.10147 12.54 8.28978C12.3517 8.47808 12.2459 8.73348 12.2459 8.99978C12.2459 9.26608 12.3517 9.52147 12.54 9.70978L14.84 11.9998L12.54 14.2898C12.4463 14.3827 12.3719 14.4933 12.3211 14.6152C12.2704 14.7371 12.2442 14.8678 12.2442 14.9998C12.2442 15.1318 12.2704 15.2625 12.3211 15.3844C12.3719 15.5062 12.4463 15.6168 12.54 15.7098C12.633 15.8035 12.7436 15.8779 12.8654 15.9287C12.9873 15.9794 13.118 16.0056 13.25 16.0056C13.382 16.0056 13.5127 15.9794 13.6346 15.9287C13.7565 15.8779 13.8671 15.8035 13.96 15.7098L16.96 12.7098C17.0564 12.6195 17.134 12.511 17.1882 12.3906C17.2424 12.2701 17.2723 12.1401 17.276 12.0081C17.2797 11.8761 17.2572 11.7446 17.2099 11.6213C17.1625 11.498 17.0912 11.3854 17 11.2898H16.96Z" fill="white" />
            </svg>
            <h1 className="hidden md:flex text-lg md:text-md lg:">Start New Channel</h1>

          </div>
        </button>}

      <div className='overflow-y-scrdoll scrolldbar-hide bfg-blue-500 h-[80%] w-full'>
        {
          click == 'create' &&
          <div className=" bg-white max-w-96 h-auto  dark:bg-sky-400 flex-col items-center justify-center rounded-xl border border-sky-200">
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
            <Createchannels users={users} setClick={setClick} />
          </div>}

        {click == 'start' && <div className=" fbg-sky-300 w-full h-full flex  flex-col items-cfenter justify-cefnter shadowf-xl drop-shadow-fxl   rounded-2xl">
          <div className=" bfg-slate-600 w-full  mt-2 ml-3 ">
            <button onClick={() => setClick('')} className="w-6 h-6 -mt-3 z-20  rounded-full">
              <img className=' -mt-12 ' src='https://cdn-icons-png.flaticon.com/512/66/66847.png'></img>
            </button>
            <div className=' bg-blgack rounded-2xl flex flex-col h-[670px]  -mt-6 overflow-y-scroll shadffow-xl drofp-shadow-xl scrollbar-hide'>
              {
                allChannel.length  != 0 ? <div> {
                  allChannel.map((item, index) => (
                    <button key={index} onClick={() => joinchanle(item)} className="h-16 mt-3 w-full p-2 bg-white justify-between items-center inline-flex  hover:shadow-lg   border border-sky-500  hover:bg-sky-100 duration-1000  transition shahydow-md rounded-[20px] ">
                      <div className="h-auto  justify-start items-center gap-2.5 flex">
                        <div className={`flex justify-center items-center w-12 h-12 rounded-full border-2 border-sky-500 ${item.type == 'public' && ' bg-amber-300'}  ${item.type == 'private' && 'bg-sky-500'}  ${item.type == 'protected' && ' bg-red-500'}`} >
                          <h1 className='flex items-center justify-center text-[40px] font-bold text-white'>{item.name[0].toUpperCase()}</h1>
                        </div>                      <div className="   flex flex-col justify-center items-start space-y-1 ">
                          <h4 className="  hidden md:flex text-lg md:text-md">{item.name}</h4>
                        </div>
                      </div>
                      <div className="flex justify-end items-center">
                        {item.type == 'protected' && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 20" fill="none">
                          <path d="M8 11C7.69555 10.9964 7.39732 11.0862 7.14544 11.2573C6.89357 11.4284 6.70015 11.6725 6.59121 11.9568C6.48228 12.2411 6.46306 12.552 6.53615 12.8476C6.60923 13.1431 6.77111 13.4092 7 13.61V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V13.61C9.22889 13.4092 9.39077 13.1431 9.46385 12.8476C9.53694 12.552 9.51772 12.2411 9.40879 11.9568C9.29985 11.6725 9.10643 11.4284 8.85456 11.2573C8.60268 11.0862 8.30445 10.9964 8 11ZM13 7V5C13 3.67392 12.4732 2.40215 11.5355 1.46447C10.5979 0.526784 9.32608 0 8 0C6.67392 0 5.40215 0.526784 4.46447 1.46447C3.52678 2.40215 3 3.67392 3 5V7C2.20435 7 1.44129 7.31607 0.87868 7.87868C0.316071 8.44129 0 9.20435 0 10V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V10C16 9.20435 15.6839 8.44129 15.1213 7.87868C14.5587 7.31607 13.7956 7 13 7ZM5 5C5 4.20435 5.31607 3.44129 5.87868 2.87868C6.44129 2.31607 7.20435 2 8 2C8.79565 2 9.55871 2.31607 10.1213 2.87868C10.6839 3.44129 11 4.20435 11 5V7H5V5ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V10C2 9.73478 2.10536 9.48043 2.29289 9.29289C2.48043 9.10536 2.73478 9 3 9H13C13.2652 9 13.5196 9.10536 13.7071 9.29289C13.8946 9.48043 14 9.73478 14 10V17Z" fill="black" />
                        </svg>}
                        {item.type == 'private' && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                          <path d="M17 9V7C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2C10.6739 2 9.40215 2.52678 8.46447 3.46447C7.52678 4.40215 7 5.67392 7 7V9C6.20435 9 5.44129 9.31607 4.87868 9.87868C4.31607 10.4413 4 11.2044 4 12V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V12C20 11.2044 19.6839 10.4413 19.1213 9.87868C18.5587 9.31607 17.7956 9 17 9ZM9 7C9 6.20435 9.31607 5.44129 9.87868 4.87868C10.4413 4.31607 11.2044 4 12 4C12.7956 4 13.5587 4.31607 14.1213 4.87868C14.6839 5.44129 15 6.20435 15 7V9H9V7ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V12C6 11.7348 6.10536 11.4804 6.29289 11.2929C6.48043 11.1054 6.73478 11 7 11H17C17.2652 11 17.5196 11.1054 17.7071 11.2929C17.8946 11.4804 18 11.7348 18 12V19Z" fill="black" />
                        </svg>}
                        {item.type == 'public' && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                          <path d="M17 8.99992H9V6.99992C8.99854 6.40611 9.17334 5.82522 9.50226 5.33082C9.83118 4.83643 10.2994 4.45077 10.8477 4.22268C11.3959 3.99459 11.9996 3.93435 12.5821 4.04957C13.1646 4.16479 13.6999 4.45029 14.12 4.86992C14.4959 5.25399 14.7649 5.72975 14.9 6.24992C14.9328 6.3773 14.9904 6.49697 15.0695 6.60209C15.1486 6.70721 15.2476 6.79573 15.3609 6.86259C15.4742 6.92945 15.5995 6.97334 15.7298 6.99175C15.86 7.01017 15.9926 7.00275 16.12 6.96992C16.2474 6.93709 16.3671 6.87949 16.4722 6.80041C16.5773 6.72133 16.6658 6.62232 16.7327 6.50904C16.7995 6.39575 16.8434 6.2704 16.8618 6.14015C16.8802 6.0099 16.8728 5.8773 16.84 5.74992C16.6122 4.88472 16.1603 4.09486 15.53 3.45992C14.8302 2.76229 13.9393 2.28766 12.97 2.09596C12.0006 1.90427 10.9961 2.00411 10.0835 2.38288C9.17078 2.76164 8.3908 3.40235 7.84201 4.22409C7.29321 5.04584 7.00021 6.01177 7 6.99992V8.99992C6.20435 8.99992 5.44129 9.31599 4.87868 9.8786C4.31607 10.4412 4 11.2043 4 11.9999V18.9999C4 19.7956 4.31607 20.5586 4.87868 21.1212C5.44129 21.6838 6.20435 21.9999 7 21.9999H17C17.7956 21.9999 18.5587 21.6838 19.1213 21.1212C19.6839 20.5586 20 19.7956 20 18.9999V11.9999C20 11.2043 19.6839 10.4412 19.1213 9.8786C18.5587 9.31599 17.7956 8.99992 17 8.99992ZM18 18.9999C18 19.2651 17.8946 19.5195 17.7071 19.707C17.5196 19.8946 17.2652 19.9999 17 19.9999H7C6.73478 19.9999 6.48043 19.8946 6.29289 19.707C6.10536 19.5195 6 19.2651 6 18.9999V11.9999C6 11.7347 6.10536 11.4803 6.29289 11.2928C6.48043 11.1053 6.73478 10.9999 7 10.9999H17C17.2652 10.9999 17.5196 11.1053 17.7071 11.2928C17.8946 11.4803 18 11.7347 18 11.9999V18.9999Z" fill="black" />
                        </svg>}                    </div>
                    </button>
                  ))}</div> : <div>no select channel</div>
              }
            </div>
          </div>
        </div>}

        {
          click == '' &&
          <div className="  bg-sdlate-600 borhder bogjrder-sky-500  flex  flex-col items-center justify-start h-[580px]  mt-1  overflow-y-scroll shadffow-xl drofp-shadow-xl scrollbar-hide">
            {
              channel.map((item, index) => (
                <button key={index} onClick={() => setRoom(item)} className={`h-20 mt-3 w-full md:p-2 ${item.id == Room.id ? 'md:bg-blue-300 md:shadow-lg md:shadowf-black ' : 'md:bg-white md:hover:shadow-lg md:hover:bg-sky-100 '}  justify-between items-center inline-flex    md:border border-sky-500   duration-1000  transition shahydow-md rounded-xl`}>

                  <div className={`  ${item.type == 'protected' ? '-space-x-7 md:space-x-2' : null} flex flex-row`}>

                    <div className="h-auto w-full  justify-start items-center gap-2.5 flex">
                      <div className={`flex justify-center items-center w-14 h-14 rounded-full ${item.type == 'public' && ' bg-amber-300'}  ${item.type == 'private' && 'bg-sky-500'}  ${item.type == 'protected' && ' bg-red-500'}`} >
                        <h1 className='flex items-center justify-center text-[40px] font-bold text-white'>{item.name[0].toUpperCase()}</h1>
                      </div>                      <div className="   flex flex-col justify-center items-start space-y-1 ">

                        <h4 className={`${Room.id ? 'hidden md:flex' : null} text-lg md:text-md`}>{item.name}</h4>
                      </div>
                    </div>
                    <div className="flex justify-end bg-lack   mt-12 md:mt-0    z-10 items-center">
                      {item.type == 'protected' && <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 20" fill="none">
                        <path d="M8 11C7.69555 10.9964 7.39732 11.0862 7.14544 11.2573C6.89357 11.4284 6.70015 11.6725 6.59121 11.9568C6.48228 12.2411 6.46306 12.552 6.53615 12.8476C6.60923 13.1431 6.77111 13.4092 7 13.61V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V13.61C9.22889 13.4092 9.39077 13.1431 9.46385 12.8476C9.53694 12.552 9.51772 12.2411 9.40879 11.9568C9.29985 11.6725 9.10643 11.4284 8.85456 11.2573C8.60268 11.0862 8.30445 10.9964 8 11ZM13 7V5C13 3.67392 12.4732 2.40215 11.5355 1.46447C10.5979 0.526784 9.32608 0 8 0C6.67392 0 5.40215 0.526784 4.46447 1.46447C3.52678 2.40215 3 3.67392 3 5V7C2.20435 7 1.44129 7.31607 0.87868 7.87868C0.316071 8.44129 0 9.20435 0 10V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V10C16 9.20435 15.6839 8.44129 15.1213 7.87868C14.5587 7.31607 13.7956 7 13 7ZM5 5C5 4.20435 5.31607 3.44129 5.87868 2.87868C6.44129 2.31607 7.20435 2 8 2C8.79565 2 9.55871 2.31607 10.1213 2.87868C10.6839 3.44129 11 4.20435 11 5V7H5V5ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V10C2 9.73478 2.10536 9.48043 2.29289 9.29289C2.48043 9.10536 2.73478 9 3 9H13C13.2652 9 13.5196 9.10536 13.7071 9.29289C13.8946 9.48043 14 9.73478 14 10V17Z" fill="black" />
                      </svg>}
                      {item.type == 'private' && <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none">
                        <path d="M17 9V7C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2C10.6739 2 9.40215 2.52678 8.46447 3.46447C7.52678 4.40215 7 5.67392 7 7V9C6.20435 9 5.44129 9.31607 4.87868 9.87868C4.31607 10.4413 4 11.2044 4 12V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V12C20 11.2044 19.6839 10.4413 19.1213 9.87868C18.5587 9.31607 17.7956 9 17 9ZM9 7C9 6.20435 9.31607 5.44129 9.87868 4.87868C10.4413 4.31607 11.2044 4 12 4C12.7956 4 13.5587 4.31607 14.1213 4.87868C14.6839 5.44129 15 6.20435 15 7V9H9V7ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V12C6 11.7348 6.10536 11.4804 6.29289 11.2929C6.48043 11.1054 6.73478 11 7 11H17C17.2652 11 17.5196 11.1054 17.7071 11.2929C17.8946 11.4804 18 11.7348 18 12V19Z" fill="black" />
                      </svg>}
                      {item.type == 'public' && <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none">
                        <path d="M17 8.99992H9V6.99992C8.99854 6.40611 9.17334 5.82522 9.50226 5.33082C9.83118 4.83643 10.2994 4.45077 10.8477 4.22268C11.3959 3.99459 11.9996 3.93435 12.5821 4.04957C13.1646 4.16479 13.6999 4.45029 14.12 4.86992C14.4959 5.25399 14.7649 5.72975 14.9 6.24992C14.9328 6.3773 14.9904 6.49697 15.0695 6.60209C15.1486 6.70721 15.2476 6.79573 15.3609 6.86259C15.4742 6.92945 15.5995 6.97334 15.7298 6.99175C15.86 7.01017 15.9926 7.00275 16.12 6.96992C16.2474 6.93709 16.3671 6.87949 16.4722 6.80041C16.5773 6.72133 16.6658 6.62232 16.7327 6.50904C16.7995 6.39575 16.8434 6.2704 16.8618 6.14015C16.8802 6.0099 16.8728 5.8773 16.84 5.74992C16.6122 4.88472 16.1603 4.09486 15.53 3.45992C14.8302 2.76229 13.9393 2.28766 12.97 2.09596C12.0006 1.90427 10.9961 2.00411 10.0835 2.38288C9.17078 2.76164 8.3908 3.40235 7.84201 4.22409C7.29321 5.04584 7.00021 6.01177 7 6.99992V8.99992C6.20435 8.99992 5.44129 9.31599 4.87868 9.8786C4.31607 10.4412 4 11.2043 4 11.9999V18.9999C4 19.7956 4.31607 20.5586 4.87868 21.1212C5.44129 21.6838 6.20435 21.9999 7 21.9999H17C17.7956 21.9999 18.5587 21.6838 19.1213 21.1212C19.6839 20.5586 20 19.7956 20 18.9999V11.9999C20 11.2043 19.6839 10.4412 19.1213 9.8786C18.5587 9.31599 17.7956 8.99992 17 8.99992ZM18 18.9999C18 19.2651 17.8946 19.5195 17.7071 19.707C17.5196 19.8946 17.2652 19.9999 17 19.9999H7C6.73478 19.9999 6.48043 19.8946 6.29289 19.707C6.10536 19.5195 6 19.2651 6 18.9999V11.9999C6 11.7347 6.10536 11.4803 6.29289 11.2928C6.48043 11.1053 6.73478 10.9999 7 10.9999H17C17.2652 10.9999 17.5196 11.1053 17.7071 11.2928C17.8946 11.4803 18 11.7347 18 11.9999V18.9999Z" fill="black" />
                      </svg>}

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