import { CarProps } from '@/type'
import React from 'react'
import Image from 'next/image'
import { CardDetails, CustomBotton } from '.'
import { useState } from 'react'
import { faL } from '@fortawesome/free-solid-svg-icons'
interface CarPropsItf {
    car: CarProps
}

const CarCard = ({ car }: CarPropsItf) => {
    const { city_mpg,
        year,
        make,
        model,
        transmission,
        drive,
    } = car;

    const [IsOpen, setIsOpen] = useState(false)
    return (
        <div className='flex flex-col p-6 bg-slate-100 justify-center items-start text-black-100 bg-primary-blue-100 hover:bg-white hover:shadow-md rounded-3xl group'>
            <div className='w-full flex justify-between items-start gap-2'>
                <h2 className='text-[20px] leading-[26px] font-bold capitalize'>
                    {make} {model}
                </h2>
            </div>


            <p className='flex mt-6 text-[32px] font-extrabold'>
                <span className='self-start text-[14px] font-semibold'>
                    $
                </span>
                {(city_mpg * year / 845).toFixed(0)}
                <span className='self-end text-[14px] font-medium'>
                    /day
                </span>
            </p>
            <div className='relative object-contain my-3 w-full h-40'>
                <Image src='/hero.png' fill priority alt='hello' className='object-contain'></Image>
            </div>
            <div className='flex   relative w-full mt-2'>
                <div className='flex group-hover:invisible justify-between text-gray w-full'  >
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src='/steering-wheel.svg' alt='steering wheel' width={20} height={20} />
                        <p>
                            {
                                transmission === 'a' ? 'Automatic' : 'Manual'
                            }
                        </p>

                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src='/tire.svg' alt='tire' width={20} height={20} />
                        <p>
                            {
                                drive.toUpperCase()
                            }
                        </p>

                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src='/gas.svg' alt='gas' width={20} height={20} />
                        <p>
                            {
                                city_mpg
                            }
                        </p>
                    </div>
                </div>
                <div className='hidden group-hover:flex absolute bottom-0 w-full z-10' >
                    <CustomBotton
                        title='View More'
                        containerStyle='w-full rounded-full bg-blue-500'
                        textStyle='text-white text-[14px] leading-[16px] font-blod'
                        rightIcon='/right-arrow.svg'
                        handleclick={() => setIsOpen(true)}
                    />
                </div>

            </div>
            <CardDetails isOpen={IsOpen} closeModel={() => setIsOpen(false)} car={car} />
        </div>
    )
}

export default CarCard