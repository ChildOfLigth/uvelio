import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import { getLength, getProducts } from "@redux/products/productsThunk.js";
import {
  setSelectedProductsCategory,
  setSelectedFilters,
} from "@redux/products/productsSlice.js";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../../globalVariables.js";
import ProductsList from "./ProductsList.jsx";
import FilteringSideBar from "./FilteringSIdeBar.jsx";
import ChangeCategory from "./ChangeCategory.jsx";
import SortingCatalog from "./SortingCatalog.jsx";
import filterCatalogIcon from "@imgs/icons/productsCatalog/filterCatalog.svg";
import sortCatalogIcon from "@imgs/icons/productsCatalog/sortCatalog.svg";

export function ProductsCatalog({ totalNumOfProds, setTotalNumOfProds }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { category } = useParams();
  const [filterParams] = useSearchParams();

  const { status, productsList, selectedProductsCategory, selectedFilters } =
    useSelector((state) => state.products);

  const [isMobile, setIsMobile] = useState(false);
  const [currentVisibleProdList, setCurrentVisibleProdList] = useState([]);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openDropdownList, setOpenDropdownList] = useState(false);

  const prevCategoryRef = useRef(null);

  useEffect(() => {
    if (category && category !== selectedProductsCategory) {
      dispatch(setSelectedProductsCategory(category));
    }
  }, [category, selectedProductsCategory, dispatch]);

  useEffect(() => {
    const filtersFromUrl = {};

    for (const [key, value] of filterParams.entries()) {
      if (!filtersFromUrl[key]) {
        filtersFromUrl[key] = [];
      }
      if (!filtersFromUrl[key].includes(value)) {
        filtersFromUrl[key].push(value);
      }
    }

    dispatch(setSelectedFilters(filtersFromUrl));
  }, [filterParams, dispatch]);

  useEffect(() => {
    if (!category) return;

    if (prevCategoryRef.current !== category) {
      setCurrentVisibleProdList([]);
      prevCategoryRef.current = category;
    }

    setTotalNumOfProds(10);

    dispatch(
      getLength({
        selectedFilters,
        neededCategory: category,
      }),
    );

    dispatch(
      getProducts({
        neededCategory: category,
        selectedFilters,
      }),
    );
  }, [dispatch, category, selectedFilters, setTotalNumOfProds]);

  useEffect(() => {
    if (productsList.length > 0) {
      setCurrentVisibleProdList([...productsList]);
    } else {
      setCurrentVisibleProdList([]);
    }
  }, [status, productsList]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const btnTexBorMobileVersion = t(
    "productsCatalog.btnTextForMobileVersion",
    RETURN_TRANSLATE_FUNC_TYPE,
  );

  return (
    <div
      className="
        w-(--main-content-block-w)
        flex
        flex-col
        mx-auto
        pt-[clamp(1.875rem,calc(1.339rem+2.679vw),3.75rem)]
        gap-[clamp(1.875rem,calc(0.625rem+6.25vw),6.25rem)]
      "
    >
      <div className="flex flex-col gap-5">
        <h2 className="md:w-2/3 text-(--color-primary) font-bold">
          {t("productsCatalog.title")}
        </h2>

        <ChangeCategory />

        {isMobile && (
          <div className="flex justify-between px-4">
            <button
              className="flex items-center gap-2"
              onClick={() => setOpenSideBar((prev) => !prev)}
            >
              <img src={filterCatalogIcon} className="w-6" alt="" />
              <p className="text-lg text-(--color-primary)">
                {btnTexBorMobileVersion[0]}
              </p>
            </button>

            <div className="relative">
              <button
                onClick={() => setOpenDropdownList((prev) => !prev)}
                className="flex items-center gap-2"
              >
                <img src={sortCatalogIcon} className="w-6" alt="" />
                <p className="text-lg text-(--color-primary)">
                  {btnTexBorMobileVersion[1]}
                </p>
              </button>

              <SortingCatalog
                isMobile={isMobile}
                openDropdownList={openDropdownList}
                setOpenDropdownList={setOpenDropdownList}
                currentVisibleProdList={currentVisibleProdList}
                setCurrentVisibleProdList={setCurrentVisibleProdList}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex max-w-600 gap-[clamp(1.25rem,calc(0.714rem+2.679vw),3.125rem)]">
        <FilteringSideBar
          currentVisibleProdList={currentVisibleProdList}
          setCurrentVisibleProdList={setCurrentVisibleProdList}
          isMobile={isMobile}
          openSideBar={openSideBar}
          setOpenSideBar={setOpenSideBar}
        />

        <div className="w-full mx-auto md:mx-0 lg:w-[73%] flex flex-col gap-7">
          {!isMobile && (
            <SortingCatalog
              isMobile={isMobile}
              openDropdownList={openDropdownList}
              setOpenDropdownList={setOpenDropdownList}
              currentVisibleProdList={currentVisibleProdList}
              setCurrentVisibleProdList={setCurrentVisibleProdList}
            />
          )}

          <ProductsList
            currentVisibleProdList={currentVisibleProdList}
            totalNumOfProds={totalNumOfProds}
            setTotalNumOfProds={setTotalNumOfProds}
          />
        </div>
      </div>
    </div>
  );
}
