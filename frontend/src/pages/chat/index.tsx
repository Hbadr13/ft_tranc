import Conversation from "@/components/chat/conversation";
import ConversationList from "@/components/chat/conversationList";
import Edit from "@/components/chat/edit";
import { AppProps, userProps } from '@/interface/data';
import { useEffect, useState } from "react";

export default function index({ users }: AppProps) {
  const userData = { id: 0, createdAt: "", updatedAt: "", email: "", hash: "", username: "", firstName: "", lastName: "", foto_user: "", isOnline: false, userId: 0, flag: false, flag1: false, room: '' }
  const [currentUser, setCurrentUser] = useState<userProps>(userData);
  const [idRoom, setIdRoom] = useState(0);

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
  });

  return (
    <div className=' flex h-screen w-full'>
      <ConversationList currentUser={currentUser} users={users} setConv={setIdRoom} />
      <Conversation idRoom={idRoom} currentUser={currentUser} />
      <Edit />
    </div>
  )
}