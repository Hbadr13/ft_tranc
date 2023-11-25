

'use client';
import { useState, useEffect } from 'react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';


const url = 'https://fakestoreapi.com/products';

const Card = ({ title }: { title: string }) => {
  console.log('mochlikka')
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[80%] h-[70%] bg-CusColor_grey flex justify-center items-center rounded-xl">

        <button className=' bg-slate-300 hover:bg-slate-400 p-2 rounded-md'>
          {title}
        </button>
      </div>
    </div>
  )
}


const CustomSlider1 = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center mt-20">
        <div className=" relative w-[100%] md:w-[70%] xl:w-[60%] bg-slate-300 h-[400px] flex justify-center items-center rounded-xl">
          <Swiper
            className='w-full h-full'
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
          >
            
            <SwiperSlide className='w-full h-full g-CusColor_primary ' >
              <Card title='Play With Friend' />
            </SwiperSlide>
            <SwiperSlide className='w-full h-full g-CusColor_primary ' >
              <Card title='Search For Ai' />
            </SwiperSlide>
            <SwiperSlide className='w-full h-full g-CusColor_primary ' >
              <Card title='Play With Friend offline' />
            </SwiperSlide>
            <SwiperSlide className='w-full h-full g-CusColor_primary ' >
              <Card title='Search For Opponent' />
            </SwiperSlide>
            <div className="absolute z-30 left-3 md:left-5 xl:left-10 inset-y-0  flex justify-between">
              <ButtonSlideNavToLeft />
            </div>
            <div className="absolute z-30  right-3 md:right-5 xl:right-10 inset-y-0   flex justify-between">
              <ButtonSlideNavToRight />
            </div>
          </Swiper >
        </div>
      </div >
    </>
  );
};
const ButtonSlideNavToRight = () => {
  const swiper = useSwiper()
  return (

    <button
      className=' p-1 rounded-md rotate-180'
      onClick={() => swiper.slideNext()}
    >
      <Image src={'/game/left-arrow.png'} alt='next' width={30} height={30}></Image>

    </button>
  )
}
const ButtonSlideNavToLeft = () => {
  const swiper = useSwiper()
  return (
    <button
      className=' p-1 rounded-md '
      onClick={() => swiper.slidePrev()}
    >
      <Image src={'/game/left-arrow.png'} alt='next' width={30} height={30}></Image>

    </button>
  )
}
export default CustomSlider1;
