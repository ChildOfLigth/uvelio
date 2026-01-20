import decorateRing from "@imgs/decorateRingForPresentBlock.png";
import weddingRing from "@imgs/weddingRing.png";
import classicRing from "@imgs/classicRing.png";
import ringWithInlay from "@imgs/ringWithInlay.png";
import ringWithoutInlay from "@imgs/ringWithoutInlay.png";
import laboratoryEcoDimond from "@imgs/laboratoryEcoDimond.png";
import exclusiveJewelry from "@imgs/exclusiveJewelry.png";
import { useTranslation } from "react-i18next";

export default function Main() {
  const { t } = useTranslation();

  return (
    <>
      <div
        className="flex items-center justify-center w-full bg-(--color-primary) overflow-hidden h-[60vh] md:h-[65vh] lg:h-[75vh] 
      max-h-190 min-h-175 relative"
      >
        <div className="block md:hidden w-full h-full absolute bg-(--color-primary)/40 z-20"></div>

        <div className="flex items-center justify-center relative w-[90%] z-30 md:justify-start">
          <div className="flex flex-col items-start justify-center gap-6 relative text-white w-full md:w-2/3 lg:w-1/2">
            <h1 className="inline text-white font-medium">
              {t("mainPage.presentBlock.title")}
            </h1>
            <p className="inline-block w-full text-2xl sm:w-2/3">
              {t("mainPage.presentBlock.subtitle")}
            </p>

            <button className="bg-(--second-primary-с) w-2/5 min-w-30.5 xl:w-1/4 h-12.5 text-(--color-primary) p-4.25 customButtons">
              <p>{t("mainPage.presentBlock.btnNavToCatalog")}</p>
            </button>
          </div>
        </div>

        <img
          src={decorateRing}
          alt="Two rings for decorate"
          className="w-full max-w-280 min-w-205 absolute -left-10 min-[380px]:left-10 rotate-0 z-10
             lg:w-[80%] sm:left-[40%] sm:rotate-[-16.26deg]
             drop-shadow-[3px_23px_140px_rgba(193,178,125,0.3)]
            "
        />
      </div>

      <div className="w-[90%] flex flex-col items-center justify-center mx-auto">
        <div className="w-full flex items-center justify-center flex-col gap-11 my-[clamp(50px,10vw,150px)] max-h-173.75">
          <nav className="w-full grid grid-cols-2 gap-3 md:grid-cols-4 xl:h-116">
            <div
              className="bg-white rounded-(--border-radius) pt-3 flex flex-col items-start justify-between overflow-hidden
          col-span-1 md:h-75 md:grid-cols-1"
            >
              <h2 className="text-(--color-primary) mx-auto">
                {t("mainPage.navToCatalogWithFilter.rings")}
              </h2>
              <img
                src={classicRing}
                alt="Ring"
                className="w-auto h-[60%] sm:h-[75%]"
              />
            </div>

            <div
              className="bg-white rounded-(--border-radius) pt-3 flex flex-col items-start justify-between overflow-hidden
          col-span-1 md:h-75 md:grid-cols-1"
            >
              <h2 className="text-(--color-primary) text-center mx-auto">
                {t("mainPage.navToCatalogWithFilter.wedRings")}
              </h2>
              <img
                src={weddingRing}
                alt="Wedding rings"
                className="w-auto h-[70%] sm:h-[75%]"
              />
            </div>

            <div className="flex flex-col items-center gap-3 col-span-2 md:flex-col">
              <div
                className="bg-white w-full h-[48%] rounded-(--border-radius) flex items-center 
            justify-center pl-5 relative min-h-25 min-[500px]:min-h-35 lg:pr-5 lg:pl-0 lg:justify-end"
              >
                <img
                  src={ringWithInlay}
                  alt="Ring with insert"
                  className="aspect-squere h-full absolute left-0 z-10"
                />
                <h2 className="text-(--color-primary) z-30">
                  {t("mainPage.navToCatalogWithFilter.withIsert")}
                </h2>
              </div>

              <div
                className="bg-white w-full h-[48%] rounded-(--border-radius) flex items-center 
            justify-center pl-5 relative min-h-25 min-[500px]:min-h-35 lg:pr-5 lg:pl-0 lg:justify-end"
              >
                <img
                  src={ringWithoutInlay}
                  alt="Ring without insert"
                  className="w-45% h-full absolute left-0 z-10"
                />
                <h2 className="text-(--color-primary) z-30">
                  {t("mainPage.navToCatalogWithFilter.withoutIsert")}
                </h2>
              </div>
            </div>
          </nav>

          <div className="flex items-center justify-between w-[16%] min-w-52.75">
            <button className="bg-(--color-primary) flex items-center justify-center gap-2.5 w-[45%] p-4 rounded-(--border-radius)">
              <p className="text-white flex items-center leading-normal">
                Gold
              </p>
              <svg
                width="7"
                height="13"
                viewBox="0 0 7 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[80%]"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.83814 5.89967C7.05396 6.11934 7.05396 6.47544 6.83814 6.69512L1.2039 12.43C0.988082 12.6496 0.638231 12.6496 0.422411 12.43L0.161865 12.1648C-0.053955 11.9451 -0.053955 11.589 0.161865 11.3693L5.14481 6.29739L0.161865 1.22544C-0.053955 1.00577 -0.053955 0.649666 0.161865 0.429991L0.422411 0.164791C0.638231 -0.054884 0.988082 -0.054884 1.2039 0.164791L6.83814 5.89967Z"
                  fill="#ffffff"
                />
              </svg>
            </button>

            <button className="bg-(--color-primary) flex items-center justify-center gap-2.5 w-[45%] p-4 rounded-(--border-radius)">
              <p className="text-white flex items-center leading-normal">
                Silver
              </p>
              <svg
                width="7"
                height="13"
                viewBox="0 0 7 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-[80%]"
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

        <div className="w-full h-auto flex-row items-center justify-center text-white">
          <section className="bg-[url(@imgs/exclusiveJewelry.png)] w-[48%] flex justify-start items-center py-[clamp(30px,7vw,100px)] pl-6 rounded-(--border-radius)">
            <div className="w-2/3">
              <h2>{t("mainPage.advertisement.ecoDiamonds.title")}</h2>
              <p className="py-9">
                {t("mainPage.advertisement.ecoDiamonds.subtitle")}
              </p>
              <button className="bg-(--second-primary-с) rounded-(--border-radius) p-4.25">
                {t("mainPage.advertisement.ecoDiamonds.textBtn")}
              </button>
            </div>
          </section>

          <section className="bg-[url(@imgs/laboratoryEcoDimond.png)] w-[48%] flex justify-start items-center pl-6 rounded-(--border-radius)">
            <div className="w-2/3">
              <h2>{t("mainPage.advertisement.exlusive.title")}</h2>
              <p className="py-9">
                {t("mainPage.advertisement.exlusive.subtitle")}
              </p>
              <button className="bg-(--second-primary-с) rounded-(--border-radius) p-4.25">
                {t("mainPage.advertisement.exlusive.textBtn")}
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
