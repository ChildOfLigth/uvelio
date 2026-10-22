import { useTranslation } from "react-i18next";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../../globalVariables";
import CustomInput from "@ui/Form/CustomInput";

export default function Registration({ error, setError }) {
  const { t } = useTranslation();
  const inputRegistrationForm = t(
    `form.registration.inputPlaceholders`,
    RETURN_TRANSLATE_FUNC_TYPE,
  );

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
        onChange={(e) => {
          const val = e.target.value;
          if (val.length < 6) {
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
        }}
      />

      <CustomInput
        placeholder={inputRegistrationForm.passwordCheck}
        type="password"
        name="repeatPassword"
      />
    </>
  );
}
