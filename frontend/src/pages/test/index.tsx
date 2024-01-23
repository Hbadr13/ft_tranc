// pages/index.js
import { useState } from 'react';

const Index = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('');
    const [Type, setType] = useState('public');
    const [message, setMessage] = useState('');

    const handleButtonClick = () => {
        setMessage('Incorrect password');
    };

    return (
        <div className="w-[348px] h-[1024px] px-6 py-5 bg-white border-l border-zinc-200 flex-col justify-start items-start gap-[22px] inline-flex">
            <div className="w-72 px-5 py-3 bg-white rounded-[52px] border border-black justify-start items-center gap-3 inline-flex">
                <div className="w-6 h-6 pl-[2.23px] pr-[2.25px] pt-[2.23px] pb-[2.25px] justify-center items-center flex" />
                <div className="text-black text-base font-normal font-['Fahkwang']">Search for chats...</div>
            </div>
            <div className="h-[42px] flex-col justify-start items-start gap-3 flex">
                <div className="self-stretch px-5 py-3 bg-blue-400 rounded-[52px] justify-center items-center gap-3 inline-flex">
                    <div className="w-[185px] justify-center items-center gap-2 flex">
                        <div className="w-5 h-5 relative" />
                        <div className="text-white text-base font-bold font-['Fahkwang']">Create New Room</div>
                    </div>
                </div>
            </div>
            <div className="w-[300px] justify-between items-center inline-flex">
                <div className="h-[60px] justify-start items-center gap-2.5 flex">
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
                        <div className="text-zinc-900 text-base font-bold font-['Fahkwang']">Salah bouabadi</div>
                        <div className="self-stretch h-[37px] text-neutral-600 text-sm font-normal font-['Fahkwang'] leading-[18px]">hi ebouabba i have problem in pong game</div>
                    </div>
                </div>
                <div className="w-[21px] pl-2 pr-0.5 pt-[7px] pb-1.5 bg-blue-400 rounded-[20px] justify-end items-center flex">
                    <div className="w-[11px] h-[7px] text-white text-xs font-bold font-['Chathura']">2</div>
                </div>
                <div className="self-stretch flex-col justify-between items-end inline-flex">
                    <div className="text-gray-500 text-sm font-normal font-['Damion']">5s</div>
                </div>
            </div>
        </div>
    );
};

export default Index;
