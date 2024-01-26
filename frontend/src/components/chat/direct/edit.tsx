import { Constant } from '@/constants/constant';
import { userData, userProps } from '@/interface/data'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
interface LevelBarpros {
    value: string
}
function LevelBar({ value }: LevelBarpros) {

    const progressWidth = `${value}0%`;

    return (
        <div className="bg-white h-7  drop-shadow shadow-md shadow-black    w-full  rounded-lg" >
            <div className=' w-full  flex justify-center items-center'>
                7-68%
            </div>
            <div className="bg-[#0ea5e9]  -mt-6 h-full w-full rounded-lg  flex  justify-center items-center " style={{ width: progressWidth }}>
                {/* <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
              {`${value}%`} */}
                {/* </span> */}
            </div>
        </div >
    );
}

export default function Edit({ currentUser, users, setStatus_Tow_User, status_tow_user }: { currentUser: userProps, users: userProps[], setStatus_Tow_User: (value: boolean) => void, status_tow_user: boolean }) {

    const [status, setstatus] = useState<any>('');
    const router = useRouter();
    const [receiver, setReceiver] = useState<userProps>(userData)

    useEffect(() => {
        let id = Number(router.query.user)
        users.map((item) => {
            if (item.id == id) {
                setReceiver(item)
                console.log('========?>', item.id);
            }
        })
    }, [router])

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch(`${Constant.API_URL}/chat/statusChatTwoUser/${receiver.id}`, {
                        credentials: 'include',
                    });
                    const content = await response.json();

                    setstatus(content)

                } catch (error) {

                }
            }
        )();

    }, [receiver, status_tow_user]);
    const blockChatTwoUser = async () => {

        const response = await fetch(`${Constant.API_URL}/chat/blockChatTwoUser/${receiver.id}`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },

            credentials: 'include',
        });
        if (response.ok)
            setStatus_Tow_User(true)

        // chatSocket.emit('message', { senderId: currentUser.id, receiverId: receiver.id, content: content });
    }
    const unblockChatTwoUser = async () => {

        const response = await fetch(`${Constant.API_URL}/chat/unblockChatTwoUser/${receiver.id}`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },

            credentials: 'include',
        });
        if (response.ok)
            setStatus_Tow_User(false)
        // chatSocket.emit('message', { senderId: currentUser.id, receiverId: receiver.id, content: content });
    }

    return (
        <div className='w-full h-full'>
            <div className="flex-col justify-start items-center mt-4 flex ">
                <Link  className=' hover:scale-105 duration-500' href={`/users/${receiver.username}.${receiver.id}`}>
                    <img className="w-40 h-40 rounded-full border-4 border-green-600" src={receiver.foto_user} />
                </Link>
                <div className="flex-col justify-start items-center flex">
                    <div className="text-zinc-900 dark:text-CusColor_light text-[32px] font-bold font-['Satoshi']">{receiver.username}</div>
                    <div className="text-neutral-600 font-normal">{receiver.email}</div>
                </div>
            </div>
            <div className="flex-col  justify-center  items-center    w-full flex bg-slate-500">

                <div className=" bg-bhlack flex-col w-full bg-blacek    justify-center items-center flex">
                    <div className="w-full justify-center items-center  space-x-2inline-flex">

                        <div className="text-black  dark:text-white bg-blacsk text-base flex   font-normal font-['Satoshi']">Level:</div>
                        <LevelBar value={"8"} />
                    </div>
                    <div className="w-full mt-6 justify-center space-x-6 items-center flex-row flex">


                        <div className="text-black text-base dark:text-white font-normal font-['Satoshi']">win: </div>
                        <div className="text-blue-600  w-28 h-10 text-xl flex justify-center items-center shadow-md  rounded-lg bg-white border border-white    font-normal font-['Satoshi']">120</div>


                    </div>
                </div>
            </div>
            {<div className=' w-full  items-end   bg-forange-300 flex justify-end '>

                {
                    (status.status == "accepted" || !status) &&
                    <div className='w-full bg-bldack h-16  flex justify-center items-center'>

                        <button onClick={() => blockChatTwoUser()}
                            className='hover:scale-110 md:w-full    lg:w-44 h-12 text-md font-black text-red-400 bg-white shadow-md  shadow-red-300 dark:bg-gray-700 rounded-2xl   duration-300'
                        >Blocked</button>
                    </div>
                }
                <>
                    {
                        status.status == "blocked" && <>
                            {
                                status.userAId == currentUser.id &&
                                <div className='w-full bg-bldack h-16 flex justify-center items-center'>
                                    <button onClick={() => unblockChatTwoUser()} className='shadow-md  shadow-blue-300 h-12 text-md font-black text-blue-600 bg-white dark:bg-gray-700 rounded-2xl   duration-300 hover:scale-110  '>Unblocked</button>
                                </div>
                            }
                            {
                                status.userBId == currentUser.id && <div></div>

                            }
                        </>
                    }
                </>

            </div>}

        </div>
    )
}