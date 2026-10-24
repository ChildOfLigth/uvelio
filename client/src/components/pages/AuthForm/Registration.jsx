import { useTranslation } from "react-i18next";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../../globalVariables";
import CustomInput from "@ui/Form/CustomInput";
import { useEffect, useState } from "react";

export default function Registration({ error, setError }) {
  const { t } = useTranslation();
  const inputRegistrationForm = t(
    `form.registration.inputPlaceholders`,
    RETURN_TRANSLATE_FUNC_TYPE,
  );

  const [passwordVal, setPasswordVal] = useState(null);
  const [repeatPasswordVal, setRepeatPasswordVal] = useState(null);

  useEffect(() => {
    if (passwordVal !== null && passwordVal.length < 6) {
      setError({
        message: "form.errorMessages.standartErrors.shortPassword",
        isPresent: true,
      });
    } else {
      setError({
        message: null,
        isPresent: false,
      });
    }
  }, [passwordVal]);

  useEffect(() => {
    if (passwordVal !== repeatPasswordVal) {
      setError({
        message: "form.errorMessages.standartErrors.passwordsDontMatch",
        isPresent: true,
      });
    } else {
      setError({
        message: null,
        isPresent: false,
      });
    }
  }, [repeatPasswordVal]);

  return (
    <>
      <CustomInput placeholder={inputRegistrationForm.name} name="name" />

      <CustomInput placeholder={inputRegistrationForm.surname} name="surname" />

      <CustomInput
        placeholder={inputRegistrationForm.email}
        type="email"
        name="email"
      />

      <CustomInput
        placeholder={inputRegistrationForm.password}
        type="password"
        name="password"
        customStyle={`${error.isPresent === true ? "error" : ""}`}
        onChange={(e) => setPasswordVal(e.target.value)}
      />

      <CustomInput
        placeholder={inputRegistrationForm.passwordCheck}
        type="password"
        name="repeatPassword"
        customStyle={`${error.isPresent === true ? "error" : ""}`}
        onChange={(e) => setRepeatPasswordVal(e.target.value)}
      />
    </>
  );
}
