import EditChannel from "@/components/chat/channels/editChannel";
import Conversation from "@/components/chat/conversation";
import ConversationList from "@/components/chat/conversationList";
import Edit from "@/components/chat/edit";
import { AppProps, messageProps, userProps } from '@/interface/data';
import { useEffect, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";

export default function index({ users, amis }: AppProps) {
  const userData = { id: 0, createdAt: "", updatedAt: "", email: "", hash: "", username: "", firstName: "", lastName: "", foto_user: "", isOnline: false, userId: 0, flag: false, flag1: false, room: '', won: 0, lost: 0, level: 0 }
  const [currentUser, setCurrentUser] = useState<userProps>(userData);
  const [idRoom, setIdRoom] = useState(0);
  const [Receiver, setReceiver] = useState<userProps>(userData);
  const [button, setButton] = useState(false);
  const [chatSocket, setChatSocket] = useState<any>();
  const [messsage, setMessage] = useState<messageProps>()

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch('http://localhost:3333/auth/user', {
            credentials: 'include',
          });
          const content = await response.json();
          setCurrentUser(content)
        } catch (error) {

        }
      }
    )();
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:3333/ChatGateway', {
      query: {
        userId: currentUser.id,
      }
    });

    setChatSocket(socket)
    return () => {
      socket.disconnect();
    };
  }, [currentUser]);
  useEffect(() => {
      setIdRoom(0);
      setReceiver(userData)
  }, [button]);

  return (
    <div className=' bg-bldack flex-uwrap min-w-full min-h-screen flex mt-6j flex-row justify-center items-center dark:bg-slate-800 space-x-6'>
      <ConversationList amis={amis} setReceiver={setReceiver} setButton={setButton} currentUser={currentUser} users={users} setConv={setIdRoom} />
      <Conversation chatSocket={chatSocket} Receiver={Receiver} button={button} idRoom={idRoom} currentUser={currentUser} />
      {button == false && Receiver.id != 0  && <Edit currentUser={currentUser} Receiver={Receiver} />}
      {button == true && idRoom != 0 &&  <EditChannel Receiver={Receiver} />}
    </div>
  )
}