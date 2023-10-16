import { useEffect, useRef, useState, RefObject } from 'react'
import Pong from '../../components/game'
import { AppProps, userProps } from '@/interface/data';

const Index = ({ onlineUsersss, id, users, amis }: AppProps) => {
    const [selectPlayer, setselectPlayer] = useState('')
    const [opponent, setOpponent] = useState('')
    const infoGameFromClient = {
        selectPlayer: selectPlayer,
        info: "Some Info"
    };
    console.log(amis)
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
                    selectPlayer === 'online' && opponent === '' ? (
                        <div className='w-full  flex  justify-center mt-20'>
                            <div>
                                {
                                    (amis.length) ? amis.map((user: userProps) => (
                                        <div className=' bg-blue-200 rounded-2xl items-center  space-x-3 p-2 flex justify-between w-[50%]'>
                                            <img
                                                src={user.foto_user}
                                                alt="Your Image Alt Text"
                                                className="w-20 h-auto  rounded-full inline-block" // Adjust the width as needed
                                            />
                                            <span>{user.username}.{user.id}</span>
                                            {onlineUsersss.includes(user.id) ? (
                                                <div className=' bg-green-700 w-4 h-4 rounded-full '>
                                                </div>
                                            ) : (
                                                <div className=' bg-red-700 w-4 h-4 rounded-full '>
                                                </div>
                                            )
                                            }
                                        </div>
                                    )) : null
                                }
                            </div>
                        </div>
                    ) : null
                }
                {
                    opponent !== '' && selectPlayer === 'online' ? (<div className='w-full absolute'>
                        <Pong
                            infoGameFromClient={infoGameFromClient}
                            selectPlayer={selectPlayer}
                            setselectPlayer={setselectPlayer}
                        />

                    </div>) : null
                    // selectPlayer != '' ? (<div className='w-full absolute'>
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
