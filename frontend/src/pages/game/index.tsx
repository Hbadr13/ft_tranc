import { useEffect, useRef, useState, RefObject } from 'react'
import PlayWithComputer from '../../components/game/computer'
import { AppProps, userProps } from '@/interface/data';
import ListOfFriends from '@/components/game/listOfFriends';
import { useRouter } from 'next/router';
import PlayOnline from '@/components/game/online';
import Link from 'next/link';
import Image from 'next/image'
import OnlineCard from '@/components/game/cards/onlineCard';
import ComputerCard from '@/components/game/cards/computerCard';
import MatchingCard from '@/components/game/cards/matchingCard';
import { GameCards } from '@/components/game/gameCard';
const Index = ({ onlineUsersss, currentUser, users, amis, socket }: AppProps) => {
    const router = useRouter()
    const [room, setroom] = useState<any>('');
    const [listOfFriends, setlistOfFriends] = useState<boolean>(false);
    const [selectPlayer, setselectPlayer] = useState('')
    const [opponent, setOpponent] = useState('')

    const [rejectRequest, setrejectRequest] = useState(false)
    const [cantPlayOnline, setCantPlayOnline] = useState(false)


    useEffect(() => {
        if (router.asPath != '/game?start')
            setGameStart(false)
        else
            setGameStart(true)
    }, [router])
    const handelButtonRejectRequest = () => {
        setrejectRequest(false)
        router.push("/game")
    }
    const handelButtonPlayOnline = async () => {
        try {

            const response = await fetch('http://localhost:3333/auth/user', {
                credentials: 'include',
            });
            if (response.status == 200) {

                const content = await response.json()
                if (content.isOnline === false)
                    router.push('/game?online=true&friends=listoffriends')
                else
                    setCantPlayOnline(true)
            }

        } catch (error) {

        }

    }


    const [gameStart, setGameStart] = useState(true);
    return (
        <div className="Gamebackground w-full h-screen">
            {gameStart ? (<div className=" flex justify-center items-cener ">
                <div className={'relative mt-[120px] w-full sm:w-[90%] md:w-[70%] xl:w-[50] h-[600px]   rounded-2xl  '}>
                    <div className=" Circles absolute w-[50%] z-10 h-[50%]  -left-32 -top-10 rounded-full" />
                    <div className=" Circles absolute  opacity-50 rotate-180 w-[400px] z-10 h-[400px]  -right-5 md:-right-20 -bottom-10 rounded-full" />
                    <Image
                        className='rounded-xl z-20  shadow-2xl '
                        src="/game/click-to-start-3.gif"
                        alt="My Image"
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className="absolute text-3xl z-20  bottom-32 inset-x-0  flex justify-center items-center ClickToStartGame">
                        <button
                            onClick={() => { router.push('/game') }}
                            className=" ">Click To Start</button>
                    </div>
                </div>
            </div>) : null
            }
            <div hidden={gameStart} className=' w-full  '>
                <div className='flex justify-center w-[100%] items-center '>
                    {
                        selectPlayer == '' && !listOfFriends && (
                            <div className='relative overflow-hidden w-full '>
                                <GameCards setselectPlayer={setselectPlayer} />
                            </div>
                        )
                    }
                </div>
                {
                    listOfFriends ? (
                        <div className=" absolute w-full">
                            <ListOfFriends currentUser={currentUser} users={users} amis={amis} onlineUsersss={onlineUsersss} socket={socket} setOpponent={setOpponent} />
                        </div>
                    ) : null
                }
                {
                    (selectPlayer === 'online' && room !== '') ? (
                        <div className={`w-full absolute ${rejectRequest ? ' hidden ' : ''}`}>
                            < PlayOnline
                                selectPlayer={selectPlayer}
                                setselectPlayer={setselectPlayer}
                                room={room}
                                currentUser={currentUser}
                                socketApp={socket}
                            />
                        </div>

                    ) : null
                }

                {
                    (cantPlayOnline) ? (
                        <div className='w-full h-full  flex justify-center items-center z-50 absolute'>
                            <div className=' shadow-2xl w-[300px] h-[200px] bg-white flex flex-col justify-around item-center  rounded-3xl'>
                                <div className="flex justify-around item-center ">
                                    <h1 className=''>You can't Play now</h1>
                                </div>
                                <div className="flex justify-around item-center">
                                    <button onClick={() => setCantPlayOnline((prev) => !prev)} className='bg-[#77A6F7] px-5  py-1 rounded-xl'>OK</button>
                                </div>
                            </div>
                        </div>) : null
                }
            </div >

        </div>
    )
}

export default Index

// import React from 'react'

// const index = () => {
//     return (
//         <div>index</div>
//     )
// }

// export default index