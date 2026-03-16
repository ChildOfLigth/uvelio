import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import decorateRing from "@imgs/decorateRingForPresentBlock.webp";
import weddingRing from "@imgs/weddingRing.webp";
import classicRing from "@imgs/classicRing.webp";
import ringWithInlay from "@imgs/ringWithInlay.webp";
import ringWithoutInlay from "@imgs/ringWithoutInlay.webp";
import laboratoryEcoDimond from "@imgs/laboratoryEcoDimond.webp";
import exclusiveJewelry from "@imgs/exclusiveJewelry.webp";
import uvelioIconWhiteColor from "@imgs/icons/uvelioWhiteColor.svg";
import arrowIcoWhiteColor from "@imgs/icons/arrowIcoWhiteColor.svg";
import earrings from "@imgs/categoryEarrings.webp";
import chains from "@imgs/categoryChains.webp";
import bracelets from "@imgs/categoryBracelets.webp";
import necklaces from "@imgs/categoryNecklaces.webp";
import pendants from "@imgs/categoryPendants.webp";
import crosses from "@imgs/categoryCrosses.webp";
import brooches from "@imgs/categoryBrooches.webp";
import NavToCatalog from "@ui/NavToCatalog";
import SwiperCatalog from "../ui/Swiper/SwiperCatalog";

