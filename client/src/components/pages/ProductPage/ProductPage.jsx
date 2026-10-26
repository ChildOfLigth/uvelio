import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useConvertionPrice from "@hooks/useConvertionPrice";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../../globalVariables";
import addReview from "@imgs/icons/productPage/addReview.svg";
import share from "@imgs/icons/productPage/share.svg";
import favoriteIconPrimaryC from "@imgs/icons/favoritePrimaryC.svg";
import favoriteIconFillPrimaryC from "@imgs/icons/favoriteFillPrimaryC.svg";
import ratingStar from "@imgs/icons/productPage/ratingStar.svg";
import available from "@imgs/icons/productPage/available.svg";
import unavailable from "@imgs/icons/productPage/unavailable.svg";
import materialIcon from "@imgs/icons/productPage/material.svg";
import inlayIcon from "@imgs/icons/productPage/inlay.svg";
import colorMaterial from "@imgs/icons/productPage/colorMaterial.svg";
import weightIcon from "@imgs/icons/productPage/weight.svg";
import SwiperCatalog from "@ui/Swiper/SwiperCatalog";
import BtnAddToWishList from "@ui/ButtonComponent/BtnAddProdToWishList.jsx";
import emptyRatingStar from "@imgs/icons/productPage/ratingStarEmptyFill.svg";
import ReviewBlock from "./ReviewBlock";

