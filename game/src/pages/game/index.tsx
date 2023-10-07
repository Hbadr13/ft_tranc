import Image from 'next/image'
import { Inter } from 'next/font/google'
import Style from '../../styles/canvas.module.css'
const inter = Inter({ subsets: ['latin'] })

import Layout from '../../components/CanvasGame'

export default function Home() {

    return (
        <div className='game-container'>
            <Layout></Layout>
        </div>
    )
}