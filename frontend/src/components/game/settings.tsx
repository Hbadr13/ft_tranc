import router from 'next/router'
import React, { useState } from 'react'
import Image from 'next/image'
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { number } from 'zod';
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

const CanvasSwiper = () => {
    return (
        <Swiper
            className='w-full h-full mt-4'
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
        >

            <SwiperSlide className='' >
                <div className=" w-full h-f bg-slate-5 p-4 flex justify-center items-center rounded-xl">
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
                <div className=" w-full h-f bg-slate-5 p-4 flex justify-center items-center rounded-xl">
                    <div className=" w-full h-[70%] bg-[#1f1a1b] p-4 flex flex-col justify-center rounded-xl">
                        <div className=" w-full h-[70px] ">
                            <div className="h-full w-[12px] bg-[#f2f3f5]"></div>
                        </div>
                        <div className=" w-full h-[70px] flex justify-center items-center ">
                            <div className="h-[20px] w-[20px] bg-[#f2f3f5] rounded-full"></div>
                        </div>
                        <div className=" w-full h-[70px]  flex justify-end">
                            <div className="h-full w-[12px] bg-[#f2f3f5]"></div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className='w-full h-full ' >
                <div className=" w-full h-f bg-slate-5 p-4 flex justify-center items-center rounded-xl">
                    <div className=" w-full h-[70%] bg-[#245CCC] p-4 flex flex-col justify-center rounded-xl">
                        <div className=" w-full h-[70px] ">
                            <div className="h-full w-[12px] bg-[#070D37]"></div>
                        </div>
                        <div className=" w-full h-[70px] flex justify-center items-center ">
                            <div className="h-[20px] w-[20px] bg-[#ffdf11] rounded-full"></div>
                        </div>
                        <div className=" w-full h-[70px]  flex justify-end">
                            <div className="h-full w-[12px] bg-[#070D37]"></div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            {/* <div className="absolute z-30 left-3 md:left-5 xl:left-10 inset-y-0  flex justify-between">
                <ButtonSlideNavToLeft />
            </div>
            <div className="absolute z-30  right-3 md:right-5 xl:right-10 inset-y-0   flex justify-between">
                <ButtonSlideNavToRight />
            </div> */}
        </Swiper >
    )
}
import { Virtual } from 'swiper/modules';

const BallSwiper = () => {
    const slides = Array.from({ length: 10 }).map(
        (el, index) => `Slide ${index + 1}`
    );

    return (
        <Swiper modules={[Virtual]} spaceBetween={50} slidesPerView={3}>
            {slides.map((slideContent, index) => (
                <SwiperSlide key={slideContent} virtualIndex={index}>

                    {
                        // ({ isActive }) => (
                        //     <div className={`${isActive ? ' text-black}' : ' text-bg-blue-300'}`}>
                        //         {slideContent}
                        //     </div>
                        // )
                        ({ isActive }) => (
                            <div className={`w-full h-full flex justify-center items-center rounded-xl  border-2 ${isActive ? ' border-black ' : null} `}>
                                {slideContent}
                            </div>
                        )
                    }
                </SwiperSlide>
            ))}
        </Swiper>
    );

    const balls: Array<string> = ['/game/ball-2.svg', '/game/ball-3.svg', '/game/ball-4.svg', '/game/ball-5.svg', '/game/ball-6.svg',]
    return (
        <Swiper
            className='w-full h-[50%] mt-4 bg-slate-300  p-4 rounded-xl'
            slidesPerView={3}
            spaceBetween={30}
            virtual
        >
            {
                balls.map((ball: string) =>
                (
                    <SwiperSlide className=' p-2' >
                        {
                            ({ isActive }) => (
                                <div className={`w-full h-full flex justify-center items-center rounded-xl  border-2 ${isActive ? ' border-black ' : null} `}>
                                    <div className=" relative  w-[70%] h-[80%] b-slate-500 ">
                                        <Image src={ball} fill alt='ball'></Image>
                                    </div>
                                </div>
                            )
                        }
                    </SwiperSlide>
                ))
            }

            {/* <div className="absolute z-30 left-3 md:left-5 xl:left-10 inset-y-0  flex justify-between">
                <ButtonSlideNavToLeft />
            </div>
            <div className="absolute z-30  right-3 md:right-5 xl:right-10 inset-y-0   flex justify-between">
                <ButtonSlideNavToRight />
            </div> */}
        </Swiper >
    )
}