export default function ProductPage() {
  const { t, i18n } = useTranslation();
  const productData = JSON.parse(localStorage.getItem("dataCurrentProduct"));

  const { productsList, selectedProductsCategory } = useSelector(
    (state) => state.products
  );
  const { isAuth } = useSelector((state) => state.userAccount.accountData);
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);
  const [indexActivePhoto, setIndexActivePhoto] = useState(0);
  const [addedProdToWishList, setAddedProdToWishList] = useState(false);
  const [assesment, setAssesment] = useState(0);
  const [reviewsForProduct, setReviewsForProduct] = useState([]);

  const multiLanuageName = JSON.parse(productData.name)[i18n.language];
  const imgsProduct = JSON.parse(productData.imgsLinks);
  const additionsData = JSON.parse(productData.additions);
  const productWeight = String(productData.weight).slice(0, 3);

  useEffect(() => {
    if (additionsData?.size != undefined) setSelectedSize(additionsData.size);
  }, []);

  const calculateScoreWidth = () => {
    const allRetings = reviewsForProduct.map((items) => items.rating);
    let sumaryReviews = allRetings.reduce((a, b) => a + b, 0);
    const finalGrade = sumaryReviews / allRetings.length;

    const overallRating = (finalGrade / 5) * 100;
    return overallRating;
  };

  const basicExtendedData = t(
    "productPage.characteristicsBlock.extendedData.basicData",
    RETURN_TRANSLATE_FUNC_TYPE,
  );
  const extendDataForSpecificCategory = t(
    `productPage.characteristicsBlock.extendedData.${selectedProductsCategory}`,
    RETURN_TRANSLATE_FUNC_TYPE,
  );

  const returnDataExtendedDataList = (reqData, data) => {
    const returnVals = [];

    for (let [key, value] of Object.entries(data)) {
      if (reqData == "title") {
        if (typeof value === "string") returnVals.push(value);
        if (typeof value === "object") returnVals.push(value.title);
      } else if (reqData == "value") {
        if (typeof value === "string") returnVals.push(key);
        if (typeof value === "object") returnVals.push(value.value);
      }
    }
    return returnVals;
  };

  const sizeVariant = {
    rings: [
      15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22,
      22.5,
    ],
    jewelry_cords: [45, 50, 55, 60],
    chains: [45, 50, 55, 60],
    necklaces: [45, 50, 55, 60],
    bracelets: [17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5],
  };

  const returnCleanPrice = (price) => {
    const priceTypeStr = String(price);
    if (priceTypeStr.length < 4) return price;

    return priceTypeStr.split(",").join("");
  };
  const cleanBasePrice = returnCleanPrice(productData.actualPrice);
  const cleanPriceWithoutDiscount = returnCleanPrice(
    productData.price_without_discount,
  );

  const presentBasePrice = useConvertionPrice(cleanBasePrice);
  const presentBasePriceWithoutDiscount = useConvertionPrice(
    cleanPriceWithoutDiscount,
  );

  const productsFilter = productsList.filter(
    (prod) =>
      JSON.parse(prod.color_material)[i18n.language] ==
        JSON.parse(productData.color_material)[i18n.language] &&
      JSON.parse(prod.material)[i18n.language] ===
        JSON.parse(productData.material)[i18n.language] &&
      prod.id !== productData.id,
  );

  return (
    <>
      <Helmet>
        <title>{multiLanuageName}</title>
      </Helmet>

      <div
        className="w-(--main-content-block-w) max-w-420 py-(--py-fr-mobile)
      gap-[clamp(1.5625rem,calc(1.205rem+1.786vw),2.8125rem)] flex flex-col items-center justify-center mx-auto"
      >
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-end justify-center gap-3 lg:gap-0">
          <h2 className="w-full lg:w-2/3 font-bold text-(--color-primary) leading-none text-left">
            {multiLanuageName.slice(0, 50) + "..."}
          </h2>

          <div className="w-full lg:w-1/3 flex flex-col items-start justify-center lg:flex-row lg:items-center lg:justify-center gap-3 lg:gap-0">
            <div className="w-full lg:w-2/3 flex items-center justify-start lg:justify-end gap-3">
              <div className="w-auto flex items-center  relative">
                {reviewsForProduct.length != 0 ? (
                  <>
                    <ul className="flex gap-2">
                      {Array.from({ length: 5 }).map((_, ind) => (
                        <li key={ind} className="shrink-0">
                          <img src={emptyRatingStar} className="h-6 w-6" />
                        </li>
                      ))}
                    </ul>

                    <div
                      className="absolute left-0 top-0 overflow-hidden"
                      style={{ width: `${calculateScoreWidth()}%` }}
                    >
                      <ul className="flex gap-2">
                        {Array.from({ length: 5 }).map((_, ind) => (
                          <li key={ind} className="shrink-0">
                            <img src={ratingStar} className="h-6 w-6" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <ul className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, ind) => (
                      <li key={ind} className="shrink-0">
                        <img src={emptyRatingStar} className="h-6 w-6" />
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <p className="text-xs text-[--color-primary]">
                {assesment}{" "}
                {assesment > 1
                  ? `${t("productPage.reviewText")}s`
                  : t("productPage.reviewText")}
              </p>
            </div>

            <div className="w-1/3 flex items-start lg:items-center lg:justify-center gap-2">
              <img src={addReview} alt="w-1/3 aspect-square" />
              <BtnAddToWishList
                setAddedProdToWishList={setAddedProdToWishList}
                title="Added product to wishlist"
              >
                {addedProdToWishList ? (
                  <img
                    src={favoriteIconFillPrimaryC}
                    alt="w-1/3 aspect-square"
                  />
                ) : (
                  <img src={favoriteIconPrimaryC} alt="w-1/3 aspect-square" />
                )}
              </BtnAddToWishList>
              <img src={share} alt="w-1/3 aspect-square" />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-start justify-center gap-7 md:gap-4 md:justify-between">
          <div className="w-full md:w-2/5 relative md:sticky md:top-[25%] rounded-(--base-b-radius) flex items-center justify-center md:justify-between">
            <img
              src={imgsProduct[indexActivePhoto]}
              alt={multiLanuageName}
              className={`w-5/6 md:w-full xl:w-5/6 rounded-(--base-b-radius) ${!productData.in_stock && "grayscale"}`}
            />
          </div>

          <div className="w-full md:w-3/5 flex flex-col items-start justify-start gap-[clamp(1.875rem,calc(1.161rem+3.571vw),4.375rem)]">
            <div className="w-full flex flex-col md:flex-row gap-[clamp(1.5625rem,calc(1.027rem+2.679vw),3.4375rem)]">
              <div className="w-full md:w-[10%] flex flex-row md:flex-col items-start justify-center md:justify-start gap-3 overflow-x-scroll disableScrollbar">
                {imgsProduct.map((img, ind) => (
                  <button
                    className={`w-[20%] max-w-27.5 md:w-full aspect-square rounded-(--base-b-radius) pointer overflow-hidden`}
                    key={ind}
                    onClick={() => setIndexActivePhoto(ind)}
                  >
                    <img
                      src={img}
                      alt={multiLanuageName}
                      className={`w-full aspect-square ${!productData.in_stock && "grayscale"}`}
                    />
                  </button>
                ))}
              </div>

              <div className="w-full flex flex-col items-start justify-start gap-2">
                <div className="w-full flex items-center justify-start gap-5">
                  <div className="flex items-center justife-start gap-1">
                    {productData.in_stock === 1 ? (
                      <>
                        <img src={available} className="w-5 h-5" />
                        <p className="text-base font-semibold text-(--color-primary)">
                          {t("productPage.productAvailability.inStock")}
                        </p>
                      </>
                    ) : (
                      <>
                        <img src={unavailable} className="w-5 h-5" />
                        <p className="">
                          {t("productPage.productAvailability.notAvailable")}
                        </p>
                      </>
                    )}
                  </div>

                  <p className="text-(length:--text-sm) text-(--color-primary)/40">
                    {t("productPage.prodCode")}:{" "}
                    <span className="text-(--color-primary) font-bold">
                      {productData.id}
                    </span>
                  </p>
                </div>

                <button className="w-1/4 mt-3.5 mb-2.5 max-w-62.5 min-w-37.5 h-(--btn-h) border-2 border-(--second-primary-c) rounded-(--base-b-radius) customButton animationButton">
                  <span className="bg-(--second-primary-c)"></span>
                  <p className="z-10">{t("productPage.tryOn")}</p>
                </button>

                {additionsData != null && additionsData.size != undefined ? (
                  <div className="w-full flex flex-col items-center justify-start">
                    <div className="w-full flex items-center justify-between">
                      <p className="text-(--color-primary) text-(length:--text-sm) ">
                        {t("productPage.sizeSelectedBlock.sizeSelected")}
                      </p>
                      <p className="text-(--second-primary-c) text-(length:--text-sm)">
                        {t("productPage.sizeSelectedBlock.findYourSize")}
                      </p>
                    </div>

                    <ul className="w-full flex flex-wrap gap-2 my-4">
                      {sizeVariant[selectedProductsCategory].map((el, ind) => (
                        <li key={ind} className="w-[clamp(4rem,calc(3.057rem+3.619vw),6.25rem)]">
                          <button
                            onClick={() => setSelectedSize(el)}
                            className={`w-full customButton animationButton border-2 border-(--second-primary-c) rounded-(--base-b-radius) 
                        ${el == selectedSize ? "bg-(--second-primary-c)" : "bg-transparent"} py-1`}
                          >
                            <span className="bg-(--second-primary-c)"></span>
                            <p className="text-[14px] text-(--color-primary) z-10">
                              {el}
                            </p>
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="w-full flex items-center justify-start gap-5 text-(--color-primary) text-xs">
                      <p>
                        {t("productPage.sizeSelectedBlock.size")}:{" "}
                        <span className="text-(--second-primary-c) font-bold">
                          {selectedSize}
                        </span>
                      </p>
                      <p>
                        {t("productPage.sizeSelectedBlock.weight")}:{" "}
                        <span className="text-(--second-primary-c) font-bold">
                          {productWeight}g
                        </span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>
                    {t("productPage.sizeSelectedBlock.weight")}:{" "}
                    <span className="text-(--second-primary-c) font-bold">
                      {productWeight}g
                    </span>
                  </p>
                )}

                <div className="w-full flex flex-col items-center justify-center">
                  <div className="w-full flex items-center justify-center mt-[clamp(1.875rem,calc(-0.268rem+10.714vw),9.375rem)] mb-6">
                    {productData.price_without_discount != null ? (
                      <div className="flex flex-col items-center justify-center">
                        <s className="text-(--color-primary)/70 text-[clamp(1.125rem,calc(0.804rem+1.607vw),2.25rem)]">
                          <data value={cleanPriceWithoutDiscount}>
                            {presentBasePriceWithoutDiscount}
                          </data>
                        </s>

                        <data
                          value={cleanBasePrice}
                          className="text-(--color-primary) text-4xl font-bold"
                        >
                          {presentBasePrice}
                        </data>
                      </div>
                    ) : (
                      <data
                        value={cleanBasePrice}
                        className="text-(--color-primary) text-4xl font-bold"
                      >
                        {presentBasePrice}
                      </data>
                    )}
                  </div>

                  <button
                    disabled={!productData.in_stock}
                    onClick={() => {
                      if (isAuth === true) {
                        navigate("/checkout", {
                          state: {
                            prodId: productData.id,
                            name: productData.name,
                            imgSrc: imgsProduct[0],
                            price: cleanBasePrice,
                            size: selectedSize,
                            weight: productWeight,
                          },
                        });
                      }
                    }}
                    className={`w-full max-w-142 h-(--btn-h) flex items-center justify-center rounded-(--base-b-radius) 
                ${productData.in_stock ? "bg-(--color-primary)" : "bg-(--spare-color)"} text-white text-[17px]`}
                  >
                    {t("productPage.buyBtnText")}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-[clamp(0.9375rem,calc(0.491rem+2.232vw),2.5rem)]">
              <div className="w-full flex flex-col items-start justify-center gap-5">
                <h5 className="uppercase md:normal-case text-(--color-primary) font-bold gap-5">
                  {t("productPage.characteristicsBlock.title")}
                </h5>
                <ul
                  className="w-full md:w-[90.08%] min-w-88.75 flex items-stretch justify-start md:justify-center lg:justify-between flex-wrap mx-auto 
                text-base text-(--color-primary) gap-5"
                >
                  <li className="w-1/3 lg:w-auto flex flex-col items-center justify-center gap-3">
                    <img
                      src={weightIcon}
                      alt={t("productPage.characteristicsBlock.prodWeigth")}
                      className="w-12 aspect-square"
                    />
                    <p>
                      {productWeight}
                      {t(
                        "productPage.characteristicsBlock.mainCharacteristics.weight",
                      )}
                    </p>
                  </li>

                  <li className="w-1/3 lg:w-auto flex flex-col items-center justify-center gap-3">
                    <img
                      src={materialIcon}
                      alt={t("productPage.characteristicsBlock.material")}
                      className="w-12 aspect-square"
                    />
                    <p className="breal-all text-center">
                      {JSON.parse(productData.material)[i18n.language]},{" "}
                      {productData.hallmark}{" "}
                      {t(
                        "productPage.characteristicsBlock.mainCharacteristics.hallmark",
                      )}
                    </p>
                  </li>

                  <li className="w-1/3 lg:w-auto flex flex-col items-center justify-center gap-3">
                    <img
                      src={colorMaterial}
                      alt={t("productPage.characteristicsBlock.material")}
                      className="w-12 aspect-square"
                    />
                    <p>
                      {JSON.parse(productData.color_material)[i18n.language]}{" "}
                      {t(
                        "productPage.characteristicsBlock.mainCharacteristics.colorMetal",
                      )}
                    </p>
                  </li>

                  <li className="w-1/3 lg:w-auto flex flex-col items-center justify-center gap-3">
                    <img
                      src={inlayIcon}
                      alt="Inlay"
                      className="w-12 aspect-square"
                    />
                    <p>
                      {productData.inlay === null
                        ? t(
                            "productPage.characteristicsBlock.mainCharacteristics.withoutInlay",
                          )
                        : JSON.parse(productData.inlay)[i18n.language]}
                    </p>
                  </li>
                </ul>
              </div>

              <div className="w-full gap-[clamp(1.875rem,calc(0.804rem+5.357vw),5.625rem)] flex flex-row items-start justify-start text-sm/10">
                <ul className="w-auto flex flex-col items-start justify-center">
                  {returnDataExtendedDataList("title", basicExtendedData).map(
                    (item, ind) => (
                      <li key={ind} className="text-[--c-for-decorate-el]">
                        {item}:{" "}
                      </li>
                    ),
                  )}

                  {additionsData != null &&
                    typeof extendDataForSpecificCategory === "object" &&
                    returnDataExtendedDataList(
                      "title",
                      extendDataForSpecificCategory,
                    ).map((item, ind) => (
                      <li key={ind} className="text-[--c-for-decorate-el]">
                        {item}:{" "}
                      </li>
                    ))}
                </ul>

                <ul className="w-auto flex flex-col items-start justify-center">
                  {returnDataExtendedDataList("value", basicExtendedData).map(
                    (item) => (
                      <li className="text-(--second-primary-c)" key={item}>
                        {(() => {
                          const value = productData[item];

                          if (
                            typeof value === "string" &&
                            value.trim().startsWith("{")
                          ) {
                            try {
                              const parsedVal = JSON.parse(value);
                              return parsedVal[i18n.language];
                            } catch (e) {
                              return item;
                            }
                          }

                          return value ?? item;
                        })()}
                      </li>
                    ),
                  )}

                  {additionsData != null &&
                    typeof extendDataForSpecificCategory === "object" &&
                    returnDataExtendedDataList(
                      "value",
                      extendDataForSpecificCategory,
                    ).map((item) => (
                      <li className="text-(--second-primary-c)" key={item}>
                        {(() => {
                          const value = additionsData[item];

                          if (typeof value === "object") {
                            try {
                              return value[i18n.language];
                            } catch (e) {
                              return item;
                            }
                          }

                          return value ?? item;
                        })()}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="w-full flex flex-col gap-5">
                <h5 className="text-(--color-primary) font-bold">
                  {t("productPage.descBlock")}
                </h5>

                <p className="text-[--c-for-decorate-el]">
                  {JSON.parse(productData.description)[i18n.language]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <ReviewBlock
          productData={productData}
          setAssesment={setAssesment}
          reviewsForProduct={reviewsForProduct}
          setReviewsForProduct={setReviewsForProduct}
        />

        <div className="w-full flex items-center justify-center">
          <SwiperCatalog
            catalog={productsFilter}
            titleSwiper={t("productPage.relatedProducts")}
          />
        </div>
      </div>
    </>
  );
}
