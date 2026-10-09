import { useTranslation } from "react-i18next";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../globalVariables.js";
import photoAboutUsHeroBlock from "@imgs/photoAboutUsHeroBlock.webp";
import decorateCollectionBlock from "@imgs/aboutUsCollectionBlock.webp";
import quotationMark from "@imgs/icons/aboutUs/quotationMark.svg";
import geolocationMark from "@imgs/icons/aboutUs/geolocation.svg";
import desctop from "@imgs/icons/aboutUs/desctop.svg";
import stylishPacking from "@imgs/icons/aboutUs/stylishPacking.svg";
import productIcon from "@imgs/icons/aboutUs/productIcon.svg";
import loyalty from "@imgs/icons/aboutUs/loyalty.svg";
import paymentInInstallments from "@imgs/icons/aboutUs/paymentInInstallments.svg";

export function AboutUs() {
  const { t } = useTranslation();
  const benefitsBlockIcons = [
    paymentInInstallments,
    stylishPacking,
    productIcon,
    loyalty,
    desctop,
  ];

  return (
    <>
      <div className="w-full bg-(--color-primary) flex items-start justify-center h-[70svh] md:h-190.25 relative overflow-hidden">
        <div className="w-full h-full flex items-center justify-center mx-auto relative z-30">
          <div
            className="w-(--main-content-block-w) text-(--third-primary-с) inline-flex flex-col 
            items-start gap-[clamp(30px,5vw,50px)]"
          >
            <div className="w-full inline">
              <h1 className="font-bold">{t("aboutUs.heroBlock.title")}</h1>
              <h3>{t("aboutUs.heroBlock.subtitle")}</h3>
            </div>

            <div className="w-5/6 md:w-[55%] inline-flex flex-col gap-2.5 ">
              <h5 className="font-bold leading-(--base-lh)">
                {t("aboutUs.heroBlock.descriptionBlock.title")}
              </h5>
              <h5 className="text-[#E1D6B7]">
                {t("aboutUs.heroBlock.descriptionBlock.description")}
              </h5>
            </div>
          </div>
        </div>

        <div
          className="w-full h-full absolute bg-(--color-primary)/70 lg:bg-(--color-primary)/40 
        z-20"
        ></div>
        <img
          loading="lazy"
          src={photoAboutUsHeroBlock}
          alt="Decorate ring"
          className="w-full min-w-210 md:min-w-0 md:w-auto h-full absolute top-0 lg:-top-[18%] md:right-5 z-10 
          scale-100 md:scale-130 -rotate-[13.05deg]"
        />
      </div>

      <div
        className="w-(--main-content-block-w) max-w-420 flex flex-col justify-center mx-auto gap-[clamp(3.125rem,calc(1.339rem+8.929vw),9.375rem)]
      my-[clamp(3.125rem,calc(1.339rem+8.929vw),9.375rem)]"
      >
        <section className="w-full flex items-center justify-center bg-white rounded-(--base-b-radius)">
          <div
            className="w-5/6 md:w-[70%] flex flex-col items-end justify-center 
          py-[clamp(1.875rem,calc(1.544rem+1.652vw),3.03125rem)] gap-3 md:gap-0 font-bold text-(--color-primary)"
          >
            <div className="w-full flex justify-start gap-5 ">
              <img
                loading="lazy"
                src={quotationMark}
                className="w-[6.9%] min-w-6.25"
                alt="Decorate element"
              />

              <h5>{t("aboutUs.ourGoal.title")}</h5>
            </div>

            <div className="w-[90%]">
              <h4>{t("aboutUs.ourGoal.description")}</h4>
            </div>
          </div>
        </section>

        <section className="w-full h-auto flex flex-col-reverse md:flex-row items-center gap-5 md:gap-10">
          <div className="w-full md:w-[50.6%] rounded-(--base-b-radius) overflow-hidden">
            <img
              loading="lazy"
              src={decorateCollectionBlock}
              alt="Two decorative silver rings"
            />
          </div>

          <div className="w-full h-full md:w-[49.4%] flex flex-col justify-between gap-4 text-(--color-primary)">
            <div className="w-full flex flex-col gap-3">
              <div className="w-full flex flex-col gap-2">
                <h5 className="font-bold">
                  {t("aboutUs.uvelioCollectionsBlock.title")}
                </h5>
                <h5>{t("aboutUs.uvelioCollectionsBlock.description")}</h5>
              </div>
            </div>

            <ul className="w-full flex flex-col gap-3">
              {t(
                "aboutUs.uvelioCollectionsBlock.list",
                RETURN_TRANSLATE_FUNC_TYPE,
              ).map((item, ind) => (
                <li
                  className="w-full flex items-center justify-start gap-5 text-[14px] 
                    leading-loose"
                  key={ind}
                >
                  <img
                    loading="lazy"
                    src={geolocationMark}
                    className="w-4.25 h-5.25"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <h5 className="font-(family-name:--decorative-font-f)">
              {t("aboutUs.uvelioCollectionsBlock.summaryText")}
            </h5>
          </div>
        </section>

        <section className="w-full flex flex-col md:flex-row items-center gap-6 md:justify-between">
          <div className="w-full md:w-[49.3%] flex flex-col items-start text-(--color-primary) gap-5 md:gap-7">
            <div>
              <div className="mb-3.5">
                <h5 className="font-bold mb-3">
                  {t("aboutUs.companyToday.title")}
                </h5>
                <h5 className="w-[95%]">
                  {t("aboutUs.companyToday.description")}
                </h5>
              </div>

              <ul>
                {t(
                  "aboutUs.companyToday.listOfBenefits",
                  RETURN_TRANSLATE_FUNC_TYPE,
                ).map((text, ind) => (
                  <li key={ind} className="text-sm leading-normal">
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-base font-(family-name:--decorative-font-f)">
              {t("aboutUs.companyToday.summaryText")}
            </p>
          </div>

          <div
            className="w-full md:w-[47.75%] flex flex-col items-center justify-center 
          rounded-(--base-b-radius) text-[14px] overflow-hidden"
          >
            <div className="w-full bg-(--second-primary-c) py-[clamp(1.5625rem,calc(1.0705rem+2.460vw),3.284375rem)]">
              <ul
                className="w-[80%] flex flex-wrap lg:flex-nowrap justify-between items-start gap-[clamp(1.5625rem,calc(0.9375rem+3.125vw),3.75rem)]
              mx-auto text-(--color-primary)"
              >
                {t(
                  "aboutUs.companyToday.benefitsBlock.topPart",
                  RETURN_TRANSLATE_FUNC_TYPE,
                ).map((item, ind) => (
                  <li
                    key={ind}
                    className={`${ind == 0 ? "w-[25%]" : "flex-auto"} w-auto flex flex-col items-start gap-3`}
                  >
                    <h4 className="font-bold">{item.count}</h4>
                    {item.desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full bg-(--color-primary) py-[clamp(1.5625rem,calc(1.134rem+2.143vw),3.0625rem)]">
              <ul
                className="w-[80%] grid grid-cols-2 lg:grid-cols-3 gap-[clamp(1.5625rem,calc(0.9375rem+3.125vw),3.75rem)]
              mx-auto text-white"
              >
                {t(
                  "aboutUs.companyToday.benefitsBlock.bottomPart",
                  RETURN_TRANSLATE_FUNC_TYPE,
                ).map((item, ind) => (
                  <li
                    key={ind}
                    className="col-span-1 flex flex-col items-start gap-3"
                  >
                    <img
                      loading="lazy"
                      src={benefitsBlockIcons[ind]}
                      className="w-6 h-6"
                    />
                    <p className="w-auto">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
