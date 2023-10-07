import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { footerLinks } from '../../constants/constant';

const Footer = () => {
  return (<>
    <footer className='flex flex-col text-black-100  mt-5 border-t border-gray-100'>
      <div className='flex  max-sm:flex-col flex-wrap justify-between gap-5 sm:px-16 px-16 py-10 space-y-3'>
        <div className='flex w-[40%] flex-col justify-start items-start gap-6'>
          <Image src='/logo.svg' alt='logo' width={118} height={18} className='object-contain' />
          <p className='text-base text-gray-700'>
            Carhub 2023 <br />
            All Rights Reserved &copy;
          </p>
        </div >
        {footerLinks.map(item => (
          <div key={item.title} className='flex flex-col gap-5 text-base'>
            <h1 className='font-bold text-gray-800'>{item.title}</h1>
            < div className="flex flex-col gap-3 text-gray-500">
              {
                item.links.map(itm => (
                  <Link href={itm.url} key={itm.title}>{itm.title}</Link>
                ))
              }
            </div>
          </div>
        ))
        }
      </div>
    </footer >
  </>)
}
export default Footer;