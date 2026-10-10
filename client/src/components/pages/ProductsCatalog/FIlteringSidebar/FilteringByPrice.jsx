import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { setReplaceFilter } from "@redux/products/productsSlice.js";
import spiner from "@imgs/icons/spiner.svg";
import { BASE_API } from "../../../../globalVariables";

export default function FilteringByPrice({ openSideBar }) {
  const { t } = useTranslation();

  const { selectedProductsCategory } = useSelector(
    (state) => state.products,
  );

  const dispatch = useDispatch();
  const [filterParams, setFilterParams] = useSearchParams();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [minFilterPrice, setMinFilterPrice] = useState(0);
  const [maxFilterPrice, setMaxFilterPrice] = useState(0);

  const [minInputValue, setMinInputValue] = useState("");
  const [maxInputValue, setMaxInputValue] = useState("");

  const [minPercent, setMinPercent] = useState(0);
  const [maxPercent, setMaxPercent] = useState(100);

  const [dragType, setDragType] = useState(null);

  const trackRef = useRef(null);

  const minPercentRef = useRef(0);
  const maxPercentRef = useRef(100);

  useEffect(() => {
    minPercentRef.current = minPercent;
  }, [minPercent]);

  useEffect(() => {
    maxPercentRef.current = maxPercent;
  }, [maxPercent]);

  useEffect(() => {
    let cancelled = false;

    const getPriceRange = async () => {
      try {
        const res = await BASE_API.get("/products/get-price-range", {
          params: {
            selectedProductsCategory,
          },
        });

        if (cancelled) return;

        const min = Number(res.data?.min);
        const max = Number(res.data?.max);

        if (
          !Number.isFinite(min) ||
          !Number.isFinite(max) ||
          min <= 0 ||
          max <= 0 ||
          min >= max
        ) {
          console.error("Invalid price range:", res.data);
          return;
        }

        setMinPrice(min);
        setMaxPrice(max);
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to get price range:", err);
        }
      }
    };

    setMinPrice(0);
    setMaxPrice(0);

    getPriceRange();

    return () => {
      cancelled = true;
    };
  }, [selectedProductsCategory]);

  useEffect(() => {
    setMinFilterPrice(0);
    setMaxFilterPrice(0);

    setMinInputValue("");
    setMaxInputValue("");

    setMinPercent(0);
    setMaxPercent(100);

    minPercentRef.current = 0;
    maxPercentRef.current = 100;
  }, [selectedProductsCategory]);

  useEffect(() => {
    if (
      minPrice <= 0 ||
      maxPrice <= 0 ||
      minPrice >= maxPrice ||
      dragType !== null
    ) {
      return;
    }

    const minParam = filterParams.get("min");
    const maxParam = filterParams.get("max");

    let min = minParam !== null ? Number(minParam) : minPrice;
    let max = maxParam !== null ? Number(maxParam) : maxPrice;

    if (!Number.isFinite(min)) {
      min = minPrice;
    }

    if (!Number.isFinite(max)) {
      max = maxPrice;
    }

    min = Math.max(minPrice, Math.min(min, maxPrice));
    max = Math.max(minPrice, Math.min(max, maxPrice));

    if (min > max) {
      min = minPrice;
      max = maxPrice;
    }

    const minPosition = priceToPercent(min, minPrice, maxPrice);
    const maxPosition = priceToPercent(max, minPrice, maxPrice);

    const roundedMin = Math.floor(min);
    const roundedMax = Math.floor(max);

    setMinFilterPrice(roundedMin);
    setMaxFilterPrice(roundedMax);

    setMinInputValue(String(roundedMin));
    setMaxInputValue(String(roundedMax));

    setMinPercent(minPosition);
    setMaxPercent(maxPosition);

    minPercentRef.current = minPosition;
    maxPercentRef.current = maxPosition;
  }, [minPrice, maxPrice, filterParams]);

  useEffect(() => {
    if (dragType === null) {
      return;
    }

    const handlePointerMove = (e) => {
      if (!trackRef.current) return;

      if (minPrice <= 0 || maxPrice <= 0 || minPrice >= maxPrice) {
        return;
      }

      const rect = trackRef.current.getBoundingClientRect();

      if (rect.width <= 0) return;

      let percent = ((e.clientX - rect.left) / rect.width) * 100;

      percent = Math.max(0, Math.min(100, percent));

      if (dragType === "minPrice") {
        const currentMaxPercent = maxPercentRef.current;

        const newMinPercent = Math.min(percent, currentMaxPercent);

        const newMinPrice = percentToPrice(newMinPercent, minPrice, maxPrice);

        const roundedPrice = Math.floor(newMinPrice);

        setMinPercent(newMinPercent);
        minPercentRef.current = newMinPercent;

        setMinFilterPrice(roundedPrice);
        setMinInputValue(String(roundedPrice));

        return;
      }

      if (dragType === "maxPrice") {
        const currentMinPercent = minPercentRef.current;

        const newMaxPercent = Math.max(percent, currentMinPercent);

        const newMaxPrice = percentToPrice(newMaxPercent, minPrice, maxPrice);

        const roundedPrice = Math.floor(newMaxPrice);

        setMaxPercent(newMaxPercent);
        maxPercentRef.current = newMaxPercent;

        setMaxFilterPrice(roundedPrice);
        setMaxInputValue(String(roundedPrice));
      }
    };

    const handlePointerUp = () => {
      setDragType(null);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragType, minPrice, maxPrice]);

  const handlePointerDown = (type, e) => {
    e.preventDefault();
    setDragType(type);
  };

  const priceToPercent = (price, minPrice, maxPrice) => {
    if (
      !Number.isFinite(Number(price)) ||
      minPrice <= 0 ||
      maxPrice <= 0 ||
      minPrice >= maxPrice
    ) {
      return 0;
    }

    const numericPrice = Number(price);

    if (numericPrice <= minPrice) return 0;
    if (numericPrice >= maxPrice) return 100;

    const percent =
      (Math.log(numericPrice / minPrice) / Math.log(maxPrice / minPrice)) * 100;

    return Math.max(0, Math.min(100, percent));
  };

  const percentToPrice = (percent, minPrice, maxPrice) => {
    if (minPrice <= 0 || maxPrice <= 0 || minPrice >= maxPrice) {
      return minPrice;
    }

    const safePercent = Math.max(0, Math.min(100, percent));

    return minPrice * Math.pow(maxPrice / minPrice, safePercent / 100);
  };

  const handleMinInputChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      return;
    }

    setMinInputValue(value);

    if (value === "") {
      setMinFilterPrice(0);
      return;
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return;
    }

    setMinFilterPrice(numericValue);

    const newPercent = priceToPercent(numericValue, minPrice, maxPrice);

    const safePercent = Math.min(newPercent, maxPercentRef.current);

    setMinPercent(safePercent);
    minPercentRef.current = safePercent;
  };

  const handleMaxInputChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      return;
    }

    setMaxInputValue(value);

    if (value === "") {
      setMaxFilterPrice(0);
      return;
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return;
    }

    setMaxFilterPrice(numericValue);

    const newPercent = priceToPercent(numericValue, minPrice, maxPrice);

    const safePercent = Math.max(newPercent, minPercentRef.current);

    setMaxPercent(safePercent);
    maxPercentRef.current = safePercent;
  };

  const filterByPrice = () => {
    if (minInputValue === "" || maxInputValue === "") {
      return;
    }

    const inputMin = Number(minInputValue);
    const inputMax = Number(maxInputValue);

    if (!Number.isFinite(inputMin) || !Number.isFinite(inputMax)) {
      return;
    }

    const safeMin = Math.max(minPrice, Math.min(inputMin, inputMax));
    const safeMax = Math.min(maxPrice, Math.max(inputMax, inputMin));

    setFilterParams(
      (prev) => {
        const params = new URLSearchParams(prev);

        params.set("min", String(safeMin));
        params.set("max", String(safeMax));

        return params;
      },
      { replace: true },
    );

    dispatch(
      setReplaceFilter({
        key: "min",
        value: String(safeMin),
      }),
    );

    dispatch(
      setReplaceFilter({
        key: "max",
        value: String(safeMax),
      }),
    );

    setMinFilterPrice(safeMin);
    setMaxFilterPrice(safeMax);

    setMinInputValue(String(safeMin));
    setMaxInputValue(String(safeMax));

    const newMinPercent = priceToPercent(safeMin, minPrice, maxPrice);
    const newMaxPercent = priceToPercent(safeMax, minPrice, maxPrice);

    setMinPercent(newMinPercent);
    setMaxPercent(newMaxPercent);

    minPercentRef.current = newMinPercent;
    maxPercentRef.current = newMaxPercent;
  };

  const isLoading =
    minPrice <= 0 || maxPrice <= 0 || minFilterPrice < 0 || maxFilterPrice < 0;

  return (
    <div
      className={`${
        openSideBar ? "w-[90%]" : "w-full"
      } flex flex-col items-start justify-start gap-5`}
    >
      <h4 className="text-2xl xl:text-[32px] font-bold text-(--color-primary)">
        {t("productsCatalog.sidebar.filterByPrice.filterName")}
      </h4>

      <div className="w-full flex flex-col items-center gap-5">
        {isLoading ? (
          <img
            src={spiner}
            className="w-8 md:w-10 aspect-square"
            alt="Loading"
          />
        ) : (
          <>
            <div className="w-full flex items-center justify-center gap-3">
              <input
                type="text"
                inputMode="numeric"
                className="w-1/2 flex items-center justify-center bg-white rounded-(--base-b-radius)
                  py-2.5 px-5 text-center text-(--color-primary) text-lg font-semibold"
                name="minFilterPrice"
                value={minInputValue}
                onChange={handleMinInputChange}
              />

              <input
                type="text"
                inputMode="numeric"
                className="w-1/2 flex items-center justify-center bg-white rounded-(--base-b-radius)
                  py-2.5 px-5 text-center text-(--color-primary) text-lg font-semibold"
                name="maxFilterPrice"
                value={maxInputValue}
                onChange={handleMaxInputChange}
              />
            </div>

            <div
              ref={trackRef}
              className="w-full h-1 flex items-center justify-center bg-(--color-primary) relative z-0"
            >
              {/* max сначала, чтобы при одинаковом z-index min был сверху */}
              <div
                onPointerDown={(e) => handlePointerDown("maxPrice", e)}
                className="w-6 h-6 bg-(--second-primary-c) rounded-full absolute
                  cursor-pointer -translate-x-1/2"
                style={{
                  left: `${maxPercent}%`,
                  zIndex: dragType === "maxPrice" ? 20 : 10,
                }}
              />

              <div
                onPointerDown={(e) => handlePointerDown("minPrice", e)}
                className="w-6 h-6 bg-(--second-primary-c) rounded-full absolute
                  cursor-pointer -translate-x-1/2"
                style={{
                  left: `${minPercent}%`,
                  zIndex:
                    dragType === "minPrice" || minPercent >= maxPercent
                      ? 20
                      : 10,
                }}
              />
            </div>
          </>
        )}
      </div>

      <button
        onClick={filterByPrice}
        disabled={isLoading || minInputValue === "" || maxInputValue === ""}
        className="w-full h-(--btn-h) bg-(--color-primary) rounded-(--base-b-radius)
          text-(--third-primary-с) font-medium disabled:opacity-50"
      >
        {t("productsCatalog.sidebar.filterByPrice.btnText")}
      </button>
    </div>
  );
}
