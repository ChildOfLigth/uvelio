import { useTranslation } from "react-i18next";
import { ALL_TRANSLATION_OPTIONS } from "../../../globalVariables";
import { useState } from "react";

export default function ButtonForChangeLang() {
  const { i18n } = useTranslation();
  const [dropdownMenuVisibility, setDropdownMenuVisibility] = useState(false);

  return (
    <div className="flex items-center justify-center relative w-[39.8%] h-full ">
      <button
        className="bg-white w-full h-full gap-1.5 customButtons animationButton changeFillToWhite relative"
        onClick={() => setDropdownMenuVisibility(!dropdownMenuVisibility)}
      >
        <span className={`bg-(--second-primary-с) ${dropdownMenuVisibility ? "left-0! w-full!" : ""}`}></span>
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 aspect-square z-100 ${dropdownMenuVisibility && "fill-white"}`}
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
          className={`w-3 aspect-square transition duration-300 ${
            dropdownMenuVisibility ? "rotate-270 fill-white" : "rotate-90"
          } z-100`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.83814 5.89967C7.05396 6.11934 7.05396 6.47544 6.83814 6.69512L1.2039 12.43C0.988082 12.6496 0.638231 12.6496 0.422411 12.43L0.161865 12.1648C-0.053955 11.9451 -0.053955 11.589 0.161865 11.3693L5.14481 6.29739L0.161865 1.22544C-0.053955 1.00577 -0.053955 0.649666 0.161865 0.429991L0.422411 0.164791C0.638231 -0.054884 0.988082 -0.054884 1.2039 0.164791L6.83814 5.89967Z"
            fill="#342925"
          />
        </svg>
      </button>

      <div
        className={`${
          dropdownMenuVisibility ? "flex" : "hidden"
        } items-center justify-center w-48 py-10 bg-white rounded-b-(--border-radius) absolute top-18.25`}
      >
        <ul className="w-[80%] h-full flex flex-col items-center justify-center m-auto gap-5">
          {ALL_TRANSLATION_OPTIONS.map((lang) => (
            <li
              key={lang.code}
              className="inline-block w-full after:w-full after:h-0.5 after:bg-(--color-primary)"
            >
              <button
                onClick={() => i18n.changeLanguage(lang.code)}
                className={`text-lg transition duration-300 hover:text-(--second-primary-с)`}
              >
                {lang.fullName}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
