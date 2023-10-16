import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '../components/model'
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { fetchAllAmis, fetchAllUsers, fetchCurrentUser } from '@/hooks/userHooks';

export default function App({ Component, pageProps, router }: AppProps) {
  const isNavbarVisible = !router.asPath.startsWith('/auth/login');
  const isNavbarVisible2 = !router.asPath.startsWith('/register')
  const isNavbarVisible3 = !router.asPath.startsWith('/auth/login')
  const currentPath = router.asPath;
  const [onlineUsersss, setOnlineUsersss] = useState<Array<number>>([]);
  const [socket, setSocket] = useState<any>();

  const [query, setquery] = useState("");

  const [users, setUsers] = useState<Array<any>>([]);
  const [id, setid] = useState(0);
  const [amis, setAmis] = useState<any>([])
  const [notExist, setNotexits] = useState(true)
  fetchCurrentUser(setid)
  fetchAllUsers({ setUsers, query: "", id })
  fetchAllAmis({ setAmis, query, id })


  useEffect(() => {
    if (isNavbarVisible3) {

      (
        async () => {
          const response = await fetch('http://localhost:3333/auth/user', {
            credentials: 'include',
          });
          if (response.status != 200) {
            router.push('/auth/login');
            return;
          }
          const content = await response.json();
        }
      )();
    }
  });

  // useEffect(() => {
  //   (
  //     async () => {
  //       const response = await fetch(`http://localhost:3333/users/one/0`, {
  //         credentials: 'include',
  //       });
  //       const counte = await response.json();
  //       if (response.status == 200) {
  //       }
  //       else {
  //         // setNotexits(false)
  //         router.push("/")
  //       }
  //     }
  //   )();
  // });
  useEffect(() => {
    // if (isNavbarVisible3) {

    const newSocket = io('http://localhost:8001', {
      query: {
        userId: id,
        amis: amis,
      },
    });

    setSocket(newSocket);
    newSocket?.on("updateOnlineUsers", (amisOnline: any) => {
      setOnlineUsersss(amisOnline)
    });
    return () => {
      newSocket.disconnect();
    };
    // }
  }, [id, amis]);


  const modifiedPageProps = {
    ...pageProps,
    onlineUsersss: onlineUsersss,
    id: id,
    users: users,
    amis: amis,
  };
  return (
    <>
      {isNavbarVisible && isNavbarVisible2 && <Navbar id={id} users={users} amis={amis} onlineUsersss={onlineUsersss} />}
      <Component  {...modifiedPageProps} />
    </>
  )
}

