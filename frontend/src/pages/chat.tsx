import { AppPropsNow } from '@/interface/data';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

const MyComponent = ({ children }: { children: ReactNode; }) => {
  const router = useRouter();
  // useEffect(() => {
  //   const handleBeforeUnload = (e: any) => {
  //     const confirmationMessage = 'Are you sure you want to leave? Your changes may not be saved.';
  //     e.returnValue = confirmationMessage;
  //     return confirmationMessage;
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  // }, []);


  return (
    <>
      {children}
    </>
  );
};

import React from 'react'

const Chat = ({ socket }: AppPropsNow) => {
  const router = useRouter();
  useEffect(() => {
    const handleBeforeUnload = (e: any) => {

      const confirmationMessage = 'Are you sure you want to leave? Your changes may not be saved.';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
  }, []);


  // useEffect(() => {
  //   socket?.emit('kayna2')
  //   router.beforePopState(({ url, as, options }) => {
  //     // // I only want to allow these two routes!
  //     // if (as !== '/' && as !== '/other') {
  //     //   // Have SSR render bad routes as a 404.
  //     //   window.location.href = as
  //     //   return false
  //     // }

  //     return true
  //   })
  // }, [router])
  return (
    <div>Chat</div>
  )
}

export default Chat