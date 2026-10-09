import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../globalVariables";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useConvertionPrice from "@hooks/useConvertionPrice";
import CustomInput from "@ui/Form/CustomInput";
import AgreeWithTerms from "@ui/Form/AgreeWithTerms";
import { ModalWindContext } from "../context/ModalWindContext";
import ModalWindow from "../ui/ModalWindow";
import { addProductToPurchasedGoods } from "@redux/userAccount/accountThunk";

export default function CheckoutPage() {
  const { t, i18n } = useTranslation();
  const locationState = useLocation().state;
  const { purchasedGoods, username, email } =
    useSelector((state) => state.userAccount.accountData.userData) || [];
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const { visibleModalWindow, setVisibleModalWindow } =
    useContext(ModalWindContext);
  const navigate = useNavigate();

  const presentPrice = useConvertionPrice(locationState.price);
  const parsedName = username?.split(" ");

  const paymentMethodsList = t(
    "checkoutPage.form.paymentMethodBlock.methodsList",
    RETURN_TRANSLATE_FUNC_TYPE,
  );

  const modalWindowTextContent = t(
    "modalWindow.forCheckoutPage",
    RETURN_TRANSLATE_FUNC_TYPE,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const idCurrentProd = locationState.prodId;

    if (purchasedGoods != undefined) {
      dispatch(addProductToPurchasedGoods(idCurrentProd));
      setVisibleModalWindow(true);
      navigate(-1);
    };
  };

  return (
    <>
      <div
        className="w-[90%] md:w-5/6 xl:w-4/5 max-w-342.5 flex flex-col items-start mx-auto md:justify-start   
    py-[clamp(1.5625rem,calc(1.116rem+2.232vw),3.125rem)] gap-5 relative"
      >
        <h3 className="text-(--color-primary) font-bold">
          {t("checkoutPage.title")}
        </h3>

        <div className="w-full flex flex-col-reverse xl:flex-row items-start justify-start gap-[clamp(1rem,calc(0.643rem+1.786vw),2.25rem)] relative">
          <form
            className="w-full md:w-2/3 xl:w-1/2 flex flex-col items-center justify-start gap-5 relative"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="w-full flex flex-col items-strt justify-start rounded-(--base-b-radius) bg-(--second-primary-c)/30 py-5 md:py-8.5 px-6.5 md:px-10">
              <div className="w-full flex flex-col items-start text-(--color-primary) mb-3.5">
                <h5 className="text-base font-extrabold">
                  {t("checkoutPage.form.personalDataBlock.titleBlock.title")}
                </h5>
                <p className="w-full md:w-3/4 text-sm">
                  {t("checkoutPage.form.personalDataBlock.titleBlock.subTitle")}
                </p>
              </div>

              <div className="w-full flex flex-col items-center justify-center gap-3">
                <CustomInput
                  placeholder={t(
                    "checkoutPage.form.personalDataBlock.placeholders.name",
                  )}
                  name="userName"
                  value={parsedName !== undefined && parsedName[0]}
                />
                <CustomInput
                  placeholder={t(
                    "checkoutPage.form.personalDataBlock.placeholders.surname",
                  )}
                  name="userSurname"
                  value={parsedName !== undefined ? parsedName[1] : ""}
                />
                <CustomInput
                  placeholder={t(
                    "checkoutPage.form.personalDataBlock.placeholders.phoneNumber",
                  )}
                  name="phoneNumber"
                  type="tel"
                />
                <CustomInput
                  placeholder={t(
                    "checkoutPage.form.personalDataBlock.placeholders.email",
                  )}
                  name="email"
                  type="email"
                  value={email !== undefined ? email : ""}
                />
              </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center rounded-(--base-b-radius) bg-(--second-primary-c)/30 py-5 md:py-8.5 px-6.5 md:px-10 gap-3">
              <div className="w-full flex flex-col items-start text-(--color-primary) mb-2">
                <h5 className="text-base font-extrabold">
                  {t("checkoutPage.form.deliveryLocation.title")}
                </h5>
              </div>

              <div className="w-full flex flex-col items-center justify-center gap-3">
                <CustomInput
                  placeholder={t(
                    "checkoutPage.form.deliveryLocation.placeholdres.country",
                  )}
                  name="country"
                />
                <CustomInput
                  placeholder={t(
                    "checkoutPage.form.deliveryLocation.placeholdres.city",
                  )}
                  name="city"
                />
              </div>
            </div>

            <div
              className="w-full flex flex-col items-start justify-center rounded-(--base-b-radius) bg-(--second-primary-c)/30 
          py-5 md:py-8.5 px-6.5 md:px-10 gap-3"
            >
              <h5 className="text-base font-extrabold mb-2">
                {t("checkoutPage.form.paymentMethodBlock.title")}
              </h5>

              <div className="w-full flex flex-col items-start justify-start gap-4">
                {paymentMethodsList.map((item, ind) => (
                  <div
                    className="w-full md:w-3/4 flex flex-row items-center justify-start gap-3 md:gap-6"
                    key={ind}
                  >
                    <div className="h-6 aspect-square relative inset-0">
                      <label
                        htmlFor="paymentMethod"
                        className="w-full h-full flex items-center justify-center ralative inset-0 bg-white border-2 border-(--color-primary) 
                    cursor-pointer rounded-[50%]"
                      >
                        <div
                          className={`${selectedPaymentMethod == ind ? "w-3/5 aspect-square rounded-[50%] bg-(--color-primary)/80" : ""}`}
                        ></div>
                      </label>

                      <input
                        type="radio"
                        name="paymentMethod"
                        className="w-full h-full absolute inset-0 opacity-0"
                        onChange={() => setSelectedPaymentMethod(ind)}
                        required
                      />
                    </div>

                    <div className="flex flex-col items-start justify-start text-(--color-primary)">
                      <h6 className="text-sm font-bold">{item.baseText}</h6>
                      <p className="text-xs">{item.detailedDesc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <AgreeWithTerms checked={checked} setChecked={setChecked} />

            <button
              className={`w-full h-(--btn-h) rounded-(--base-b-radius) ${checked ? "bg-(--color-primary)" : "bg-(--spare-color)"} text-white
            transition-all duration-300`}
              disabled={!checked}
              type="submit"
            >
              {t("checkoutPage.form.btnText")}
            </button>
          </form>

          <div className="w-full md:w-3/5 xl:w-1/2 flex items-start justify-start gap-3 relative xl:sticky xl:-right-10 xl:top-[25%]">
            <img
              src={locationState.imgSrc}
              alt={locationState.name}
              className="w-1/3 rounded-(--base-b-radius)"
            />

            <div className="w-2/3 flex flex-col items-start justify-center gap-2 text-(--color-primary)">
              <h5 className="text-(--spare-color) font-bold">
                {t("checkoutPage.productData.prodId")}: {locationState.prodId}
              </h5>

              <h5 className="font-medium">
                {JSON.parse(locationState.name)[i18n.language].slice(0, 30) +
                  "..."}
              </h5>

              <div className="w-full flex items-start gap-3">
                <h5>
                  {t("checkoutPage.productData.size")}: {locationState.size}
                </h5>

                <h5>
                  {t("checkoutPage.productData.weight")}: {locationState.weight}
                </h5>
              </div>

              <h5 className="font-medium">
                {t("checkoutPage.productData.price")}: {presentPrice}
              </h5>
            </div>
          </div>
        </div>
      </div>

      <>
        {visibleModalWindow && (
          <ModalWindow
            title={modalWindowTextContent.title}
            text={modalWindowTextContent.text}
            btnText={modalWindowTextContent.btnText}
          />
        )}
      </>
    </>
  );
}
