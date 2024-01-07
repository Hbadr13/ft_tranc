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
      
      <div className=' w-10 h-10 bg-slate-400 flex justify-center items-center rounded-full'>A</div>
    </div >
  );
};

export default Index;
