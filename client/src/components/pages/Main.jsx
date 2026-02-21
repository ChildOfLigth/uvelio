import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import decorateRing from "@imgs/decorateRingForPresentBlock.png";
import weddingRing from "@imgs/weddingRing.webp";
import classicRing from "@imgs/classicRing.webp";
import ringWithInlay from "@imgs/ringWithInlay.webp";
import ringWithoutInlay from "@imgs/ringWithoutInlay.webp";
import laboratoryEcoDimond from "@imgs/laboratoryEcoDimond.png";
import exclusiveJewelry from "@imgs/exclusiveJewelry.png";
import uvelioIconWhiteColor from "@imgs/icons/uvelioWhiteColor.svg";
import arrowIcoWhiteColor from "@imgs/icons/arrowIcoWhiteColor.svg";
import NavToCatalog from "@ui/NavToCatalog";
import ProductCard from "@ui/ProductCard.jsx";
import { getProducts } from "@redux/products/productsThunk";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import SwiperNextBtn from "../ui/Swiper/SwiperNextBtn";
import SwiperPrevBtn from "../ui/Swiper/SwiperPrevBth";

export default function Main() {
  const { t, i18n } = useTranslation();
  const products = useSelector((state) => state.products.productsList).slice(
    0,
    8,
  );
  const dispatch = useDispatch();
  const swiperRef = useRef(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div
        className="flex items-center justify-center w-full bg-(--color-primary) overflow-hidden h-[60svh] md:h-[70svh] lg:h-[75svh] 
      max-h-190  relative"
      >
        <div className="block md:hidden w-full h-full absolute bg-(--color-primary)/40 z-20"></div>

        <div className="flex items-center justify-center relative w-[90%] z-30 md:justify-start">
          <div
            className={`flex flex-col items-start justify-center gap-6 relative text-white w-full md:w-2/3 
            ${i18n.language == "fr" ? "w-2/3" : "lg:w-1/2"}`}
          >
            <h1
              className={`inline text-white font-medium ${i18n.language == "ua" ? "h1FszLangUa" : ""}`}
            >
              {t("mainPage.presentBlock.title")}
            </h1>

            <p className="inline-block w-full text-(length:--base-p-size) sm:w-2/3">
              {t("mainPage.presentBlock.subtitle")}
            </p>

            <button
              className={`bg-(--second-primary-с) ${i18n.language == "ua" || i18n.language == "fr" ? "xs:w-auto" : "w-2/5 min-w-30.5 xl:w-1/4"} 
            h-12.5 text-(--color-primary) text-(length:--text-sm) p-4.25 customButtons`}
            >
              {t("mainPage.presentBlock.btnNavToCatalog")}
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

      <div className="w-[93.2%] flex flex-col items-center justify-center mx-auto">
        <section className="w-full max-w-388.75 flex items-center justify-center flex-col gap-[clamp(10px,6vw,45px)] my-[clamp(50px,10vw,150px)]">
          <nav className="w-full grid grid-cols-2 gap-3 xl:flex xl:justify-center x:gap-5 xl:h-116">
            <NavToCatalog
              to="/uvelio/catalog?category=rings"
              styles="bg-white rounded-(--border-radius) pt-3 flex flex-col items-start justify-between gap-5 overflow-hidden
          col-span-1 xl:h-full xl:flex-[38%]"
            >
              <h2 className="text-(--color-primary) mx-auto">
                {t("mainPage.navToCatalogWithFilter.rings")}
              </h2>

              <img src={classicRing} alt="Ring" className="w-[80%] xl:w-full" />
            </NavToCatalog>

            <NavToCatalog
              to="/uvelio/catalog?category=rings&type=wedding"
              styles="bg-white rounded-(--border-radius) pt-3 flex flex-col items-start justify-between gap-5 overflow-hidden
          col-span-1 xl:h-full xl:flex-[33%]"
            >
              <h2 className="text-(--color-primary) text-center mx-auto">
                {t("mainPage.navToCatalogWithFilter.wedRings")}
              </h2>

              <img
                src={weddingRing}
                alt="Wedding rings"
                className="w-[70%] xl:w-[90%]"
              />
            </NavToCatalog>

            <div className="flex flex-col items-center gap-3 col-span-2 xl:flex-[39%] md:flex-row xl:flex-col">
              <NavToCatalog
                to="/uvelio/catalog?category=rings&insert=true"
                styles="bg-white w-full h-[48%] rounded-(--border-radius) flex items-center 
            justify-center pl-5 relative min-h-25 overflow-hidden min-[500px]:min-h-35 xl:pr-5 xl:pl-0 xl:justify-end"
              >
                <img
                  src={ringWithInlay}
                  alt="Ring with insert"
                  className="aspect-squere h-full absolute left-0 z-10"
                />

                <h2 className="text-(--color-primary) z-30">
                  {t("mainPage.navToCatalogWithFilter.withIsert")}
                </h2>
              </NavToCatalog>

              <NavToCatalog
                to="/uvelio/catalog?category=rings&insert=false"
                styles="bg-white w-full h-[48%] rounded-(--border-radius) flex items-center 
            justify-center pl-5 relative min-h-25 overflow-hidden min-[500px]:min-h-35 xl:pr-5 xl:pl-0 xl:justify-end"
              >
                <img
                  src={ringWithoutInlay}
                  alt="Ring without insert"
                  className="w-45% h-full absolute left-0 z-10"
                />

                <h2 className="text-(--color-primary) z-30">
                  {t("mainPage.navToCatalogWithFilter.withoutIsert")}
                </h2>
              </NavToCatalog>
            </div>
          </nav>

          <div className="flex items-center justify-between w-[16%] min-w-52.75">
            <NavToCatalog
              to="/uvelio/catalog?material=gold"
              styles="bg-(--color-primary) flex items-center justify-center gap-2.5 w-[45%] p-4 rounded-(--border-radius) text-white"
            >
              Gold
              <img src={arrowIcoWhiteColor} />
            </NavToCatalog>

            <NavToCatalog
              to="/uvelio/catalog?material=silver"
              styles="bg-(--color-primary) flex items-center justify-center gap-2.5 w-[45%] p-4 rounded-(--border-radius) text-white"
            >
              Silver
              <img src={arrowIcoWhiteColor} />
            </NavToCatalog>
          </div>
        </section>

        <section className="w-full flex flex-col items-start justify-center m-[clamp(30px,6vw,70px)]">
          <h2>{t("mainPage.newArrivalsTitle")}</h2>

          <div className="w-auto flex items-center justify-end ml-auto mb-4 gap-4">
            <SwiperPrevBtn ref={swiperRef} />
            <SwiperNextBtn ref={swiperRef} />
          </div>

          <Swiper
            tag="ul"
            className="w-full grid items-stretch"
            slidesPerView={5}
            spaceBetween={20}
            modules={[Grid]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} tag="li">
                <ProductCard
                  imgSrc={JSON.parse(product.imgsLinks)[0]}
                  name={product.name}
                  price={product.price}
                  sale={product.salePrice}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="w-full max-w-420 flex flex-col md:flex-row gap-[clamp(5px,3vw,30px)] items-stretch justify-center text-white">
          <div className="w-full md:w-[48%] flex justify-start items-center relative py-[clamp(30px,7vw,93.5px)] rounded-(--border-radius) overflow-hidden">
            <img
              src={laboratoryEcoDimond}
              className="w-full h-full object-cover absolute"
              alt="Jewelry with eco diamonds"
            />

            <div className="w-5/6 pl-6 relative flex flex-col items-start justify-center">
              <h2>{t("mainPage.advertisement.ecoDiamonds.title")}</h2>
              <p className="py-9 text-(length:--base-p-size)">
                {t("mainPage.advertisement.ecoDiamonds.subtitle")}
              </p>

              <NavToCatalog
                to="/uvelio/catalog?material=eco-diamonds"
                styles="w-28 bg-(--second-primary-с) rounded-(--border-radius) text-(length:--text-sm) font-medium py-3 px-4.25 md:py-4.25
              flex items-center gap-2"
              >
                {t("mainPage.advertisement.ecoDiamonds.textBtn")}
                <img src={arrowIcoWhiteColor} className="" />
              </NavToCatalog>
            </div>
          </div>

          <div className="w-full md:w-[48%] flex justify-start items-center relative py-[clamp(30px,7vw,93.5px)] rounded-(--border-radius) overflow-hidden">
            <img
              src={exclusiveJewelry}
              className="w-full h-full object-cover absolute"
              alt="Exclusive jewerly"
            />

            <div className="w-5/6 pl-6 relative flex flex-col items-start justify-center">
              <div className="w-1/2">
                <img src={uvelioIconWhiteColor} className="w-full min-w-38" />
                <h2>{t("mainPage.advertisement.exlusive.title")}</h2>
              </div>

              <p className="py-9 text-(length:--base-p-size)">
                {t("mainPage.advertisement.exlusive.subtitle")}
              </p>

              <NavToCatalog
                to="/uvelio/catalog?collection=exclusive"
                styles="w-28 bg-(--second-primary-с) rounded-(--border-radius) text-(length:--text-sm) font-medium py-3 px-4.25 md:py-4.25
              flex items-center gap-2"
              >
                {t("mainPage.advertisement.exlusive.textBtn")}
                <img src={arrowIcoWhiteColor} />
              </NavToCatalog>
            </div>
          </div>
        </section>

        <section className="w-full flex flex-col items-start justify-center overflow-x-scroll [scrollbar-width:none] gap-[clamp(15px,5vw,40px)]">
          <h2>{t("mainPage.category.title")}</h2>

          {/* <nav className="w-full flex items-stretch justify-start gap-[clamp(7px,4vw,17.3px)] overflow-x-scroll [scrollbar-width:none]">
            {CATEGORY_CARDS_DATA.map((link, ind) => (
              <div
                key={ind}
                className="flex flex-col items-center justify-center bg-white rounded-(--border-radius) overflow-x-scroll"
              >
                <img
                  src={link.srcImg}
                  alt={t(`${link.text}`)}
                  className="w-full aspect-square object-contein"
                />

                <NavToCatalog
                  filter={link.filter}
                  style="w-full bg-(--color-primary) flex items-center justify-center text-white py-10"
                >
                  {t(`${link.text}`)}
                </NavToCatalog>
              </div>
            ))}
          </nav> */}
        </section>
      </div>
    </>
  );
}
