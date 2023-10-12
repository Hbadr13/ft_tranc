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
    // useEffect(() => {
    //     try {
    //         async () => {
    //             const response = await fetch('http://localhost:3333/auth/user', {
    //                 credentials: 'include',
    //             });
    //             if (response.status == 200) {
    //                 router.push('/');
    //                 return;
    //             }
    //         };
    //     } catch (error) {
    //     }
    // });
    useEffect(() => {
        (
          async () => {
            const response = await fetch('http://localhost:3333/auth/user', {
              credentials: 'include',
            });
      
            if (response.status == 200) {
    
              // router.push('/');
              router.push('/');
              // } else {
              return;
            }
          }
        )();
      });
}
export const fetchAllUsers = (setUsers: (users: any) => void, query: string ,id:number) => {
        useEffect(() => {
            (
                async () => {
                    const response = await fetch(`http://localhost:3333/users/${id}`, {
                        credentials: 'include',
                    });
                    const content = await response.json();
                    setUsers(content);
                }
                )();
            }, [query, id]);
}

interface fetchAllAmisprops {
    setAmis: (amis: any) => void;
    query: string;
    id: number
}

export const fetchAllAmis = ({ setAmis, query, id }: fetchAllAmisprops) => {
    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:3333/friends/accepted-friends/${id}`, {
                    credentials: 'include',
                });
                const content = await response.json();
                setAmis(content);
            }
        )();
    }, [query, id]);
}
export const fetchCurrentUser = (setid: (id: any) => void) => {

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:3333/auth/user', {
                    credentials: 'include',
                });
                const content = await response.json();
                // setfoto_user(content.foto_user);
                setid(content.id);
                // setUsername(content.username);

                // console.log(content.id);
            }
        )();
    });
}