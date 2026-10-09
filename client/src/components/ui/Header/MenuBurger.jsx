import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import uvelioLogo from "@imgs/icons/uvelio.svg";
import ChangeLang from "../ButtonComponent/ChangeLang.jsx";
import AuthButton from "../ButtonComponent/AuthButton.jsx";
import NavToUserPage from "../ButtonComponent/NavToUserPage.jsx";
import FormSearchProduct from "./FormSearchProduct.jsx";

export default function MenuBurger() {
  const isAuth = useSelector((state) => state.userAccount.accountData.isAuth);
  const [hiddenMenu, setHiddenMenu] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setHiddenMenu(true);
  }, [location.pathname]);

  return (
    <div className="w-full relative">
      <div className="w-[90%] h-15 flex items-center justify-between mx-auto relative">
        <img
          src={uvelioLogo}
          alt="Uvelio icon"
          className="w-[18%] min-w-18.75 h-full"
        />

        <button
          className="w-9 h-full flex flex-col items-center justify-center gap-2.5"
          onClick={() => setHiddenMenu(!hiddenMenu)}
        >
          <span className="spanInMenuBurger"></span>
          <span className="spanInMenuBurger"></span>
          <span className="spanInMenuBurger"></span>
        </button>
      </div>

      <div
        className={`w-full h-auto ${hiddenMenu ? "hidden" : "flex"} absolute top-15 py-7.5 bg-(--second-primary-c)`}
      >
        <div className="w-5/6 flex flex-col items-start justify-center mx-auto gap-4">
          <div className="w-full flex items-center gap-3">
            <FormSearchProduct />
          </div>

          <div className="w-3/4 sm:w-1/2 h-12.5 flex items-center justify-center mx-auto gap-4">
            <ChangeLang />
            {!isAuth ? <AuthButton /> : <NavToUserPage />}
          </div>
        </div>
      </div>
    </div>
  );
}
