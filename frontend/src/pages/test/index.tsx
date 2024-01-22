<<<<<<< HEAD
import React from 'react'

export default function index() {
    return (
        <div className='bg-center text-center w-[50%] h-[50%] '>
            <select>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option selected value="coconut">Coconut</option>
                <option value="mango">Mango</option>
            </select>
        </div>
    )
}
=======
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
    <div className='flex justify-center items-center mt-24'>
      <div className="w-[375px] h-[812px] relative bg-stone-200 rounded-[25px]">
    <img className="w-[375px] h-[812px] left-0 top-0 absolute" src="https://via.placeholder.com/375x812" />
    <div className="w-[280px] h-[85px] left-[46px] top-[79px] absolute text-center text-white text-[54px] font-normal font-['Mervale Script']">Do you like it ?</div>
    <div className="w-12 h-[66px] left-[315px] top-[525px] absolute">
        <div className="w-11 h-[45px] left-[2px] top-0 absolute rounded-full border-2 border-white" />
        <div className="w-12 h-[23px] left-0 top-[43px] absolute text-center text-white text-lg font-extrabold font-['Nunito']">527K</div>
        <div className="w-[35px] h-[29px] left-[7px] top-[8px] absolute text-center text-white text-2xl font-black font-['Nunito']">%</div>
    </div>
    <div className="h-[57px] left-[315px] top-[443px] absolute">
        <div className="w-12 h-[23px] left-0 top-[34px] absolute text-center text-white text-lg font-extrabold font-['Nunito']">3,8M</div>
        <div className="w-[35.50px] h-[32.36px] left-[6px] top-0 absolute">
        </div>
    </div>
    <div className="w-[60px] h-[87px] left-[309px] top-[331px] absolute">
        <div className="w-[60px] h-[76px] left-0 top-0 absolute">
            <div className="w-[50px] h-[50px] left-[5px] top-[26px] absolute rounded-full border border-zinc-300" />
            <div className="w-[48.15px] h-[48.15px] left-[5.93px] top-[26.93px] absolute">
                <div className="w-[48.15px] h-[48.15px] left-0 top-0 absolute bg-stone-300 rounded-full border" />
                <img className="w-[48.15px] h-[70.37px] left-0 top-[-3.70px] absolute" src="https://via.placeholder.com/48x70" />
            </div>
        </div>
        <div className="w-6 h-6 left-[18px] top-[63px] absolute">
            <div className="w-3 h-[12.50px] left-[6px] top-[6px] absolute bg-white rounded-full" />
        </div>
    </div>
    <div className="w-[227px] h-[72px] left-[26px] top-[614px] absolute"><span className="text-white text-[33px] font-normal font-['Chewy']">@UserPseudo<br/></span><span className="text-white text-sm font-normal font-['Nunito']">description bio de l’utilisateur. Lorem Ipsum est sigur </span></div>
    <div className="w-[153px] h-[33.92px] left-[115px] top-[28.54px] absolute">
        <div className="w-[12.26px] h-[28.74px] left-[60.98px] top-[2.73px] absolute">
        </div>
    </div>
    <div className="w-[36.85px] h-[35.40px] left-[320.67px] top-[617.67px] absolute">
    </div>
    <div className="w-[86px] h-[86px] left-[141px] top-[709px] absolute">
        <div className="w-[86px] h-[86px] left-0 top-0 absolute rounded-[100px] border-8 border-pink-500 blur-[14px]" />
        <div className="w-[86px] h-[86px] left-0 top-0 absolute rounded-[100px] border-8 border-pink-500 blur-[0.50px]" />
        <div className="w-[86px] h-[86px] left-0 top-0 absolute mix-blend-hard-light rounded-[100px] border-4 border-white blur-sm" />
    </div>
    <img className="w-[60px] h-[60px] left-[252px] top-[718px] absolute" src="https://via.placeholder.com/60x60" />
    <img className="w-[86px] h-[86px] left-[140px] top-[705px] absolute shadow-inner" src="https://via.placeholder.com/86x86" />
    <img className="w-[60px] h-[60px] left-[54px] top-[718px] absolute shadow-inner" src="https://via.placeholder.com/60x60" />
</div>
    </div >
  );
};

export default Index;
>>>>>>> ad29f16ce8a9d4a430d357cac59fc0965aa7a929
