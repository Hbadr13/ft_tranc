
import Image from 'next/image'


import { fetchAllAmis, fetchAllUsers, fetchCurrentUser } from '@/hooks/userHooks';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AppProps, userProps } from '@/interface/data';




function Index({ onlineUsersss, currentUser, users, amis }: AppProps) {

  return (
    <>

    </>

  );
}

export default Index;


