
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { userProps } from '@/interface/data';
import Image from 'next/image';
import Link from 'next/link';
const OnlineUserss = ({ onlineUsersss, amis }: { onlineUsersss: Array<number>, amis: Array<userProps> }) => {

    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            className="mySwiper w-full h-full"
        >
            {amis.map((user) => (
                <SwiperSlide key={user.id + '_'} className='relative  h-full ' >
                    <Link href={'/users/' + user.username + '.' + String(user.id)} className="w-full h-full flex items-center">
                        <div className="w-[110px] h-[110px] bg-slate-400  rounded-full  flex items-center justify-center">
                            <div className="w-[105px] h-[105px] bg-white  rounded-full flex items-center justify-center">
                                <div className="w-[100px] h-[100px] relative ">
                                    <Image className='rounded-full' style={{ objectFit: "cover" }} src={user.foto_user} alt={user.username} fill></Image>
                                    <div className={`absolute top-0 right-0 w-[20px] h-[20px] rounded-full flex items-center justify-center bg-white  ${true ? 'bg-green-400' : 'bg-red-400'} `}>
                                        <div className={`w-[15px] h-[15px] rounded-full ${onlineUsersss.includes(user.id) ? 'bg-green-400' : 'bg-red-400'} `} >
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