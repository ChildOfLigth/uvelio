import { useTranslation } from "react-i18next";

export default function AuthButton() {
  const { t, i18n } = useTranslation();

  return (
    <button className={`bg-(--color-primary) w-[51%] ${i18n.language == "fr" && "min-w-30"} h-full customButtons`}>
      <span className="bg-(--second-primary-с)"></span>
      <p
        className="text-white -scale-z-200"
      >
        {t("header.userAvtorization.signIn")}
      </p>
    </button>
  );
}
