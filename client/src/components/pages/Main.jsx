import decorateRing from "@imgs/decorateRingForPresentBlock.png";
import weddingRing from "@imgs/weddingRing.png";
import classicRing from "@imgs/classicRing.png";
import ringWithInlay from "@imgs/ringWithInlay.png";
import ringWithoutInlay from "@imgs/ringWithoutInlay.png";
import { useTranslation } from "react-i18next";

export default function Main() {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center justify-center w-full h-[75vh] max-h-190 bg-(--color-primary) overflow-hidden">
        <div className="flex items-center justify-start relative w-[90%] m-auto">
          <div className="flex flex-col items-start justify-center gap-6 relative w-[47%] text-white">
            <h1 className="inlinetext-white font-medium text-[90px]">
              {t("mainPage.presentBlock.title")}
            </h1>
            <p className="inline-block w-[60%] text-2xl">
              {t("mainPage.presentBlock.subtitle")}
            </p>

            <button className="bg-(--second-primary-с) w-1/4 h-12.5 text-(--color-primary) p-4.25 customButtons">
              <p>{t("mainPage.presentBlock.btnNavToCatalog")}</p>
            </button>
          </div>

          <img
            src={decorateRing}
            alt="Two rings for decorate"
            className="w-[80%] max-w-250 absolute left-[40%] rotate-[-16.26deg] drop-shadow-[3px_23px_140px_rgba(193,178,125,0.3)] drop-shadow-[12px_92px_140px_rgba(193,178,125,0.3)]"
          />
        </div>
      </div>

      <div className="w-[90%] flex flex-col items-center justify-center gap-11 my-40 mx-auto">
        <nav className="w-full grid grid-cols-10 gap-5">
          <div className="bg-white rounded-(--border-radius) pt-5 flex flex-col items-start justify-between col-span-3">
            <h3 className="text-(--color-primary) text-[48px] text-center mx-auto">
              {t("mainPage.navToCatalogWithFilter.rings")}
            </h3>
            <img
              src={classicRing}
              alt="Ring"
              className="w-[95%] aspect-squere"
            />
          </div>

          <div className="bg-white rounded-(--border-radius) pt-5 flex flex-col items-start justify-between col-span-3">
            <h3 className="text-(--color-primary) text-[48px] text-center mx-auto">
              {t("mainPage.navToCatalogWithFilter.wedRings")}
            </h3>
            <img
              src={weddingRing}
              alt="Wedding rings"
              className="w-[90%] aspect-squere"
            />
          </div>

          <div className="flex flex-col items-center gap-5 col-span-4">
            <div className="bg-white w-full rounded-(--border-radius) flex items-center justify-end pr-10 min-h-55.5 relative">
              <img
                src={ringWithInlay}
                alt="Ring with insert"
                className="w-45% aspect-squere absolute left-0"
              />
              <h3 className="text-(--color-primary) text-[48px]">
                {t("mainPage.navToCatalogWithFilter.withIsert")}
              </h3>
            </div>

            <div className="bg-white w-full rounded-(--border-radius) flex items-center justify-end pr-10 min-h-55.5 relative">
              <img
                src={ringWithoutInlay}
                alt="Ring without insert"
                className="w-45% aspect-squere absolute left-0 z-10"
              />
              <h3 className="text-(--color-primary) text-[48px] z-30">
                {t("mainPage.navToCatalogWithFilter.withoutIsert")}
              </h3>
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-between w-[15.7%] min-w-50.75 ">
          <button
            className="bg-(--color-primary) flex items-center  
                        justify-center gap-2.5 w-[45%] p-4 rounded-(--border-radius)"
          >
            <p className="text-base text-white">Gold</p>
            <svg
              width="7"
              height="13"
              viewBox="0 0 7 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.83814 5.89967C7.05396 6.11934 7.05396 6.47544 6.83814 6.69512L1.2039 12.43C0.988082 12.6496 0.638231 12.6496 0.422411 12.43L0.161865 12.1648C-0.053955 11.9451 -0.053955 11.589 0.161865 11.3693L5.14481 6.29739L0.161865 1.22544C-0.053955 1.00577 -0.053955 0.649666 0.161865 0.429991L0.422411 0.164791C0.638231 -0.054884 0.988082 -0.054884 1.2039 0.164791L6.83814 5.89967Z"
                fill="#ffffff"
              />
            </svg>
          </button>

          <button
            className="bg-(--color-primary) flex items-center 
                        justify-center gap-2.5 w-[45%] p-4 rounded-(--border-radius)"
          >
            <p className="text-base text-white">Silver</p>
            <svg
              width="7"
              height="13"
              viewBox="0 0 7 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.83814 5.89967C7.05396 6.11934 7.05396 6.47544 6.83814 6.69512L1.2039 12.43C0.988082 12.6496 0.638231 12.6496 0.422411 12.43L0.161865 12.1648C-0.053955 11.9451 -0.053955 11.589 0.161865 11.3693L5.14481 6.29739L0.161865 1.22544C-0.053955 1.00577 -0.053955 0.649666 0.161865 0.429991L0.422411 0.164791C0.638231 -0.054884 0.988082 -0.054884 1.2039 0.164791L6.83814 5.89967Z"
                fill="#ffffff"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
