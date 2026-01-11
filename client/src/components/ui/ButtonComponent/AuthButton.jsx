import { useTranslation } from "react-i18next";

export default function AuthButton() {
  const { t, i18n } = useTranslation();
  console.log(i18n.language);

  return (
    <button className="bg-(--color-primary) w-[51%] h-full customButtons animationButton">
      <span className="bg-(--second-primary-с)"></span>
      <p
        className={`text-white ${
          i18n.language != "fr" ? "text-lg" : "text-sm min-w-[92.70px] max-sm:text-xs"
        } -scale-z-200`}
      >
        {t("header.userAvtorization.signIn")}
      </p>
    </button>
  );
}
