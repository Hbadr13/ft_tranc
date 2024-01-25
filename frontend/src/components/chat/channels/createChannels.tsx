import React, { useEffect, useState } from 'react'
import { userProps } from '@/interface/data'
import { disconnect } from 'process';

export default function Channels({ users, setClick}: { users: userProps[], setClick: (value: string) => void}) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [Type, setType] = useState('public');
  const [message, setMessage] = useState('');
  const [add, setAdd] = useState(false)
  const [people, setPeople] = useState<number[]>([])
  const [select, setSelect] = useState(false)
  const [lastUsers, setLastUsers] = useState<userProps[]>(users)
  const [good, setGood] = useState(0)


  const handleClick = async () => {
    if (name && description && Type && (Type != 'protected' || (Type == 'protected' && password))) {
      lastUsers.map((item: userProps) => {
        item.flag = false
      })
      await fetch(`http://localhost:3333/chat/createChannel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name,
          "type": Type,
          "description": description,
          "password": password,
          "people": people
        }),
        credentials: 'include',
      });
      setGood(2)
      setClick('')
    }
    else
      setGood(1)
  };

  useEffect(() => {
    setLastUsers(lastUsers)
    setPeople([])
    lastUsers.map((item: userProps) => {
      if (item.flag)
        setPeople(prevPeople => [...prevPeople, item.id]);
    })
  }, [select, add])

  const handlSelect = (item: userProps[], s: boolean, index: number) => {
    item[index].flag = s
    if (select == true)
      setSelect(false)
    else
      setSelect(true)
    // console.log(item
    // console.log('-???', item[index].flag)
    setLastUsers(item)
    // console.log(lastUsers)
  }

  return (
    <div className="w-full h-full">

      {
        !add ? (
          <div className=" flex  flex-col  h-full w-full">
            <div className='flex flex-col justify-cenfter items-centefr'>
              <div className="flex flex-col justify-center items-center p-6 w-full bg-sjlate-400">
                <h2 className='flex ml- w-full'> Channel Name</h2>
                <input className='focus:outline-none  flex items-center justify-center mt-2 pl-4 w-full h-10 border border-sky-200 text-CuisColor_dark_grey' type="text" name='Enter channel name' value={name} onChange={(e) => setName(e.target.value)} />
                {(good == 1 && !name) && <p className=' text-red-500'>enter name</p>}
                <h2 className='flex mt-4 w-full'> Description</h2>
                <input className='focus:outline-none  flex items-center justify-center mt-2 pl-4 w-full h-24 border  border-sky-200 text-CuisColor_dark_grey' required type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                {(good == 1 && !description) && <p className=' text-red-500'>enter description</p>}

              </div>
              <div className=' w-full h-[1px] bg-sky-200' />
              <div className='bg-grajy-400 p-4'>

                <h2 className='flex  w-full justify-center'> Type</h2>
                <div className="w-full flex  justify-center">
                  <select className=' border border-sky-200 p-2 mt-2' onChange={(e) => setType(e.target.value)}>
                    <option value="public">Public</option>
                    <option value="protected">Protected</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
              {Type == 'protected' && <div className='flex flex-col justify-center items-center h-24 w-full bg-sjlate-400'>
                <h2 className='flex ml-12 w-full'>Password</h2>
                <input className='focus:outline-none  flex items-center justify-center mt-2 pl-4 w-80 h-10 border  text-CuisColor_dark_grey' required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {(good == 1 && !password) && <p className=' text-red-500'>enter password</p>}
              </div>}
              {Type == 'private' && <div className=" bg-stofne-600 flex flex-col justify-center items-center">
                <h2 className="w-full ml-20">Add People</h2>
                <div className='overflow-y-scroll bg-blfack scrollbar-hide flex bg-gdray-600 flex-row justify-start items-center flex-wrap gridx grid-cols-2x grid-flolw-colx  h-28   w-80 bg-slatef-400 mt-2  space-fx-0 spacfe-y-0 gap-1 bg-slatfe-700'>
                  {lastUsers.map((item, index) => (
                    <div className=' bg-ambder-500 bord,fer border-sfky-900 rounded-md  w-auto b-black'>
                      {
                        item.flag &&
                        <div className='flex  justify-center items-center   border border-sky-400 bg-sky-200 rounded-md  min-w-32f w-aufto space-x-2  h-10 p-2' key={index}>
                          <div className="w-5 bg- h-5">
                            <img className="w-5 h-5 rounded-full" src={item.foto_user} />
                          </div>
                          <h1 className='h-6 w-auto text-sm'>{item.username}</h1>
                          <div className=''>
                            <button className=' bg-white rounded-full' onClick={() => handlSelect(lastUsers, false, index)}  >
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
                  <div className="w-fullf h-ffull mt bg-slate-f400">

                    <button onClick={() => setAdd(true)} className=''>
                      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none">
                        <path d="M8 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V16C4 15.7348 3.89464 15.4804 3.70711 15.2929C3.51957 15.1054 3.26522 15 3 15C2.73478 15 2.48043 15.1054 2.29289 15.2929C2.10536 15.4804 2 15.7348 2 16V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H8C8.26522 22 8.51957 21.8946 8.70711 21.7071C8.89464 21.5196 9 21.2652 9 21C9 20.7348 8.89464 20.4804 8.70711 20.2929C8.51957 20.1054 8.26522 20 8 20ZM3 9C3.26522 9 3.51957 8.89464 3.70711 8.70711C3.89464 8.51957 4 8.26522 4 8V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H8C8.26522 4 8.51957 3.89464 8.70711 3.70711C8.89464 3.51957 9 3.26522 9 3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V8C2 8.26522 2.10536 8.51957 2.29289 8.70711C2.48043 8.89464 2.73478 9 3 9ZM19 2H16C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3C15 3.26522 15.1054 3.51957 15.2929 3.70711C15.4804 3.89464 15.7348 4 16 4H19C19.2652 4 19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5V8C20 8.26522 20.1054 8.51957 20.2929 8.70711C20.4804 8.89464 20.7348 9 21 9C21.2652 9 21.5196 8.89464 21.7071 8.70711C21.8946 8.51957 22 8.26522 22 8V5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956 2 19 2ZM16 12C16 11.7348 15.8946 11.4804 15.7071 11.2929C15.5196 11.1054 15.2652 11 15 11H13V9C13 8.73478 12.8946 8.48043 12.7071 8.29289C12.5196 8.10536 12.2652 8 12 8C11.7348 8 11.4804 8.10536 11.2929 8.29289C11.1054 8.48043 11 8.73478 11 9V11H9C8.73478 11 8.48043 11.1054 8.29289 11.2929C8.10536 11.4804 8 11.7348 8 12C8 12.2652 8.10536 12.5196 8.29289 12.7071C8.48043 12.8946 8.73478 13 9 13H11V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V13H15C15.2652 13 15.5196 12.8946 15.7071 12.7071C15.8946 12.5196 16 12.2652 16 12ZM21 15C20.7348 15 20.4804 15.1054 20.2929 15.2929C20.1054 15.4804 20 15.7348 20 16V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H16C15.7348 20 15.4804 20.1054 15.2929 20.2929C15.1054 20.4804 15 20.7348 15 21C15 21.2652 15.1054 21.5196 15.2929 21.7071C15.4804 21.8946 15.7348 22 16 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V16C22 15.7348 21.8946 15.4804 21.7071 15.2929C21.5196 15.1054 21.2652 15 21 15Z" fill="#2684DB" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>}
              <div className=' bg-skhy-200 p-4 mt-j4 flex flex-row items-center justify-center'>
                <button onClick={() => setClick('')} className=' bg-white w-20 h-10 border  mr-4'>Cancel</button>
                <button onClick={handleClick} className=' bg-sky-500 w-52 h-10 border border-sky-200 text-white'>Create</button>
              </div>
              {message && <p>{message}</p>}
            </div>
          </div>
        ) : (<div className='flex flex-col bg-blac shadow-xl w-96'>
          <div className="bg-sgky-400 w-full h-20 flex justify-cenjter items-cejnter">
            <div className='flex justify-start w-full items-center ml-8  text-black'>
              <h1 className=' text-shadow-sm'>Add People</h1></div>
            <div className='w-full justify-end items-center bg-blhack flex'>
              <button onClick={() => setAdd(false)} className=" mr-6">
                <svg width="10" height="10" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path id="Vector" d="M117.5 100L196.25 21.25C201.25 16.25 201.25 8.75 196.25 3.75C191.25 -1.25 183.75 -1.25 178.75 3.75L100 82.5L21.25 3.75C16.25 -1.25 8.75 -1.25 3.75 3.75C-1.25 8.75 -1.25 16.25 3.75 21.25L82.5 100L3.75 178.75C1.25 181.25 0 183.75 0 187.5C0 195 5 200 12.5 200C16.25 200 18.75 198.75 21.25 196.25L100 117.5L178.75 196.25C181.25 198.75 183.75 200 187.5 200C191.25 200 193.75 198.75 196.25 196.25C201.25 191.25 201.25 183.75 196.25 178.75L117.5 100Z" fill="#376EFA" fill-opacity="0.85" />
                </svg>
              </button>
            </div>
          </div>
          <div className=' w-full h-[1px] bg-sky-200' />
          <div className='flex-row-revferse overflow-x-scroll scrollbar-hide flex w-96 p-4'>
            {lastUsers.map((item, index) => (
              <div className=' bg-blfack bggf-blue-600  w-32 h-14 p-2 flex justify-center items-center'>
                {
                  item.flag &&
                  <div className='h-full  bg-fblack w-16 flex justify-center items-center' key={index}>
                    <img className='w-12 h-12 rounded-full ' src={item.foto_user} />
                    <div className="w-full flex justify-end items-end h-full  mr-6 -mt-14 bgj-black z-18">
                      <button className=' -mt-12 ' onClick={() => handlSelect(lastUsers, false, index)}  >
                        <svg className=' ' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M13.414 12.0003L16.707 8.70732C16.8926 8.5194 16.9963 8.2657 16.9954 8.00161C16.9946 7.73751 16.8893 7.48447 16.7026 7.29773C16.5158 7.11099 16.2628 7.00571 15.9987 7.00489C15.7346 7.00406 15.4809 7.10775 15.293 7.29332L12 10.5863L8.70696 7.29332C8.51887 7.10861 8.26545 7.00565 8.00183 7.00685C7.73822 7.00804 7.48574 7.11329 7.29933 7.2997C7.11292 7.4861 7.00767 7.73858 7.00648 8.0022C7.00529 8.26582 7.10825 8.51924 7.29296 8.70732L10.5859 12.0003L7.29296 15.2933C7.10825 15.4814 7.00529 15.7348 7.00648 15.9984C7.00767 16.2621 7.11292 16.5145 7.29933 16.7009C7.48574 16.8874 7.73822 16.9926 8.00183 16.9938C8.26545 16.995 8.51887 16.892 8.70696 16.7073L12 13.4144L15.293 16.7074C15.4809 16.8929 15.7346 16.9966 15.9987 16.9958C16.2628 16.995 16.5158 16.8897 16.7026 16.7029C16.8893 16.5162 16.9946 16.2631 16.9954 15.999C16.9962 15.7349 16.8925 15.4812 16.707 15.2933L13.414 12.0003Z" fill="white" />
                          <path d="M19.0708 4.92882C17.1955 3.05353 14.6521 2 12 2C9.34792 2 6.80448 3.05353 4.92919 4.92882C3.05389 6.80411 2.00037 9.34756 2.00037 11.9996C2.00037 14.6517 3.05389 17.1951 4.92919 19.0704C6.80448 20.9457 9.34792 21.9992 12 21.9992C14.6521 21.9992 17.1955 20.9457 19.0708 19.0704C20.9461 17.1951 21.9996 14.6517 21.9996 11.9996C21.9996 9.34756 20.9461 6.80411 19.0708 4.92882V4.92882ZM16.707 15.2926C16.8012 15.3852 16.8762 15.4954 16.9275 15.6171C16.9789 15.7388 17.0057 15.8694 17.0063 16.0015C17.0069 16.1336 16.9813 16.2644 16.931 16.3866C16.8808 16.5087 16.8068 16.6197 16.7134 16.7131C16.62 16.8064 16.5091 16.8804 16.3869 16.9307C16.2648 16.9809 16.1339 17.0065 16.0019 17.0059C15.8698 17.0053 15.7392 16.9786 15.6175 16.9272C15.4958 16.8758 15.3855 16.8009 15.293 16.7066L12 13.4137L8.70699 16.7066C8.5189 16.8913 8.26548 16.9943 8.00186 16.9931C7.73825 16.9919 7.48577 16.8867 7.29936 16.7002C7.11296 16.5138 7.00771 16.2614 7.00651 15.9977C7.00532 15.7341 7.10828 15.4807 7.29299 15.2926L10.5859 11.9996L7.29299 8.70662C7.10828 8.51853 7.00532 8.26511 7.00651 8.0015C7.00771 7.73788 7.11296 7.4854 7.29936 7.299C7.48577 7.11259 7.73825 7.00734 8.00186 7.00615C8.26548 7.00495 8.5189 7.10791 8.70699 7.29262L12 10.5856L15.293 7.29256C15.4809 7.107 15.7346 7.00332 15.9987 7.00416C16.2628 7.00499 16.5158 7.11028 16.7026 7.29703C16.8893 7.48378 16.9946 7.73682 16.9954 8.00092C16.9962 8.26501 16.8926 8.51871 16.707 8.70662L13.414 11.9996L16.707 15.2926Z" fill="#FF212E" />
                        </svg>
                      </button>
                    </div>
                  </div>
                }
              </div>
            ))
            }
          </div>
          <div className=' w-full h-[1px] bg-sky-200' />
          <div className="flex flex-col  items-center overflow-y-scroll scrollbar-hide  h-96 bg-blachk p-6">
            {lastUsers.map((item, index) => (
              <div key={index} className="flex flex-row w-full p-2  h-14 justify-center items-center p-">
                <div className='flex  justify-first'>
                  <img className='w-10 h-10 rounded-full' src={item.foto_user}></img>
                  <h1>{item.username}</h1>
                </div>
                <div className="flex w-full justify-end  ">
                  {/* {item.flag && <button onClick={() => handlSelect(lastUsers, false, index)} className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none">
                      <path d="M16 8.5C15.3078 8.5 14.6311 8.70527 14.0555 9.08986C13.4799 9.47444 13.0313 10.0211 12.7664 10.6606C12.5015 11.3001 12.4322 12.0039 12.5673 12.6828C12.7023 13.3618 13.0356 13.9854 13.5251 14.4749C14.0146 14.9644 14.6382 15.2977 15.3172 15.4327C15.9961 15.5678 16.6999 15.4985 17.3394 15.2336C17.9789 14.9687 18.5256 14.5201 18.9101 13.9445C19.2947 13.3689 19.5 12.6922 19.5 12C19.5 11.0717 19.1313 10.1815 18.4749 9.52513C17.8185 8.86875 16.9283 8.5 16 8.5ZM16 13.5C15.7033 13.5 15.4133 13.412 15.1666 13.2472C14.92 13.0824 14.7277 12.8481 14.6142 12.574C14.5006 12.2999 14.4709 11.9983 14.5288 11.7074C14.5867 11.4164 14.7296 11.1491 14.9393 10.9393C15.1491 10.7296 15.4164 10.5867 15.7074 10.5288C15.9983 10.4709 16.2999 10.5006 16.574 10.6142C16.8481 10.7277 17.0824 10.92 17.2472 11.1666C17.412 11.4133 17.5 11.7033 17.5 12C17.5 12.3978 17.342 12.7794 17.0607 13.0607C16.7794 13.342 16.3978 13.5 16 13.5ZM16 5H8C6.14348 5 4.36301 5.7375 3.05025 7.05025C1.7375 8.36301 1 10.1435 1 12C1 13.8565 1.7375 15.637 3.05025 16.9497C4.36301 18.2625 6.14348 19 8 19H16C17.8565 19 19.637 18.2625 20.9497 16.9497C22.2625 15.637 23 13.8565 23 12C23 10.1435 22.2625 8.36301 20.9497 7.05025C19.637 5.7375 17.8565 5 16 5ZM16 17H8C6.67392 17 5.40215 16.4732 4.46447 15.5355C3.52678 14.5979 3 13.3261 3 12C3 10.6739 3.52678 9.40215 4.46447 8.46447C5.40215 7.52678 6.67392 7 8 7H16C17.3261 7 18.5979 7.52678 19.5355 8.46447C20.4732 9.40215 21 10.6739 21 12C21 13.3261 20.4732 14.5979 19.5355 15.5355C18.5979 16.4732 17.3261 17 16 17Z" fill="#1141EB" />
                    </svg>                  </button>} */}
                  {!item.flag && <button onClick={() => handlSelect(lastUsers, true, index)} className=' duration-300 hover:ease-in-  border-2 border-sky-500 w-26 p-3 h-8 flex justify-center items-center text-sky-500 '>
                    Add
                  </button>}
                  {item.flag && <button onClick={() => handlSelect(lastUsers, false, index)} className=' border-2 border-lime-500 p-3  text-lime-500 h-8 flex  justify-center items-center space-x-5'>
                    Added   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M18.7099 7.20986C18.617 7.11613 18.5064 7.04174 18.3845 6.99097C18.2627 6.9402 18.132 6.91406 17.9999 6.91406C17.8679 6.91406 17.7372 6.9402 17.6154 6.99097C17.4935 7.04174 17.3829 7.11613 17.29 7.20986L9.83995 14.6699L6.70995 11.5299C6.61343 11.4366 6.49949 11.3633 6.37463 11.3141C6.24978 11.2649 6.11645 11.2408 5.98227 11.2431C5.84809 11.2454 5.71568 11.2741 5.5926 11.3276C5.46953 11.3811 5.35819 11.4583 5.26495 11.5549C5.17171 11.6514 5.0984 11.7653 5.04919 11.8902C4.99999 12.015 4.97586 12.1484 4.97818 12.2825C4.9805 12.4167 5.00923 12.5491 5.06272 12.6722C5.11622 12.7953 5.19343 12.9066 5.28995 12.9999L9.12995 16.8399C9.22291 16.9336 9.33351 17.008 9.45537 17.0588C9.57723 17.1095 9.70794 17.1357 9.83995 17.1357C9.97196 17.1357 10.1027 17.1095 10.2245 17.0588C10.3464 17.008 10.457 16.9336 10.55 16.8399L18.7099 8.67986C18.8115 8.58622 18.8925 8.47257 18.9479 8.34607C19.0033 8.21957 19.0319 8.08296 19.0319 7.94486C19.0319 7.80676 19.0033 7.67015 18.9479 7.54365C18.8925 7.41715 18.8115 7.3035 18.7099 7.20986V7.20986Z" fill="#1ADB50" />
                    </svg>              </button>}
                </div>
              </div>
            ))}
          </div>

        </div>)
      }
    </div>
  );
};