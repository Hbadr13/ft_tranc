import { userProps } from '@/interface/data'
import Link from 'next/link'
import React, { useState } from 'react'

export default function EditChannel({ Receiver }: { Receiver: userProps }) {

    const [click, setClick] = useState(true)
    return (
        <div className="  bg-gray-100 dark:bg-CusColor_dark   p-6 mt-12  w-[20%] h-[820px]     flex justify-start items-start rounded-[30px] border  border-sky-500">
            <div className="w-full bg-blafck flex-col justify-center items-center">
                <div className="flex-col justify-start items-center flex ">
                    <img className="w-28 h-28 rounded-full " src={'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_640.png'} />
                    <div className="text-zinc-900 text-[32px] font-bold font-['Satoshi']">{'channel name'}</div>
                </div>
                <div className="bg-blue-400 w-full h-full">
                    Admin
                </div>
                <div className="bg-blue-600 w-full h-full">
                    Participants
                </div>
            </div>
        </div>
    )
}
