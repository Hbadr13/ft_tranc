import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '../components/model'
import { useEffect, useId, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { fetchAllAmis, fetchAllUsers, fetchCurrentUser } from '@/hooks/userHooks';
import Image from 'next/image';
import { Open_Sans } from 'next/font/google'
import { userProps } from '@/interface/data';
import { useRouter } from 'next/navigation';
const font = Open_Sans({ subsets: ['latin'] })

export interface CardInvitation {
  currentUser: userProps;
  opponent: userProps;
  handerRefuseButton: () => void;
  handerAcceptButton: () => void;
  hideRequest: boolean;
  myIdFromOpponent: Number
}


export const CardInvitation = ({ currentUser, opponent, handerRefuseButton, hideRequest, myIdFromOpponent, handerAcceptButton }: CardInvitation) => {

  return (<>
    {
      (myIdFromOpponent === Number(currentUser.id)) ?
        (
          <div className={` z-40 absolute w-full h-screen ${hideRequest ? 'flex' : 'hidden'} justify-center items-center`}>
            <div className=' w-[30%] h-[30%] bg-white rounded-3xl shadow-sm shadow-black flex flex-col justify-around items-center'>
              <div className="flex flex-col justify-around items-center border-b-2 border-blue-600  space-y-3">
                <Image className='rounded-full w-24' height={200} width={200} alt={`image:${opponent.username}`} src={opponent.foto_user}></Image>
                <h1>{opponent.username}</h1>
              </div>
              <div className='flex justify-around items-center  w-full'>
                <button onClick={handerRefuseButton} className='m-2 border-2 border-black rounded-xl py-1 px-4'>Refuse</button>
                <button onClick={handerAcceptButton} className='m-2 border-2 border-black rounded-xl py-1 px-4 bg-[#77A6F7]'>Accept</button>
              </div>
            </div>
          </div>
        ) : null
    }
  </>
  )
}


export default function App({ Component, pageProps, router }: AppProps) {
  const isNavbarVisible = !router.asPath.startsWith('/auth/login');
  const isNavbarVisible2 = !router.asPath.startsWith('/register')
  const isNavbarVisible3 = !router.asPath.startsWith('/auth/login')

  const [onlineUsersss, setOnlineUsersss] = useState<Array<number>>([]);
  const [socket, setSocket] = useState<any>();
  const [hideRequest, sethideRequest] = useState<boolean>(true);

  const [query, setquery] = useState("");
  const [myIdFromOpponent, setmyIdFromOpponent] = useState<number>(-2);

  const [users, setUsers] = useState<Array<any>>([]);
  const [currentUser, setCurrentUser] = useState<userProps>({ id: 0, createdAt: "", updatedAt: "", email: "", hash: "", username: "", firstName: "", lastName: "", foto_user: "", isOnline: false, userId: 0, flag: false, });
  const [opponent, setopponent] = useState<userProps>({ id: 0, createdAt: "", updatedAt: "", email: "", hash: "", username: "", firstName: "", lastName: "", foto_user: "", isOnline: false, userId: 0, flag: false, });

  const [amis, setAmis] = useState<any>([])
  const [flag, setflag] = useState<boolean>(true)
  const [pathOfGame, setpathOfGame] = useState<string>('')
  // const router = useRouter()


  fetchCurrentUser({ setCurrentUser })
  fetchAllUsers({ setUsers, query: "", currentUser })
  fetchAllAmis({ setAmis, query, currentUser })

  useEffect(() => {
    if (isNavbarVisible3) {
      (
        async () => {
          const response = await fetch('http://localhost:3333/auth/user', {
            credentials: 'include',
          });
          if (response.status != 200) {
            router.push('/auth/login');
            return;
          }
          const content = await response.json();
        }
      )();
    }
  });



  useEffect(() => {
    const newSocket = io('http://localhost:8001', {
      query: {
        userId: currentUser.id,
        amis: amis,
      },
    });

    setSocket(newSocket);
    newSocket?.on("updateOnlineUsers", (amisOnline: any) => {
      setOnlineUsersss(amisOnline)
    });
    newSocket?.on("areYouReady", ({ OpponentId, currentPlayer, pathOfGame }: { OpponentId: string, currentPlayer: userProps, pathOfGame: string }) => {
      console.log("areYouReady")
      setmyIdFromOpponent(Number(OpponentId))
      setpathOfGame(pathOfGame);
      setopponent(currentPlayer);
      sethideRequest(true)
    });
    return () => {
      newSocket.disconnect();
    };
  }, [currentUser, amis]);

  const modifiedPageProps = {
    ...pageProps,
    onlineUsersss: onlineUsersss,
    currentUser: currentUser,
    users: users,
    amis: amis,
    socket: socket,
  };

  const handerRefuseButton = () => {
    sethideRequest((prev) => !prev)
    // setmyIdFromOpponent(-2)
    setflag(true)
    socket.emit("rejectRequest", { currentUser, opponent });
  }

  const handerAcceptButton = () => {

    sethideRequest((prev) => !prev)
    console.log(pathOfGame)
    router.push(pathOfGame)

  }

  return (
    <>
      <CardInvitation currentUser={currentUser} opponent={opponent} handerRefuseButton={handerRefuseButton}
        hideRequest={hideRequest} myIdFromOpponent={myIdFromOpponent} handerAcceptButton={handerAcceptButton} />
      <div className={`${font.className}   font-medium `}>
        {isNavbarVisible && isNavbarVisible2 && <Navbar currentUser={currentUser} users={users} amis={amis} onlineUsersss={onlineUsersss} socket={socket} />}
        <Component  {...modifiedPageProps} />
      </div >
    </>
  )
}

