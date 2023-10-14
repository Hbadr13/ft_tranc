
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
    id: number,
    users: Array<userProps>,
    amis: Array<userProps>,
}

export interface BoxSearchrProps {
    searchUser: string;
    setSearchUser: (searchUser: string) => void;
    onlineUsersss: Array<number>;
    id: number;
    users: Array<userProps>;
    amis: Array<userProps>;
}
