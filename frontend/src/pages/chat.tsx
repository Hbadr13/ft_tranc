import Image from 'next/image'
import { Crimson_Pro, Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>

      <svg viewBox="0 0 36 36" className="circular-chart orange bg-emerald-400  relative top-[200px]">
        <path className="circle-bg"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path className="circle bg-orange-500  stroke-orange-500"
          stroke-dasharray="70, 100"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      {/* <text x="18" y="20.35" className="percentage">30%</text> */}
      {/* <div className="circle-bg w-[300px] h-[300px] bg-blue-500 relative top-32 left-32 flex justify-center items-center">
        <svg stroke-dasharray="30, 100" >
          <circle className="circle-bg" cx="50" cy="50" r="40" />
          <path className="circle-bg w-[30px] h-[30px] bg-blue-100 ">

          </path>
        </svg>
      </div> */}
    </>
  )
}
