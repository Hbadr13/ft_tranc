import React from 'react'
import UserInfo from './user/UserInfo'

const Navbar = () => {
    return (
        <div className={`fixed top-0  w-full bg-blue-300`}>
            <UserInfo />
        </div>
    )
}

export default Navbar