import { useSwiper } from "swiper/react";
import arrowIcon from "@imgs/icons/arrowIco.svg";

export default function SwiperNextBtn({ ref }) {
  const swiper = useSwiper();
  return (
    <button
      className="w-10 h-10 flex items-center justify-center rounded-lg py-4.5 px-4 bg-white"
      ref={ref}
      onClick={() => ref.current?.slideNext()}
    >
      <img src={arrowIcon} className="w-3.25" />
    </button>
  );
}
