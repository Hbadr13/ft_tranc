
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { userProps } from '@/interface/data';
import Image from 'next/image';
import Link from 'next/link';
import { FreeMode, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
const OnlineUserss = ({ onlineUsersss, amis }: { onlineUsersss: Array<number>, amis: Array<userProps> }) => {
    const [windowWidth, setWindoWidth] = useState(1)
    useEffect(() => {
        const handleRisize = () => {
            setWindoWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleRisize);
        return () => {
            window.removeEventListener('resize', handleRisize);
        };

    }, [])
    return (
        <Swiper

            slidesPerView={windowWidth < 1200 ? 8 : 3}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            className="mySwiper w-full h-full"
        >
            {
                amis.map((user) => (
                    <SwiperSlide key={user.id + '_'} className='relative  h-full  w-full' >
                        <Link href={'/users/' + user.username + '.' + String(user.id)} className="w-full h-full flex items-center  ">
                            <div className="w-[100px] h-[100px] bg-slate-400  rounded-full  flex items-center justify-center">
                                <div className="w-[95px] h-[95px] bg-white  rounded-full flex items-center justify-center">
                                    <div className="w-[90px] h-[90px] relative ">
                                        <Image className='rounded-full' style={{ objectFit: "cover" }} src={user.foto_user} alt={user.username} fill></Image>
                                        <div className={`absolute top-1 right-0 w-[15px] h-[15px] rounded-full flex items-center justify-center bg-white  ${true ? 'bg-green-400' : 'bg-red-400'} `}>
                                            <div className={`w-[10px] h-[10px] rounded-full ${onlineUsersss.includes(user.id) ? 'bg-green-400' : 'bg-red-400'} `} >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            {
                amis.map((user) => (
                    <SwiperSlide key={user.id + '_'} className='relative  h-full  w-full' >
                        <Link href={'/users/' + user.username + '.' + String(user.id)} className="w-full h-full flex items-center  ">
                            <div className="w-[100px] h-[100px] bg-slate-400  rounded-full  flex items-center justify-center">
                                <div className="w-[95px] h-[95px] bg-white  rounded-full flex items-center justify-center">
                                    <div className="w-[90px] h-[90px] relative ">
                                        <Image className='rounded-full' style={{ objectFit: "cover" }} src={user.foto_user} alt={user.username} fill></Image>
                                        <div className={`absolute top-1 right-0 w-[15px] h-[15px] rounded-full flex items-center justify-center bg-white  ${true ? 'bg-green-400' : 'bg-red-400'} `}>
                                            <div className={`w-[10px] h-[10px] rounded-full ${onlineUsersss.includes(user.id) ? 'bg-green-400' : 'bg-red-400'} `} >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            {
                amis.map((user) => (
                    <SwiperSlide key={user.id + '_'} className='relative  h-full  w-full' >
                        <Link href={'/users/' + user.username + '.' + String(user.id)} className="w-full h-full flex items-center  ">
                            <div className="w-[100px] h-[100px] bg-slate-400  rounded-full  flex items-center justify-center">
                                <div className="w-[95px] h-[95px] bg-white  rounded-full flex items-center justify-center">
                                    <div className="w-[90px] h-[90px] relative ">
                                        <Image className='rounded-full' style={{ objectFit: "cover" }} src={user.foto_user} alt={user.username} fill></Image>
                                        <div className={`absolute top-1 right-0 w-[15px] h-[15px] rounded-full flex items-center justify-center bg-white  ${true ? 'bg-green-400' : 'bg-red-400'} `}>
                                            <div className={`w-[10px] h-[10px] rounded-full ${onlineUsersss.includes(user.id) ? 'bg-green-400' : 'bg-red-400'} `} >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}

        </Swiper>
    );
}
export default OnlineUserss
