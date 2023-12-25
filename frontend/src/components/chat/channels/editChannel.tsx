import { userProps } from '@/interface/data'
import Link from 'next/link'
import React, { useState } from 'react'

export default function EditChannel({ Receiver }: { Receiver: userProps }) {

    const [click, setClick] = useState(true)
    return (
        <div className="  bg-gray-100 dark:bg-CusColor_dark   p-6 mt-12  w-[20%] h-[820px]     flex justify-start items-start gap-5  rounded-[30px] border  border-sky-500">
            <div className="w-full h-[547.06px] flex-col justify-center items-center gap-[26px] inline-flex">
                <div className="flex-col justify-start items-center gap-3.5 flex ">
                    <img className="w-[136px] h-[136px] rounded-full bofrder-4 bforder-green-600" src={'https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_640.png'} />
                    <div className="flex-col justify-start items-center gap-1 flex">
                        <div className="text-zinc-900 text-[32px] font-bold font-['Satoshi']">{'channel name'}</div>
                    </div>
                </div>
                <div className="w-full  flex-col justify-center items-center inline-flex">

                    <div className="w-6 h-6 relative origin-top-left -rotate-90" />
                </div>
            </div>
        </div>
    )
}
