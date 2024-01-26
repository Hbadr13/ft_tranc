import { channelProps, participantsProps, userProps } from '@/interface/data'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Constant } from '@/constants/constant'
import AddPeople from './addPeople'

export default function EditChannel({ setMyStatusInRoom, currentUser, users, Room }: { setMyStatusInRoom?: (value: participantsProps) => void | undefined, currentUser: userProps, users: userProps[], Room: channelProps }) {
    const [click, setClick] = useState<number>(0)
    const [type, setType] = useState(Room.type)
    const [Room1, setRoom1] = useState<channelProps>(Room);
    const [password, setPassword] = useState(Room.password);
    const [participants, setParticipants] = useState<participantsProps[]>([])
    const [participant, setParticipant] = useState<participantsProps>()
    const [userStatusRoom, setUserStatusRoom] = useState<participantsProps>()
    const [error, seterror] = useState(false);
    const [leavingRoom, setLeavingRoom] = useState(false);
    const [select, setSelect] = useState(false)
    const [people, setPeople] = useState<number[]>([])
    const [duration, setDuration] = useState<string>('1min')

    useEffect(() => {
        if (Room.id) {
            (
                async () => {
                    try {
                        const response = await fetch(`${Constant.API_URL}/chat/allUsersChannel/${Room.id}`, {
                            credentials: 'include',
                        })
                        const content = await response.json();
                        setParticipants(Array.from(content))
                    } catch (error) {

                    }
                    setLeavingRoom(false)
                }
            )();
        }
    }, [Room, click, leavingRoom, people]);



    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch(`${Constant.API_URL}/chat/OneChannel/${Room.id}`, {
                        credentials: 'include',
                    })
                    const content = await response.json();
                    setRoom1(content)

                    // console.log(content)
                    // setClick(0);
                } catch (error) {

                }
            }
        )();
    }, [click, Room]);
    useEffect(() => {
        // console.log('**********************', participants)
        setClick(0);
        users.map((item: userProps) => {
            item.flag = false
        })
    }, [Room]);

    useEffect(() => {

        setType(Room1.type);
        setPassword(Room1.password);
        seterror(false)
        if (Room && participants) {
            participants?.map((item: participantsProps) => {
                if (item.id == currentUser.id) {
                    setUserStatusRoom(item);
                    if (setMyStatusInRoom)
                        setMyStatusInRoom(item);
                }
            })
            // console.log('wana bagha nghawt', userStatusRoom)
        }
    }, [Room, click, participants]);



    const handlParticipants = async (item: string) => {
        try {
            await fetch(`${Constant.API_URL}/chat/setAdmin/${Room.id}/${participant?.id}/${item}/${duration}`, {
                method: 'POST',
                credentials: 'include',
            })
        } catch (error) {

        }
        setClick(0)
    }

    const handl1 = (item: any) => {
        setClick(2)
        setParticipant(item)
    }
    const upadategroup = async () => {


        try {
            if (type == "protected" && Room1.type == "public" && !password) {

                seterror(true)
            }
            else {

                const response = await fetch(`${Constant.API_URL}/chat/upadteChannel/${Room.id}/${type}/${password}`, {
                    credentials: 'include',
                })
                const content = await response.json();
                // console.log(password)
                if (response.status == 200) {

                    setClick(0);
                }
                else {
                    seterror(true)
                }
            }
        } catch (error) {

        }
    };

    const handlSelect = (item: userProps[], s: boolean, index: number) => {
        item[index].flag = s
        if (select == true)
            setSelect(false)
        else
            setSelect(true)
        // console.log(item
        // console.log('-???', item[index].flag)
        // console.log(users)
    }

    useEffect(() => {
        // console.log('ana chkandir hna,,', click)
        setPeople([])
        users.map((item: userProps) => {
            if (item.flag)
                setPeople(prevPeople => [...prevPeople, item.id]);
        })

    }, [click])

    const addUserToRoom = async () => {

        await fetch(`${Constant.API_URL}/chat/addParticipants/${Room.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "people": people
            }),
            credentials: 'include',
        });
        setPeople([])
        users.map((item: userProps) => {
            item.flag = false
        })
    }


    return (
        <>
            {Room.id && <div className={`  bg-gray-100  ${click != 0 ? 'blur-f[0.7px] brighgtness-[80%]' : null}   w-full h-full  rounded-xl p-3  flex justify-start items-start  z-1g0`}>
                <div className="w-full h-full bg-blsack flex-col justify-center items-center">
                    <div className="flex-col justify-start items-center flex ">
                        <div className={`flex justify-center items-center w-12 h-12 rounded-full  ${Room.type == 'public' && ' bg-green-300'}  ${Room.type == 'private' && ' bg-red-400'}  ${Room.type == 'protected' && ' bg-yellow-400'}`} >
                            <h1 className='flex items-center justify-center text-[40px] font-bold text-white'>{Room?.name[0].toUpperCase()}</h1>
                        </div>
                        <div className="text-zinc-900 text-[32px] font-bold font-['Satoshi']">{Room?.name}</div>
                        <div className="text-zinc-900 text-[15px] font-bold">{Room?.type}</div>
                        {(Room?.type == 'private' && (userStatusRoom?.isOwner || userStatusRoom?.isAdmin)) && <div className=" border w-full bg-stofne-600 flex flex-col justify-center items-center">
                            <div className="flex bgf-black">
                                <h2 className="w-auto ml-20">Add People</h2>
                                <div className="w-full">
                                    <button onClick={addUserToRoom} className='flex justify-end'>add</button>
                                </div>
                            </div>
                            <div className='overflow-y-scroll bg-blfack scrollbar-hide flex bg-gdray-600 flex-row justify-start items-center flex-wrap gridx grid-cols-2x grid-flolw-colx  h-28  w-[90%] bg-slatef-400 mt-2  space-fx-0 spacfe-y-0 gap-1 bg-slatfe-700'>
                                {users.map((item, index) => (
                                    <div key={index} className=' bg-ambder-500 bord,fer border-sfky-900 rounded-md  w-auto b-black'>
                                        {
                                            item.flag &&
                                            <div className='flex  justify-center items-center   border border-sky-400 bg-sky-200 rounded-md  min-w-32f w-aufto space-x-2  h-10 p-2' key={index}>
                                                <div className="w-5 bg- h-5">
                                                    <img className="w-5 h-5 rounded-full" src={item.foto_user} />
                                                </div>
                                                <h1 className='h-6 w-auto text-sm'>{item.username}</h1>
                                                <div className=''>
                                                    <button className=' bg-black rounded-full' onClick={() => handlSelect(users, false, index)}  >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 180 180" fill="none">
                                                            <path d="M100.575 90.0004L132.825 57.8254C134.237 56.4131 135.031 54.4977 135.031 52.5004C135.031 50.5032 134.237 48.5877 132.825 47.1754C131.413 45.7631 129.497 44.9697 127.5 44.9697C125.503 44.9697 123.587 45.7631 122.175 47.1754L90 79.4254L57.825 47.1754C56.4128 45.7631 54.4973 44.9697 52.5 44.9697C50.5028 44.9697 48.5873 45.7631 47.175 47.1754C45.7628 48.5877 44.9693 50.5032 44.9693 52.5004C44.9693 54.4977 45.7628 56.4131 47.175 57.8254L79.425 90.0004L47.175 122.175C46.4721 122.873 45.9141 123.702 45.5333 124.616C45.1526 125.53 44.9565 126.51 44.9565 127.5C44.9565 128.491 45.1526 129.471 45.5333 130.385C45.9141 131.299 46.4721 132.128 47.175 132.825C47.8723 133.528 48.7018 134.086 49.6157 134.467C50.5296 134.848 51.5099 135.044 52.5 135.044C53.4901 135.044 54.4704 134.848 55.3844 134.467C56.2983 134.086 57.1278 133.528 57.825 132.825L90 100.575L122.175 132.825C122.872 133.528 123.702 134.086 124.616 134.467C125.53 134.848 126.51 135.044 127.5 135.044C128.49 135.044 129.47 134.848 130.384 134.467C131.298 134.086 132.128 133.528 132.825 132.825C133.528 132.128 134.086 131.299 134.467 130.385C134.847 129.471 135.044 128.491 135.044 127.5C135.044 126.51 134.847 125.53 134.467 124.616C134.086 123.702 133.528 122.873 132.825 122.175L100.575 90.0004Z" fill="#B3AEAE" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))
                                }
                                <div className=" bg-black w-fullf h-ffull mt bg-slate-f400">

                                    <button onClick={() => setClick(3)} className=''>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none">
                                            <path d="M8 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V16C4 15.7348 3.89464 15.4804 3.70711 15.2929C3.51957 15.1054 3.26522 15 3 15C2.73478 15 2.48043 15.1054 2.29289 15.2929C2.10536 15.4804 2 15.7348 2 16V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H8C8.26522 22 8.51957 21.8946 8.70711 21.7071C8.89464 21.5196 9 21.2652 9 21C9 20.7348 8.89464 20.4804 8.70711 20.2929C8.51957 20.1054 8.26522 20 8 20ZM3 9C3.26522 9 3.51957 8.89464 3.70711 8.70711C3.89464 8.51957 4 8.26522 4 8V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H8C8.26522 4 8.51957 3.89464 8.70711 3.70711C8.89464 3.51957 9 3.26522 9 3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V8C2 8.26522 2.10536 8.51957 2.29289 8.70711C2.48043 8.89464 2.73478 9 3 9ZM19 2H16C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3C15 3.26522 15.1054 3.51957 15.2929 3.70711C15.4804 3.89464 15.7348 4 16 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V8C20 8.26522 20.1054 8.51957 20.2929 8.70711C20.4804 8.89464 20.7348 9 21 9C21.2652 9 21.5196 8.89464 21.7071 8.70711C21.8946 8.51957 22 8.26522 22 8V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM16 12C16 11.7348 15.8946 11.4804 15.7071 11.2929C15.5196 11.1054 15.2652 11 15 11H13V9C13 8.73478 12.8946 8.48043 12.7071 8.29289C12.5196 8.10536 12.2652 8 12 8C11.7348 8 11.4804 8.10536 11.2929 8.29289C11.1054 8.48043 11 8.73478 11 9V11H9C8.73478 11 8.48043 11.1054 8.29289 11.2929C8.10536 11.4804 8 11.7348 8 12C8 12.2652 8.10536 12.5196 8.29289 12.7071C8.48043 12.8946 8.73478 13 9 13H11V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V13H15C15.2652 13 15.5196 12.8946 15.7071 12.7071C15.8946 12.5196 16 12.2652 16 12ZM21 15C20.7348 15 20.4804 15.1054 20.2929 15.2929C20.1054 15.4804 20 15.7348 20 16V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H16C15.7348 20 15.4804 20.1054 15.2929 20.2929C15.1054 20.4804 15 20.7348 15 21C15 21.2652 15.1054 21.5196 15.2929 21.7071C15.4804 21.8946 15.7348 22 16 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V16C22 15.7348 21.8946 15.4804 21.7071 15.2929C21.5196 15.1054 21.2652 15 21 15Z" fill="#2684DB" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="flex flex-col overflow-y-scroll scrollbar-hide h-[400px]">
                        {participants.map((item, index) => (
                            (item.isAdmin) ? (
                                <div key={index} className=" bg-white   space-x-3 h-14 w-full items-center inline-flex border rounded-lg space-y-2">
                                    <div className=" w-full  h-full justify-start items-center gap-2.5 flex">
                                        <img className="w-10 h-10  rounded-full" src={item.foto_user} />
                                        <div className="   flex  h-full  flex-row space-x-2 w-full bg-bldue-600 rounded-lg justify-cente items-center space-y-1 ">
                                            <h4 className=" text-lg">{item.username}</h4>
                                            {
                                                item.isOwner && <div className=' flex  justify-end items-endf w-full'>
                                                    <img className='w-7 h-7' src="https://th.bing.com/th/id/R.d3577ea04a87de8a17a0c4da1599f14f?rik=tyHhffAFBiEkuQ&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_325791.png&ehk=JLU5qFTRDFwXx3RCfbNOak3HCyy3uDphKbj2yWjqR1k%3d&risl=&pid=ImgRaw&r=0" alt="" />
                                                    {
                                                        item.id == currentUser.id && Room.type != 'private' && <button onClick={() => setClick(1)} className='flex justify-end items-end w-full '> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 24 24">
                                                            <path d="M 12.0625 0 C 9.773438 0 9.8125 0.21875 9.8125 0.21875 C 9.539063 1.539063 9.253906 2.433594 9.0625 2.96875 C 7.898438 3.351563 6.824219 3.949219 5.90625 4.71875 C 5.351563 4.609375 4.457031 4.40625 3.21875 3.96875 C 3.21875 3.96875 3.050781 3.824219 1.875 5.8125 C 0.695313 7.800781 0.875 7.90625 0.875 7.90625 C 1.789063 8.765625 2.386719 9.425781 2.75 9.875 C 2.59375 10.558594 2.5 11.269531 2.5 12 C 2.5 12.664063 2.558594 13.3125 2.6875 13.9375 C 2.316406 14.378906 1.707031 15.042969 0.78125 15.875 C 0.78125 15.875 0.613281 15.957031 1.75 17.96875 C 2.886719 19.980469 3.03125 19.84375 3.03125 19.84375 C 4.28125 19.429688 5.191406 19.253906 5.75 19.15625 C 6.664063 19.960938 7.730469 20.5625 8.90625 20.96875 C 9.101563 21.496094 9.40625 22.414063 9.6875 23.78125 C 9.6875 23.78125 9.652344 24 11.9375 24 C 14.222656 24 14.21875 23.78125 14.21875 23.78125 C 14.492188 22.464844 14.742188 21.566406 14.9375 21.03125 C 16.101563 20.648438 17.175781 20.050781 18.09375 19.28125 C 18.648438 19.390625 19.542969 19.59375 20.78125 20.03125 C 20.78125 20.03125 20.945313 20.175781 22.125 18.1875 C 23.300781 16.199219 23.125 16.09375 23.125 16.09375 C 22.210938 15.234375 21.613281 14.574219 21.25 14.125 C 21.40625 13.4375 21.5 12.730469 21.5 12 C 21.5 11.335938 21.441406 10.6875 21.3125 10.0625 C 21.683594 9.621094 22.292969 8.957031 23.21875 8.125 C 23.21875 8.125 23.386719 8.042969 22.25 6.03125 C 21.113281 4.019531 20.96875 4.15625 20.96875 4.15625 C 19.71875 4.570313 18.808594 4.746094 18.25 4.84375 C 17.335938 4.042969 16.269531 3.4375 15.09375 3.03125 C 14.902344 2.503906 14.59375 1.585938 14.3125 0.21875 C 14.3125 0.21875 14.347656 0 12.0625 0 Z M 12 4 C 16.417969 4 20 7.582031 20 12 C 20 16.417969 16.417969 20 12 20 C 7.582031 20 4 16.417969 4 12 C 4 7.582031 7.582031 4 12 4 Z M 12 5 C 8.132813 5 5 8.132813 5 12 C 5 15.867188 8.132813 19 12 19 C 15.867188 19 19 15.867188 19 12 C 19 8.132813 15.867188 5 12 5 Z M 12 8 C 14.210938 8 16 9.789063 16 12 C 16 14.210938 14.210938 16 12 16 C 9.789063 16 8 14.210938 8 12 C 8 9.789063 9.789063 8 12 8 Z"></path>
                                                        </svg></button>
                                                    }
                                                </div>
                                            }
                                            {
                                                item.isAdmin && !item.isOwner && <h4 className=" text-lg">Admin</h4>
                                            }

                                        </div>
                                    </div>
                                    {userStatusRoom?.isOwner && !item.isOwner && <div className='flex justify-end items-end w-full h-8'>
                                        <button onClick={() => handl1(item)} className='w-6 h-6 rounded-full'>
                                            <img src='https://cdn2.iconfinder.com/data/icons/clean-minimal-set/16/open-menu-01-512.png' />
                                        </button>
                                    </div>}
                                </div>
                            ) : (
                                <div className="flex bg-fblue-400 mt-2">
                                    <div className="h-auto  justify-start items-center gap-2.5 flex">
                                        <img className="w-8 h-8 rounded-full" src={item.foto_user} />
                                        <div className="   flex flex-col justify-center items-start space-y-1 ">
                                            <h4 className=" text-lg">{item.username}</h4>
                                        </div>
                                    </div>
                                    {(userStatusRoom?.isOwner || userStatusRoom?.isAdmin) && <div className='flex justify-end items-end w-full h-8'>
                                        <button onClick={() => handl1(item)} className='w-6 h-6 rounded-full bg'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M3 8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8ZM21 16H3C2.73478 16 2.48043 16.1054 2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1054 21.2652 16 21 16ZM21 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11Z" fill="black" />
                                            </svg> </button>
                                    </div>}
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>}
            {

                click != 0 && <div className=' bg-white  bg-blgdack dark:bg-gray-700 h-auto w-[90%]  flex-col  rounded-lg flex justify-start items-start  shadow-md sdhadow -mt-[630px]  z-40 '>
                    {
                        click == 1 && <>

                            <div className=' w-full mr-2 mte-1 h-10 flex justify-end items-center'>

                                <button onClick={() => setClick(0)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 30 30">
                                        <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                                    </svg>

                                </button>
                            </div>
                            <div className=' w-full h-full flex justify-center bg-bwlack'>

                                {
                                    Room1.type == "public" && <div className=' flex flex-col bg-whiwte fledx justify-center items-center'>
                                        <label className="block mb-2 text-sm font-black text-gray-900 dark:text-white">Choose Type group</label>
                                        <select onChange={(e) => setType(e.target.value)} id="small" className="block  w-28 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            {/* <option selected>Choose Type group</option> */}
                                            <option value="public">Public</option>
                                            <option value="protected">Protected</option>
                                        </select>
                                        {/* <div> */}

                                        {
                                            type == 'protected' &&
                                            <div className='-mt-6'>

                                                <div className="mbw-6 flex flex-col w-full h-16 justify-center items-center space-sy-2">
                                                    {

                                                        !error && <label htmlFor="password" className=" text-sm  font-black mt-6 text-gray-900 dark:text-white">Password</label>
                                                    }
                                                    {

                                                        error && <label htmlFor="password" className=" text-sm  font-black mt-6 text-red-500 dadrk:text-white">Password</label>
                                                    }

                                                    {/* <label htmlFor="password" className=" text-sm  font-black mt-6 text-gray-900 dark:text-white">Password</label> */}
                                                    <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className={`bg-gray-50 border ml-1 mt-1 {${error ? 'text-red-600 border-red-500' : 'text-gray-900 border-gray-300'} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-28 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={`${error ? "You must password" : "•••••••••"} `} required />
                                                </div>
                                                {/* <div className="mb-6 flex flex-row w-full h-16 justify-center items-center space-x-">
                                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                            <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                                        </div> */}
                                            </div>
                                            // <label className='mt-2 '>
                                            //     Password:
                                            //     <input required type="password" className=' bg-blue-500' value={password} onChange={(e) => setPassword(e.target.value)} />
                                            // </label>
                                        }
                                        <div className=' w-full mt-6  ml-2 items-center flex justify-center '>

                                            <button type="submit" onClick={() => upadategroup()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-30  px-5 py-2.5 text-center dark:bg-blue-600 justify-center items-center flex dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                        </div>
                                        {/* </div> */}


                                    </div>

                                }
                                {
                                    Room1.type == "protected" && <div className=' flex flex-col bg-whiwte fledx justify-center items-center'>
                                        <label className="block mb-2 text-sm font-black text-gray-900 dark:text-white">Choose Type group</label>
                                        <select onChange={(e) => setType(e.target.value)} id="small" className="block  w-28 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            {/* <option selected>Choose Type group</option> */}
                                            <option value="protected">Protected</option>
                                            <option value="public">Public</option>
                                        </select>
                                        {/* <div> */}

                                        {
                                            Room1.type == 'protected' && type != "public" &&
                                            <div className='-mt-6'>

                                                <div className="mbw-6 flex flex-col w-full h-16 justify-center items-center space-sy-2">
                                                    <label htmlFor="password" className=" text-sm  font-black mt-6 text-gray-900 dark:text-white">Password</label>
                                                    <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className={`bg-gray-50 border ml-1 mt-1  {${error ? 'text-red-600 border-red-500' : 'text-gray-900 border-gray-300'} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-28 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={`${error ? "You must password" : "•••••••••"} `} required />
                                                </div>
                                                {/* <div className="mb-6 flex flex-row w-full h-16 justify-center items-center space-x-">
                                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                            <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                                        </div> */}
                                            </div>
                                        }
                                        <div className=' w-full mt-6 items-center ml-2 flex justify-center '>

                                            <button type="submit" onClick={() => upadategroup()} className="text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-30  px-5 py-2.5 text-center dark:bg-blue-600 justify-center items-center flex dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                        </div>
                                        {/* </div> */}
                                    </div>
                                }
                            </div>
                        </>
                    }

                    {
                        click == 2 && <div className='w-full flex flex-col bg-fslate-400'>
                            <div className=''>
                                <button onClick={() => setClick(0)} >
                                    <h1>{participant?.username}</h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 30 30">
                                        <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                                    </svg>
                                </button>
                            </div>
                            <button className='border p-2' onClick={() => handlParticipants('kick')}>kick this user</button>
                            {userStatusRoom?.isOwner && participant?.isAdmin ? <button className='border p-2' onClick={() => handlParticipants('inAdmin')}>inAdmin this user</button> : <button className='border p-2' onClick={() => handlParticipants('admin')}>set this user is admin</button>}
                            <button className='border p-2' onClick={() => setClick(4)}>mute this user</button>
                            {participant?.isBanned ? <button className='border p-2' onClick={() => handlParticipants('no banned')}>no banned</button> : <button className='border p-2' onClick={() => handlParticipants('banned')}>banned</button>}

                        </div>
                    }
                    {
                        (click == 3) && <AddPeople participants={participants} setCancel={setClick} users={users} />
                    }
                    {
                        (click == 4) && <div className=' h-auto border flex flex-col items-start justify-center '>
                            <div className=''>
                                <button onClick={() => setClick(0)} >
                                    <h1>{participant?.username}</h1>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 30 30">
                                        <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="w-full flex  justify-center">
                                <select className=' border border-sky-200 p-2 mt-2' onChange={(e) => setDuration(e.target.value)}>
                                    <option value="1min">1min</option>
                                    <option value="1h">1h</option>
                                    <option value="1day">1day</option>
                                    <option value="1week">1week</option>
                                </select>
                                <button onClick={() => { handlParticipants('mute') }}>mute</button>
                            </div>
                        </div>
                    }
                </div >

            }
        </>
    )
}