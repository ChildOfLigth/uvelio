import { useTranslation } from "react-i18next";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../../globalVariables";
import CustomInput from "@ui/Form/CustomInput";

export default function Login() {
  const { t } = useTranslation();

  const inputLoginForm = t(
    `form.login.inputPlaceholders`,
    RETURN_TRANSLATE_FUNC_TYPE,
  );


  return (
    <>
      <CustomInput
        placeholder={inputLoginForm.email}
        type="email"
        name="email"
      />

      <CustomInput
        placeholder={inputLoginForm.password}
        type="password"
        name="password"
      />
    </>
  );
}
