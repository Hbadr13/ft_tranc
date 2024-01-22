import EditChannel from "@/components/chat/channels/editChannel";
import Conversation from "@/components/chat/conversation";
import ConversationList from "@/components/chat/conversationList";
import Edit from "@/components/chat/direct/edit";
import { AppProps, channelProps, messageProps, participantsProps, userData, userProps } from '@/interface/data';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";

export default function index({ users, amis }: AppProps) {
  const [currentUser, setCurrentUser] = useState<userProps>(userData);
  const channelData = { id: 0, type: "", name: "", password: "" }
  const [Room, setRoom] = useState<channelProps>(channelData);
  const [joinRoom, setJoinRoom] = useState<channelProps>(channelData);

  const [Receiver, setReceiver] = useState<userProps>(userData);
  const [button, setButton] = useState(false);

  const [joinchannel, setjoinchannel] = useState(false);
  const [status_tow_user, setStatus_Tow_User] = useState(false);
  const [chatSocket, setChatSocket] = useState<any>();
  const [status, setstatus] = useState<any>('');
  const [password, setPassword] = useState(null)
  const [correct, setcorrcet] = useState(0)
  const [myStatusInRoom, setMyStatusInRoom] = useState<participantsProps>()
  const [msg2, setMsg2] = useState('')
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
  const joinchanle = async () => {
    console.log("__________________________")
    try {
      const response = await fetch(`http://localhost:3333/chat/joinChannel/${currentUser.id}/${joinRoom.id}/${password}`, {
        method: 'POST',

        credentials: 'include',

      })
      // const content = await response.json();
      if (response.status == 201) {
        setjoinchannel(false)
        setcorrcet(0)
      }
      else {
        setcorrcet(1)

      }
    } catch (error) {

    }
  }
  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(`http://localhost:3333/chat/statusChatTwoUser/${currentUser.id}/${Receiver.id}`, {
            credentials: 'include',
          });
          const content = await response.json();
          // setstatus(content)
          if (content.status == "accepted" || !content)
            setStatus_Tow_User(false)
          else
            setStatus_Tow_User(true);


        } catch (error) {

        }
      }
    )();

  }, [currentUser.id, Receiver, status_tow_user]);

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
    setcorrcet(0)
  }, [button]);
  useEffect(() => {
    // setRoom(channelData);
    // setReceiver(userData)
    setcorrcet(0)
  }, [Room]);
  // useEffect(() => {
  //   // setRoom(channelData);
  //   // setReceiver(userData)

  // setStatus_Tow_User(false)
  // }, [Receiver]);
  // useEffect(() => {
  //   // setRoom(channelData);
  //   // setReceiver(userData)
  //   setStatus_Tow_User(false)
  //   // setcorrcet(0)
  // }, [currentUser.id, Receiver]);




  return (
    <div className="  flex  flex-col">
      <div className={` bg-bldack flex-uwrap  ${joinchannel == true ? 'blur-sm' : null} min-w-full mt-6 min-h-screen flex flex-row justify-centder items-csenter dark:bg-black space-x-2 sm:space-x-6`}>
        <ConversationList msg2={msg2} amis={amis} setReceiver={setReceiver} Receiver={Receiver} setButton={setButton} currentUser={currentUser} users={users} setRoom={setRoom} setjoinchannel={setjoinchannel} setStatus_Tow_User={setStatus_Tow_User} status_tow_user={status_tow_user} Room={Room} setJoinRoom={setJoinRoom} />
        <Conversation setMsg2={setMsg2} users={users} setMyStatusInRoom={setMyStatusInRoom} chatSocket={chatSocket} Receiver={Receiver} button={button} Room={Room} currentUser={currentUser} setStatus_Tow_User={setStatus_Tow_User} status_tow_user={status_tow_user} />
        {button == false && Receiver.id != 0 &&
          <div className="md:hidaden sm:hidsden hidden  bg-gray-100 dark:bg-slate-800 p-2  mt-12  w-[20%] h-[820px]      lg:flex justify-start items-start   border-2  border-sky-400 rounded-xl">
            <div className="w-full h-[547.06px] flex-col justify-start items-center  bg-blwack  gasp-[26px] flex">
              <Edit currentUser={currentUser} Receiver={Receiver} setStatus_Tow_User={setStatus_Tow_User} status_tow_user={status_tow_user} />
            </div>
          </div>}
        {button == true && Room.id != 0 &&
          <div className=' lg:flex bg-gray-100  hidden flex-col  w-[20%] h-[820px]  items-center  mt-12 border-2  border-sky-400 rounded-xl  '>
            <EditChannel users={users} setMyStatusInRoom={setMyStatusInRoom} currentUser={currentUser} Room={Room} />
          </div>}
      </div>
      <div>
        {

          joinchannel == true ?
            (
              <>
                {
                  joinRoom.type === "protected" && < div className="flex   items-center -mt-[900px] ssm:-mt-[900px] xl:-mt-[900px] mdl-12 justify-center min-h-screen sm:bg-bldack  md:bg-gdray-700 md:-mt-[800px]  xl:bg-dblue-600 min-w-screen  z-20  bg-sslate-400">

                    <div className=" bg-white md:w-[400px]   flex flex-col  justify-strt items-center  sm:w-[400px]   h-80 w-96  drop-shadow shadow-lg shaddow-black  rounded-xl -mst-[1000px] md:-mst-[700px] z-20 text-blue-600 ml-10 md:mdl-[600px]">
                      {/* <div className='text-blue-500 text-xl mt-8  mr-44  font-black' >Confirm logout </div> */}
                      <div className="w-full flex bg-bdlack justify-end items-end ">

                        <button onClick={() => setjoinchannel(false)} className="w-8  mr-2   justify-center items-center bg-white flex shadow-sm  mt-2 mer-4 h-8 shadow-black  bg-bklack  rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                          </svg>
                        </button>
                      </div>
                      <div className=" flex justify-center items-center w-16 h-16 rounded-full bg-white  mt-1 drop-shadow shadow-lg shaddow-black ">

                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                          <g fill="#1437be" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" > <g transform="scale(8.53333,8.53333)"><path d="M15,2c-3.85433,0 -7,3.14567 -7,7v2h-2c-1.105,0 -2,0.895 -2,2v12c0,1.105 0.895,2 2,2h18c1.105,0 2,-0.895 2,-2v-12c0,-1.105 -0.895,-2 -2,-2h-2v-2c0,-3.72842 -2.96342,-6.73143 -6.64453,-6.92773c-0.11309,-0.04556 -0.23356,-0.07005 -0.35547,-0.07227zM15,4c2.77367,0 5,2.22633 5,5v2h-10v-2c0,-2.77367 2.22633,-5 5,-5z"></path></g></g>
                        </svg>
                      </div>
                      {/* <div className=' w-96 hd-2 border-2 mt-5' > </div> */}
                      <div className='text-black text-xl mt-3  mel-16   flex justify-center items-center w-full font-black' >This groub  is password  protected </div>
                      {
                        correct == 0 && <div className='text-[#9ca3af] text-sm mt-2  mel-16   flex justify-center items-center w-full fontd-black' >Please enter the password to view  this groub</div>

                      }
                      {
                        correct == 1 && <div className='text-red-400 text-sm mt-2  mel-16   flex justify-center items-center w-full fontd-black' > password  is invalid </div>

                      }
                      {/* <div className=""> */}
                      <input required onChange={(e: any) => setPassword(e.target.value)} className="p-2 rounfded-xl text-base  text-blue-600 font-black disabled:opacity-75  mt-6 border-b-4 border-blue-600 w-80 h-10  w-fulgl" type="password" name="password" placeholder="Password" />

                      {/* </div> */}
                      <div className=' w-96 h-16 fbg-black mt-3 flex flex-row justify-center items-center space-x-6 '>
                        <button onClick={() => joinchanle()} className=' text-white  bg-blue-600 w-80  flex justify-center items-center  bordfer-2 bofrder-blue-600 h-10 rounded-full'>
                          <div className=" text-white text-xl font-black">Submit</div>
                        </button>


                      </div>
                    </div>
                  </div>
                }
                {
                  joinRoom.type === "public" && < div className="flex   items-center -mt-[900px] ssm:-mt-[900px] xl:-mt-[900px] mdl-12 justify-center min-h-screen sm:bg-bldack  md:bg-gdray-700 md:-mt-[800px]  xl:bg-dblue-600 min-w-screen  z-20  bg-sslate-400">

                    <div className=" bg-white md:w-[400px]   flex flex-col  justify-strt items-center  sm:w-[400px]   h-80 w-96  drop-shadow shadow-lg shaddow-black  rounded-xl -mst-[1000px] md:-mst-[700px] z-20 text-blue-600 ml-10 md:mdl-[600px]">
                      {/* <div className='text-blue-500 text-xl mt-8  mr-44  font-black' >Confirm logout </div> */}
                      <div className=" flex justify-center items-center w-16 h-16 rounded-full bg-white  mt-10 drop-shadow shadow-lg shaddow-black ">

                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                          <g fill="#1437be" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(10.66667,10.66667)"><path d="M12,0c-3.30078,0 -6,2.69922 -6,6v2h2v-2c0,-2.21875 1.78125,-4 4,-4c2.21875,0 4,1.78125 4,4v5h-13v13h18v-13h-3v-5c0,-3.30078 -2.69922,-6 -6,-6z"></path></g></g>
                        </svg>
                      </div>
                      <div className='text-black text-xl mt-3  mel-16   flex justify-center items-center w-full font-black' >Confirm {Room.name}</div>
                      <div className='text-[#9ca3af] text-sm mt-2  mel-16   flex justify-center items-center w-full fontd-black' >Are you sure ?</div>

                      <div className=' w-96  fbg-black mt-3 flex flex-col justify-center items-center space-y-3 '>
                        <button onClick={() => setjoinchannel(false)} className=' text-black  bg-[#9ca3af]  w-80  h-12  flex justify-center items-center  bordfer-2 bofrder-blue-600  rounded-full'>
                          <div className=" text-black text-xl    flex justify-center items-center  font-mono">Cancel</div>
                        </button>
                        <button onClick={() => joinchanle()} className=' text-white   h-12 bg-blue-600 w-80  flex justify-center items-center  bordfer-2 bofrder-blue-600  rounded-full'>
                          <div className=" text-white  flex justify-center items-center text-xl font-mono">Accpet</div>
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