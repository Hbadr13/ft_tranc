import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import { getBack } from '@/hooks/appContexts'
import { AppProps, userProps } from '@/interface/data'
import Link from 'next/link'
const index = ({ onlineUsersss, currentUser, users, amis }: AppProps) => {
    const router = useRouter()
    const oldpath = useContext(getBack)
    const qr: string | string[] | undefined = router.query.query
    let query: string = "";


    if (typeof qr === 'string') {
        query = qr
    } else if (Array.isArray(qr)) {
        qr.map((value: string) => { query += String(value) })
    }

    const handelGetBack = () => {
        router.push(oldpath)
    }
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
    return (
        <>
            <menu>
                <div className="">
                    {
                        filterUser.map((user: userProps) => (
                            <div className="w-[22%] h-[200px] max-w-[180px] bg-white m-2 p-2 rounded-xl flex flex-col items-start">
                                <Link className=' flex justify-between hover:bg-slate-200  rounded-xl '
                                    href={`/users/${user.username}.${user.id}`}
                                >
                                    <Image className='w-[80%] rounded-md  bg-white' src={user.foto_user} alt={''} height={6000} width={6000} />
                                </Link>
                                <div className="">{user.username}</div>
                                <div className="flex justify-between text-[12px] font-semibold w-full ">
                                    <div className=" bg-slate-800 text-white px-2 py-2 rounded-xl w-[70p flex justify-center items-center">
                                        <button className='' >Add friend</button>
                                    </div>
                                    <div className=" bg-slate-200 text-black px-2 py-2  rounded-xl w-[70p flex justify-center items-center">
                                        <button className=''>Add friend</button>
                                    </div>
                                </div>
                            </div>
                        )
                        )
                    }
                </div>
            </menu>
            <div className={`${filterUser.length == 0 ? ' flex ' : ' hidden '} w-full bg-red- 300   justify-center `}>
                <footer className='w-[60%]  shadow-xl rounded-2xl mt-20 py-10 flex flex-col justify-center items-center space-y-3'>
                    <div className="mt-20 bg-green-w500 flex items-end -space-x-2">
                        <div className="">
                            <Image className='border-2 border-white rounded-full w-[50px] h-[50px]' width={500} height={500} src={'/search/man.png'} alt='woman iamge' />
                        </div>
                        <div className=" z-10">
                            <Image className=' border-2 border-white rounded-full w-[60px] h-[60px]' width={600} height={600} src={'/search/woman.png'} alt='woman iamge'></Image>
                        </div>
                        <div className="">
                            <Image className='  border-2 border-white rounded-full w-[50px] h-[50px]' width={500} height={500} src={'/search/boy.png'} alt='woman iamge'></Image>
                        </div>
                    </div>
                    <div className=" w-[50%] text-center  text-xl font-semibold">
                        <h1>No user found</h1>
                    </div>
                    <div className=' w-[50%]   text-center'>
                        <h2> Sorry, we couldn't find any user with the name</h2>
                        <h2>"{query}" .Please try again.</h2>
                    </div>
                    <div className="space-x-3">
                        <button className='w-[120px] border-2 border-slate-300 py-2  rounded-md  font-bold hover:bg-slate-400 duration-300 '>Clear search</button>
                        <button onClick={handelGetBack} className='w-[120px] border-2  bg-blue-300 py-2  text-blue-800 rounded-md  font-bold hover:bg-slate-400 duration-300'>Get back</button>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default index
