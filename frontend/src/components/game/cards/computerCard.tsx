import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
const ComputerCard = ({ setselectPlayer }: { setselectPlayer: (selectPlayer: string) => void }) => {
  return (
    // <div className="w-full h-full flex justify-center items-center">
    //   <div className="ComputerCard w-[80%] h-[70%] bg-CusColor_grey flex justify-center items-center rounded-xl">
    //     <Link href={"/game/ai?settings=true"} onClick={() => setselectPlayer('computer')} className=' bg-slate-300 hover:bg-slate-400 p-2 rounded-md'>
    //       ComputerCard
    //     </Link>
    //   </div>
    // </div>
    <div className='w-full h-full'>
      <div className="w-full h-full flex justify-center items-center">
        <div className="ComputerCard  relative  overflow-hidden w-[90%] sm:w-[80%] h-[70%] bg-CusColor_grey flex flex-col justify-center items-center rounded-xl">
          <div id='Bottom' className={`w-[500px] h-[500px] -right-[300px] md:-right-[240px] xl:-right-[140px] absolute  rotate-[-45deg] `} />
          <div className=" w-full h-[90%] flex justify-center  z-40">
            <div className="w-[50%] h-full  ">
              <div className=" relative w-[170px] md:w-[200px] h-[50%] md:h-[70%]    bottom-[8px] md:bottom-[15px]">
                <Image className=' absolute ' src={'/game/ComputerCardStart.svg'} fill alt='l'/>
              </div>
            </div>
            <div className="w-[50%] h-full  flex flex-col items-center justify-center  p-4  space-y-10">
              <div className="w-full text-center   text-[#b7771e] space-y-2">
                <h1 className='text-3xl'>
                  Trial Match
                </h1>
                <div className="w-full text-[#D97D00] text-center text-xl">
                  <div className="">Enjoy casual matches with this offline game mode</div>
                </div>
              </div>
              <Link href={"/game/ai?settings=true"} onClick={() => setselectPlayer('computer')} className=' bg-[#B76E00] hover:bg-[#dfa246] hover:py-3 hover:px-14 hover:text-xl duration-150 text-[#FFF] py-2 px-12 rounded-md'>
                Play
              </Link>
            </div>
          </div>
          <div id='Bottom' className="w-full h-[10%] "></div>
        </div>
      </div>
    </div>
  )
}

export default ComputerCard
