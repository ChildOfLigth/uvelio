import arrowIcon from "@imgs/icons/arrowIco.svg";

export default function SwiperNextBtn({ ref, activeIndex, lengthCatalog }) {
  const isLast = activeIndex + ref.current?.slidesPerViewDynamic() >= lengthCatalog;

  return (
    <button
      className={`w-10 h-10 flex items-center justify-center rounded-lg py-4.5 px-4 
      ${isLast ? "bg-white/30" : "bg-white"} transition-all ease-in duration-300`}
      ref={ref}
      onClick={() => ref.current?.slideNext()}
    >
      <img src={arrowIcon} className="w-3.25" alt=">" />
    </button>
  );
}
