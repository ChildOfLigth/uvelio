import { useTranslation } from "react-i18next";
import notFoundIcon from "@imgs/icons/404-error.svg";
import { Link } from "react-router-dom";

export function NotFound() {
  const { t } = useTranslation();
  return (
    <div
      className="w-5/6 md:w-3/4 max-w-275 flex flex-col-reverse gap-5 md:gap-0 md:flex-row items-center justify-between mx-auto 
    py-[clamp(3.125rem,calc(2.232rem+4.464vw),6.25rem)]"
    >
      <div className="w-5/6 md:w-2/3 flex flex-col justify-center items-start text-(--color-primary) mx-auto">
        <h1 className="font-extrabold">404</h1>
        <h3 className="block w-full md:w-3/5">{t("notFoundPage.desc")}</h3>
        <Link 
        to="/"
        className="w-5/6 md:w-1/2 h-(--btn-h) flex items-center justify-center bg-(--color-primary) rounded-(--base-b-radius) text-(length:--text-sm) 
        text-(--second-primary-c) hover:text-(--color-primary) hover:bg-(--second-primary-c) transition duration-500 mt-7 py-0 md:py-5">
          {t("notFoundPage.navToMainPage")}
        </Link>
      </div>

      <img src={notFoundIcon} className="w-1/3 aspect-square min-w-50" />
    </div>
  );
}
