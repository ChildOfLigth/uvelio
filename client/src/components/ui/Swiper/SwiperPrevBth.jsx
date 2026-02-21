import { useSwiper } from "swiper/react";
import arrowIcon from "@imgs/icons/arrowIco.svg";

export default function SwiperPrevBtn({ ref }) {
  const swiper = useSwiper();
  return (
    <button
      className="w-10 h-10 flex items-center justify-center rounded-lg py-4.5 px-4 bg-white/30"
      ref={ref}
      onClick={() => ref.current?.slidePrev()}
    >
      <img src={arrowIcon} className="w-3.25 rotate-180" />
    </button>
  );
}
