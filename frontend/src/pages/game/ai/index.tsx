import PlayWithComputer from '@/components/game/computer'
import Settings from '@/components/game/settings'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const AiSetting = () => {
    const router = useRouter()
    const [routerPage, setRouterPage] = useState('')
    const [ballTheme, setballTheme] = useState('')
    const [canvasTheme, setcanvasTheme] = useState('black')
    const [gameLevel, setgameLevel] = useState('esay')
    const [selectPlayer, setselectPlayer] = useState('computer')
    useEffect(() => {
        if (router.asPath != '/game/ai?play=true')
            setRouterPage('')
    }, [router])

    return (
        <>
            {
                routerPage == 'play' ? (
                    <PlayWithComputer selectPlayer={selectPlayer} setselectPlayer={setselectPlayer} ballTheme={ballTheme}
                        canvasTheme={canvasTheme} gameLevel={gameLevel} />
                ) : (
                    <Settings ballTheme={ballTheme} setballTheme={setballTheme} canvasTheme={canvasTheme} setcanvasTheme={setcanvasTheme}
                        setRouterPage={setRouterPage} gameLevel={gameLevel} setgameLevel={setgameLevel} selectPlayer={selectPlayer} />
                )
            }
        </>
    )
}

export default AiSetting