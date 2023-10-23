import { userProps } from "@/interface/data";
import { useRouter } from "next/navigation";
import { useEffect } from "react";




export const checkAuth = () => {
    const router = useRouter();
    useEffect(() => {
        try {
            async () => {
                const response = await fetch('http://localhost:3333/auth/user', {
                    credentials: 'include',
                });
                if (response.status != 200) {
                    router.push('/auth/login');
                    return;
                }
            };
        } catch (error) {
        }
    });
}
export const checklogin = () => {
    const router = useRouter();
    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:3333/auth/user', {
                    credentials: 'include',
                });

                if (response.status == 200) {
                    router.push('/');
                    return;
                }
            }
        )();
    });
}
export const fetchAllUsers = ({ setUsers, query, currentUser }:
    { setUsers: (users: any) => void, query: string, currentUser: userProps }) => {
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/users/${currentUser.id}`, {
                    credentials: 'include',
                });
                const content = await response.json();
                setUsers(content);
            }
        )();
    }, [query, currentUser]);
}

interface fetchAllAmisprops {
    setAmis: (amis: any) => void;
    query: string;
    currentUser: userProps
}

export const fetchAllAmis = ({ setAmis, query, currentUser }: fetchAllAmisprops) => {
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/accepted-friends/${currentUser.id}`, {
                    credentials: 'include',
                });
                const content = await response.json();
                setAmis(content);

            }
        )();
    }, [query, currentUser]);
}
export const fetchCurrentUser = ({ setCurrentUser }: { setCurrentUser: (currentUser: any) => void }) => {

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:3333/auth/user', {
                    credentials: 'include',
                });
                const content = await response.json();
                setCurrentUser(content);
            }
        )();
    }, []);
}
