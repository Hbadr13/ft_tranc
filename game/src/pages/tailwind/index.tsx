// import Image from 'next/Image'
import Image from 'next/image'
import log from '../../../public/tailwind_Logo.png'
import Online_test from '../../../public/Online_test.png'
import Link from 'next/link'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { } from '@fortawesome/free-regular-svg-icons'
import { faCode, faBars, faHouse } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';




function LinkComponet({ href, linkk }: { href: string, linkk: string }) {
    return (
        <Link className='text-slate-900 hover:text-orange-500 ' href={href}>{linkk}</Link>
    )
}

function Section() {
    return (
        <section>
            <div className="container mx-auto px-10 flex flex-col-reverse md:flex-row space-x-20">
                <div className="md:w-1/2 flex flex-col justify-center space-y-10 py-8 text-center md:text-left text-slate-700">
                    <h1 className='font-bold text-3xl md:text-5xl'>Using responsive utility variants to build adaptive user interfaces.</h1>
                    <p>
                        Every utility class in Tailwind can be applied conditionally at different breakpoints, which makes it a piece of cake to build complex responsive interfaces without ever leaving your HTML.
                    </p>
                    <Link className='bg-orange-500 text-white hover:bg-black rounded-full px-6 py-2 self-center md:self-start' href={"#"}>Call Me</Link>
                </div>
                <div className="w-1/2">
                    <Image src={Online_test} alt="tailwind hero"></Image>
                </div>
            </div>
        </section>
    )
}
function Addsection() {
    return (
        <div className='md:w-1/3 flex p-5 flex-col items-center  space-y-6 rounded-lg bg-slate-100 border border-slate-200'>
            <Image className='w-16 -mt-12 rounded-full' src='https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg' width={'200'} height={'200'} alt='addam'></Image>
            <h1 className='text-lg font-bold'>Guillermo Rauch</h1>
            <p className='leading-0 text-sm'>This `browsh` text-based browser is so. amazingly. good. This is what the elders expected `lynx` to become</p>
        </div>)
}

function Footer() {
    return (
        <footer className='  bg-slate-700 '>
            <div className='container text-white px-5 py-10 mx-auto flex  flex-col-reverse md:flex-row justify-between spce-y-8 md:space-y-0'>
                <div className="flex justify-center items-center flex-col p-5">
                    <div className="hidden md:block">
                        Copyriht &copy; 2023, All Rights Reserved
                    </div>
                    <div>
                        <Image src={log} width={'150'} alt='logo tailwind'></Image>
                    </div>
                    <div className='space-x-3'>
                        <a><i className="ri-facebook-circle-fill text-3xl"></i></a>
                        <a><i className="ri-whatsapp-fill text-3xl"></i></a>
                        <a><i className="ri-instagram-fill text-3xl"></i></a>
                        <a><i className="ri-twitter-fill text-3xl"></i></a>
                    </div>

                </div>
                <div className="flex p-5 justify-around space-x-32">
                    <div className="flex flex-col space-y-2">
                        <a href="" className="hover:text-slate-300">Home</a>
                        <a href="" className="hover:text-slate-300">About</a>
                        <a href="" className="hover:text-slate-300">Contact</a>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <a href="" className="hover:text-slate-300">Imprint</a>
                        <a href="" className="hover:text-slate-300">Privacy</a>
                        <a href="" className="hover:text-slate-300">Credits</a>
                    </div>
                </div>
                <div className="flex flex-col p-5 text-center justify-between">
                    <form action="#" className="">
                        <input type="text" placeholder='subscribe to NewSletter' className="flex-1 py-2 px-6 rounded-full" />
                        <button className='bg-orange-500 rounded-full px-4 py-2 hover:bg-slate-500'>Go</button>
                    </form>
                </div>
            </div>
        </footer>
    )
}

function Section2() {
    return (
        <section>
            <div className="container mx-auto px-8 my-32 text-center">
                <h2 className='text-center font-blod text-4xl'> Application Programming Interface</h2>
                <p className='mt-8 max-w-5xl mx-auto'>
                    `API` stands for Application Programming Interface. It is a set of rules and protocols that allows different software applications to communicate with each other. APIs are used to enable the integration of different systems or services, allowing them to work together and share data.
                </p>
                <div className='flex mt-10  flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-10'>
                    <Addsection></Addsection>
                    <Addsection></Addsection>
                    <Addsection></Addsection>
                </div>
            </div>
        </section>
    )
}
import { useEffect } from 'react';


export default function Index1() {
    useEffect(() => {
        const mobileBtn = document.querySelector("#mobile-btn");
        const mobileMtn = document.querySelector("#mobile-menu");

        if (mobileBtn && mobileMtn) {
            mobileBtn.addEventListener('click', () => {
                // Your code here
                mobileMtn.classList.toggle('hidden');
            });
        }
    }, []);
    return (
        <>
            <nav className="containe mx-auto p-6">
                <div className="flex item-center justify-between">
                    <div>
                        <Image src={log} alt='Taiwind logo' height={"200"} width={"150"}></Image>
                    </div>
                    <div className="hidden md:flex pt-5 space-x-10 ">
                        <LinkComponet href="/" linkk='Protfolio'></LinkComponet>
                        <LinkComponet href="/game" linkk='PongGame'></LinkComponet>
                        <LinkComponet href="/" linkk='About'></LinkComponet>
                        <LinkComponet href="/" linkk='Contact'></LinkComponet>
                        <div>
                            <Link className='bg-orange-500 text-white hover:bg-black rounded-full px-6 py-2' href={"#"}>Call Me</Link>
                        </div>
                    </div>
                    <button id='mobile-btn' className='md:hidden'>
                        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                    </button>
                </div>
                <div id='mobile-menu' className="absolute left-6 right-6 md:hidden flex flex-col space-y-3  bg-gray-50 items-center font-bold drop-shadow-lg py-5">
                    <LinkComponet href="/" linkk='Protfolio'></LinkComponet>
                    <LinkComponet href="/game" linkk='PongGame'></LinkComponet>
                    <LinkComponet href="/" linkk='About'></LinkComponet>
                    <LinkComponet href="/" linkk='Contact'></LinkComponet>
                    <div>
                        <Link className='bg-orange-500 text-white hover:bg-black rounded-full px-6 py-2' href={"#"}>Call Me</Link>
                    </div>
                </div>
            </nav>

            <Section></Section>
            <Section2></Section2>
            <Footer></Footer>
        </>
    )
}
