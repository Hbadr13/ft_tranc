import PlayWithComputer from '@/components/game/computer'
import React from 'react'

const Play = ({ selectPlayer, setselectPlayer }: { selectPlayer: string, setselectPlayer: (selectPlayer: string) => void }) => {

    return (
        <PlayWithComputer
            selectPlayer={selectPlayer}
            setselectPlayer={setselectPlayer}
        />
    )
}

export default Play