import { Socket } from "socket.io-client";

export interface userProps {

    id: number,
    createdAt: string,
    updatedAt: string,
    email: string,
    hash: string,
    username: string,
    firstName: string,
    lastName: string,
    foto_user: string,
    isOnline: boolean,
    userId: number
    flag?: boolean
}


export interface AppProps {
    onlineUsersss: Array<number>,
    currentUser: userProps,
    users: Array<userProps>,
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
