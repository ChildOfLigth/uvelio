import { Link } from "react-router-dom";
import userIco from "@imgs/icons/user.svg";
import { useSelector } from "react-redux";

export default function NavToUserPage() {
  const id = useSelector((state) => state.userAccount.accountData.userData?.id);

  return (
    <Link
      to={`/user/:${id}`}
      className="w-1/5 max-w-12.5 min-w-11.5 h-full flex items-center justify-center cursor-pointer"
    >
      <img src={userIco} alt="User" className="w-full aspect-square" />
    </Link>
  );
}
