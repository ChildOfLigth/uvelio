import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { SETTING_RETURN_VAL } from "../../../globalVariables";
import uvelioLogo from "@imgs/icons/uvelio.svg";
import HeaderOnSmallSizes from "./HeaderOnSmallSizes";
import ButtonForChangeLang from "../ButtonComponent/ButtonForChangeLang.jsx";
import AuthButton from "../ButtonComponent/AuthButton.jsx";

export default function Header() {
  const { t } = useTranslation();
  const [headerOnSmallSizes, setHederOnSmallSizes] = useState(
    window.innerWidth <= 750
  );
  const linksByHeader = [
    ...t("header.navigateLinks", SETTING_RETURN_VAL),
  ].slice(0, -1);
  const supportLink = [...t("header.navigateLinks", SETTING_RETURN_VAL)].at(-1);

  useEffect(() => {
    const handleResize = () => setHederOnSmallSizes(window.innerWidth <= 750);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  return (
    <>
      <header className="bg-(--third-primary-с) sticky top-0 w-full h-auto flex flex-col items-center justify-center z-50">
        {!headerOnSmallSizes ? (
          <div className="flex items-center justify-between w-[93%] py-3 h-24 max-[860px]:gap-5">
            <img src={uvelioLogo} alt="Uvelio logo" className="w-36" />

            <div className="flex items-center gap-4 justify-end w-4/5 h-[70%]">
              <form
                action="/uvelio/catalog:filter"
                className="flex items-center justify-between bg-white w-[78.8%] h-full rounded-(--border-radius) px-5"
              >
                <input
                  type="text"
                  placeholder={t("header.placeholderInput")}
                  className="w-[95%] py-3 text-base outline-none"
                  name="search_product"
                />

                <button className="w-5 aspect-square changeFillToPrimaryColor">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <path
                      d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z"
                      className="fill-gray-400 transition-colors duration-400"
                    />
                  </svg>
                </button>
              </form>

              <div className="flex items-center w-[17%] min-w-50 h-full gap-5 max-md:gap-2.5">
                <ButtonForChangeLang />
                <AuthButton />
              </div>
            </div>
          </div>
        ) : (
          <HeaderOnSmallSizes />
        )}

        <div className="flex items-center bg-(--color-primary) w-full h-11.25 text-[17px] font-normal overflow-x-scroll [scrollbar-width:none] max-xl:px-8">
          <div className="flex items-center justify-start w-[91.7%] max-w-340 h-[95%] m-auto max-xl:min-w-max">
            <nav className="flex items-center justify-between w-full h-full text-white text-[17px] gap-5 max-md:text-base">
              <div className="flex items-center justify-start gap-5 whitespace-nowrap">
                {linksByHeader.map((link, ind) => (
                  <Link
                    to={link.href}
                    key={ind}
                    className="flex items-center h-full leading-none"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Link
                to={supportLink.href}
                className="text-(--second-primary-с)/50 flex items-center h-full leading-none"
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
