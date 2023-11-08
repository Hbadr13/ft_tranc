import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import SideMenu from '@/components/sideMenu';
import Navbar from '@/components/navbar';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { fetchAllAmis, fetchAllUsers, fetchCurrentUser } from '@/hooks/userHooks';
import Image from 'next/image';
import { Open_Sans } from 'next/font/google'
import { userProps } from '@/interface/data';
// import ThemeContext from '@/hooks/themeContext';
import { useRouter } from 'next/navigation';
import { Transition } from '@headlessui/react';
import { createContext, } from 'react'
import { getBack } from '@/hooks/appContexts';
const font = Open_Sans({ subsets: ['latin'] })
// import {useConta}
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

          <Transition
            show={hideRequest}
            enter="transition-opacity duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >

            <div className={` z-40 absolute w-full h-screen  flex justify-center items-center`}>
              <div className=' w-[30%] h-[30%] bg-white rounded-3xl shadow-sm shadow-black flex flex-col justify-around items-center'>
                <div className="flex flex-col justify-around items-center border-b-2 border-blue-600  space-y-3">
                  <Image className='rounded-full w-24' height={200} width={200} alt={`image:${opponent.username}`} src={opponent.foto_user}></Image>
                  <h1>{opponent.username}</h1>
                </div>
                <div className='flex justify-around items-center  w-full'>
                  <button onClick={handerRefuseButton} className='m-2 border-2 border-black rounded-xl py-1 px-4 duration-500 ease-in-out hover:py-2 hover:px-5 hover:text-xl'>Refuse</button>
                  <button onClick={handerAcceptButton} className='m-2 border-2 border-black rounded-xl py-1 px-4 bg-[#77A6F7] duration-500 ease-in-out hover:py-2 hover:px-5 hover:text-xl'>Accept</button>
                </div>
              </div>
            </div>
          </Transition>
        ) : null
    }
  </>
  )
}

// '{ id: number; createdAt: string; updatedAt: string; email: string; hash: string; username: string; firstName: string; lastName: string; foto_user: string; isOnline: false; userId: number; flag: false; flag1: false; length: any; }'

// '{ id: number; createdAt: string; updatedAt: string; email: string; hash: string; username: string; firstName: string; lastName: string; foto_user: string; isOnline: false; userId: number; flag: false; flag1: false; length: any; }'
// const getBakc = createContext<string>('')

export default function App({ Component, pageProps, router }: AppProps) {
  const isSideMenuVisible = !router.asPath.startsWith('/auth/login');
  const isSideMenuVisible2 = !router.asPath.startsWith('/register')
  const isSideMenuVisible3 = !router.asPath.startsWith('/auth/login')

  const [onlineUsersss, setOnlineUsersss] = useState<Array<number>>([]);
  const [socket, setSocket] = useState<any>();
  const [hideRequest, sethideRequest] = useState<boolean>(true);

  const [query, setquery] = useState("");
  const [myIdFromOpponent, setmyIdFromOpponent] = useState<number>(-2);

  const [users, setUsers] = useState<Array<any>>([]);
  const [currentUser, setCurrentUser] = useState<userProps>({ id: 0, createdAt: "", updatedAt: "", email: "", hash: "", username: "", firstName: "", lastName: "", foto_user: "", isOnline: false, userId: 0, flag: false, flag1: false });
  const [opponent, setopponent] = useState<userProps>({ id: 0, createdAt: "", updatedAt: "", email: "", hash: "", username: "", firstName: "", lastName: "", foto_user: "", isOnline: false, userId: 0, flag: false, flag1: false });
  // const [opponent, setopponent] = useState<userProps>({ id: 0, createdAt: "", updatedAt: "", email: "", hash: "", username: "", firstName: "", lastName: "", foto_user: "", isOnline: false, userId: 0, flag: false, });

  const [amis, setAmis] = useState<any>([])
  const [flag, setflag] = useState<boolean>(true)
  const [pathOfGame, setpathOfGame] = useState<string>('')
  // const router = useRouter()


  fetchCurrentUser({ setCurrentUser })
  fetchAllUsers({ setUsers, query: "", currentUser })
  fetchAllAmis({ setAmis, query, currentUser })

  useEffect(() => {
    if (isSideMenuVisible3 && isSideMenuVisible2) {

      (
        async () => {
          try {

            const response = await fetch('http://localhost:3333/auth/user', {
              credentials: 'include',
            });
            if (response.status != 200) {
              router.push('/auth/login');
              return;
            }
            const content = await response.json();
          } catch (error) {

          }
        }
      )();
    }
  });



  useEffect(() => {
    try {

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
    }
    catch (error) {

    }
  }, [currentUser, amis]);

  const modifiedPageProps = {
    ...pageProps,
    onlineUsersss: onlineUsersss,
    currentUser: currentUser,
    users: users,
    amis: amis,
    socket: socket,
  };

  const handerRefuseButton = async () => {
    sethideRequest((prev) => !prev)
    // setmyIdFromOpponent(-2)
    try {
      const responseDelete = await fetch(`http://localhost:3333/game/room/${currentUser.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      console.log(responseDelete)
    } catch (error) {

    }

    setflag(true)
    socket.emit("rejectRequest", { currentUser, opponent });
  }

  const handerAcceptButton = () => {

    sethideRequest((prev) => !prev)
    console.log(pathOfGame)
    router.push(pathOfGame)

  }
  const [clickToSplit, setclickToSplit] = useState<boolean>(false)
  const [path, setpath] = useState('/')
  useEffect(() => {
    if (router.route != '/search')
      setpath(router.route)
  })

  return (
    <>
      <getBack.Provider value={path}>
        <CardInvitation currentUser={currentUser} opponent={opponent} handerRefuseButton={handerRefuseButton}
          hideRequest={hideRequest} myIdFromOpponent={myIdFromOpponent} handerAcceptButton={handerAcceptButton} />
        <div className={`${font.className}   font-medium `}>
          {isSideMenuVisible && isSideMenuVisible2 &&
            <>
              <Navbar currentUser={currentUser} users={users} amis={amis} onlineUsersss={onlineUsersss} socket={socket} />
              <SideMenu currentUser={currentUser} users={users} amis={amis} onlineUsersss={onlineUsersss} socket={socket} />
            </>
          }
          <div className="home mt-16">
            <Component  {...modifiedPageProps} />
          </div>
        </div>
      </getBack.Provider>
    </>
  )
}

