import axios from "axios";
import { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import AgreeWithTerms from "@ui/Form/AgreeWithTerms";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../../globalVariables";
import addElementIcon from "@imgs/icons/productPage/addElementIcon.svg";
import emptyRatingStar from "@imgs/icons/productPage/ratingStarEmptyFill.svg";
import ratingStar from "@imgs/icons/productPage/ratingStar.svg";
import favoriteIconPrimaryC from "@imgs/icons/favoritePrimaryC.svg";
import { ModalWindContext } from "../../context/ModalWindContext";
import { AuthContext } from "../../context/AuthContext.jsx";
import ModalWindow from "../../ui/ModalWindow";
import { useNavigate } from "react-router-dom";

export default function ReviewBlock({
  productData,
  setAssesment,
  reviewsForProduct,
  setReviewsForProduct,
}) {
  const { t, i18n } = useTranslation();
  const authStatus = useContext(AuthContext);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const [selectedRating, setSelectedRating] = useState(0);
  const { visibleModalWindow, setVisibleModalWindow } =
    useContext(ModalWindContext);
  const ratingBlock = useRef(null);

  useEffect(() => {
    async function gettingReviewsByProdId() {
      try {
        const productId = productData.id;
        const res = await axios.get(
          "http://localhost:3000/products/get-review",
          {
            params: { productId },
          },
        );

        const reviews = res.data;

        setReviewsForProduct(reviews);
        setAssesment(reviews.length);
      } catch (err) {
        setReviewsForProduct([]);
        setAssesment(0);
      }
    }

    gettingReviewsByProdId();
  }, [i18n.language]);

  const returnReviewList = () => {
    return reviewsForProduct.length == 0 ? (
      <h3 className="text-(--color-primary)/60">
        {t("productPage.reviews.reviewBlock.noReviews")}
      </h3>
    ) : (
      reviewsForProduct.map((item) => {
        const userName = JSON.parse(item.author_name)[i18n.language];
        const responseFromManager = Boolean(item.response_from_manager);

        const returnRatingStarsElements = () => {
          const rating = 5 - item.rating;
          let ratingStarsElements = [];

          if (rating == 0) {
            ratingStarsElements = (
              <>
                <img src={ratingStar} className="h-5 aspect-square" />
                <img src={ratingStar} className="h-5 aspect-square" />
                <img src={ratingStar} className="h-5 aspect-square" />
                <img src={ratingStar} className="h-5 aspect-square" />
                <img src={ratingStar} className="h-5 aspect-square" />
              </>
            );
            return ratingStarsElements;
          }

          for (let i = 0; i < item.rating; i++) {
            ratingStarsElements.push(
              <img src={ratingStar} className="h-5 aspect-square" />,
            );
          }

          if (ratingStarsElements.length < 5) {
            for (let i = 0; i < rating; i++) {
              ratingStarsElements.push(
                <img src={emptyRatingStar} className="h-5 aspect-square" />,
              );
            }
          }

          return ratingStarsElements;
        };

        const returnDataCreatedReview = (key) => {
          const day = new Date(item[key]).getDate();
          const month = new Date(item[key]).getMonth();
          const year = new Date(item[key]).getFullYear();

          const getMonthByIndex = t(
            "productPage.reviews.reviewBlock.months",
            RETURN_TRANSLATE_FUNC_TYPE,
          )[month];
          return `${getMonthByIndex} ${day}, ${year}`;
        };

        return (
          <li
            className="w-full flex flex-col items-start justify-start gap-5 p-[clamp(1.5625rem,calc(1.294rem+1.339vw),2.5rem)] 
          bg-transparent border border-[--c-for-decorate-el] rounded-(--base-b-radius)"
            key={item.id}
          >
            <div className="w-full flex flex-col items-start justify-center gap-4">
              <div className="w-full flex flex-col md:flex-row justify-between gap-2">
                <h5 className="text-base font-bold text-(--color-primary) text-left">
                  {userName}
                </h5>

                <div className="flex items-center justify-start lg:justify-end gap-2">
                  {returnRatingStarsElements()}
                </div>
              </div>

              <p className="text-base">
                {JSON.parse(item.text)[i18n.language]}
              </p>

              <div className="w-full flex flex-col lg:flex-row items-start lg:items-end justify-center lg:justify-between">
                <div className="w-auto flex items-center justify-center gap-3">
                  <div className="w-auto flex items-center justify-center gap-2.5 px-0 py-3 lg:p-4.25">
                    <img
                      src={favoriteIconPrimaryC}
                      alt="Like review"
                      className="w-6 aspect-square"
                    />

                    <p className="text-(length:--text-sm) text-(--color-primary) font-semibold">
                      {item.likes_count}
                    </p>
                  </div>

                  <p className="text-(length:--text-sm) text-(--second-primary-c) font-medium px-0 py-3 lg:p-4.25">
                    {t("productPage.reviews.reviewBlock.replyToReview")}
                  </p>
                </div>

                <p className="text-xs text-(--color-primary)">
                  {returnDataCreatedReview("created_at")}
                </p>
              </div>
            </div>
            {responseFromManager === true && (
              <>
                <div className="block w-full h-px bg-[--c-for-decorate-el]"></div>

                <div className="w-full flex flex-col items-start justify-center gap-4">
                  <h5 className="text-base font-bold text-(--second-primary-c) text-left">
                    {t("productPage.reviews.reviewBlock.responseFromManager")}
                  </h5>

                  <p className="text-base">
                    {JSON.parse(item.manager_response_text)[i18n.language]}
                  </p>

                  <div className="w-full flex flex-col lg:flex-row items-start lg:items-end justify-center lg:justify-between">
                    <div className="w-auto flex items-center justify-center gap-3">
                      <div className="w-auto flex items-center justify-center gap-2.5 px-0 py-3 lg:p-4.25">
                        <img
                          src={favoriteIconPrimaryC}
                          alt="Like review"
                          className="w-6 aspect-square"
                        />

                        <p className="text-(length:--text-sm) text-(--color-primary) font-semibold">
                          {item.manager_response_likes}
                        </p>
                      </div>

                      <p className="text-(length:--text-sm) text-(--second-primary-c) font-medium px-0 py-3 lg:p-4.25">
                        {t("productPage.reviews.reviewBlock.replyToReview")}
                      </p>
                    </div>

                    <p className="text-xs text-(--color-primary)">
                      {returnDataCreatedReview("manager_response_date")}
                    </p>
                  </div>
                </div>
              </>
            )}
          </li>
        );
      })
    );
  };

  const returnSelectedRatingList = (selectedRating = 0) => {
    return Array.from({ length: 5 }, (_, i) => {
      return i < selectedRating ? "#372924" : "#D5C8C3";
    });
  };

  const onSubmit = (e) => {
    if (authStatus === false) {
      navigate("/uvelio/auth-form");
    } else {
      e.preventDefault();
      setVisibleModalWindow(true);
      e.target.reset();
    }
  };

  const modalWindowTextContent = t(
    "modalWindow.forProductPage",
    RETURN_TRANSLATE_FUNC_TYPE,
  );

  return (
    <div className="w-full flex flex-col items-start justify-start gap-6 md:gap-10">
      <h3 className="text-(--color-primary)">
        {t("productPage.reviews.title")}
      </h3>

      <div className="w-full flex items-start justify-center flex-col-reverse md:flex-row gap-6 lg:gap-[clamp(1.875rem,calc(0.982rem+4.464vw),5rem)]">
        <ul className="w-full md:w-1/2 flex flex-col items-start justify-start gap-5 lg:gap-8">
          {returnReviewList()}
        </ul>

        <form
          className="w-full md:w-1/2 flex flex-col items-start justify-center p-[clamp(1.5625rem,calc(1.294rem+1.339vw),2.5rem)] 
          bg-transparent border border-[--c-for-decorate-el] rounded-(--base-b-radius) gap-6 lg:gap-8"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="w-full flex flex-col items-start justify-center gap-5 lg:gap-7">
            <h5 className="text-lg font-bold text-(--color-primary)">
              {t("productPage.reviews.newReviewForm.title")}
            </h5>

            <div className="w-full flex flex-col items-start justify-center md:grid md:grid-cols-2 md:grid-rows-2 gap-4 md:gap-6">
              <input
                type="text"
                className="w-full col-span-1 py-1 border-b border-(--c-for-decorate-el) text-base text-(--c-for-decorate-el) 
                focus:border-(--color-primary) focus:text-(--color-primary)"
                placeholder={t(
                  "productPage.reviews.newReviewForm.formForCreatingReview.name",
                )}
                required
              />

              <input
                type="email"
                className="w-full col-span-1 py-1 border-b border-(--c-for-decorate-el) text-base text-(--c-for-decorate-el) 
                focus:border-(--color-primary) focus:text-(--color-primary)"
                placeholder={t(
                  "productPage.reviews.newReviewForm.formForCreatingReview.email",
                )}
                required
              />

              <input
                type="text"
                className="w-full col-span-2 py-1 border-b border-(--c-for-decorate-el) text-base text-(--c-for-decorate-el) 
                focus:border-(--color-primary) focus:text-(--color-primary)"
                placeholder={t(
                  "productPage.reviews.newReviewForm.formForCreatingReview.messageReview",
                )}
              />
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-center gap-4">
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <div className="w-full flex items-center justify-start gap-3">
                <p className="text-xs text-(--color-primary)">
                  {t(
                    "productPage.reviews.newReviewForm.formForCreatingReview.rating",
                  )}
                </p>

                <ul
                  className="w-auto flex items-center justify-center gap-2.5"
                  ref={ratingBlock}
                >
                  {returnSelectedRatingList(selectedRating).map(
                    (pathColor, ind) => (
                      <li
                        key={ind}
                        className="h-6 aspect-square changeFillToPrimaryColor cursor-pointer"
                        data-rating-val={ind + 1}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedRating(ind + 1)}
                        >
                          <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 64 64"
                            className="w-full h-full"
                          >
                            <path
                              fill={pathColor}
                              className="transition-all duration-300"
                              d="M63.893,24.277c-0.238-0.711-0.854-1.229-1.595-1.343l-19.674-3.006L33.809,1.15C33.479,0.448,32.773,0,31.998,0s-1.48,0.448-1.811,1.15l-8.815,18.778L1.698,22.935c-0.741,0.113-1.356,0.632-1.595,1.343c-0.238,0.71-0.059,1.494,0.465,2.031l14.294,14.657L11.484,61.67c-0.124,0.756,0.195,1.517,0.822,1.957c0.344,0.243,0.747,0.366,1.151,0.366c0.332,0,0.666-0.084,0.968-0.25l17.572-9.719l17.572,9.719c0.302,0.166,0.636,0.25,0.968,0.25c0.404,0,0.808-0.123,1.151-0.366c0.627-0.44,0.946-1.201,0.822-1.957l-3.378-20.704l14.294-14.657C63.951,25.771,64.131,24.987,63.893,24.277z"
                            />
                          </svg>
                        </button>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="w-auto flex gap-1 items-center text-(--color-primary)">
                <h5 className="text-base font-bold">
                  {t(
                    "productPage.reviews.newReviewForm.formForCreatingReview.uploadPhoto",
                  )}
                </h5>
                <span className="text-xs">(JPG, PNG max 5Mb)</span>
              </div>

              <div className="w-full flex flex-wrap xl:flex-nowrap flex-row items-start justify-start gap-1.5 md:gap-2.5">
                {Array.from({ length: 5 }).map((_, ind) => (
                  <div
                    key={ind}
                    className="w-[20%] min-w-17 max-w-25 aspect-square flex items-center justify-center rounded-(--base-b-radius) 
                  border border-(--color-primary)"
                  >
                    <label
                      htmlFor="photoProduct"
                      className="w-6 h-6 flex items-center justify-center bg-(--second-primary-c) rounded-full pointer p-0.5 cursor-pointer"
                    >
                      <img
                        src={addElementIcon}
                        className="w-5/6 aspect-square"
                      />
                      <input id="photoProduct" type="file" className="hidden" />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`w-full h-(--btn-h) rounded-(--base-b-radius) text-white text-(length:--text-sm) transition duration-500
              ${!checked ? "bg-(--spare-color)" : "bg-(--second-primary-c)"}`}
              disabled={!checked}
              typeof="submit"
            >
              {t("productPage.reviews.newReviewForm.sendReview")}
            </button>

            <AgreeWithTerms checked={checked} setChecked={setChecked} />
          </div>
        </form>
      </div>

      {visibleModalWindow && (
        <ModalWindow
          title={modalWindowTextContent.title}
          text={modalWindowTextContent.text}
          btnText={modalWindowTextContent.btnText}
        />
      )}
    </div>
  );
}
