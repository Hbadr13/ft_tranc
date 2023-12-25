import React, { useEffect, useState } from 'react'
import { userProps } from '@/interface/data'

export default function Channels({ currentUser }: { currentUser: userProps }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [Type, setType] = useState('public');
  const [message, setMessage] = useState('');


  const handleClick = async () => {
    await fetch(`http://localhost:3333/chat/createChannel/${currentUser.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": name,
        "type": Type,
        "description": description,
        "password": password
      }),
      credentials: 'include',
    });
  };



  return (

    <div className="flex  flex-col  bg-bflack h-full w-full items-cefnter jusfftify-center shadow-xl drop-shadow-xl   rounded-[30px]">
      <form className='flex flex-col items-center justify-center m-20' onSubmit={handleClick}>
        <label>
          Name:
          <input required type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <input required type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />

        <br />
        <label>
          Type:
          <select onChange={(e) => setType(e.target.value)}>
            <option value="public">Public</option>
            <option value="protected">Protected</option>
            <option value="private">Private</option>
          </select>
        </label>
        {
          Type == 'protected' &&
          <label>
            Password:
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        }
        <br />
        <button>Submit</button>
        <br />
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};