export default function Main() {
  const { t, i18n } = useTranslation();
  const newArrivalsProduct = useSelector(
    (state) => state.products.productsList,
  ).slice(0, 8);

  const cardsForFilterCategory = [
    { imgsSrc: earrings, title: t("mainPage.category.filterLinks.earrings") },
    { imgsSrc: chains, title: t("mainPage.category.filterLinks.chains") },
    { imgsSrc: bracelets, title: t("mainPage.category.filterLinks.bracelets") },
    { imgsSrc: necklaces, title: t("mainPage.category.filterLinks.necklaces") },
    { imgsSrc: pendants, title: t("mainPage.category.filterLinks.pendants") },
    { imgsSrc: crosses, title: t("mainPage.category.filterLinks.crosses") },
    { imgsSrc: brooches, title: t("mainPage.category.filterLinks.brooches") },
  ];

  return (
    <>
      <div
        className="flex items-center justify-center w-full bg-(--color-primary) overflow-hidden h-[60svh] md:h-[70svh] lg:h-[75svh] 
      max-h-190 relative"
      >
        <div className="block md:hidden w-full h-full absolute bg-(--color-primary)/40 z-20"></div>

        <div className="flex items-center justify-center relative w-[90%] z-30 md:justify-start">
          <div className="flex flex-col items-start justify-center gap-6 relative text-white w-full md:w-2/3 lg:w-1/2">
            <h1
              className={`inline text-white font-medium ${i18n.language == "ua" ? "h1FszLangUa" : ""}`}
            >
              {t("mainPage.presentBlock.title")}
            </h1>
            <p className="inline-block w-full text-2xl sm:w-2/3">
              {t("mainPage.presentBlock.subtitle")}
            </p>

            <Link
              to="/uvelio/catalog"
              className={`bg-(--second-primary-с) ${i18n.language == "ua" ? "xs:w-auto" : "w-2/5 min-w-30.5 xl:w-1/4"} 
            h-12.5 text-(--color-primary) text-(length:--text-sm) p-4.25 customButton`}
            >
              {t("mainPage.presentBlock.btnNavToCatalog")}
            </Link>
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

      <div className="w-[91.7%] max-w-420 flex flex-col items-center justify-center mx-auto">
        <section className="w-full flex items-center justify-center flex-col gap-[clamp(1.25rem,calc(0.714rem+2.679vw),3.125rem)] my-[clamp(3.125rem,calc(1.696rem+7.143vw),8.125rem)]">
          <nav className="w-full grid grid-cols-2 gap-3 xl:flex xl:justify-center x:gap-5 xl:h-116">
            <NavToCatalog
              filter="rings"
              styles="bg-white rounded-(--border-radius) pt-3 flex flex-col items-start justify-between gap-5 overflow-hidden
          col-span-1 xl:h-full xl:flex-[38%]"
            >
              <h3 className="text-(--color-primary) mx-auto">
                {t("mainPage.navToCatalogWithFilter.rings")}
              </h3>

              <img src={classicRing} alt="Ring" className="w-[80%] xl:w-full" />
            </NavToCatalog>

            <NavToCatalog
              filter="rings?type=wedding"
              styles="bg-white rounded-(--border-radius) pt-3 flex flex-col items-start justify-between gap-5 overflow-hidden
          col-span-1 xl:h-full xl:flex-[33%]"
            >
              <h3 className="text-(--color-primary) text-center mx-auto">
                {t("mainPage.navToCatalogWithFilter.wedRings")}
              </h3>

              <img
                src={weddingRing}
                alt="Wedding rings"
                className="w-auto h-[70%] sm:h-[75%]"
              />
            </NavToCatalog>

            <div className="flex flex-col items-center gap-3 xl:gap-5 col-span-2 xl:flex-[39%] md:flex-row xl:flex-col">
              <NavToCatalog
                filter="rings?insert=true"
                styles="bg-white w-full h-[48%] rounded-(--border-radius) flex items-center 
            justify-center pl-5 relative min-h-25 overflow-hidden min-[500px]:min-h-35 xl:pr-5 xl:pl-0 xl:justify-end"
              >
                <img
                  src={ringWithInlay}
                  alt="Ring with insert"
                  className="aspect-squere h-full absolute left-0 z-10"
                />

                <h3 className="text-(--color-primary) z-30">
                  {t("mainPage.navToCatalogWithFilter.withIsert")}
                </h3>
              </NavToCatalog>

              <NavToCatalog
                to="rings?insert=false"
                styles="bg-white w-full h-[48%] rounded-(--border-radius) flex items-center 
            justify-center pl-5 relative min-h-25 overflow-hidden min-[500px]:min-h-35 xl:pr-5 xl:pl-0 xl:justify-end"
              >
                <img
                  src={ringWithoutInlay}
                  alt="Ring without insert"
                  className="w-45% h-full absolute left-0 z-10"
                />

                <h3 className="text-(--color-primary) z-30">
                  {t("mainPage.navToCatalogWithFilter.withoutIsert")}
                </h3>
              </NavToCatalog>
            </div>
          </nav>

          <div className="flex items-center justify-between w-[16%] min-w-52.75">
            <NavToCatalog
              to="?material=gold"
              styles={`bg-(--color-primary) flex items-center justify-center gap-2.5 ${i18n.language == "ua" ? "w-auto" : "w-[45%]"} p-4 
              rounded-(--border-radius) text-white`}
            >
              {t("mainPage.filterCatalogByMaterial.gold")}
              <img src={arrowIcoWhiteColor} />
            </NavToCatalog>

            <NavToCatalog
              to="?material=silver"
              styles={`bg-(--color-primary) flex items-center justify-center gap-2.5 ${i18n.language == "ua" ? "w-auto" : "w-[45%]"} p-4 
              rounded-(--border-radius) text-white`}
            >
              {t("mainPage.filterCatalogByMaterial.silver")}
              <img src={arrowIcoWhiteColor} />
            </NavToCatalog>
          </div>
        </section>

        <section className="w-full max-w-420 flex flex-col items-start justify-center m-[clamp(30px,6vw,70px)]">
          <SwiperCatalog
            catalog={newArrivalsProduct}
            titleSwiper={t("mainPage.newArrivalsTitle")}
          />
        </section>

        <section className="w-full flex flex-col md:flex-row gap-[clamp(5px,3vw,27px)] items-stretch justify-between text-white">
          <div className="w-full md:w-[48.65%] flex justify-start items-center relative py-[clamp(30px,7vw,93.5px)] rounded-(--border-radius) overflow-hidden">
            <img
              src={laboratoryEcoDimond}
              className="w-full h-full object-cover absolute"
              alt="Jewelry with eco diamonds"
            />

            <div className="w-5/6 pl-5 relative flex flex-col items-start justify-center">
              <h3>{t("mainPage.advertisement.ecoDiamonds.title")}</h3>
              <p className="py-9 text-(length:--base-p-size)">
                {t("mainPage.advertisement.ecoDiamonds.subtitle")}
              </p>
              <button className="bg-(--second-primary-с) rounded-(--border-radius) p-4.25">
                {t("mainPage.advertisement.ecoDiamonds.textBtn")}
              </button>
            </div>
          </div>

          <div className="w-full md:w-[48.65%] flex justify-start items-center relative py-[clamp(30px,7vw,93.5px)] rounded-(--border-radius) overflow-hidden">
            <img
              src={exclusiveJewelry}
              className="w-full h-full object-cover absolute"
              alt="Exclusive jewerly"
            />

            <div className="w-5/6 pl-5 relative flex flex-col items-start justify-center">
              <div className="w-1/2">
                <img src={uvelioIconWhiteColor} className="w-full min-w-38" />
                <h3>{t("mainPage.advertisement.exlusive.title")}</h3>
              </div>

              <p className="py-9 text-(length:--base-p-size)">
                {t("mainPage.advertisement.exlusive.subtitle")}
              </p>
              <button className="bg-(--second-primary-с) rounded-(--border-radius) p-4.25">
                {t("mainPage.advertisement.exlusive.textBtn")}
              </button>
            </div>
          </div>
        </section>

        <section className="w-full my-[clamp(1.875rem,calc(-0.089rem+9.821vw),8.75rem)] flex flex-col items-start justify-center gap-6">
          <h2>{t("mainPage.category.title")}</h2>

          <ul className="w-full flex justify-start mx-2 md:grid md:grid-cols-4 2xl:grid-cols-5 items-stretch gap-3 md:gap-4 overflow-x-scroll disableScrollbar">
            {cardsForFilterCategory.map((item) => (
              <li key={item.title}>
                <NavToCatalog
                  filter={item.title}
                  styles="w-50 md:w-full max-w-[320px] md:col-span-1 h-auto max-h-100.25 rounded-(--border-radius) bg-white flex flex-col items-center justify-center overflow-hidden"
                >
                  <img
                    src={item.imgsSrc}
                    alt={item.title}
                    className="w-full h-[60%]"
                  />

                  <div className="w-full h-[40%] flex items-center justify-center bg-(--color-primary) py-[clamp(1.5625rem,calc(1.294rem+1.339vw),2.5rem)]">
                    <p className="text-white text-base font-normal lg:text-xl md:font-bold uppercase text-center">
                      {item.title}
                    </p>
                  </div>
                </NavToCatalog>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
