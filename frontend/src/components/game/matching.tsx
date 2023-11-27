import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid';

import { AppProps, userProps } from '@/interface/data'
const Matching = ({ onlineUsersss, currentUser, users, amis, socket }: AppProps) => {
    const router = useRouter()
    const [num, setNum] = useState<number>(1)
    const [opponent, setOpponent] = useState<userProps>()
    useEffect(() => {
        socket.emit("searchForOpponent", { currentUser: currentUser })
        socket.on('searchForOpponent', (opponentt: userProps) => {
            setOpponent(opponentt)
            console.log('hello---12')
            setNum((pr: number) => pr + 1)
        })
    }, [socket])

    const handelChallenge = async () => {
        try {
            const response = await fetch(`http://localhost:3333/users/getbyuserid/${opponent?.id}`, {
                credentials: 'include',
            });
            if (response.status == 200) {
                const content = await response.json();
                if (content.isOnline == false) {
                    console.log('hi')

                    const room: string = uuid();

                    const responsePost = await fetch(`http://localhost:3333/game/room/${currentUser.id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            'room': room,
                            // 'opponentId': Number(opponent?.id)
                        }),
                        credentials: 'include',
                    });
                    const responsePost2 = await fetch(`http://localhost:3333/game/room/${opponent?.id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            'room': room,
                            // 'opponentId': currentUser.id
                        }),
                        credentials: 'include',
                    });

                    // socket?.emit("areYouReady", {
                    //     OpponentId: e.target.value, currentPlayer: currentUser, pathOfGame: `/game/online?settings=true`
                    // })
                    // setOpponent(e.target.value)
                    router.push(`/game/online?settings=true`);

                }
                // else {
                //     if (selectUser === -1)
                //         setselectUser(Number(e.target.value))
                //     else
                //         setselectUser(-1)
                // }
            }
        } catch (error) {
        }
    }

    return (
        <div className="w-full h-full flex justify-center items-center ">
            <div className="OnlineCard  relative  overflow-hidde w-[90%] sm:w-[80%] h-[70%]  rounded-xl">
                <div className="   w-full h-[80%] flex  justify-center items-center space-x-10">
                    <div className="w-[100px] h-[100px]  relative ">
                        <Image className='rounded-md' src={currentUser.foto_user} alt='image user' fill objectFit='cover' />
                    </div>
                    <div className="w-[50px] h-[50px]  relative ">
                        <Image className='rounded-md' src={'/game/vs.png'} alt='image user' fill objectFit='cover' />
                    </div>   <div className="w-[100px] h-[100px]  relative ">
                        <Image className='rounded-md' src={opponent ? opponent.foto_user : '/recent.png'} alt='image user' fill objectFit='cover' />
                    </div>
                </div>
                <div className="w-full text-end  p-10 flex justify-end">
                    <button onClick={opponent ? handelChallenge : undefined}
                        className={`py-2 px-6 rounded-md ${opponent ? ' bg-white ' : ' bg-slate-500'}`}>
                        To Match
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Matching