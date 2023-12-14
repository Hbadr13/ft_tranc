import Image from 'next/image'


import { fetchAllAmis, fetchAllUsers, fetchCurrentUser } from '@/hooks/userHooks';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AppProps, userProps } from '@/interface/data';
import { useRouter } from 'next/navigation';

// const [users_id, setUsers_id] = useState("");
let users_id1: string = "";
function Profiles({ Leaderboard, t }: { Leaderboard: any, t: number }) {
  // console.log(Leaderboard.Leaderboard[0])
  // { id , t}: { id: number, t:number })
  const [users_id, setUsers_id] = useState(Array<userProps>(Leaderboard[0]))

  const [id, setid] = useState(0);
    useEffect(() => {
      
        (
            async () => {
                const response = await fetch('http://localhost:3333/auth/user', {
                    credentials: 'include',
                });
                const content = await response.json();
                console.log(content)
                
                setid(content.id);
               
            }
        )();
    });
  useEffect(() => {
    (
  setUsers_id(Leaderboard[0])
  
    );
  }, [id]);
  console.log(users_id)

  const router = useRouter();

  const profailamis = (username: string, userId: number) => {
    // Implement the functionality for profailamis
    // For example, you can navigate to a new page or perform an action here
    router.push(`/users/${username}.${userId}`);
  };

  return (
    // <div className='mt-2' >
    <div className='bg-bwlack flex h-full  w-[657px]  flex-row'>
      <div className="dw-full  w-[60%] h-full  bg-blue-500  rounded-t-2xl flex flex-col ">
        <div className=' flex wmt-2 h-full flex-col'>
          {
            Leaderboard.map((value, index) => (

              <div className=' flex -mt-3  fledx-row ml-8  spface-x-3'>
                {


                  index + 1 == 2 && <div className=' flex flex-col'>
                    <div className=' flex -mt-[221px]   flex-col bg-bladck justify-center items-center '>

                      <img
                        src={value.foto_user}
                        alt="Your"
                        className="w-14   h-14   rounded-full inline-block"
                      />
                      <div className=' text-sm mt-2  text-white  '>{value.username}</div>
                      <div className=' text-sm mt-[3px] text-white  justify-center items-center mfl-6'>{value.level} Win</div>
                    </div>
                    <div className='  mt-[8k3px] trapezoid1'></div>
                    <div className=' flex  bg-blue-300  w-[100px]  h-24 text-7xl text-white  justify-center items-center  '>2</div>
                  </div>
                }
                {

                  index + 1 == 1 && <div className=' ml-[100px]'>
                    <div className=' flex mt-[22px]   flex-col bg-bladck justify-center items-center '>

                      <img
                        src={value.foto_user}
                        alt="Your"
                        className="w-14   h-14 mfl-3  rounded-full inline-block"
                      />
                      <div className=' text-sm mt-2  text-white  '>{value.username}</div>
                      <div className=' text-sm mt-[3px] text-white  justify-center items-center mfl-6'>{value.level} Win</div>
                    </div>
                    <div className=' mt-0 trapezoid'></div>
                    <div className=' flex  bg-blue-400  w-[125px]  h-32 text-8xl text-white justify-center items-center '>1</div>
                  </div>
                }
                {

                  index + 1 == 3 && <div className='-mt-[205px]  ml-[225px]'>

                    <div className=' flex -mwt-[110px]  ml-[250pwx]   flex-col bg-bladck justify-center items-center '>

                      <img
                        src={value.foto_user}
                        alt="Your"
                        className="w-14   h-14   rounded-full inline-block"
                      />
                      <div className=' text-sm mt-2  text-white  '>{value.username}</div>
                      <div className=' text-sm mt-[3px] text-white  justify-center items-center mfl-6'>{value.level} Win</div>
                    </div>
                    <div className='  mt-[15wpx] trapezoid2'></div>
                    <div className=' flex  bg-blue-300  w-[100px]  h-20 text-6xl text-white  justify-center items-center'>3</div>
                  </div>
                }
              </div>

            ))
          }
          <div className=' bg-white w-96 h-full flex  mt-28 overflow-y-scroll jusdtify-center items-center mt-   flex-col scrollbar-hide ml-1 rounded-t-3xl'>
            <button className=' flex justify-start w-10 bg-slate-400 h-3 mt-2  rounded-3xl  '></button>
            {
              Leaderboard.map((value, index) => (
                <div className="flex flex-row" key={index}>
                  <div className='flex bg-blak w-96  hover:scale-105 hover:boeder-2 hover:bg-blue-600 hover:justify-center hover:flex hover:items-center hover:h-12  hover:z-20 hover:-ml-5 hover:w-[500px]  duration-500  hover:rounded-md  bg-dslate-400  mt-3  h-10 ' onMouseOver={() => setUsers_id(value)}>
                    <div className="flex  justify-between items-center flex-row space-x-7 ">
                      <div className=' ml-10  mft-2 flex  border-2  h-6 justify-center items-center w-6 rounded-full'>{index + 1} </div>
                      <div className='-mwt-3 flex flex-row w-40  vbg-slate-500 justify-start items-center space-x-3'>
                        <img className="h-8 w-8 borwder-2 bofrder-blue-600 rounded-full drop-shadow shadow-md shadow-black  " src={value.foto_user} alt="" />
                        <button className={` text-sm  } font-serif italic`}
                        > {value.username}</button>
                      </div>
                      <div className=" flex w-24 ml-10 bgf-black space-x-2">
                        <img className="h-8 w-8 borsder-2 bofrder-blue-600 rounded-full drop-shsadow shasdow-md shadow-black  " src="https://i.pinimg.com/564x/b2/1a/6d/b21a6d4cf152b2e3f4a9241e37a6fe64.jpg" alt="" />
                        <div className=' flex  mt-1 w-7 justify-center text-sm  font-serif italic'>{value.level}</div>
                        <span className='mt-1 text-sm   font-serif italic'>win</span>
                      </div>

                    </div>
                  </div>
                </div>

              ))
            }
          </div>

        </div >
      </div >
      {

        users_id && <div className="  hidden xl:block w-[40%] bg-swlate-300 h-full  justify-center  rounded-xl">
          <div className=' bg-blue-300 w-[100%] flex justify-start items-center flex-col  mt-[60px] rounded-r-xl h-[90%]'>
            <img className="h-40  w-40 mt-12  border-2 bofrder-blue-600 rounded-full drop-shadow shadow-md sshadow-black  " src={users_id.foto_user} alt="" />
            <div className=' textf-white mt-4  text-2xl capitalize  font-bold text-black'>{users_id.username}</div>
            <div className=' text-dwhite mt-1  text-base font-serif italic '>{users_id.email}</div>
            <div className='flex flex-row space-x-2 mt-7'>
              {/* <img className="h-8 w-8 border-2  border-blue-600 rounded-full drop-shsadow shasdow-md shadow-black  " src="https://i.pinimg.com/564x/b2/1a/6d/b21a6d4cf152b2e3f4a9241e37a6fe64.jpg" alt="" /> */}
              <div className=' text-dwhite mt-1  text-7xl tedxt-base font-bold italic '>{users_id.level}</div>
              {/* <div className='w-8 h-8 mst-1  border-2 border-blue-600 bg-white flex justify-center items-center    rounded-full'> */}

              {/* <span className=' text-sm   font-serif italic'>win</span> */}
              {/* </div> */}
            </div>
            <button>

              <div onClick={() => profailamis(users_id.username, users_id.id)} className=' flex justify-center items-center mt-12 text-sm font-bol bg-white rounded-full w-44 h-8 hover:bg-slate-100 hover:scale-110 duration-300'>

                <div className=' text-black ml-1 text-base font-serif italic'>view Profail</div>
              </div>
            </button>
            {/* {users_id.level} */}

          </div>
        </div>
      }
    </div>
  );

}
const Rank = ({ id, t }: { id: number, t: number }) => {

  const [users_id, setUsers_id] = useState(Array<userProps>);

  useEffect(() => {
    (
      async () => {
        const response = await fetch(`http://localhost:3333/users/${0}`, {
          credentials: 'include',
        });
        const content = await response.json();
        setUsers_id(content);
      }
    )();
  }, [id]);



  return (
    <div className="board">

      <Profiles Leaderboard={between(users_id)} t={t} />
    </div>
  );
};

