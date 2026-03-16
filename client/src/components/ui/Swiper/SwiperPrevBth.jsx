import arrowIcon from "@imgs/icons/arrowIco.svg";

export default function SwiperPrevBtn({ ref, activeIndex }) {
  return (
    <button
      className={`w-10 h-10 flex items-center justify-center rounded-lg py-4.5 px-4 
      ${activeIndex == 0 ? "bg-white/30" : "bg-white"} transition-all ease-in duration-300`}
      ref={ref}
      onClick={() => ref.current?.slidePrev()}
      disabled={activeIndex == 0}
    >
      <img src={arrowIcon} className="w-3.25 rotate-180" alt="<"/>
    </button>
  );
}
