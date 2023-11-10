import React from 'react'
import UserInfo from './user/UserInfo'

const Navbar = () => {
    return (
        <div className={`fixed top-0  z-30  w-full bg-blue-500`}>
            <UserInfo />
        </div>
    )
}

export default Navbar