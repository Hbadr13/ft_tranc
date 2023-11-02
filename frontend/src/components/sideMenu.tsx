
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


    const grey: string = ' bg-[#eee] ';
    const light: string = ' bg-[#f6f6f9] ';

    return (
        <div className='text-sm'>
            <div className={`fixed z-50 w-[63px] h-screen ${light} space-y-3  sm:w-[150px] transition-width duration-1000`}>
                <div className='relative py-2 pl-2 rounde w-full bg-red-300s mt-20'>
                    <div className={`${activeButton == 1 ? 'block' : 'hidden'} -top-[8px]  right-0 absolute w-[20px] h-[16px]   ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-br-[15px]`}>
                        </div>
                    </div>
                    <div onClick={() => setActiveButton(1)} className={`${activeButton == 1 ? `${grey}` : light} p-1 rounded-l-full transition-padding duration-100 hover:p-2`}>
                        <Link className={`flex items-center space-x-4 p-2 rounded-full ${light} w-full`} href='/'>
                            <Image src='/icons-home-black.png' className='w-auto' alt='search' width={20} height={20}></Image>
                            <span className={`hidden sm:block ${activeButton == 1 ? ' text-blue-900  font-bold' : ''}`}>
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
                    <div onClick={() => setActiveButton(2)} className={`${activeButton == 2 ? grey : light} p-1 rounded-l-full transition-padding duration-100 hover:p-2`}>
                        <Link className={`flex items-center space-x-4 p-2 rounded-full ${light} w-full`} href='/chat'>
                            <Image src='/icons-chat-black.png' className='w-auto' alt='search' width={20} height={20}></Image>
                            <span className={`hidden sm:block ${activeButton == 2 ? 'text-blue-900  font-bold' : ''}`}>
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
                    <div onClick={() => setActiveButton(3)} className={`${activeButton == 3 ? grey : light} p-1 rounded-l-full transition-padding duration-100 hover:p-2`}>
                        <Link className={`flex items-center space-x-4 p-2 rounded-full ${light} w-full`} href='/profile'>
                            <Image src='/icons-user-black.png' className='w-auto' alt='search' width={20} height={20}></Image>
                            <span className={`hidden sm:block ${activeButton == 3 ? 'text-blue-900  font-bold' : ''}`}>
                                Profile
                            </span>
                        </Link>
                    </div>
                    <div className={`${activeButton == 3 ? 'block' : 'hidden'} -buttom-[8px]  right-0 absolute w-[20px] h-[16px] ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-tr-[15px]`}></div>
                    </div>
                </div>
                <div className='relative py-2 pl-2 rounde w-full bg-red-300s mt-10'>
                    <div className={`${activeButton == 4 ? 'block' : 'hidden'} -top-[8px]  right-0 absolute w-[20px] h-[16px]   ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-br-[15px]`}>
                        </div>
                    </div>
                    <div onClick={() => setActiveButton(4)} className={`${activeButton == 4 ? grey : light} p-1 rounded-l-full transition-padding duration-100 hover:p-2`}>
                        <Link className={`flex items-center space-x-4 p-2 rounded-full ${light} w-full`} href='/game'>
                            <Image src='/icons-ping-pong-black.png' className='w-auto' alt='search' width={20} height={20}></Image>
                            <span className={`hidden sm:block ${activeButton == 4 ? 'text-blue-900  font-bold' : ''}`}>
                                Play
                            </span>
                        </Link>
                    </div>
                    <div className={`${activeButton == 4 ? 'block' : 'hidden'} -buttom-[8px]  right-0 absolute w-[20px] h-[16px] ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-tr-[15px]`}></div>
                    </div>
                </div>
                <div className=' absolute bottom-40 py-2 pl-2 rounde w-full bg-red-300s mt-10'>
                    <div className={`${activeButton == 10 ? 'block' : 'hidden'} -top-[8px]  right-0 absolute w-[20px] h-[16px]   ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-br-[15px]`}>
                        </div>
                    </div>
                    <div onClick={() => setActiveButton(10)} className={`${activeButton == 10 ? grey : light} p-1 rounded-l-full transition-padding duration-100 hover:p-2`}>
                        <Link className={`flex items-center space-x-4 p-2 rounded-full ${light} w-full`} href='/'>
                            <Image src='/icons-logout-black.png' className='w-auto' alt='search' width={20} height={20}></Image>
                            <span className={`hidden sm:block ${activeButton == 10 ? 'text-blue-900  font-bold' : ''}`}>
                                LogOut
                            </span>
                        </Link>
                    </div>
                    <div className={`${activeButton == 10 ? 'block' : 'hidden'} -buttom-[8px]  right-0 absolute w-[20px] h-[16px] ${grey}`}>
                        <div className={`w-[20px] h-[16px] ${light} rounded-tr-[15px]`}></div>
                    </div>
                </div>
            </div>
            {/* <div className="b">

                <div className="  ">hello worl 1111111111111111122222 </div>
                <div className="  ">hello worl 1111111111111111122222 </div>
                <div className="  ">hello worl 1111111111111111122222 </div>
            </div> */}
        </div>
    )
}

export default SideMenu;
