import { Link } from "react-router-dom";
import userIco from "@imgs/icons/user.svg";
import { useSelector } from "react-redux";

export default function NavToUserPage() {
  const userId = useSelector((state) => state.userAccount.initialState)
  return (
    <Link to={`/uvelio/:${userId}`} className="w-1/5 max-w-12.5 min-w-11.5 h-full flex items-center justify-center cursor-pointer">
      <img src={userIco} alt="User" className="w-full aspect-square" />
    </Link>
  );
}
