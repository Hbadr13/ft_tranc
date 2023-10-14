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
  return (
    <>
      <div className='m-10 text-4xl'>
        chat ....
      </div>
    </>
  );
}

export default Chat;
