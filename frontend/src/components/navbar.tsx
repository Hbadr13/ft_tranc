import React, { useEffect, useRef, useState } from 'react'
import UserInfo from './user/UserInfo'
import { AppProps, userProps } from '@/interface/data'
import { useRouter } from 'next/router'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'



const Navbar = ({ onlineUsersss, currentUser, users, amis }: AppProps) => {
    const ref = useRef<any>();
    const ref2 = useRef<any>();
    const [searchUser, setSearchUser] = useState("")
    const [clickInInput, setclickInInput] = useState(false)
    const [click, setclick] = useState(true)
    const [query, setQuery] = useState('')
    const router = useRouter()
    const light: string = ' bg-[#f6f6f9] ';
    const grey: string = ' bg-[#eee] ';

    const toggleTheme = () => {
        document.body.classList.toggle('dark');
    };
    const handelOnSubmit = () => {
        const search = query.trim().replace(/\s+/g, ' ')
        if (query.replace(/\s+/g, '')) {
            // setQuery('')
            router.push(`/search?query=${search}`)
        }

    }
    const handelOnKeyDown = (e: any) => {
        if (e.key == 'Enter') {
            const search = query.trim().replace(/\s+/g, ' ')
            if (query.replace(/\s+/g, '')) {
                // setQuery('')
                router.push(`/search?query=${search}`)
                setclick(false)
            }
        }
    }

    const handelClickInInput = () => {
        setclickInInput((pr) => !pr)
        setclick(true)
    }
    useEffect(() => {
        document.addEventListener('click', (event: any) => {
            if (ref.current && !ref2.current.contains(event.target)) {
                // console.log('hi')
                setclickInInput(false)
                setclick(false)
            }
        })
    })
    const empy: Array<userProps> = []
    let filterUser = empy;
    if (query.replace(/\s+/g, '')) {
        filterUser = users.filter((user: userProps) => {
            user.flag = true
            amis.filter((usr: userProps) => {
                if (usr.id == user.id)
                    user.flag = false
            })
            return user.username?.toLowerCase().includes(query.trimStart().trimEnd().replace(/\s+/g, ' ').toLowerCase())
        }
        )
    }
    if (query == '') {
        filterUser = users
    }
    return (
        <>
            <div className={`navbar fixed top-0 z-50 ${light} flex justify-between items-center py-1 pl-10`}>
                <div className="w-[33%]">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onClick={handelClickInInput} ref={ref2} onChange={(e) => { setQuery(e.target.value); setclick(true) }} autoComplete='off' onKeyDown={handelOnKeyDown} className="outline-none block w-full pr-20 py-2 pl-10 text-sm  text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-1 focus:ring-offset-2 focus:ring-black  duration-300
                         focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                        <button type="submit" onClick={handelOnSubmit} className="text-white absolute right-[3.6px] bottom-[2.7px] bg-blue-600 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-[5.5px] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        {
                            (query != '' || clickInInput) && click && router.route != '/search' ? (

                                <div ref={ref} className="absolute  top-12 bg-CusColor_grey shadow-2xl  w-[400px] h-[400px]  rounded-xl  transition-transform px-4">
                                    <div className="text-sm font-bold flex justify-between p-2  text-slate-600">
                                        {
                                            query == '' ?
                                                (<h3>Recent</h3>) : (
                                                    <h3>All users ({filterUser.length}) </h3>
                                                )
                                        }
                                        <Link href={'/search'} className='text-blue-700'>See all </Link>

                                    </div>
                                    {
                                        filterUser.map((user: userProps) => (
                                            <Link className=' flex justify-between hover:bg-slate-200 p-2 rounded-xl space-x-3 '
                                                href={`/users/${user.username}.${user.id}`}
                                            >
                                                <div className=" flex justify-center space-x-4">
                                                    <div className=" relative">
                                                        <div className={`absolute right-0 w-[11px] h-[11px]  bg-white rounded-full flex justify-center items-center ${(!user.flag) ? ' ' : ' hidden '}`}>
                                                            <div className={` w-[8px] h-[8px]  rounded-full ${onlineUsersss.includes(user.id) ? 'bg-green-500' : 'bg-red-500'}`} />
                                                        </div>
                                                        <Image className='w-[40px] h[40p] rounded-md  bg-white' src={user.foto_user} alt={''} height={6000} width={6000} />
                                                    </div>
                                                    <div className="">
                                                        <div className="hover:border-b border-blue-500  font-semibold">
                                                            {user.username}
                                                        </div>

                                                        <div className={`text-[12px] text-slate-500 ${user.flag ? ' hidden ' : ' block '}`}>
                                                            friend
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className=" flex  space-x-6 items-center ">
                                                    {

                                                        user.flag ? (
                                                            <Link href={'/game'} className=' border-2  border-blac  p-2 rounded-md hover:ring-offset-2 hover:ring-2 duration-300 hover:ring-red-200'>
                                                                <Image src='/add-friend.svg' className=' fill-red-700  text-red-200' alt='search' width={20} height={20} />
                                                            </Link>
                                                        ) : (<Link href={'/game'} className=' border-2  border-blac  p-2 rounded-md hover:ring-offset-2 hover:ring-2 duration-300 hover:ring-red-200'>
                                                            <Image src='/icons-ping-pong-black.png' className=' ' alt='search' width={20} height={20}></Image>
                                                        </Link>)
                                                    }

                                                    <Link href={'/chat'} className=' bg-blue-300 p-2 rounded-md  hover:ring-offset-2 hover:ring-2 duration-300'>
                                                        <Image src='/icons-chat-black.png' className='' alt='search' width={20} height={20}></Image>
                                                    </Link>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            ) : null
                        }
                    </div>
                </div>
                <div className="">
                    <button className=' block dark:hidden border-2 border-black rounded-md' onClick={toggleTheme}>Dark</button>
                    <button className='hidden dark:block border-2 border-black rounded-md' onClick={toggleTheme}>Light</button>
                </div>
                <div className="">
                    <UserInfo />
                </div>
            </div >
        </>
    )
}

export default Navbar
