import { fetchAllAmis } from "@/hooks/userHooks";
import { userProps } from "@/interface/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Friends = ({ amis_id }: { amis_id: userProps }) => {

    // const [query, setQuery] = useState('')
    // const [id, setid] = useState(numberPart)
    // const [amis, setAmis] = useState<any>([])
    // fetchAllAmis({ setAmis, query, id});
    console.log(amis_id);
    const router = useRouter();
    const profailamis = (username: string, userId: number) => {
        // Implement the functionality for profailamis
        // For example, you can navigate to a new page or perform an action here
        router.push(`/users/${username}.${userId}`);
      };

    return (
        <div className=" flax bg_ba overflow-auto">
        <h1 className=''>amis</h1>

        {
          (amis_id.length) ? amis_id.map((user: userProps) => (
            
            <div className=' bg-white  mt-4  w-[500px]  h-20 rounded-2xl items-center     space-x-6 p-2 flex  justify-stretch'>
              <img
                src={user.foto_user}
                alt="Your Image Alt Text"
                className=" w-16 h-auto  rounded-full " // Adjust the width as needed
              />
              <span className=' rounded-xl   '> <button onClick={() => profailamis(user.username, user.id)}> {`${user.username}`} </button> </span>
            </div>
          )) : null
        }
      </div>
    )
}


export default Friends;
