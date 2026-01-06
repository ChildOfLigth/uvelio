import { Outlet } from "react-router-dom";
import uvelioLogo from "@imgs/icons/uvelio.svg";
import HeaderOnSmallSizes from "./HeaderOnSmallSizes";

export default function Header() {
  const headerOnSmallSizes = window.innerWidth <= 650;

  return (
    <>
      <header className="bg-transparent w-full h-20 flex items-center gap-5 justify-center">
        {!headerOnSmallSizes ? (
          <div className="flex items-center justify-between w-[93%] h-[90%] max-[860px]:gap-5">
            <img src={uvelioLogo} alt="Uvelio logo" className="w-36 h-full" />

            <div className="flex items-center gap-4 justify-end w-4/5 h-[70%] min-h-10">
              <form
                action="/uvelio/catalog:filter"
                className="flex items-center justify-between bg-white w-[78.8%] h-full rounded-(--standart-border-radius) pl-5 pr-5"
              >
                <input
                  type="text"
                  placeholder="Enter the product name"
                  className="w-[95%] h-full text-base outline-none"
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

              <div className="flex items-center w-[17%] min-w-37.5 h-full gap-5 max-md:gap-2.5">
                

                <button className="bg-(--color-primary) w-[51%] h-full customButtons animationButton">
                  <span className="bg-(--color-secondary)"></span>
                  <p className="text-white text-lg z-20">Sign in</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <HeaderOnSmallSizes />
        )}
      </header>
      <Outlet />
    </>
  );
}
