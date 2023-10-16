
import Image from 'next/image'


import { fetchAllAmis, fetchAllUsers, fetchCurrentUser } from '@/hooks/userHooks';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AppProps, userProps } from '@/interface/data';




function Index({ onlineUsersss, id, users, amis }: AppProps) {


  const [friendId, setFriendId] = useState(0);
  const [accept, setaccept] = useState(0);

  const [received, setreceived] = useState<Array<any>>([]);

  useEffect(() => {
    (
      async () => {
        const response = await fetch(`http://localhost:3333/friends/${id}/received-requests`, {
          credentials: 'include',
        });
        const counte = await response.json();
        if (response.status == 200) {
          setreceived(counte)
          console.log(counte[0]?.sender);
          // setrequestt(cont)
          return;
        }
      }
    )();
  }, [id]);


  const sendRequest = async () => {
    try {
      const response = await fetch(`http://localhost:3333/friends/send-request/${friendId}/${id}`, {
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

      const response = await fetch(`http://localhost:3333/friends/accept-friend-request/${accept}/${id}`, {
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
    <div className='flex flex-col space-y-10 p-10 font-thin text-3xl items-center text-white'>

      <div className='bg-blue-500 p-5  rounded-md'>

        <h1>Send Friend Request</h1>
        <div>
          <label htmlFor="friendId">Friend's ID:</label>
          <input className='text-black'
            type="number"
            id="friendId"
            value={friendId}
            onChange={(e) => setFriendId(Number(e.target.value))}
          />
        </div>
        <button className='bg-blue-800 p-2 rounded-xl' onClick={sendRequest}>Send</button>
      </div>

      <div className='bg-blue-400 p-5  rounded-md'>

        <h1>accept Friend Request</h1>
        <div>
          <label htmlFor="acceptId">accept's ID:</label>
          <input
            className='text-black'
            type="number"
            id="accept"
            value={accept}
            onChange={(ee) => setaccept(Number(ee.target.value))}
          />
        </div>
        <button className='bg-blue-800   rounded-xl' onClick={sendRequestForaccpet}>accept</button>
      </div>
      <div className="flex justify-around w-full ">
        <div className="">
          <h1 className=''>all users</h1>
          {
            (users.length) ? users.map((user: any) => (
              <div className='flex bg-[#0ea5e9]   rounded-xl items-start  '>
                <img
                  src={user.foto_user}
                  alt="Your Image Alt Text"
                  className="w-20 h-auto  rounded-full inline-block" // Adjust the width as needed
                />
                <span className='rounded-2xl   '>{`${user.username}.${user.id}`}</span>

              </div>
            )) : null
          }
        </div>
        <div className="">
          <h1 className=''>amis</h1>

          {
            (amis.length) ? amis.map((user: userProps) => (
              <div className=' bg-blue-200 rounded-2xl items-center  space-x-3 p-2 flex justify-between'>
                <img
                  src={user.foto_user}
                  alt="Your Image Alt Text"
                  className="w-20 h-auto  rounded-full inline-block" // Adjust the width as needed
                />
                <span className='bg-black  rounded-2xl   '>{`${user.username}.${user.id}`}</span>
                {onlineUsersss.includes(user.id) ? (
                  <div className=' bg-green-700 w-4 h-4 rounded-full '>
                  </div>
                ) : (
                  <div className=' bg-red-700 w-4 h-4 rounded-full '>
                  </div>
                )
                }
              </div>
            )) : null
          }
        </div>
        <div className="">
          <h1 className=''>request</h1>
          {
            (received.length) ? received.map((user: any) => (
              <div className=' bg-slate-200 rounded-2xl items-start  '>
                <img
                  src={user.sender.foto_user}
                  alt="Your Image Alt Text"
                  className="w-20 h-auto  rounded-full inline-block" // Adjust the width as needed
                />
                <span className='bg-black  rounded-2xl   '>{`${user.sender.username}.${user.sender.id}`}</span>

              </div>
            )) : null
          }
        </div>
      </div>
    </div >
  );
}

export default Index;


