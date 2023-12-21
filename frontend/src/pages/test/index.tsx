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
    <div className=''>
      <form className='flex flex-col items-center justify-center m-20' onSubmit={handleButtonClick}>
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
    </div >
  );
};

export default Index;
