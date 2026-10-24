import { useContext } from "react";
import { ModalWindContext } from "../context/ModalWindContext";
import { useNavigate } from "react-router-dom";

export default function ModalWindow({ title, text, btnText }) {
  const { visibleModalWindow, setVisibleModalWindow } =
    useContext(ModalWindContext);
  const navigate = useNavigate();

  return (
    <div
      className={`w-full h-full fixed top-0 left-0 ${visibleModalWindow === true ? "block" : "hidden"} z-100`}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-lg"></div>

      <div
        className="w-4/5 md:w-2/3 max-w-250 flex items-start justify-center bg-white 
    text-(--color-primary) absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
    rounded-(--base-b-radius) shadow-md shadow-(color:--color-primary) 
    p-[clamp(1.875rem,calc(1.339rem+2.679vw),3.75rem)] z-50"
      >
        <div className="w-[95%] flex flex-col items-center justify-center gap-7">
          <h2 className="font-bold">{title}</h2>
          <p className="w-full sm:w-3/4 font-medium text-base sm:text-lg">
            {text}
          </p>

          <button
            onClick={() => {
              setVisibleModalWindow(false);
              navigate("/");
            }}
            className="w-1/2 min-w-40 h-(--btn-h) rounded-(--base-b-radius) bg-(--color-primary) text-white 
          text-base md:text-lg"
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}
