import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CustomBotton } from './index'
const Nave = () => {
  return (
    <>
      <header className='px-10 pt-3 w-full absolute z-10'>
        <nav className='flex justify-between mx-auto items-center px-6 py-4 sm:px-16'>
          <Link href={"/"}>
            <Image src="/logo.svg" width={202} height={202} alt='logo'></Image>
          </Link>
          <CustomBotton title='Sing In' containerStyle='bg-white rounded-full' btntype='button' />
        </nav>
      </header >
    </>
  )
}

export default Nave