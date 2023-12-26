import EditChannel from "@/components/chat/channels/editChannel";
import Conversation from "@/components/chat/conversation";
import ConversationList from "@/components/chat/conversationList";
import Edit from "@/components/chat/edit";
import { AppProps, channelProps, messageProps, userProps } from '@/interface/data';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";

export default function index({ users, amis }: AppProps) {
  const userData = { id: 0, createdAt: "", updatedAt: "", email: "", hash: "", username: "", firstName: "", lastName: "", foto_user: "", isOnline: false, userId: 0, flag: false, flag1: false, room: '', won: 0, lost: 0, level: 0 }
  const channelData = { id: 0, type: "", name: "" }
  const [currentUser, setCurrentUser] = useState<userProps>(userData);
  const [Room, setRoom] = useState<channelProps>(channelData);
  const [Receiver, setReceiver] = useState<userProps>(userData);
  const [button, setButton] = useState(false);
  const [joinchannel, setjoinchannel] = useState(false);
  const [chatSocket, setChatSocket] = useState<any>();
  const [messsage, setMessage] = useState<messageProps>()

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch('http://localhost:3333/auth/user', {
            credentials: 'include',
          });
          const content = await response.json();
          setCurrentUser(content)
        } catch (error) {

        }
      }
    )();
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:3333/ChatGateway', {
      query: {
        userId: currentUser.id,
      }
    });

    setChatSocket(socket)
    return () => {
      socket.disconnect();
    };
  }, [currentUser]);
  useEffect(() => {
    setRoom(channelData);
    setReceiver(userData)
  }, [button]);

  return (
    <div className=" flex  flex-col">
      <div className={` bg-bldack flex-uwrap  ${joinchannel == true ? 'blur-sm' : null} min-w-full mt-6 min-h-screen flex flex-row justify-center items-center dark:bg-black space-x-6`}>
        <ConversationList amis={amis} setReceiver={setReceiver} setButton={setButton} currentUser={currentUser} users={users} setRoom={setRoom} setjoinchannel={setjoinchannel} />
        <Conversation chatSocket={chatSocket} Receiver={Receiver} button={button} Room={Room} currentUser={currentUser} />
        {button == false && Receiver.id != 0 && <Edit currentUser={currentUser} Receiver={Receiver} />}
        {button == true && Room.id != 0 && <EditChannel Room={Room} />}
      </div>
      <div>
        {

          joinchannel == true ?
            (
              <>
                {
                    Room.type === "protected" && < div className="flex   items-center -mt-[900px] ssm:-mt-[900px] xl:-mt-[900px] mdl-12 justify-center min-h-screen sm:bg-bldack  md:bg-gdray-700 md:-mt-[800px]  xl:bg-dblue-600 min-w-screen  z-20  bg-sslate-400">

                    <div className=" bg-white md:w-[400px]   flex flex-col  justify-strt items-center  sm:w-[400px]   h-80 w-96  drop-shadow shadow-lg shaddow-black  rounded-xl -mst-[1000px] md:-mst-[700px] z-20 text-blue-600 ml-10 md:mdl-[600px]">
                      {/* <div className='text-blue-500 text-xl mt-8  mr-44  font-black' >Confirm logout </div> */}
                      <div className=" flex justify-center items-center w-16 h-16 rounded-full bg-white  mt-10 drop-shadow shadow-lg shaddow-black ">

                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                          <g fill="#1437be" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" > <g transform="scale(8.53333,8.53333)"><path d="M15,2c-3.85433,0 -7,3.14567 -7,7v2h-2c-1.105,0 -2,0.895 -2,2v12c0,1.105 0.895,2 2,2h18c1.105,0 2,-0.895 2,-2v-12c0,-1.105 -0.895,-2 -2,-2h-2v-2c0,-3.72842 -2.96342,-6.73143 -6.64453,-6.92773c-0.11309,-0.04556 -0.23356,-0.07005 -0.35547,-0.07227zM15,4c2.77367,0 5,2.22633 5,5v2h-10v-2c0,-2.77367 2.22633,-5 5,-5z"></path></g></g>
                        </svg>
                      </div>
                      {/* <div className=' w-96 hd-2 border-2 mt-5' > </div> */}
                      <div className='text-black text-xl mt-3  mel-16   flex justify-center items-center w-full font-black' >This groub  is password  protected </div>
                      <div className='text-[#9ca3af] text-sm mt-2  mel-16   flex justify-center items-center w-full fontd-black' >Please enter the password to view  this groub</div>
                      {/* <div className=""> */}
                      <input required className="p-2 rounfded-xl text-base  text-blue-600 font-black disabled:opacity-75  mt-6 border-b-4 border-blue-600 w-80 h-10  w-fulgl" type="password" name="password" placeholder="Password" />

                      {/* </div> */}
                      <div className=' w-96 h-16 fbg-black mt-3 flex flex-row justify-center items-center space-x-6 '>
                        <button className=' text-white  bg-blue-600 w-80  flex justify-center items-center  bordfer-2 bofrder-blue-600 h-10 rounded-full'>
                          <div className=" text-white text-xl font-black">Submit</div>
                        </button>


                      </div>
                    </div>
                  </div>
                }
                {
                    Room.type === "public" && < div className="flex   items-center -mt-[900px] ssm:-mt-[900px] xl:-mt-[900px] mdl-12 justify-center min-h-screen sm:bg-bldack  md:bg-gdray-700 md:-mt-[800px]  xl:bg-dblue-600 min-w-screen  z-20  bg-sslate-400">

                    <div className=" bg-white md:w-[400px]   flex flex-col  justify-strt items-center  sm:w-[400px]   h-80 w-96  drop-shadow shadow-lg shaddow-black  rounded-xl -mst-[1000px] md:-mst-[700px] z-20 text-blue-600 ml-10 md:mdl-[600px]">
                      {/* <div className='text-blue-500 text-xl mt-8  mr-44  font-black' >Confirm logout </div> */}
                      <div className=" flex justify-center items-center w-16 h-16 rounded-full bg-white  mt-10 drop-shadow shadow-lg shaddow-black ">

                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                          <g fill="#1437be" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" > <g transform="scale(8.53333,8.53333)"><path d="M15,2c-3.85433,0 -7,3.14567 -7,7v2h-2c-1.105,0 -2,0.895 -2,2v12c0,1.105 0.895,2 2,2h18c1.105,0 2,-0.895 2,-2v-12c0,-1.105 -0.895,-2 -2,-2h-2v-2c0,-3.72842 -2.96342,-6.73143 -6.64453,-6.92773c-0.11309,-0.04556 -0.23356,-0.07005 -0.35547,-0.07227zM15,4c2.77367,0 5,2.22633 5,5v2h-10v-2c0,-2.77367 2.22633,-5 5,-5z"></path></g></g>
                        </svg>
                      </div>
                      {/* <div className=' w-96 hd-2 border-2 mt-5' > </div> */}
                      <div className='text-black text-xl mt-3  mel-16   flex justify-center items-center w-full font-black' >This groub  is password  protected </div>
                      <div className='text-[#9ca3af] text-sm mt-2  mel-16   flex justify-center items-center w-full fontd-black' >Please enter the password to view  this groub</div>
                      {/* <div className=""> */}
                      <input required className="p-2 rounfded-xl text-base  text-blue-600 font-black disabled:opacity-75  mt-6 border-b-4 border-blue-600 w-80 h-10  w-fulgl" type="password" name="password" placeholder="Password" />

                      {/* </div> */}
                      <div className=' w-96 h-16 fbg-black mt-3 flex flex-row justify-center items-center space-x-6 '>
                        <button className=' text-white  bg-blue-600 w-80  flex justify-center items-center  bordfer-2 bofrder-blue-600 h-10 rounded-full'>
                          <div className=" text-white text-xl font-black">Submit</div>
                        </button>


                      </div>
                    </div>
                  </div>
                }
              </>
            ) : null
        }

      </div>
    </div >
  )
}