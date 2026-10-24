import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../../globalVariables";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { registrationUser, loginUser } from "@redux/userAccount/accountThunk";
import { ModalWindContext } from "../../context/ModalWindContext";
import ModalWindow from "@ui/ModalWindow.jsx";
import Registration from "./Registration";
import Login from "./Login";
import spiner from "@imgs/icons/spiner.svg";

const OBJ_ERROR = {
  message: null,
  isPresent: false,
};

export default function AuthForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [typeAuth, setAuthType] = useState("login");
  const { status } = useSelector((state) => state.userAccount);
  const [error, setError] = useState(OBJ_ERROR);

  const [_, setSearchParams] = useSearchParams();

  const { visibleModalWindow, setVisibleModalWindow } =
    useContext(ModalWindContext);

  const modalWindowTextContent = t(
    "modalWindow.forRegistartion",
    RETURN_TRANSLATE_FUNC_TYPE,
  );

  useEffect(() => {
    setSearchParams(`auth_method=${typeAuth}`);
  }, [typeAuth, setSearchParams]);

  useEffect(() => {}, []);

  const handleSubmitAuthForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);

    setError(OBJ_ERROR);

    if (typeAuth === "registration") {
      try {
        const user = await dispatch(registrationUser(userData)).unwrap();

        localStorage.setItem("user", JSON.stringify(user));

        setVisibleModalWindow(true);
      } catch (err) {
        if (err?.status === 409) {
          setError({
            message: "form.error.messages.registrationErrors.userExists",
            isPresent: true,
          });
        } else {
          setError({
            message: "form.error.messages.standartErrors.serverError",
            isPresent: true,
          });
        }

        return;
      }
    }

    if (typeAuth === "login") {
      try {
        const user = await dispatch(loginUser(userData)).unwrap();

        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        if (err?.status === 401) {
          setError({
            message: "form.errorMessages.loginErrors.userDoesNotExist",
            isPresent: true,
          });
        } else {
          setError({
            message: "form.errorMessages.standartErrors.serverError",
            isPresent: true,
          });
        }

        return;
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{typeAuth.slice(0, 1).toUpperCase() + typeAuth.slice(1)}</title>
      </Helmet>

      <div
        className="
          w-5/6 lg:w-1/2 flex flex-col items-center justify-center
          gap-[clamp(1.5625rem,calc(1.116rem+2.232vw),3.125rem)]
          relative mx-auto
          py-[clamp(3.125rem,calc(2.411rem+3.571vw),5.625rem)]
        "
      >
        <div
          className="
            w-full flex flex-col items-center justify-center
            gap-12 relative
          "
        >
          <h2 className="leading-0">
            {t(`form.${typeAuth}.presentPart.title`)}
          </h2>

          <p className="w-full md:w-3/4 text-(--base-p-size) font-medium xl:text-2xl">
            {t(`form.${typeAuth}.presentPart.subtitle`)}
          </p>
        </div>

        <form
          name={`${typeAuth}Form`}
          onSubmit={(e) => handleSubmitAuthForm(e)}
          className="
            w-full sm:w-2/3
            flex flex-col items-center justify-center
            gap-7
          "
        >
          {(() => {
            const currentAuthType =
              typeAuth === "registration" ? "login" : "registration";

            return (
              <div className="w-full">
                <p className="text-(--color-primary) xl:text-lg">
                  {t(`form.${currentAuthType}Prompt.baseText`)}{" "}
                  <button
                    type="button"
                    className="text-(--second-primary-c)"
                    onClick={() => {
                      setAuthType(currentAuthType);
                      setVisibleModalWindow(false);
                      setError(OBJ_ERROR);
                    }}
                  >
                    {t(`form.${currentAuthType}Prompt.selectRegistr`)}
                  </button>
                </p>
              </div>
            );
          })()}

          <div className="w-full flex flex-col items-center gap-3">
            {typeAuth === "registration" ? (
              <Registration error={error} setError={setError} />
            ) : (
              <Login />
            )}
          </div>

          {error.message !== null && (
            <p className="text-(length:--text-sm) text-center 2xl:text-(20px) text-red-700 font-medium">
              {t(error.message)}
            </p>
          )}

          <button
            type="submit"
            disabled={error.isPresent}
            className={`w-5/6 h-(--btn-h) mx-auto  ${
              error.isPresent == true
                ? "bg-(--color-primary)"
                : "bg-(--second-primary-c)"
            } rounded-(--base-b-radius) text-white text-(length:--text-sm)`}
          >
            {t(`form.${typeAuth}.endButton`)}
          </button>git 
        </form>

        {visibleModalWindow && !error.isPresent && (
          <ModalWindow
            title={modalWindowTextContent.title}
            text={modalWindowTextContent.text}
            btnText={modalWindowTextContent.btnText}
          />
        )}
      </div>
    </>
  );
}
