import { off } from 'process';
import { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io';
import io from 'socket.io-client';


function Chat() {
  // const myref = useRef<any>()
  const [socket, setsocket] = useState<any>()
  // var socket;
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [rome, setrome] = useState('');

  useEffect(() => {
    const newSocket = io('http://e2r11p2.1337.ma:8001');
    setsocket(newSocket)
  }, []);

  const sendMessage = () => {
    socket?.emit('message', messageInput);
    console.log(messageInput)
    // setMessageInput('');
  };
  const sendRome = () => {
    socket?.emit('rome', rome);
    console.log(rome)
  };
  const messgaeLister = (message: string) => {
    setMessages([...messages, message])
  }
  useEffect(() => {
    socket?.on("message", messgaeLister)
    return () => { socket?.off("message", messgaeLister) }
  }, [messgaeLister])
  return (
    <>
      <div>
        <input
          className='p-2 rounded-xl'
          type='text'
          value={rome}
          onChange={(e) => setrome(e.target.value)}
          placeholder="Typce a rome"
        >
        </input>
        <button onClick={sendRome}>Creat Rome</button>
      </div>
      <div className='mt-5'>
        <input
          className='p-2 rounded-xl'
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Typce a message"
        />
        <button onClick={sendMessage}>Send Message</button>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Chat;
