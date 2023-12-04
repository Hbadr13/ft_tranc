import React from 'react'
import { AppProps, userProps } from '@/interface/data';



export default function DirectConversationList({ users, currentUser }: { users: AppProps, currentUser: userProps }) {
    return (
        <div className='w-full'>
            <h1 className=' text-CusColor_warning'>
                {currentUser.username}
            </h1>
            {
                users.map((user: userProps) => (
                    <>
                        <p>
                            {user.username}
                        </p>
                    </>
                ))

            }
        </div>
    )
}