const LevelSwiper = () => {
    return (
        <Swiper
            className='w-full h-full mt-4'
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
        >

            <SwiperSlide className='' >
                <div className=" w-full h-f bg-slate-50 p-4 flex justify-center items-center rounded-xl">
                    easy
                </div>
            </SwiperSlide>
            <SwiperSlide className='' >
                <div className=" w-full h-f bg-slate-50 p-4 flex justify-center items-center rounded-xl">
                    mediam
                </div>
            </SwiperSlide>
            <SwiperSlide className='' >
                <div className=" w-full h-f bg-slate-50 p-4 flex justify-center items-center rounded-xl">
                    hard
                </div>
            </SwiperSlide>
            <div className="absolute z-30 left-3 md:left-5 xl:left-10 inset-y-0  flex justify-between">
                <ButtonSlideNavToLeft />
            </div>
            <div className="absolute z-30  right-3 md:right-5 xl:right-10 inset-y-0   flex justify-between">
                <ButtonSlideNavToRight />
            </div>
        </Swiper >
    )
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
    const convertText = (str: string): string => {
        if (str.length > 10 && !str.includes(' ')) {
            // if (window.innerWidth < 700 && str.length > 10) {
            return str.slice(0, 10) + ' ' + str.slice(10)
        }
        return str
    }
    const [optionActive, setoptionActive] = useState(1);
    return (
        <>
            <div className="Gamebackground h-screen w-full    flex  justify-center  ">
                <div className=" relative w-full sm:w-[90%]  md:w-[80%] lg:w-[70%] xl:w-[50] h-[600px] mt-[120px]  rounded-2xl bg-slate-40 flex justify-center items-center">
                    <div className="bg-CusColor_light  z-10 relative  overflow-hidden w-full h-[70%] sm:h-[84%] max-w-[95sssssssc0p  flex  justify-betweenmd: justify-around items-center rounded-xl p-2 md:p-4">
                        <div className="w-[24%] md:w-[30%]  max-w-[200px] h-full  rounded-xl space-y-6">
                            <div className=" relative w-full  py-2   bg-CusColor_gre rounded-xl">
                            </div>
                            <button className={`relative w-full   bg-CusColor_grey rounded-xl flex items-center  space-x-2 ${optionActive == 1 ? 'outline outline-offset-2 md:outline-offset-4 outline-2 outline-blue-800' : null} `}
                                onClick={() => setoptionActive(1)}
                            >
                                <div className=" relative  w-[40%] h-[50px] md:h-[80px]">
                                    <Image alt='arrow' src={'/game/canvas-desing.svg'} fill />
                                </div>
                                <div className=" md:text-xl text-blue-800  font-semibold">Stadium</div>
                            </button>
                            <button className={`relative w-full   bg-CusColor_grey rounded-xl flex items-center  space-x-2 ${optionActive == 2 ? 'outline outline-offset-2 md:outline-offset-4 outline-2 outline-blue-800' : null} `}
                                onClick={() => setoptionActive(2)}
                            >
                                <div className=" relative  w-[40%] h-[50px] md:h-[80px]">
                                    <Image alt='arrow' src={'/game/ball-2.svg'} fill />
                                </div>
                                <div className=" md:text-xl text-blue-800  font-semibold">Ball</div>
                            </button>
                            <button className={`relative w-full   bg-CusColor_grey rounded-xl flex items-center  space-x-2 ${optionActive == 3 ? 'outline outline-offset-2 md:outline-offset-4 outline-2 outline-blue-800' : null} `}
                                onClick={() => setoptionActive(3)}
                            >
                                <div className=" relative  w-[40%] h-[50px] md:h-[80px]">
                                    <Image alt='arrow' src={'/game/game-level.svg'} fill />
                                </div>
                                <div className=" md:text-xl text-blue-800  font-semibold">Level</div>
                            </button>
                        </div>
                        <div className=" w-[70%] md:w-[60%] h-full  bg-CusColor_grey rounded-xl fle justify-center items-center p-2">
                            <div className="relative w-full flex justify-betwee items-center py-2">
                                <div className="flex items-center justify-start w-[45%] h-[50px] space-x-1 ">
                                    <div className=" relative w-[40px] h-[40px]">
                                        <Image src={'/search/man.png'} objectFit='cover' fill alt='' />
                                    </div>
                                    <div className=" text-sm lg:text-base">{convertText('hamzabadr12345')}</div>
                                </div>
                                <div className="  relative i w-[10%] h-[40px]">
                                    <Image src={'/game/vs.png'} objectFit='cover' fill alt='' />
                                </div>
                                <div className="flex items-center justify-end w-[45%] h-[50px] space-x-1">
                                    <div className="text-sm lg:text-base  text-end">{convertText('hamzabadr12345')}</div>
                                    <div className=" relative w-[40px] h-[40px]">
                                        <Image src={'/search/boy.png'} objectFit='cover' fill alt='' />
                                    </div>
                                </div>
                            </div>
                            {
                                optionActive == 1 ? (
                                    < CanvasSwiper />
                                ) : optionActive == 2 ? (
                                    < BallSwiper />

                                ) : (

                                    < LevelSwiper />
                                )
                            }
                        </div>
                        <div className=" absolute z-10 w-full bottom-3 md:bottom-10 flex justify-between px-5 md:px-11  ">
                            <button className="BottonsSettings  rotate-180 px-10 py-2 rounded-lg">
                                <div className="rotate-180">
                                    Back
                                </div>
                            </button>
                            <button onClick={() => {
                                setRouterPage('play')
                                router.push(selectPlayer == 'computer' ? '/game/ai?play=true' : selectPlayer == 'computer' ? '/game/offline?play=true' : '/game/online?play=true')
                            }} className="BottonsSettings  px-10 py-2  bg-slate-400 rounded-lg">
                                Next
                            </button>
                        </div>
                    </div >

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

                </div >
            </div >
        </>
    )
}

export default Settings
