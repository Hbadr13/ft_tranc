import Navbar from "./Navbar";
export { Navbar };
export interface CustomLinkNavbarProps {
  href?: string;
  content?: string;
  moreStye?: string;
}

export interface BoxSearchrProps {
  searchUser: string;
  setSearchUser: (searchUser: string) => void;
}

export interface InfoGameFromClientProps {
  // infoGameFromClient: {
  selectPlayer: string;
  info: string;
  // };
}
