import PlayWithComputer from '@/components/game/computer'
import ListOfFriends from '@/components/game/listOfFriends'
import PlayOnline from '@/components/game/online'
import Settings from '@/components/game/settings'
import { AppProps } from '@/interface/data'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const AiSetting = ({ onlineUsersss, currentUser, users, amis, socket }: AppProps) => {
    const router = useRouter()
    const [routerPage, setRouterPage] = useState('')
    const [ballTheme, setballTheme] = useState('')
    const [canvasTheme, setcanvasTheme] = useState('black')
    const [gameLevel, setgameLevel] = useState('esay')
    const [selectPlayer, setselectPlayer] = useState('online')
    const [listOfFriends, setlistOfFriends] = useState<boolean>(false);
    const [opponent, setOpponent] = useState('')

    useEffect(() => {
        if (router.asPath == '/game/online?listoffriends=true')
            {
                setRouterPage('')
                
                setlistOfFriends(true)}
        else if (router.asPath == '/game/online?play=true') {
            setlistOfFriends(false)
            setRouterPage('play')
        }
        else if (router.asPath != '/game/online?play=true') {
            setlistOfFriends(false)
            setRouterPage('settings')
        }
    }, [router])

    return (
        <>
            {
                routerPage == 'play' ? (
                    // <PlayWithComputer selectPlayer={selectPlayer} setselectPlayer={setselectPlayer} ballTheme={ballTheme}
                    //     canvasTheme={canvasTheme} gameLevel={gameLevel} />
                    < PlayOnline
                        selectPlayer={selectPlayer}
                        setselectPlayer={setselectPlayer}
                        room={''}
                        currentUser={currentUser}
                        socketApp={socket}
                    />
                ) : routerPage == 'settings' ? (
                    <Settings ballTheme={ballTheme} setballTheme={setballTheme} canvasTheme={canvasTheme} setcanvasTheme={setcanvasTheme}
                        setRouterPage={setRouterPage} gameLevel={gameLevel} setgameLevel={setgameLevel} selectPlayer={selectPlayer} />
                ) : null
            }
            {
                listOfFriends ? (
                    <div className=" absolute w-full">
                        <ListOfFriends currentUser={currentUser} users={users} amis={amis} onlineUsersss={onlineUsersss} socket={socket} setOpponent={setOpponent} />
                    </div>

                ) : null
            }
        </>
    )
}

export default AiSetting
