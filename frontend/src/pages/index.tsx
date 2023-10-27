
import Image from 'next/image'


import { fetchAllAmis, fetchAllUsers, fetchCurrentUser } from '@/hooks/userHooks';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AppProps, userProps } from '@/interface/data';




function Index({ onlineUsersss, currentUser, users, amis }: AppProps) {


  const [friendId, setFriendId] = useState(0);
  const [accept, setaccept] = useState(0);

  const [received, setreceived] = useState<Array<any>>([]);

  useEffect(() => {
    (
      async () => {
        const response = await fetch(`http://localhost:3333/friends/${currentUser.id}/received-requests`, {
          credentials: 'include',
        });
        const counte = await response.json();
        if (response.status == 200) {
          setreceived(counte)
          // console.log(counte[0]?.sender);
          // setrequestt(cont)
          return;
        }
      }
    )();
  }, [currentUser]);


  const sendRequest = async () => {
    try {
      const response = await fetch(`http://localhost:3333/friends/send-request/${friendId}/${currentUser.id}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Friend request sent successfully.');
      } else {
        console.error('Failed to send friend request.');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };
  const sendRequestForaccpet = async () => {
    try {

      const response = await fetch(`http://localhost:3333/friends/accept-friend-request/${accept}/${currentUser.id}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Friend request sent successfully.');
      } else {
        console.error('Failed to send friend request.');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <>

    </>

  );
}

export default Index;


