import { Link, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../../globalVariables";
import uvelioLogo from "@imgs/icons/uvelio.svg";
import MenuBurger from "./MenuBurger.jsx";
import ChangeLang from "../ButtonComponent/ChangeLang.jsx";
import AuthButton from "../ButtonComponent/AuthButton.jsx";
import { useSelector } from "react-redux";
import NavToUserPage from "../ButtonComponent/NavToUserPage.jsx";
import FormSearchProduct from "./FormSearchProduct.jsx";
import spiner from "@imgs/icons/spiner.svg";

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.userAccount.accountData);
  const { status } = useSelector((state) => state.userAccount);
  const [headerOnSmallSizes, setHederOnSmallSizes] = useState(
    window.innerWidth <= 768,
  );

  const linksByHeader = [
    ...t("header.navigateLinks", RETURN_TRANSLATE_FUNC_TYPE),
  ].slice(0, -1);
  const supportLink = [
    ...t("header.navigateLinks", RETURN_TRANSLATE_FUNC_TYPE),
  ].at(-1);

  useEffect(() => {
    const handleResize = () => setHederOnSmallSizes(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  return (
    <>
      <header className="bg-(--third-primary-с) sticky top-0 w-full h-auto flex flex-col items-center justify-center z-50">
        {!headerOnSmallSizes ? (
          <div className="flex items-center justify-between w-[93%] max-w-375 py-3 h-18 lg:h-24 max-[860px]:gap-5">
            <button onClick={() => navigate("/")}>
              <img src={uvelioLogo} alt="Uvelio logo" className="w-36" />
            </button>

            <div className="flex items-center gap-4 justify-end w-4/5 h-[90%] lg:h-[70%]">
              <FormSearchProduct />

              <div className="flex items-center w-[17%] min-w-50 h-full gap-5 max-md:gap-2.5">
                <ChangeLang />
                {status == "loading" ? (
                  <img src={spiner} className="w-8" />
                ) : !isAuth ? (
                  <AuthButton />
                ) : (
                  <NavToUserPage />
                )}
              </div>
            </div>
          </div>
        ) : (
          <MenuBurger />
        )}

        <div className="flex items-center bg-(--color-primary) w-full h-11.25 font-normal overflow-x-scroll disableScrollbar max-xl:px-8">
          <div className="flex items-center justify-start w-[91.7%] max-w-340 h-[95%] m-auto max-xl:min-w-max">
            <nav className="flex items-center justify-between w-full max-w-325 h-full text-white gap-5 max-md:text-base">
              <div className="flex items-center justify-start gap-5 whitespace-nowrap">
                {linksByHeader.map((link, ind) => (
                  <Link
                    to={link.href}
                    key={ind}
                    className="flex items-center h-full leading-none hover:text-(--secondary-primary-c) 
                    text-[font-size: clamp(0.875rem,0.875rem+0.8vw,1.0625rem)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Link
                to={supportLink.href}
                className="text-(--second-primary-c)/50 flex items-center h-full leading-none hover:text-(--secondary-primary-c)
                text-[font-size: clamp(0.875rem,0.875rem+0.8vw,1.0625rem)]"
              >
                {supportLink.label}
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
