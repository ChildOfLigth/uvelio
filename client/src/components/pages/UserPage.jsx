import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { RETURN_TRANSLATE_FUNC_TYPE, BASE_API } from "../../globalVariables";
import SwiperCatalog from "../ui/Swiper/SwiperCatalog";
import spiner from "@imgs/icons/spiner.svg";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const { t } = useTranslation();
  const { userData, isAuth } = useSelector(
    (state) => state.userAccount.accountData,
  );

  const [productsFromWishList, setProductsFromWishList] = useState(null);
  const [purchasedProducts, setPurchasedProducts] = useState(null);
  const naviagate = useNavigate();

  const userPageTranslation = t("userPage", RETURN_TRANSLATE_FUNC_TYPE);

  const gettingProdsByIds = async (idsList) => {
    try {
      const res = await BASE_API.get("/products/get-produts-by-id", {
        params: {
          listProdIds: JSON.stringify(idsList),
        },
      });

      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    if (userData?.wishList === undefined || userData?.wishList.length == 0) {
      setProductsFromWishList([]);
      return;
    }

    const fetchProdsForWishList = async () => {
      const res = await gettingProdsByIds(userData?.wishList);

      if (res !== undefined) {
        const parsedVal = JSON.parse(res);
        setProductsFromWishList(parsedVal);
      }
    };

    fetchProdsForWishList();
  }, [userData]);

  useEffect(() => {
    if (!userData?.purchasedGoods?.length) {
      setPurchasedProducts([]);
      return;
    }

    const fetchProdsForPurchasedProducts = async () => {
      const res = await gettingProdsByIds(userData?.purchasedGoods);

      if (res !== undefined) {
        const parsedVal = JSON.parse(res);
        setPurchasedProducts(parsedVal);
      }
    };

    fetchProdsForPurchasedProducts();
  }, [userData]);

  if (!userData) {
    return (
      <div className="w-full flex justify-center py-20">
        <img src={spiner} alt="Loading..." className="w-20" />
      </div>
    );
  }

  const divBlockByEmptyList = (typeList) => {
    const textContent = userPageTranslation.emptyList;

    return (
      <div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-10
        rounded-(--base-b-radius) bg-(--second-primary-c)/40 py-[clamp(1.5625rem,calc(1.228rem+1.603vw),2.5rem)] 
        text-(--color-primary)"
      >
        <div className="w-5/6 mx-auto flex flex-col items-center justify-center gap-4 text-center">
          <h4 className="font-semibold">{textContent[typeList].title}</h4>
          <p className="--base-p-size font-base">
            {textContent[typeList].subText}
          </p>
        </div>

        <button
          className="w-4/5 sm:w-1/2 h-(--btn-h) font-semibold rounded-(--base-b-radius) 
        bg-(--second-primary-c)/80 hover:bg-(--second-primary-c)/35
        mx-auto transition-colors duration-300"
          onClick={() => naviagate("/uvelio/catalog/rings")}
        >
          {textContent[typeList].textBtn}
        </button>
      </div>
    );
  };

  return (
    <div
      className="w-4/5 md:w-2/3 max-w-292.5 flex flex-col items-center justify-start mx-auto
      gap-[clamp(1.875rem,calc(0.804rem+5.357vw),5.625rem)]
      py-(--py-fr-mobile)"
    >
      {isAuth ? (
        <>
          <div className="w-full flex flex-col items-start justify-start gap-3 text-(--color-primary)">
            <h2 className="font-bold">{userData.username}</h2>
            <p className="text-(--base-p-size) md:text-xl">{userData.email}</p>
          </div>

          <div className="w-full flex flex-col items-center justify-start gap-10">
            {productsFromWishList?.length > 0 ? (
              <SwiperCatalog
                catalog={productsFromWishList}
                titleSwiper={userPageTranslation.titleWishList}
              />
            ) : (
              divBlockByEmptyList("wishList")
            )}

            {purchasedProducts?.length > 0 ? (
              <SwiperCatalog
                catalog={purchasedProducts}
                titleSwiper={userPageTranslation.titlePurchasedGoods}
              />
            ) : (
              divBlockByEmptyList("purchasedGoods")
            )}
          </div>
        </>
      ) : (
        <img src={spiner} className="w-5/12 aspect-square max-w-80" />
      )}
    </div>
  );
}
