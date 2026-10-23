import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import FilteringByActualFilters from "./FIlteringSidebar/FilteringByActualFilters.jsx";
import FilteringByPrice from "./FIlteringSidebar/FilteringByPrice.jsx";
import closeIcon from "@imgs/icons/close.svg";

export default function FilteringSideBar({
  currentVisibleProdList,
  setCurrentVisibleProdList,
  isMobile,
  openSideBar,
  setOpenSideBar,
}) {
  const i18n = useTranslation();
  const { selectedFilters } = useSelector((state) => state.products);

  useEffect(() => {
    if (isMobile && openSideBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, openSideBar]);

  useEffect(() => {
    if (selectedFilters.length === 0) {
      setCurrentVisibleProdList([...productsList]);
      return;
    }

    if (isMobile && openSideBar) {
      setOpenSideBar(false);
    }
  }, [i18n.language]);

  return (
    <>
      {openSideBar && (
        <div className="w-svh h-full block absolute inset-0">
          <div
            className={`${
              openSideBar
                ? "w-full h-full block fixed inset-0 bg-black/60"
                : "hidden"
            } z-10 transition-all duration-300`}
            onClick={() => setOpenSideBar(false)}
          />

          <button
            className="w-10 h-10 hidden min-[360px]:flex items-center justify-center fixed top-35 left-[80%] ml-3
            rounded-(--base-b-radius) bg-white z-20"
            onClick={() => setOpenSideBar(false)}
          >
            <img src={closeIcon} className="w-3 aspect-square" />
          </button>
        </div>
      )}

      <nav
        className={`${
          openSideBar ? "w-3/5" : "w-[24.2%]"
        } min-w-72.5 max-w-112.5 
          flex flex-col items-start 
          ${isMobile ? "justify-start h-full overflow-y-auto overscroll-contain" : "justify-start h-auto"} 
          fixed top-0 left-0 lg:relative lg:top-[15%] 
          ${!isMobile ? "visible opacity-100" : "invisible opacity-0"} 
          ${openSideBar && "visible opacity-100"}
          bg-(--third-primary-с) pb-10 z-20 lg:z-auto transition-all duration-500`}
      >
        <div
          className={`w-full flex flex-col gap-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] 
         pl-7 pb-5 relative ${isMobile ? "pt-35" : ""}`}
        >
          <button
            className="w-4 relative -top-3 left-[84%] flex min-[360px]:hidden"
            onClick={() => setOpenSideBar(false)}
          >
            <img src={closeIcon} className="w-full aspect-square" />
          </button>
          
          <FilteringByPrice
            currentVisibleProdList={currentVisibleProdList}
            openSideBar={openSideBar}
          />
          <FilteringByActualFilters
            currentVisibleProdList={currentVisibleProdList}
            setCurrentVisibleProdList={setCurrentVisibleProdList}
          />
        </div>
      </nav>
    </>
  );
}
