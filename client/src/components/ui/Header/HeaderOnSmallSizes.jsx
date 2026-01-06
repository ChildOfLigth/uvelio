import { useState } from "react";
import uvelioLogo from "@imgs/icons/uvelio.svg";
import closeIcon from "@imgs/icons/close.svg";

export default function HeaderOnSmallSizes() {
  const [hidingSearchForm, setHidingSearchForm] = useState(true);

  return (
    <div className="flex items-center justify-between w-[93%] h-[70%]">
      {hidingSearchForm ? (
        <>
          <img src={uvelioLogo} alt="Uvelio icon" className="w-[18%] min-w-18.75 h-full" />

          <div className="w-1/2 min-w-50 h-[80%] flex items-center">
            <button
              className="w-7.5 h-full"
              onClick={() => setHidingSearchForm(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full changeFillToPrimaryColor"
              >
                <path
                  d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z"
                  className="transition-colors duration-400"
                  fill="#372924"
                />
              </svg>
            </button>

            <div className="flex items-center justify-end w-[88%] h-full max-md:gap-2.5">
              <button className="bg-white w-[39.8%] h-full gap-1.5 customButtons animationButton changeFillToWhite">
                <span className="bg-(--color-secondary)"></span>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 aspect-square z-100"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 8.5C-1.66332e-08 9.61624 0.219859 10.7215 0.647024 11.7528C1.07419 12.7841 1.70029 13.7211 2.48959 14.5104C3.27889 15.2997 4.21592 15.9258 5.24719 16.353C6.27846 16.7801 7.38376 17 8.5 17C9.61624 17 10.7215 16.7801 11.7528 16.353C12.7841 15.9258 13.7211 15.2997 14.5104 14.5104C15.2997 13.7211 15.9258 12.7841 16.353 11.7528C16.7801 10.7215 17 9.61624 17 8.5C17 6.24566 16.1045 4.08365 14.5104 2.48959C12.9163 0.895533 10.7543 0 8.5 0C6.24566 0 4.08365 0.895533 2.48959 2.48959C0.895533 4.08365 3.35923e-08 6.24566 0 8.5ZM16 8.5C16 10.4891 15.2098 12.3968 13.8033 13.8033C12.3968 15.2098 10.4891 16 8.5 16C6.51088 16 4.60322 15.2098 3.1967 13.8033C1.79018 12.3968 1 10.4891 1 8.5C1 6.51088 1.79018 4.60322 3.1967 3.1967C4.60322 1.79018 6.51088 1 8.5 1C10.4891 1 12.3968 1.79018 13.8033 3.1967C15.2098 4.60322 16 6.51088 16 8.5Z"
                    fill="#372924"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 8.5C5 12.896 6.442 16.5 8.5 16.5C10.558 16.5 12 12.896 12 8.5C12 4.104 10.558 0.5 8.5 0.5C6.442 0.5 5 4.104 5 8.5ZM11 8.5C11 12.389 9.755 15.5 8.5 15.5C7.245 15.5 6 12.389 6 8.5C6 4.611 7.245 1.5 8.5 1.5C9.755 1.5 11 4.611 11 8.5Z"
                    fill="#372924"
                  />
                  <path
                    d="M2.235 3.81231L2.905 3.07031C3.01167 3.16631 3.126 3.25998 3.248 3.35131C4.566 4.33931 6.646 4.94131 8.913 4.94131C10.846 4.94131 12.65 4.50431 13.968 3.75131C14.2716 3.57944 14.5586 3.37958 14.825 3.15431L15.475 3.91431C15.1763 4.16965 14.8397 4.40431 14.465 4.61831C12.988 5.46331 11.013 5.94131 8.913 5.94131C6.443 5.94131 4.151 5.27831 2.648 4.15131C2.50535 4.04418 2.36754 3.93173 2.235 3.81231ZM2.235 13.2003L2.905 13.9403C3.01167 13.8436 3.126 13.7503 3.248 13.6603C4.566 12.6723 6.646 12.0703 8.913 12.0703C10.846 12.0703 12.65 12.5063 13.968 13.2603C14.2893 13.445 14.575 13.6436 14.825 13.8563L15.475 13.0963C15.161 12.8307 14.8229 12.595 14.465 12.3923C12.988 11.5483 11.013 11.0703 8.913 11.0703C6.443 11.0703 4.151 11.7333 2.648 12.8593C2.50133 12.9693 2.36367 13.0836 2.235 13.2003ZM0.5 9.00031V8.00031H16.5V9.00031H0.5Z"
                    fill="#372924"
                  />
                </svg>

                <svg
                  width="7"
                  height="13"
                  viewBox="0 0 7 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 aspect-square rotate-90 z-100"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.83814 5.89967C7.05396 6.11934 7.05396 6.47544 6.83814 6.69512L1.2039 12.43C0.988082 12.6496 0.638231 12.6496 0.422411 12.43L0.161865 12.1648C-0.053955 11.9451 -0.053955 11.589 0.161865 11.3693L5.14481 6.29739L0.161865 1.22544C-0.053955 1.00577 -0.053955 0.649666 0.161865 0.429991L0.422411 0.164791C0.638231 -0.054884 0.988082 -0.054884 1.2039 0.164791L6.83814 5.89967Z"
                    fill="#342925"
                  />
                </svg>
              </button>

              <button className="bg-(--color-primary) w-[51%] h-full customButtons animationButton">
                <span className="bg-(--color-secondary)"></span>
                <p className="text-white text-lg z-20">Sign in</p>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center w-full gap-3">
          <form
            action="/uvelio/catalog:filter"
            className="flex items-center justify-between w-[94%] h-[70%] bg-white rounded-(--standart-border-radius) pt-3 pb-3 pl-4 pr-4"
          >
            <input
              type="text"
              placeholder="Enter the product name"
              className="w-[90%] h-full text-base outline-none"
              name="search-product"
            />

            <button className="w-5 aspect-square">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full changeFillToPrimaryColor"
              >
                <path
                  d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z"
                  className="fill-gray-400 transition-colors duration-400"
                />
              </svg>
            </button>
          </form>

          <button
            className="w-4 h-full"
            onClick={() => setHidingSearchForm(true)}
          >
            <img src={closeIcon} alt="Button for close form" />
          </button>
        </div>
      )}
    </div>
  );
}
