import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  setAddFilter,
  setRemoveFilter,
} from "@redux/products/productsSlice.js";

import CustomCheckbox from "@ui/Form/CustomCheckbox.jsx";

import { RETURN_TRANSLATE_FUNC_TYPE } from "../../../../globalVariables.js";

import arrowIco from "@imgs/icons/arrowIco.svg";
import spiner from "@imgs/icons/spiner.svg";

import { searchProdsByName } from "@redux/products/productsThunk.js";


export default function FilteringByActualFilters({
  setCurrentVisibleProdList,
}) {
  const { t, i18n } = useTranslation();

  const { selectedProductsCategory, selectedFilters } = useSelector(
    (state) => state.products,
  );

  const dispatch = useDispatch();

  const [filterParams, setFilterParams] = useSearchParams();
  const [allSelectedFilters, setAllSelectedFilters] = useState([]);

  const searchReqForProdByName = filterParams.get("name");

  useEffect(() => {
    const savedSelectedFilters = JSON.parse(
      localStorage.getItem("idSelectedFilters"),
    );

    if (
      Array.isArray(savedSelectedFilters) &&
      savedSelectedFilters.length > 0
    ) {
      setAllSelectedFilters(savedSelectedFilters);
    }
  }, []);

  useEffect(() => {
    if (allSelectedFilters.length > 0) {
      localStorage.setItem(
        "idSelectedFilters",
        JSON.stringify(allSelectedFilters),
      );
    } else {
      localStorage.removeItem("idSelectedFilters");
    }
  }, [allSelectedFilters]);

  useEffect(() => {
    if (searchReqForProdByName === null) return;

    const getProdsByName = async () => {
      const res = await dispatch(searchProdsByName(searchReqForProdByName));

      setCurrentVisibleProdList(res.payload);
    };

    getProdsByName();
  }, [searchReqForProdByName, dispatch]);

  const allVariantsFilters = useMemo(() => {
    const basicFilters = t(
      "productsCatalog.sidebar.basicFilters",
      RETURN_TRANSLATE_FUNC_TYPE,
    );

    const additionalFilters = t(
      `productsCatalog.sidebar.additFiltsForSpecificCategories.${selectedProductsCategory}`,
      RETURN_TRANSLATE_FUNC_TYPE,
    );

    return typeof additionalFilters !== "string"
      ? basicFilters.concat(additionalFilters)
      : basicFilters;
  }, [i18n.language, selectedProductsCategory]);

  const handleToggleFilter = (id) => {
    setAllSelectedFilters((prev) => {
      const isSelected = prev.includes(id);

      return isSelected ? prev.filter((item) => item !== id) : [...prev, id];
    });
  };

  useEffect(() => {
    if (!selectedFilters || !Array.isArray(allVariantsFilters)) {
      return;
    }

    const selectedIndexes = [];

    allVariantsFilters.forEach((item, ind) => {
      const filterItem = Array.isArray(item?.variants)
        ? item.variants
        : item?.variants?.[selectedProductsCategory];

      if (!Array.isArray(filterItem)) return;

      const key = item?.key;
      const values = selectedFilters?.[key];

      if (!Array.isArray(values) || values.length === 0) {
        return;
      }

      const hasMatch =
        key === "sale" || key === "exclusive"
          ? values.includes("1")
          : values.some((value) => filterItem.includes(value));

      if (hasMatch) {
        selectedIndexes.push(ind);
      }
    });

    setAllSelectedFilters((prev) => {
      const manuallyOpened = prev.filter((index) => {
        const item = allVariantsFilters[index];

        if (!item) return false;

        const key = item?.key;
        const values = selectedFilters?.[key];

        return !Array.isArray(values) || values.length === 0;
      });

      const next = [...manuallyOpened, ...selectedIndexes].filter(
        (index, position, array) => array.indexOf(index) === position,
      );

      if (
        prev.length === next.length &&
        prev.every((value, index) => value === next[index])
      ) {
        return prev;
      }

      return next;
    });
  }, [selectedFilters, selectedProductsCategory, allVariantsFilters]);

  const getFilterOptions = (filter) => {
    if (!filter?.variants) return [];

    if (Array.isArray(filter.variants)) {
      return filter.variants;
    }

    return filter.variants?.[selectedProductsCategory] ?? [];
  };

  const handleOptionToggle = (key, currentOpt) => {
    const currentValues = selectedFilters?.[key] ?? [];
    const isSelected = currentValues.includes(currentOpt);

    const payload = {
      key,
      value: currentOpt,
    };

    if (isSelected) {
      dispatch(setRemoveFilter(payload));

      setFilterParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);

          newParams.delete(key);

          currentValues
            .filter((value) => value !== currentOpt)
            .forEach((value) => {
              newParams.append(key, value);
            });

          return newParams;
        },
        { replace: true },
      );
    } else {
      dispatch(setAddFilter(payload));

      setFilterParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);

          newParams.append(key, currentOpt);

          return newParams;
        },
        { replace: true },
      );
    }
  };

  return (
    <ul className="w-5/6 flex flex-col items-start">
      {Array.isArray(allVariantsFilters) &&
        allVariantsFilters.map((item, ind) => {
          const hasFilter = Array.isArray(item?.variants)
            ? true
            : item?.variants?.[selectedProductsCategory] !== undefined;

          if (!hasFilter) return null;

          const isFilterOpened = allSelectedFilters.includes(ind);

          const options = getFilterOptions(item);

          return (
            <li
              key={`${item?.key ?? ind}-${selectedProductsCategory}`}
              className={`
                w-full
                flex
                flex-col
                items-start
                justify-start
                transition-all
                duration-300
                ${isFilterOpened ? "pb-6" : ""}
                border-b
                border-b-(--second-primary-c)
              `}
            >
              <button
                id={ind}
                type="button"
                className="
                  w-full
                  h-13.75
                  flex
                  items-center
                  justify-between
                  text-(--color-primary)
                "
                onClick={() => handleToggleFilter(ind)}
              >
                <p
                  className={`
                    ${
                      isFilterOpened
                        ? "font-semibold text-base"
                        : "font-normal text-[14px]"
                    }
                    transition-all
                    duration-500
                  `}
                >
                  {item.name}
                </p>

                <img
                  src={arrowIco}
                  alt=""
                  className={`
                    h-2
                    w-3
                    2xl:h-2.5
                    transition
                    duration-300
                    ${isFilterOpened ? "rotate-270" : "rotate-90"}
                  `}
                />
              </button>

              {isFilterOpened && (
                <ul
                  className="
                    w-full
                    flex
                    flex-col
                    items-start
                    justify-start
                    gap-3
                  "
                >
                  {selectedProductsCategory !== "" ? (
                    options.length > 0 ? (
                      options.map((option) => {
                        const key = item?.key;

                        let currentOpt;

                        switch (key) {
                          case "sale":
                          case "exclusive":
                            currentOpt = "1";
                            break;

                          default:
                            currentOpt = option;
                            break;
                        }

                        const isChecked =
                          selectedFilters?.[key]?.includes(currentOpt) ?? false;

                        return (
                          <li
                            key={`${key}-${option}`}
                            className="
                              w-full
                              flex
                              items-center
                              gap-2
                              md:gap-3.5
                              text-(length:--text-sm)
                              text-(--color-primary)
                            "
                          >
                            <CustomCheckbox
                              checked={isChecked}
                              onClick={() =>
                                handleOptionToggle(key, currentOpt)
                              }
                            />

                            {option}
                          </li>
                        );
                      })
                    ) : (
                      <li className="w-full flex justify-center">
                        <img src={spiner} alt="" className="w-5 h-5" />
                      </li>
                    )
                  ) : (
                    <img src={spiner} alt="" className="w-5 h-5 mx-auto" />
                  )}
                </ul>
              )}
            </li>
          );
        })}
    </ul>
  );
}
