import router from 'next/router'
import React from 'react'
import Image from 'next/image'
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export interface SettingsProps {
    selectPlayer: string
    ballTheme: string
    setballTheme: (ballTheme: string) => void
    canvasTheme: string
    setcanvasTheme: (canvasTheme: string) => void
    gameLevel: string
    setgameLevel: (gameLevel: string) => void

    setRouterPage: (routerPage: string) => void

}

const ButtonSlideNavToRight = () => {
    const swiper = useSwiper()
    return (

        <button
            className=' p-1 rounded-md rotate-180'
            onClick={() => swiper.slideNext()}
        >
            <Image src={'/game/left-arrow.png'} alt='next' width={30} height={30}></Image>

        </button>
    )
}
const ButtonSlideNavToLeft = () => {
    const swiper = useSwiper()
    return (
        <button
            className=' p-1 rounded-md '
            onClick={() => swiper.slidePrev()}
        >
            <Image src={'/game/left-arrow.png'} alt='next' width={30} height={30}></Image>

        </button>
    )
}


const Settings = ({ selectPlayer, ballTheme, setballTheme, canvasTheme, setcanvasTheme, setRouterPage, gameLevel, setgameLevel }: SettingsProps) => {
    return (
        <>
            <div className="Gamebackground h-screen w-full    flex  justify-center  ">
                <div className=" relative w-full sm:w-[90%] rotate-9 md:w-[70%] xl:w-[50] h-[600px] mt-[120px]  rounded-2xl bg-slate-40 flex justify-center items-center">
                    <div className="bg-CusColor_light  z-10 relative  overflow-hidden w-full h-[70%] sm:h-[84%] max-w-[95sssssssc0p  flex  justify-betweenmd: justify-around items-center rounded-xl p-2 md:p-4">
                        <div className="w-[24%] md:w-[30%] h-full  rounded-xl space-y-6">
                            <div className="w-full  py-6   bg-CusColor_grey rounded-xl">
                                .
                            </div>
                            <div className="w-full py-6  bg-CusColor_grey rounded-xl">
                                .
                            </div>
                            <div className="w-full py-6  bg-CusColor_grey rounded-xl">
                                .
                            </div>

                        </div>
                        <div className=" w-[70%] md:w-[60%] h-full  bg-CusColor_grey rounded-xl fle justify-center items-center p-2">
                            <div className="w-full"> hello2</div>
                            <Swiper
                                className='w-full h-full'
                                modules={[Navigation, Pagination, A11y]}
                                slidesPerView={1}
                            >

                                <SwiperSlide className='' >
                                    <div className=" w-full h-f bg-slate-50 p-4 flex justify-center items-center rounded-xl">
                                        <div className=" w-full h-[70%] bg-[#f2f3f5] p-4 flex flex-col justify-center rounded-xl">
                                            <div className=" w-full h-[70px] ">
                                                <div className="h-full w-[12px] bg-[#fb7185]"></div>
                                            </div>
                                            <div className=" w-full h-[70px] flex justify-center items-center ">
                                                <div className="h-[20px] w-[20px] bg-[#32292a] rounded-full"></div>
                                            </div>
                                            <div className=" w-full h-[70px]  flex justify-end">
                                                <div className="h-full w-[12px] bg-[#35d399]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className='w-full h-full ' >
                                    <div className="">hello2 </div>
                                </SwiperSlide>
                                <SwiperSlide className='w-full h-full ' >
                                    <div className="">hello3</div>
                                </SwiperSlide>
                                {/* <SwiperSlide className='w-full h-full g-CusColor_primary ' >
                        </SwiperSlide> */}
                                {/* <div className="absolute z-30 left-3 md:left-5 xl:left-10 inset-y-0  flex justify-between">
                                    <ButtonSlideNavToLeft />
                                </div>
                                <div className="absolute z-30  right-3 md:right-5 xl:right-10 inset-y-0   flex justify-between">
                                    <ButtonSlideNavToRight />
                                </div> */}
                            </Swiper >
                        </div>
                        <div className=" absolute z-10 w-full bottom-10 flex justify-between px-5 md:px-11  ">
                            <button className="BottonsSettings  rotate-180 px-10 py-2 rounded-lg">
                                <div className="rotate-180">
                                    Back
                                </div>
                            </button>
                            <button className="BottonsSettings  px-10 py-2  bg-slate-400 rounded-lg">
                                Next
                            </button>
                        </div>
                    </div>

                    {/* <div className="w-full flex justify-between p-2">
                        <button
                            onClick={() => router.push(selectPlayer == 'computer' ? '/game' : '/game/online?listoffriends=true')}
                            className='bg-blue-100 p-2 rounded-lg text-start'>
                            Get Back
                        </button >
                        <button
                            onClick={() => {
                                setRouterPage('play')
                                router.push(selectPlayer == 'computer' ? '/game/ai?play=true' : selectPlayer == 'computer' ? '/game/offline?play=true' : '/game/online?play=true')
                            }}
                            className='bg-blue-100 p-2 rounded-lg text-start'>
                            Start Game
                        </button >
                    </div> */}

                </div>
            </div>
        </>
    )
}

export default Settings
