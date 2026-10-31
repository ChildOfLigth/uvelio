import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  additionalLoadingOfProds,
  gettingProdsForNewPage,
} from "@redux/products/productsThunk.js";
import ProductCard from "@ui/ProductCard";
import spiner from "@imgs/icons/spiner.svg";

const PRODUCTS_PER_PAGE = 10;

export default function ProductsList({
  currentVisibleProdList,
  setTotalNumOfProds,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { status, endOfProdList, totalLengthOfList, selectedProductsCategory } =
    useSelector((state) => state.products);

  const [activeProdsListPage, setActiveProdsListPage] = useState(0);

  const totalNumOfPages = Math.ceil(totalLengthOfList / PRODUCTS_PER_PAGE);

  useEffect(() => {
    setActiveProdsListPage(0);
    setTotalNumOfProds(PRODUCTS_PER_PAGE);

    dispatch(gettingProdsForNewPage(0));
  }, [selectedProductsCategory]);

  const handleLoadMore = () => {
    const nextPage = activeProdsListPage + 1;
    const nextOffset = nextPage * PRODUCTS_PER_PAGE;

    setActiveProdsListPage(nextPage);
    setTotalNumOfProds(nextOffset + PRODUCTS_PER_PAGE);

    dispatch(additionalLoadingOfProds(nextOffset));
  };

  const handlePageChange = (page) => {
    const offset = page * PRODUCTS_PER_PAGE;

    setActiveProdsListPage(page);
    setTotalNumOfProds(offset + PRODUCTS_PER_PAGE);
    dispatch(gettingProdsForNewPage(offset));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 md:gap-10 relative t-0">
      {status === "loading" ? (
        <div className="w-full h-90 mx-auto">
          <img
            src={spiner}
            alt="Loading..."
            className="absolute inset-0 my-20 mx-auto w-20 h-20 z-10"
          />
        </div>
      ) : (
        <div className="relative w-full">
          <div className="flex flex-col gap-[clamp(1.5625rem,calc(1.205rem+1.786vw),2.8125rem)] pb-[clamp(2.1875rem,calc(-0.715rem+11.905vw),10rem)]">
            {status === "rejected" ||
            (status === "succeeded" && currentVisibleProdList.length === 0) ? (
              <h2 className="font-bold text-(--color-primary)/40 fixed top-0 text-center mx-auto">
                {t("productsCatalog.emptyProductsList")}
              </h2>
            ) : (
              <>
                <ul
                  className="
                  w-full
                  grid
                  grid-cols-2
                  sm:grid-cols-3
                  lg:grid-cols-[repeat(auto-fit,224px)]
                  gap-2.5
                  sm:gap-4
                  transition-opacity
                  duration-500
                  ease-in-out
                  overflow-hidden
                  md:overflow-scroll
                "
                >
                  {currentVisibleProdList.map((product) => (
                    <li key={product.id}>
                      <ProductCard productData={product} />
                    </li>
                  ))}
                </ul>

                <div className="w-full flex flex-col items-center justify-center gap-5">
                  {totalLengthOfList > PRODUCTS_PER_PAGE && (
                    <>
                      <button
                        onClick={handleLoadMore}
                        disabled={endOfProdList}
                        className={`
                        w-1/2
                        lg:w-1/3
                        h-(--btn-h)
                        flex
                        items-center
                        justify-center
                        text-white
                        text-(length:--text-sm)
                        font-medium
                        ${
                          !endOfProdList
                            ? "bg-(--second-primary-c)"
                            : "bg-(--second-primary-c)/30"
                        }
                        rounded-(--base-b-radius)
                        py-4.25
                        transition-all
                        duration-500
                      `}
                      >
                        {t("productsCatalog.loadMoreProds")}
                      </button>

                      <ul className="w-5/6 flex items-center justify-center gap-5">
                        {Array.from({ length: totalNumOfPages }).map(
                          (_, ind) => (
                            <li
                              key={ind}
                              className={`
                              w-[clamp(2.1875rem,calc(1.920rem+1.339vw),3.125rem)]
                              aspect-square
                              flex
                              items-center
                              justify-center
                              ${
                                activeProdsListPage === ind
                                  ? "text-white bg-(--second-primary-c) border-0"
                                  : "text-(--color-primary) bg-transparent border border-(--second-primary-c)/30"
                              }
                              text-(length:--text-sm)
                              rounded-(--base-b-radius)
                              transition-all
                              duration-500
                              hover:bg-(--second-primary-c)
                              hover:text-white
                            `}
                            >
                              <button
                                onClick={() => handlePageChange(ind)}
                                disabled={ind === activeProdsListPage}
                                className="w-full h-full"
                              >
                                {ind + 1}
                              </button>
                            </li>
                          ),
                        )}
                      </ul>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
