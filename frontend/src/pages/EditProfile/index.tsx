import { AppProps } from "@/interface/data";
import EditProfile from "../../components/user/EditProfile";
// import UserInfo from "../../components/user/Profile";
export default function Home({ currentUser }: AppProps) {
  return (
    <main>
      <EditProfile currentUser={currentUser} />
    </main>);
}