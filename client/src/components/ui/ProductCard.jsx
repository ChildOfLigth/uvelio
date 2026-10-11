import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import useConvertionPrice from "@hooks/useConvertionPrice";
import questionMark from "@imgs/icons/question-mark.svg";
import favoriteIcon from "@imgs/icons/favorite.svg";
import favoriteIconFillWhite from "@imgs/icons/whiteFillFavoriteIcon.svg";
import BtnAddProdToWishList from "./ButtonComponent/BtnAddProdToWishList";
import { useSelector } from "react-redux";

export default function ProductCard({ productData }) {
  const { t, i18n } = useTranslation();
  const { id, imgsLinks, name, price_without_discount, actualPrice, in_stock } = productData;
  const {userData, isAuth} = useSelector(
    (state) => state.userAccount.accountData);
  const [addedProdToWishList, setAddedProdToWishList] = useState(false);
  const parsedName = JSON.parse(name);

  return (
    <article className="col-span-1 bg-white h-full rounded-(--base-b-radius) flex flex-col items-center justify-between overflow-hidden">
      <img
        src={JSON.parse(imgsLinks)[0]}
        alt={parsedName[i18n.language]}
        className={`w-[90%] aspect-square ${!in_stock && "grayscale"}`}
        loading="lazy"
      />

      <div className="w-[89.3%] flex flex-col items-start justify-center">
        <div className="w-full flex flex-col items-start">
          <h5
            className="w-full text-xs font-normal text-(--color-primary) leading-normal text-left
            2xl:text-base line-clamp-2 md:line-clamp-none"
          >
            {parsedName[i18n.language].slice(0, 30) + "..."}
          </h5>

          <span className="font-bold text-(--color-primary) my-1 text-[clamp(1rem,0.94rem+0.3vw,1.207rem)] 2xl:text-2xl">
            {price_without_discount != null ? (
              <>
                <div className="flex flex-col items-start">
                  <s className="text-sm text-(--color-primary)/70 font-normal 2xl:text-xl">
                    <data value={price_without_discount}>
                      {useConvertionPrice(price_without_discount)}
                    </data>
                  </s>

                  <data value={actualPrice}>
                    {useConvertionPrice(actualPrice)}
                  </data>
                </div>
              </>
            ) : (
              <data value={actualPrice}>{useConvertionPrice(actualPrice)}</data>
            )}
          </span>
        </div>

        <div className="w-full h-10 sm:h-12.5 flex items-center justify-center gap-1 my-1">
          <Link
            to={`/product/${id}`}
            className="w-[66%] sm:w-[77%] h-full sm:py-3.25 px-4.25 flex items-center justify-center text-center bg-(--color-primary) 
          rounded-(--base-b-radius) font-medium text-(length:--text-sm) 2xl:text-xl text-white"
            onClick={() => {
              localStorage.setItem(
                "dataCurrentProduct",
                JSON.stringify(productData),
              );
            }}
          >
            {t("uiComponent.productCard.buyBtn")}
          </Link>

          <BtnAddProdToWishList
            prodId={id}
            setAddedProdToWishList={setAddedProdToWishList}
            className="w-[30%] sm:w-[23%] h-full flex items-center justify-center bg-(--color-primary) rounded-(--base-b-radius)"
            title="Add to favorite"
          >
            {userData?.wishList.includes(id) && isAuth || addedProdToWishList ? (
              <img src={favoriteIconFillWhite} className="w-[50%] max-w-7.5" />
            ) : (
              <img src={favoriteIcon} className="w-[50%] max-w-7.5" />
            )}
          </BtnAddProdToWishList>
        </div>

        <div className="w-full flex items-center justify-center mb-3.5 md:mb-2">
          <div
            className={`${i18n.language == "ua" ? "w-5/6" : "w-5/6 lg:w-3/5 max-w-30"} gap-2 flex items-center justify-between`}
          >
            <p className="text-(--second-primary-c) select-none text-xs">
              {t("uiComponent.productCard.getDiscount")}
            </p>

            <img
              src={questionMark}
              className="none sm:block w-3.5 2xl:w-4 aspect-square"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
