import UserBox from '@/components/chat/UserBox';
import { AppProps, userProps } from '@/interface/data';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function Chat({ onlineUsersss, currentUser, users, amis }: AppProps) {
  const [socket, setSocket] = useState<any>()
  const [value, setvalue] = useState<any>()
  const [value2, setvalue2] = useState<any>()
  const [value3, setvalue3] = useState<any>()
  const [messgae, setmessgae] = useState<any>()

  const router = useRouter();
  const [isLoding, setIsLoding] = useState(false);



  useEffect(() => {
    // console.log()
    // console.log(currentUser)
    try {

      const newSocket = io('http://localhost:9000', {
        query: {
          myname: currentUser.username
        }
      })

      setSocket(newSocket)

      newSocket.on("message", (nem: string) => {
        console.log(nem)
        setmessgae(nem)
      })
      return () => {
        newSocket.disconnect();
      };
    } catch (error) {

    }
  }, [currentUser])

  // useEffect(() => {

  // })

  const handelMesssage = (event: any) => {
    try {

      socket.emit("message", { msg: value, usr: event.target.value })
    } catch (error) {

    }
  }


  const handelRoom = (event: any) => {
    try {

      socket.emit("room", { room: value2, usr: event.target.value })
    } catch (error) {

    }
  }

  const handelRoomMessage = (event: any) => {
    try {

      console.log("value = ", value3);
      socket.emit("roomMessage", { roomMessage: value3, usr: event.target.value })
    } catch (error) {

    }
  }


  return (
    <>

      <div className="p-3">
        <h1 className=''>all users</h1>
        {
          (users.length) ? users.map((user: userProps) => (

            <div key={user.id} className='flex bg-[#0ea5e9] w-[100%]  rounded-xl items-center justify-between p-2'>
              <img
                src={user.foto_user}
                alt="Your Image Alt Text"
                className="w-20 h-auto  rounded-full inline-block" // Adjust the width as needed
              />
              <span className='rounded-2xl   '>{`${user.username}`}</span>
              <input onChange={(e) => setvalue(e.target.value)} className='p-2 rounded-lg outline-black outline'></input>
              <button value={user.username} onClick={handelMesssage} className='bg-blue-200 p-3 rounded-xl'>send</button>
            </div>
          )) : null
        }
        <h1 className='bg-blue-200 w-20 p-3 rounded-lg m-4'>{messgae}</h1>

      </div >
      <div className='space-x-5'>
        <button value={currentUser.username} onClick={handelRoom} className='bg-blue-200 p-3 rounded-xl'>room</button>
        <input onChange={(e) => setvalue2(e.target.value)} className='p-2 rounded-lg outline-black outline'></input>
        <input onChange={(e) => setvalue3(e.target.value)} className='p-2 rounded-lg outline-black outline'></input>
        <button value={currentUser.username} onClick={handelRoomMessage} className='bg-blue-200 p-3 rounded-xl'>sendRoom</button>
      </div>
3    </>
  );
}
export default Chat;