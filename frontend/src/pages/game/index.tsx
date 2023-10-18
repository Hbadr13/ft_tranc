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
    const [selectPlayer, setselectPlayer] = useState('')
    const [opponent, setOpponent] = useState('')
    console.log(typeof router.query.rome)
    useEffect(() => {
        if (router.query.online === "true") {
            setroom(router.query.rome);
            setselectPlayer("online")
        }
    })
    const infoGameFromClient = {
        selectPlayer: selectPlayer,
        info: "Some Info"
    };
    // console.log(socket)
    return (
        <>
            <div className=' w-full '>
                <div className='absolute flex justify-center w-[100%] items-center h-[500px] space-x-5'>
                    {
                        selectPlayer == '' && (
                            <>
                                <button className="rounded-2xl w-[20%] h-[200px] bg-black text-yellow-600 font-extralight text-4xl hover:bg-gray-800"
                                    onClick={() => setselectPlayer("online")}
                                >
                                    <span>play with friend </span>
                                    <span className='text-2xl'>online</span>
                                </button>
                                <button className="rounded-2xl w-[20%] h-[200px] bg-black text-yellow-600 font-extralight text-4xl hover:bg-gray-800"
                                    onClick={() => setselectPlayer("offline")}
                                >
                                    <span>play with friend </span>
                                    <span className='text-2xl'>offline</span>

                                </button>
                                <button className="rounded-2xl w-[20%] h-[200px] bg-black text-yellow-600 font-extralight text-4xl hover:bg-gray-800"
                                    onClick={() => setselectPlayer("computer")}
                                >
                                    play with computer
                                </button>
                            </>
                        )
                    }
                </div>
                {
                    selectPlayer === 'online' && opponent === '' && room == '' ? (
                        <div className=" absolute w-full">
                            <ListAmis currentUser={currentUser} users={users} amis={amis} onlineUsersss={onlineUsersss} socket={socket} setOpponent={setOpponent}></ListAmis>
                        </div>

                    ) : null
                }
                {
                    // opponent !== '' &&
                    (selectPlayer === 'online' && room !== '') || (selectPlayer === 'computer' || selectPlayer === 'offline') ? (
                        <div className='w-full absolute'>
                            <Pong
                                infoGameFromClient={infoGameFromClient}
                                selectPlayer={selectPlayer}
                                setselectPlayer={setselectPlayer}
                                room={room}
                                currentUser={currentUser}
                            />
                        </div>) : null
                    //     selectPlayer != '' ? (<div className='w-full absolute'>
                    //     <Pong
                    //         infoGameFromClient={infoGameFromClient}
                    //         selectPlayer={selectPlayer}
                    //         setselectPlayer={setselectPlayer}
                    //     />

                    // </div>) : null
                }
            </div >
        </>
    )
}

export default Index