function between(data: Array<userProps> | undefined) {
  // Check if data is defined before sorting
  if (data) {
    return data.sort((a, b) => b.level - a.level);
  } else {
    console.error("Cannot sort undefined data array");
    return [];
  }
}

function Index({ onlineUsersss, currentUser, users, amis }: AppProps) {
  const [users_id, setUsers_id] = useState("");
  if (users_id1)
    setUsers_id(users_id1)
  console.log(users_id)
  return (
    <menu className="w-full  ml-10  Dashboard    flex  flex-col md:flex-row gap-5md: gap-5 p-5  ">
      <div className=" w-full md:w-[45%]  h-full rounded-xl flex flex-col gap-5 ">
        <div className="w-full h-[100px] md:h-[20%] bg-slate-300 rounded-xl">
          user online
        </div>
        <div className=" flex  w-[657px]  h-[500px] md:h-[80%]  bg-bluse-700 bfg-[#f7f7f7]  sdhadow-md rounded-xl  " >
          {/* <div className="w-full xl:w-[60%] h-full  bg-blue-500  rounded-t-2xl flex flex-col ">
            <div className=' flex mt-2\\ h-full flex-col'>

              <div className=' flex -mt-3  flex-row ml-8  spface-x-3'>

                <div className=' flex flex-col'>
                  <div className=' flex mt-16   flex-col bg-bladck justify-center items-center '>

                    <img
                      src="https://i.pinimg.com/564x/1a/f0/89/1af089210c743292b0593a00618eb950.jpg"
                      alt="Your"
                      className="w-14   h-14   rounded-full inline-block"
                    />
                    <div className=' text-sm mt-2  text-white  '>Mohammed</div>
                    <div className=' text-sm mt-[3px] text-white  justify-center items-center mfl-6'>12 Win</div>
                  </div>
                  <div className='  mt-[8k3px] trapezoid1'></div>
                  <div className=' flex  bg-blue-300  w-[100px]  h-24 text-2xl text-white  justify-center items-center  '>2</div>
                </div>
                <div>
                  <div className=' flex mt-[22px]   flex-col bg-bladck justify-center items-center '>

                    <img
                      src="https://i.pinimg.com/564x/fb/b7/4a/fbb74a08b79de277a0034c5a1bbf3b6c.jpg"
                      alt="Your"
                      className="w-14   h-14 mfl-3  rounded-full inline-block"
                    />
                    <div className=' text-sm mt-2  text-white  '>badr</div>
                    <div className=' text-sm mt-[3px] text-white  justify-center items-center mfl-6'>12 Win</div>
                  </div>
                  <div className=' mt-0 trapezoid'></div>
                  <div className=' flex  bg-blue-400  w-[125px]  h-32 text-2xl text-white justify-center items-center '>1</div>
                </div>
                <div>
                  <div className=' flex mt-20   flex-col bg-bladck justify-center items-center '>

                    <img
                      src="https://w0.peakpx.com/wallpaper/616/177/HD-wallpaper-table-tennis-neon-icon-blue-background-neon-symbols-table-tennis-neon-icons-table-tennis-sign-sports-signs-table-tennis-icon-sports-icons.jpg"
                      alt="Your"
                      className="w-14   h-14   rounded-full inline-block"
                    />
                    <div className=' text-sm mt-2  text-white  '>hamza</div>
                    <div className=' text-sm mt-[3px] text-white  justify-center items-center mfl-6'>12 Win</div>
                  </div>
                  <div className='  mt-[15wpx] trapezoid2'></div>
                  <div className=' flex  bg-blue-300  w-[100px]  h-20 text-2xl text-white  justify-center items-center'>3</div>
                </div>
              </div>
              <div className=' bg-white w-96 h-full flex overflow-y-scroll jusdtify-center items-center mt-   flex-col scrollbar-hide ml-1 rounded-t-3xl'>
                <button className=' flex justify-start w-10 bg-slate-400 h-3 mt-2  rounded-3xl  '></button>
                </div>
                </div>
              </div> */}
          {/* <div className="  hidden xl:block w-[40%] h-full  justify-center  rounded-xl">
            <div className=' bg-blue-200 w-[100%]  mt-[59px] rounded-r-xl h-[90%]'>
            <Rank id={currentUser.id} t={1} />
            
            </div>
          </div> */}
          <Rank id={currentUser.id} t={currentUser.id} />
        </div>
      </div>
      <div className=" w-full md:w-[55%]  h-[800px] md:h-full rounded-xl flex flex-col gap-5   mb-10">
        <div className="h-[50%] w-full flex gap-5">
          <div className="w-[40%] h-full bg-red-400 rounded-xl">
            user matches
          </div>
          {/* <Image src={'/game/grad/grad-1.svg'} fill alt='1'></Image> */}
          <div className="w-[60%] h-full   flex">
            <div className="w-[50%] h-full   flex flex-col justify-between ">
              <div className="  w-full h-[30%] bg-white rounded-xl flex justify-center items-center">
                <div className="w-[100px] h-[100px] bg-black rounded-full"></div>
              </div>
              <div className="w-full h-[30%] bg-white rounded-xl"></div>
              <div className="w-full h-[30%] bg-white rounded-xl"></div>
            </div>
            <div className="w-[50%] h-full  flex flex-col  justify-around  -space-y-10">
              <div className="w-full h-[30%] bg-white rounded-xl"></div>
              <div className="w-full h-[30%] bg-white rounded-xl"></div>
            </div>
          </div>
        </div>
        <div className="h-[50%] w-full bg-blue-400">
          user history
        </div>
        <div className='trapezoid'></div>
        <div className=' flex  bg-black w-24 -mt-6 h-20 '></div>
      </div>
    </menu>
  )
}

export default Index;
