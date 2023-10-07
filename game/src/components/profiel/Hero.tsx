import Head from "next/head";
import Image from "next/image";
import { CustomBotton } from "./index";
import image1 from '../../../public/hero.png'
const metadata = {
  title: 'Car Hub'
}

const Hero = () => {
  const handlScroll = () => { };
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <div className="hero">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="hero_title">
            find book or rent a car -- quickly and easily
          </h1>
          <p className="hero_subtitle">
            Streamline your car rental experience with our offortless booking
            process.
          </p>
          <CustomBotton
            title="Explore cars"
            containerStyle="bg-purple-500 text-black rounded-full mt-10"
            handleclick={handlScroll}
          />
        </div>
        <div className="hero__imag-container">
          <div className="hero__image">
            <Image src="/hero.png" alt="hero" fill className="object-contain z-10 " />
            <div className="absolute text-end ml-20 w-[86%] md:w-[90%] xl:w-[90%] 2xl:w-[114%] h-[300px] rounded-l-[1000px] rounded-r-[30px] md:h-[500px] mt-24 md:mt-0  xl:mt-4 xl:h-[700px] bg-red-500 z-0"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero;
