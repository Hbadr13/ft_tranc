
import { useRouter } from 'next/navigation'

import { Combobox, Transition } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import UserInfo from './user/UserInfo'
import { AppProps, BoxSearchrProps, userProps } from '@/interface/data'
import { CustomLinkSideMenuProps } from './model'



export const SideMenuColor: string = '#1ba098'
export const light: string = '#eee'
export const primary: string = '#1976D2'
export const lightPrimary: string = '#CFE8FF'
export const grey: string = '#eee'
export const darkGrey: string = '#AAAAAA'
export const dark: string = '#363949'
export const danger: string = '#D32F2F'
export const lightDanger: string = '#FECDD3'
export const warning: string = '#FBC02D'
export const lightWarning: string = '#FFF2C6'
export const success: string = '#388E3C'
export const lightSuccess: string = '#BBF7D0'



const SideMenu = ({ onlineUsersss, currentUser, users, amis }: AppProps) => {

    const [activeButton, setActiveButton] = useState<Number>(0);
    const [splitSidebar, setsplitSidebar] = useState<boolean>(true);

    const grey: string = ' bg-[#eee] ';
    const light: string = ' bg-[#f6f6f9] ';
    const handelsplitSidebar = () => {
        if (window.innerWidth < 768)
            return
        setsplitSidebar((prev) => !prev)
        const sidebar = document.querySelector('.sidebar')
        const home = document.querySelector('.home')
        const navbar = document.querySelector('.navbar')

        sidebar?.classList.toggle('close')
        navbar?.classList.toggle('close')
        home?.classList.toggle('close')
    }
    // ${ splitSidebar ? '' : 'wd-[52px]' }
    return (
        <div className='text-sm'>
            <div className={`sidebar fixed top-0 z-50  pt-20 h-screen  ${light}  space-y-3`}>
                <div className="absolute top-0 w-full h-[20px]  mx-auto mt-5 flex justify-center items-center ">
                    <button onClick={handelsplitSidebar} className='w-[20px] h-[90%] bg-blue-400 duration-300  rounded-md hover:p-[11px] '>
                    </button>
                </div>

                <div className='relative py-2 pl-2 rounde w-full bg-red-300s '>
                    <div className={`${activeButton == 1 ? 'block' : 'hidden'} -top-[8px]  right-0 absolute w-[20px] h-[16px]   ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-br-[15px]`}>
                        </div>
                    </div>
                    <div className={`${activeButton == 1 ? `${grey}` : light} p-1 rounded-l-full transition-padding duration-100 hover:p-2`}>
                        <Link onClick={() => setActiveButton(1)} className={`flex items-center space-x-4 p-2 rounded-full ${light} w-full`} href='/'>
                            <Image src='/icons-home-black.png' className='' alt='search' width={20} height={20}></Image>
                            <span className={`  ${activeButton == 1 ? ' text-blue-900  font-bold' : ''} `}>
                                Home
                            </span>
                        </Link>
                    </div>
                    <div className={`${activeButton == 1 ? 'block' : 'hidden'} -buttom-[8px]  right-0 absolute w-[20px] h-[16px] ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-tr-[15px]`}></div>
                    </div>
                </div>



                <div className='relative py-2 pl-2 rounde w-full bg-red-300s mt-10'>
                    <div className={`${activeButton == 2 ? 'block' : 'hidden'} -top-[8px]  right-0 absolute w-[20px] h-[16px]   ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-br-[15px]`}>
                        </div>
                    </div>
                    <div className={`${activeButton == 2 ? grey : light} p-1 rounded-l-full transition-padding duration-100 hover:p-2`}>
                        <Link onClick={() => setActiveButton(2)} className={`flex items-center space-x-4 p-2 rounded-full ${light} w-full`} href='/chat'>
                            <Image src='/icons-chat-black.png' className='' alt='search' width={20} height={20}></Image>
                            <span className={` ${activeButton == 2 ? 'text-blue-900  font-bold' : ''} `}>
                                Chat
                            </span>
                        </Link>
                    </div>
                    <div className={`${activeButton == 2 ? 'block' : 'hidden'} -buttom-[8px]  right-0 absolute w-[20px] h-[16px] ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-tr-[15px]`}></div>
                    </div>
                </div>

                <div className='relative py-2 pl-2 rounde w-full bg-red-300s mt-10'>
                    <div className={`${activeButton == 3 ? 'block' : 'hidden'} -top-[8px]  right-0 absolute w-[20px] h-[16px]   ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-br-[15px]`}>
                        </div>
                    </div>
                    <div className={`${activeButton == 3 ? grey : light} p-1 rounded-l-full transition-padding duration-100 hover:p-2`}>
                        <Link onClick={() => setActiveButton(3)} className={`flex items-center space-x-4 p-2 rounded-full ${light} w-full`} href='/profile'>
                            <Image src='/icons-user-black.png' className='' alt='search' width={20} height={20}></Image>
                            <span className={` ${activeButton == 3 ? 'text-blue-900  font-bold' : ''} `}>
                                Profile
                            </span>
                        </Link>
                    </div>
                    <div className={`${activeButton == 3 ? 'block' : 'hidden'} -buttom-[8px]   right-0 absolute w-[20px] h-[16px] ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-tr-[15px]`}></div>
                    </div>
                </div>

                <div className='relative py-2 pl-2 rounde w-full bg-red-300s mt-10'>
                    <div className={`${activeButton == 4 ? 'block' : 'hidden'} -top-[8px]  right-0 absolute w-[20px] h-[16px]   ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-br-[15px]`}>
                        </div>
                    </div>
                    <div className={`${activeButton == 4 ? grey : light} p-1 rounded-l-full transition-padding duration-100 hover:p-2`}>
                        <Link onClick={() => setActiveButton(4)} className={`flex items-center space-x-4 p-2 rounded-full ${light} w-full`} href='/user'>
                            <Image src='/icons-user-account-black.png' className='' alt='search' width={20} height={20}></Image>
                            <span className={` ${activeButton == 4 ? 'text-blue-900  font-bold' : ''} `}>
                                Friends
                            </span>
                        </Link>
                    </div>
                    <div className={`${activeButton == 4 ? 'block' : 'hidden'} -buttom-[8px]   right-0 absolute w-[20px] h-[16px] ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-tr-[15px]`}></div>
                    </div>
                </div>

                <div className='relative py-2 pl-2 rounde w-full bg-red-300s mt-10'>
                    <div className={`${activeButton == 5 ? 'block' : 'hidden'} -top-[8px]  right-0 absolute w-[20px] h-[16px]   ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-br-[15px]`}>
                        </div>
                    </div>
                    <div className={`${activeButton == 5 ? grey : light} p-1 rounded-l-full transition-padding duration-100 hover:p-2`}>
                        <Link onClick={() => setActiveButton(5)} className={`flex items-center space-x-4 p-2 rounded-full ${light} w-full`} href='/game'>
                            <Image src='/icons-ping-pong-black.png' className='' alt='search' width={20} height={20}></Image>
                            <span className={` ${activeButton == 5 ? 'text-blue-900  font-bold' : ''} `}>
                                Play
                            </span>
                        </Link>
                    </div>
                    <div className={`${activeButton == 5 ? 'block' : 'hidden'} -buttom-[8px]  right-0 absolute w-[20px] h-[16px] ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-tr-[15px]`}></div>
                    </div>
                </div>

                <div className='relative py-2 pl-2 rounde w-full bg-red-300s pt-28'>
                    <div className={`${light} p-1 rounded-l-full transition-padding duration-100 hover:p-2`}>
                        <Link onClick={() => setActiveButton(10)} className={`flex items-center space-x-4 p-2 rounded-full ${light} w-full`} href='/game'>
                            <Image src='/icons-logout-black.png' className='' alt='search' width={20} height={20}></Image>
                            <span className={` ${activeButton == 10 ? 'text-blue-900  font-bold' : ''} `}>
                                Log Out
                            </span>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SideMenu;
