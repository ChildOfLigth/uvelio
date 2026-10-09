import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../../globalVariables.js";
import {
  setSelectedProductsCategory,
  setClearAllFilters,
} from "@redux/products/productsSlice.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Scrollbar } from "swiper/modules";
import arrowIco from "@imgs/icons/arrowIco.svg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

export default function ChangeCategory() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const catalogParams = useParams();
  const navigate = useNavigate();

  const nextBtnRef = useRef(null);
  const prevBtnRef = useRef(null);
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const savedCategory = localStorage.getItem("selectedCategory");

  useEffect(() => {
    swiper?.update();
  }, [i18n, swiper]);

  useEffect(() => {
    if (catalogParams.category != undefined) {
      dispatch(setSelectedProductsCategory(catalogParams.category));
      localStorage.setItem("selectedCategory", catalogParams.category);
    }
  }, [catalogParams]);

  useEffect(() => {
    if (savedCategory) {
      dispatch(setSelectedProductsCategory(savedCategory));
    } else {
      localStorage.setItem("selectedCategory", "rings");
      dispatch(setSelectedProductsCategory("rings"));
    }
  }, []);

  const handleSelectCategory = (key) => {
    dispatch(setSelectedProductsCategory(key));
    localStorage.setItem("selectedCategory", key);
    navigate(`/uvelio/catalog/${key}`);
    dispatch(setClearAllFilters());
  };

  const categories = t(
    "productsCatalog.filterByCategory",
    RETURN_TRANSLATE_FUNC_TYPE,
  );

  return (
    <div className="relative w-full">
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        freeMode={true}
        modules={[Navigation, FreeMode, Scrollbar]}
        navigation={{
          prevEl: prevBtnRef.current,
          nextEl: nextBtnRef.current,
        }}
        scrollbar={{
          draggable: true,
          hide: false,
        }}
        onBeforeInit={(s) => {
          s.params.navigation.prevEl = prevBtnRef.current;
          s.params.navigation.nextEl = nextBtnRef.current;
        }}
        onSwiper={setSwiper}
        onSlideChange={(s) => {
          setActiveIndex(s.activeIndex);
          setIsEnd(s.isEnd);
        }}
        breakpoints={{
          320: { spaceBetween: 6 },
          768: { spaceBetween: 12 },
        }}
        className="pb-6!"
      >
        {categories.map((objData, ind) => {
          const categoryKey = Object.keys(objData)[0];
          const categoryVal = Object.values(objData)[0];

          return (
            <SwiperSlide key={ind} className="w-auto! shrink-0">
              <button
                onClick={() => handleSelectCategory(categoryKey)}
                data-category={categoryKey}
                className={`
                  flex items-center justify-center
                  whitespace-nowrap
                  rounded-(--base-b-radius)
                  px-4 py-2.5
                  text-[14px]
                  font-semibold
                  transition-colors duration-300
                  cursor-pointer
                  ${
                    categoryKey === savedCategory
                      ? "bg-(--second-primary-c) text-white"
                      : "bg-white text-(--color-primary)"
                  }
                  hover:bg-(--second-primary-c)
                  hover:text-white
                `}
              >
                {categoryVal}
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button
        ref={prevBtnRef}
        className={`${!isEnd && activeIndex === 0 && "hidden opacity-0"} w-[5.35%] h-full flex 
        min-[1634px]:hidden items-center justify-start bg-linear-to-l 
        from-transparent to-(--third-primary-с) absolute top-0 left-0 z-10 opacity-100`}
      >
        <img src={arrowIco} className="w-2.75 aspect-square rotate-180" />
      </button>

      <button
        ref={nextBtnRef}
        className={`${isEnd && "hidden opacity-0"} w-[5.35%] h-full flex min-[1634px]:hidden 
      items-center justify-end bg-linear-to-r from-transparent to-(--third-primary-с) 
      absolute top-0 right-0 z-10 opacity-100`}
      >
        <img src={arrowIco} className="w-2.75 aspect-square" />
      </button>

      <style>{`
        .swiper-scrollbar {
          width: 100% !important;
          height: 7px !important;
          background: var(--color-primary) !important;
          border-radius: 8px !important;
          bottom: 0 !important;
          left: 0 !important;
          right: 0 !important;
        }
        .swiper-scrollbar-drag {
          background: var(--second-primary-c) !important;
          border-radius: 8px !important;
          cursor: grab;
          box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.6);
        }
        .swiper-scrollbar-drag:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}
