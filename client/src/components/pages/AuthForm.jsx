import CustomInput from "@ui/Form/CustomInput";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../globalVariables";
import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { registrationUser, loginUser } from "@redux/userAccount/accountThunk";
import { ModalWindContext } from "../context/ModalWindContext";
import ModalWindow from "@ui/ModalWindow.jsx";

export default function AuthForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [typeAuth, setAuthType] = useState("login");
  const [errorMessage, setErrorMessage] = useState(null);

  const [_, setSearchParams] = useSearchParams();

  const { visibleModalWindow, setVisibleModalWindow } =
    useContext(ModalWindContext);

  const inputRegistrationForm = t(
    `form.${typeAuth}.inputPlaceholders`,
    RETURN_TRANSLATE_FUNC_TYPE,
  );

  const modalWindowTextContent = t(
    "modalWindow.forRegistartion",
    RETURN_TRANSLATE_FUNC_TYPE,
  );

  useEffect(() => {
    setSearchParams(`auth_method=${typeAuth}`);
  }, [typeAuth, setSearchParams]);

  const handleSubmitAuthForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData);

    setErrorMessage(null);

    if (typeAuth === "registration") {
      if (userData.password.length < 6) {
        setErrorMessage("form.errorMessages.standartErrors.shortPassword");
        return;
      }

      if (userData.repeatPassword !== userData.password) {
        setErrorMessage("form.errorMessages.standartErrors.passwordsDontMatch");
        return;
      }

      try {
        const user = await dispatch(registrationUser(userData)).unwrap();

        localStorage.setItem("user", JSON.stringify(user));

        setVisibleModalWindow(true);
      } catch (err) {
        if (err?.status === 409) {
          setErrorMessage("form.errorMessages.registrationErrors.userExists");
        } else {
          setErrorMessage("form.errorMessages.standartErrors.serverError");
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
          setErrorMessage("form.errorMessages.loginErrors.userDoesNotExist");
        } else {
          setErrorMessage("form.errorMessages.standartErrors.serverError");
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
          onSubmit={handleSubmitAuthForm}
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
                      setErrorMessage(null);
                      setVisibleModalWindow(false);
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
              <>
                <CustomInput
                  placeholder={inputRegistrationForm.name}
                  name="name"
                />

                <CustomInput
                  placeholder={inputRegistrationForm.surname}
                  name="surname"
                />

                <CustomInput
                  placeholder={inputRegistrationForm.email}
                  type="email"
                  name="email"
                />

                <CustomInput
                  placeholder={inputRegistrationForm.password}
                  type="password"
                  name="password"
                />

                <CustomInput
                  placeholder={inputRegistrationForm.passwordCheck}
                  type="password"
                  name="repeatPassword"
                />
              </>
            ) : (
              <>
                <CustomInput
                  placeholder={inputRegistrationForm.email}
                  type="email"
                  name="email"
                />

                <CustomInput
                  placeholder={inputRegistrationForm.password}
                  type="password"
                  name="password"
                />
              </>
            )}
          </div>

          {errorMessage !== null && (
            <p className="text-(length:--text-sm) 2xl:text-2xl text-red-700 font-medium">
              {t(errorMessage)}
            </p>
          )}

          <button
            type="submit"
            className="
              w-5/6 h-(--btn-h) mx-auto
              bg-(--color-primary)
              rounded-(--base-b-radius)
              text-white
              text-(length:--text-sm)
            "
          >
            {t(`form.${typeAuth}.endButton`)}
          </button>
        </form>

        {visibleModalWindow && (
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
