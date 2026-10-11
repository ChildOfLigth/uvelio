import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function AuthButton() {
  const { t } = useTranslation();

  return (
    <Link 
    to="/auth-form"
    className="bg-(--color-primary) w-[51%] h-full customButton">
      <span className="bg-(--second-primary-c)"></span>
      <p
        className="text-white -scale-z-200"
      >
        {t("header.userAvtorization.signIn")}
      </p>
    </Link>
  );
}
