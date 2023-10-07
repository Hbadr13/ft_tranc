


import { Combobox, Transition } from '@headlessui/react'

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Fragment, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react'
import { CustomLinkNavbarProps, BoxSearchrProps } from './model'
import { arabicNames } from '../components/data'

const BoxSearch = ({ searchUser, setSearchUser }: BoxSearchrProps) => {

    const [query, setQuery] = useState('')
    // const [User, setUser] = useState('')
    const [Index, setIndex] = useState(0)
    const [LastArrow, setLastArrow] = useState("")
    const handlingQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
        // setSearchUser(event.target.value)
    }
    const empy: Array<string> = []
    let filterUser = empy;

    if (query.replace(/\s+/g, '')) {
        filterUser = arabicNames.filter((user) => (
            user.toLowerCase().includes(query.trimStart().trimEnd().replace(/\s+/g, ' ').toLowerCase())
        ))
    }

    return (
        <>
            <form className='w-full' action="">
                <Combobox value={searchUser} onChange={setSearchUser} >
                    <div className='relative flex justify-center items-center  h-10 w-[100%]'>
                        <Combobox.Input
                            type="text"
                            className='absolute focus:outline-none bg-slate-800 w-[100%] py-2 text-yellow-400 px-8 rounded-xl hover:bg-slate-900'
                            placeholder='typing..'
                            onChange={handlingQuery}
                            autoComplete='off'
                            value={query}
                        // displayValue={(item) => item}
                        >
                        </Combobox.Input>
                        <Image src='/search.svg' className='absolute left-2' alt='search' width={20} height={20}></Image>
                        <Combobox.Button className='absolute right-3'>
                            <Image src='/arrow-up.svg' className='w-[auto] ' alt='search' width={20} height={20}></Image>
                        </Combobox.Button>
                    </div>
                    <Combobox.Options className='absolute flex justify-center mt-5 w-[50%]'>
                        <div className={`text-center rounded-2xl m-2 shadow-slate-800 shadow-md font-light flex flex-col justify-center w-[100%] bg-red-200 overflow-hidden`}>
                            {
                                filterUser.map((item, index) => (

                                    index < 10 && (
                                        < Combobox.Option value={item} key={index}
                                            className={({ active }) => `flex justify-around  ${active ? 'bg-teal-600 text-white' : 'text-gray-900'}`}
                                            onClick={() => setQuery(item)}
                                            onMouseEnter={() => setIndex(index)}
                                        >
                                            <Image src={"/man.png"} alt='man profiel' width={60} height={40}></Image>
                                            <CustomLinkNavbar href='/' content={item} ></CustomLinkNavbar>
                                            <CustomLinkNavbar href='/' content=' add friend' ></CustomLinkNavbar>
                                        </Combobox.Option>
                                    )
                                ))
                            }
                        </div>
                    </Combobox.Options>
                </Combobox >
            </form >
        </>
    )
}

const CustomLinkNavbar = ({ href, content, moreStye }: CustomLinkNavbarProps) => {
    return (
        <div className={`rounded justify-between flex items-center ${moreStye}`}>
            <Link className='hover:bg-orange-400 hover:text-cyan-100 p-1 px-2 rounded-xl' href={String(href)}>
                {content}
            </Link>
        </div>
    )
}

const Navbar = () => {
    const [searchUser, setSearchUser] = useState("")

    return (
        <>
            <div className='bg-slate-600 px-5 py-2 w-full flex justify-between item-center font-light shadow-md shadow-slate-700'>
                <div className="w-[20%] hidden  sm:flex flex-row item-center justify-between text-[#1ba098]">
                    <CustomLinkNavbar moreStye="" href="/" content="Home" />
                    <CustomLinkNavbar moreStye="" href="/" content="Chat" />
                    <CustomLinkNavbar moreStye="" href="/game" content="PongGame" />
                </div>
                <div className="flex item-center justify-center sm:w-[60%] w-[100%] py-4 ">
                    <BoxSearch searchUser={searchUser} setSearchUser={setSearchUser} />
                </div>
                <div className="hidden w-[20%] pl-10 sm:flex justify-between item-center text-[#1ba098]">
                    <CustomLinkNavbar moreStye='' href="/" content="logOut" />
                    <CustomLinkNavbar moreStye='' href="/" content="more" />
                </div>
            </div>
            <div className='bg-red-200'>{searchUser}</div>

        </>
    )
}

export default Navbar;

