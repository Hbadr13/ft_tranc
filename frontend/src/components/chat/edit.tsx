import { userProps } from '@/interface/data'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Edit({ currentUser, Receiver }: { currentUser: userProps, Receiver: userProps }) {


    const handlDelete = () => {
        fetch(`http://localhost:3333/chat/deleteConversationDirect/${currentUser.id}/${Receiver.id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    }

    return (
        <div className="md:hidden sm:hidden  bg-gray-100 dark:bg-slate-800   p-6 mt-12  w-[20%] h-[820px]      lg:flex justify-start items-start gap-5  rounded-[30px] border  border-sky-500">
            <div className="w-full h-[547.06px] flex-col justify-center items-center gap-[26px] inline-flex">
                <Link className="flex-col justify-start items-center gap-3.5 flex " href={`/users/${Receiver.username}.${Receiver.id}`}>
                    <img className="w-[136px] h-[136px] rounded-full border-4 border-green-600" src={Receiver.foto_user} />
                    <div className="flex-col justify-start items-center gap-1 flex">
                        <div className="text-zinc-900 dark:text-CusColor_light text-[32px] font-bold font-['Satoshi']">{Receiver.username}</div>
                        <div className="text-neutral-600 text-base font-normal font-['Satoshi'] leading-[18px]">{Receiver.email}</div>
                    </div>
                </Link>
                <div className="flex-col justify-start items-start gap-5 flex">

                    <div className=" bg-bhlack flex-col justify-start items-start gap-3.5 flex">
                        <div className="w-[323px] justify-between items-center inline-flex">
                            <div className="justify-start items-center gap-1.5 flex">
                                <div className="w-6 h-6 relative" />
                                <div className="text-neutral-500 text-base font-normal font-['Satoshi']"> level: {Receiver.level}</div>
                            </div>
                            <div className="w-6 h-6 relative origin-top-left -rotate-90" />
                        </div>
                        <div className="w-[323px] justify-between items-center inline-flex">
                            <div className="justify-start items-center gap-1.5 flex">
                                <div className="w-6 h-6 relative" />
                                <div className="text-neutral-500 text-base font-normal font-['Satoshi']">win: {Receiver.won} </div>
                            </div>
                            <div className="w-6 h-6 relative origin-top-left -rotate-90" />
                        </div>
                    </div>
                </div>
                <div className="w-full  flex-col justify-center items-center inline-flex">
                    <button onClick={handlDelete} className=" bg -black justify-center items-center">
                        <div className="text-neutral-500 text-xl font-normal font-['Satoshi']">delete conversation</div>
                    </button>
                </div>
            </div>
        </div>
    )
}