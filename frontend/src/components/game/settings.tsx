import router from 'next/router'
import React from 'react'
export interface SettingsProps {
    ballTheme: string
    setballTheme: (ballTheme: string) => void
    canvasTheme: string
    setcanvasTheme: (canvasTheme: string) => void
    gameLevel: string
    setgameLevel: (gameLevel: string) => void

    setRouterPage: (routerPage: string) => void
}
const Settings = ({ ballTheme, setballTheme, canvasTheme, setcanvasTheme, setRouterPage, gameLevel, setgameLevel }: SettingsProps) => {
    return (
        <>
            <div className="w-full  g-red-200 mt-[150px] flex flex-col justify-center items-center ">
                <div className="w-[40%] bg-slate-400 rounded-xl">

                    <div className="flex w-full justify-between items-center start-2 space-x-10  rounded-2xl p-2">
                        <div className="">Ball Color</div>
                        <div className="flex justify-around items-center start-2 space-x-2">
                            <button className={`${ballTheme == 'white' ? ' opacity-50' : ' opacity-100'} p-2 bg-blue-500 rounded-lg w-[100px] text-center hover:bg-blue-600 border-2 border-slate-700`} onClick={() => setballTheme('white')}>White</button>
                            <button className={`${ballTheme == 'green' ? ' opacity-50' : ' opacity-100'} p-2 bg-blue-500 rounded-lg w-[100px] text-center hover:bg-blue-600 border-2 border-slate-700`} onClick={() => setballTheme('green')}>Green</button>
                            <button className={`${ballTheme == 'blue' ? ' opacity-50' : ' opacity-100'} p-2 bg-blue-500 rounded-lg w-[100px] text-center hover:bg-blue-600 border-2 border-slate-700`} onClick={() => setballTheme('blue')}>Blue</button>
                        </div>
                    </div>
                    <div className="flex  w-full justify-between items-center start-2 space-x-10 rounded-2xl p-2">
                        <div className="">Canvas Color</div>
                        <div className="flex justify-around items-center start-2 space-x-2">
                            <button className={`${canvasTheme == 'white' ? ' opacity-50' : ' opacity-100'} p-2 bg-blue-500 rounded-lg w-[100px] text-center hover:bg-blue-600 border-2 border-slate-700`} onClick={() => setcanvasTheme('white')}>White</button>
                            <button className={`${canvasTheme == 'green' ? ' opacity-50' : ' opacity-100'} p-2 bg-blue-500 rounded-lg w-[100px] text-center hover:bg-blue-600 border-2 border-slate-700`} onClick={() => setcanvasTheme('green')}>Green</button>
                            <button className={`${canvasTheme == 'blue' ? ' opacity-50' : ' opacity-100'} p-2 bg-blue-500 rounded-lg w-[100px] text-center hover:bg-blue-600 border-2 border-slate-700`} onClick={() => setcanvasTheme('blue')}>Blue</button>
                        </div>
                    </div>
                    <div className="flex  w-full justify-between items-center start-2 space-x-10 rounded-2xl p-2">
                        <div className="">Canvas Color</div>
                        <div className="flex justify-around items-center start-2 space-x-2">
                            <button className={`${gameLevel == 'easy' ? ' opacity-50' : ' opacity-100'} p-2 bg-blue-500 rounded-lg w-[100px] text-center hover:bg-blue-600 border-2 border-slate-700`} onClick={() => setgameLevel('easy')}>Easy</button>
                            <button className={`${gameLevel == 'midiam' ? ' opacity-50' : ' opacity-100'} p-2 bg-blue-500 rounded-lg w-[100px] text-center hover:bg-blue-600 border-2 border-slate-700`} onClick={() => setgameLevel('midiam')}>Midiam</button>
                            <button className={`${gameLevel == 'hard' ? ' opacity-50' : ' opacity-100'} p-2 bg-blue-500 rounded-lg w-[100px] text-center hover:bg-blue-600 border-2 border-slate-700`} onClick={() => setgameLevel('hard')}>Hard</button>
                        </div>
                    </div>

                    <div className="w-full flex justify-between p-2">
                        <button
                            onClick={() => router.push('/game')}
                            className='bg-blue-100 p-2 rounded-lg text-start'>
                            Get Back
                        </button >
                        <button
                            onClick={() => {
                                setRouterPage('play')
                                router.push('/game/ai?play=true')
                            }}
                            className='bg-blue-100 p-2 rounded-lg text-start'>
                            Start Game
                        </button >
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings