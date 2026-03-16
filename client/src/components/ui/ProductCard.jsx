import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useConvertionPrice from "@hooks/useConvertionPrice";

import questionMark from "@imgs/icons/question-mark.svg";
import favoriteIcon from "@imgs/icons/favorite.svg";
import favoriteIconFillWhite from "@imgs/icons/whiteFillFavoriteIcon.svg";
import BtnAddProdToWishList from "./ButtonComponent/BtnAddProdToWishList";

export default function ProductCard({ productData }) {
  const { imgsLinks, name, price, salePrice, id } = productData;
  const { t, i18n } = useTranslation();

  const nameBlock = useRef(null);
  const [addedProdToWishList, setAddedProdToWishList] = useState(false);
  const navigate = useNavigate();

  const returnCleanPrice = (price) => {
    const priceTypeStr = String(price);
    if (priceTypeStr.length < 4) return price;

    return priceTypeStr.split(",").join("");
  };

  return (
    <article className="col-span-1 bg-white h-full rounded-(--border-radius) flex flex-col items-center justify-between overflow-hidden">
      <img
        src={JSON.parse(imgsLinks)[0]}
        alt={name}
        className="w-[90%] aspect-square"
      />

      <div className="w-[89.3%] flex flex-col items-start justify-center">
        <div className="w-5/6 flex flex-col items-start">
          <h5
            className="w-full text-xs font-normal text-(--color-primary) leading-normal text-left
            2xl:text-base line-clamp-2 md:line-clamp-none"
            ref={nameBlock}
          >
            {name}
          </h5>

          <span className="font-bold text-(--color-primary) my-1 text-[clamp(1rem,0.94rem+0.3vw,1.207rem)] 2xl:text-2xl">
            {salePrice ? (
              <>
                <div className="flex flex-col items-start">
                  <s className="text-sm text-(--color-primary)/70 font-normal 2xl:text-xl">
                    <data value={returnCleanPrice(price)}>
                      {useConvertionPrice(returnCleanPrice(price))}
                    </data>
                  </s>

                  <data value={returnCleanPrice(salePrice)}>
                    {useConvertionPrice(returnCleanPrice(salePrice))}
                  </data>
                </div>
              </>
            ) : (
              <data value={returnCleanPrice(price)}>
                {useConvertionPrice(returnCleanPrice(price))}
              </data>
            )}
          </span>
        </div>

        <div className="w-full h-11 sm:h-12.5 flex items-center justify-center gap-1 my-1">
          <button
            className="w-[77%] h-full sm:py-3.25 px-4.25 flex items-center justify-center text-center bg-(--color-primary) 
          rounded-(--border-radius) font-medium text-(length:--text-sm) 2xl:text-xl text-white"
            onClick={() => {
              localStorage.setItem(
                "dataCurrentProduct",
                JSON.stringify(productData),
              );
              navigate(`/uvelio/${id}`);
              window.location.reload();
            }}
          >
            {t("uiComponent.productCard.buyBtn")}
          </button>

          <BtnAddProdToWishList
            className="w-[23%] h-full flex items-center justify-center bg-(--color-primary) rounded-(--border-radius)"
            setAddedProdToWishList={setAddedProdToWishList}
            title="Add to favorite"
          >
            {addedProdToWishList === false ? (
              <img src={favoriteIcon} className="w-[60%] max-w-7.5" />
            ) : (
              <img src={favoriteIconFillWhite} className="w-[60%] max-w-7.5" />
            )}
          </BtnAddProdToWishList>
        </div>

        <div className="w-full flex items-center justify-center mb-3.5 md:mb-2">
          <div className={`${i18n.language == "ua" ? "w-full" : "w-3/5 2xl:w-3/4"} gap-2 min-w-33.75 flex items-center justify-between`}>
            <p
              className="text-sm text-(--second-primary-с) select-none"
            >
              {t("uiComponent.productCard.getDiscount")}
            </p>

            <img
              src={questionMark}
              className="none sm:block w-3.5 2xl:w-5 aspect-square"
            />
          </div>
        </div>
      </div>
    </article>
  );
}