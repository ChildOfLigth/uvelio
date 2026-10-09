import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../../globalVariables.js";
import arrowIco from "@imgs/icons/arrowIco.svg";
import { useSelector } from "react-redux";

export default function SortingCatalog({
  isMobile,
  openDropdownList,
  setOpenDropdownList,
  setCurrentVisibleProdList,
}) {
  const { t } = useTranslation();
  const { productsList } = useSelector((state) => state.products);
  const [activeSortVariant, setActiveSortVariant] = useState("Popularity");
  const [sortedCatalog, setSortedCatalog] = useState(null);
  const [rotateArrow, setRotateArrow] = useState(false);

  const sortsVariants = t(
    "productsCatalog.sortProductList.variants",
    RETURN_TRANSLATE_FUNC_TYPE,
  );

  useEffect(() => {
    const copy = [...productsList];

    const sorteringCatalog = () => {
      switch (activeSortVariant) {
        case "Popularity":
          copy.sort((a, b) => b.reviews_count - a.reviews_count);
          break;

        case "Price: high to low":
          copy.sort((a, b) => b.actualPrice - a.actualPrice);
          break;

        case "Price: low to high":
          copy.sort((a, b) => a.actualPrice - b.actualPrice);
          break;
      }

      return copy;
    };

    setSortedCatalog(sorteringCatalog());
  }, [productsList, activeSortVariant, isMobile]);

  useEffect(() => {
    if (sortedCatalog != null) {
      setCurrentVisibleProdList(sortedCatalog);
    }
  }, [sortedCatalog]);

  const isOpen = isMobile ? openDropdownList : rotateArrow;

  return (
    <div
      className={`w-62.5 flex flex-col items-start justify-center gap-2 ${
        isMobile
          ? "absolute right-0 top-10 shadow-lg shadow-(--color-primary)/50 z-40"
          : "relative"
      }`}
    >
      {!isMobile && (
        <div className="flex items-center gap-2.5">
          <span className="text-(--color-primary)/60">
            {t("productsCatalog.sortProductList.span")}
          </span>

          <button
            onClick={() => {
              setRotateArrow(!rotateArrow);
            }}
            className="flex items-center gap-2"
          >
            {activeSortVariant}

            <img
              src={arrowIco}
              className={`w-3 h-3 transition-all duration-300 ${
                rotateArrow ? "rotate-270" : "rotate-90"
              }`}
            />
          </button>
        </div>
      )}

      {isOpen && (
        <ul
          className="w-full flex flex-col bg-white divide-y divide-(--color-primary)
          rounded-(--base-b-radius) overflow-hidden cursor-pointer"
        >
          {sortsVariants.map((sortVariant, ind) => {
            return (
              <li
                key={ind}
                className={`w-full flex items-center justify-center 
                ${activeSortVariant === sortVariant ? "bg-(--second-primary-c)/40" : "bg-white"}
                hover:bg-(--second-primary-c)/40 transition`}
              >
                <button
                  onClick={() => {
                    setActiveSortVariant(sortVariant);
                    setOpenDropdownList(false);
                    setRotateArrow(false);
                  }}
                  className="w-full h-full py-3"
                >
                  {sortVariant}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
