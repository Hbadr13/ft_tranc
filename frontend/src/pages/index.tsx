import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/model'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserInfo from '@/components/user/UserInfo';


export default function Home() {
  const router = useRouter();
  // const router = useRouter();

  // import { useRouter } from 'next/navigation';

  useEffect(() => {
    (
      async () => {
        const response = await fetch('http://localhost:3333/auth/user', {
          credentials: 'include',
        });
        console.log(response.status)
        if (response.status != 200) {
          router.push('/auth/login');
          return;
        }
        const content = await response.json();
      }
    )();
  });
  return (
    <>
      <div></div>
      <div><UserInfo /></div>
    </>

  )
}

