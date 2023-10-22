import { useEffect, useRef, useState, RefObject } from 'react'
import Pong from '../../components/game/game'
import { AppProps, userProps } from '@/interface/data';
import ListAmis from '@/components/game/listAmis';
import { useRouter } from 'next/router';

const Index = ({ onlineUsersss, currentUser, users, amis, socket }: AppProps) => {
    const router = useRouter()
    // console.log(router.query.online)
    // console.log(router.query.rome)
    const [room, setroom] = useState<any>('');
    const [listOfFriends, setlistOfFriends] = useState<boolean>(false);
    const [hidden, sethidden] = useState<boolean>(false);
    const [selectPlayer, setselectPlayer] = useState('')
    const [opponent, setOpponent] = useState('')

    const [rejectRequest, setrejectRequest] = useState(false)
    const [cantPlayOnline, setCantPlayOnline] = useState(false)

    useEffect(() => {
        socket?.on("rejectRequest", () => {
            setrejectRequest(true)
        })
    })

    useEffect(() => {
        console.log(router.asPath)
        if (router.query.online === "true" && router.query.rome) {
            console.log(router.query.rome)
            setroom(router.query.rome);
            setselectPlayer("online")
        }
        else if (router.query.online === "true" && router.query.friends === 'listoffriends') {
            // setroom(router.query.rome);
            setselectPlayer("online")
            setlistOfFriends(true)
        }
        if (router.query.friends !== 'listoffriends')
            setlistOfFriends(false)
        if (router.asPath === '/game') {
            setroom('')
            setlistOfFriends(false)
            setselectPlayer('')
            setOpponent('')
        }
        else if (router.asPath === '/game?offline=true') {
            setroom('room1')
            setselectPlayer("offline")
        }
        else if (router.asPath === '/game?computer=true') {
            setroom('room2')
            setselectPlayer("computer")
        }
    })

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
    const infoGameFromClient = {
        selectPlayer: selectPlayer,
        info: "Some Info"
    };
    return (
        <>
            <div className=' w-full '>
                <div className='absolute flex justify-center w-[100%] items-center h-[500px] space-x-5'>
                    {
                        selectPlayer == '' && (
                            <>
                                <button className="rounded-2xl w-[20%] h-[200px] bg-black text-yellow-600 font-extralight text-4xl hover:bg-gray-800"
                                    onClick={handelButtonPlayOnline}
                                >
                                    <span>play with friend </span>
                                    <span className='text-2xl'>online</span>
                                </button>
                                <button className="rounded-2xl w-[20%] h-[200px] bg-black text-yellow-600 font-extralight text-4xl hover:bg-gray-800"
                                    onClick={() => router.push("/game?offline=true")}
                                >
                                    <span>play with friend </span>
                                    <span className='text-2xl'>offline</span>

                                </button>
                                <button className="rounded-2xl w-[20%] h-[200px] bg-black text-yellow-600 font-extralight text-4xl hover:bg-gray-800"
                                    onClick={() => router.push("/game?computer=true")}
                                >
                                    play with computer
                                </button>
                            </>
                        )
                    }
                </div>
                {
                    // (selectPlayer === 'online' && opponent === '' && room == '') ||
                    listOfFriends ? (
                        <div className=" absolute w-full">
                            <ListAmis currentUser={currentUser} users={users} amis={amis} onlineUsersss={onlineUsersss} socket={socket} setOpponent={setOpponent}></ListAmis>
                        </div>

                    ) : null
                }
                {
                    (selectPlayer === 'online' && room !== '') || (selectPlayer === 'computer' || selectPlayer === 'offline') ? (
                        <div className={`w-full absolute ${rejectRequest ? ' hidden ' : ''}`}>
                            <Pong
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
                    (rejectRequest && !hidden) ? (
                        <div className='w-full h-full  flex justify-center items-center z-50 absolute'>
                            <div className=' shadow-2xl w-[300px] h-[200px] bg-white flex flex-col justify-around item-center  rounded-3xl'>
                                <div className="flex justify-around item-center ">
                                    <h1 className=''>reject you Request</h1>
                                </div>
                                <div className="flex justify-around item-center">
                                    <button onClick={handelButtonRejectRequest} className='bg-[#77A6F7] px-5  py-1 rounded-xl'>OK</button>
                                </div>
                            </div>
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
        </>
    )
}

export default Index
