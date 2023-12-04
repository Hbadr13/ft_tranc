import { Socket } from "socket.io-client";

export interface messageProps {
    id: number,
    content: string,
    createdAt: string,
    senderId: number
}

export interface channelProps {
    id: number,
    createdAt: string,
    updatedAt: string,
    name: string,
    type: string,
    description: string,
    password: string
}

export interface userProps {

    flag1: boolean;    // 
    id: number,
    createdAt: string,
    updatedAt: string,
    email: string,
    hash: string,
    username: string,
    firstName: string,
    lastName: string,
    message: Array<messageProps>,
    foto_user: string,
    isOnline: boolean,
    userId: number
    flag?: boolean
}


export interface AppProps {
    [x: string]: any;
    onlineUsersss: Array<number>,
    currentUser: userProps,
    users: Array<userProps>,
    messages: Array<userProps>,
    amis: Array<userProps>,
    socket: Socket,
}

export interface BoxSearchrProps {
    searchUser: string;
    setSearchUser: (searchUser: string) => void;
    onlineUsersss: Array<number>;
    id: number;
    users: Array<userProps>;
    amis: Array<userProps>;
}
