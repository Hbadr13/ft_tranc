import Link from 'next/link'
import React from 'react'
import Play from './play'

const index = () => {
    return (
        <>
        
            <div  className='h-[400px] hidden'>index</div>
            <Link className='h-[400px] hidden p-2 bg-blue-400 rounded-lg m-10' href={'/game/offline/play'}>start game</Link>
            <Play selectPlayer={''} setselectPlayer={function (selectPlayer: string): void {
                throw new Error('Function not implemented.')
            }} />
        </>
    )
}

export default index

