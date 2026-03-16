import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import { Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import ProductCard from "@ui/ProductCard.jsx";
import SwiperNextBtn from "./SwiperNextBtn";
import SwiperPrevBtn from "./SwiperPrevBth";

export default function SwiperCatalog({ catalog, titleSwiper }) {
  const refPrevBtn = useRef(null);
  const refNextBtn = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="w-full max-w-447.5 flex-col items-center justify-start">
        <h2 className="text-left">{titleSwiper}</h2>
        <div className="w-full flex items-center justify-end ml-auto mb-4">
          <div className="w-auto flex items-center gap-4">
            <SwiperPrevBtn ref={refPrevBtn} activeIndex={activeIndex} />
            <SwiperNextBtn
              ref={refNextBtn}
              activeIndex={activeIndex}
              lengthCatalog={catalog.length}
            />
          </div>
        </div>
        <Swiper
          tag="ul"
          className="w-full"
          slidesPerView={5}
          spaceBetween={16.2}
          modules={Grid}
          breakpoints={{
            320: {
              spaceBetween: 15,
              slidesPerView: 1.5,
            },
            500: {
              spaceBetween: 10,
              slidesPerView: 3,
            },
            1000: {
              slidesPerView: 4,
            },
            1250: {
              slidesPerView: 5,
            },
          }}
          onSwiper={(swiper) => {
            refPrevBtn.current = swiper;
            refNextBtn.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {catalog.map((product) => (
            <SwiperSlide key={product.id} tag="li">
              <ProductCard
                productData={product}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
