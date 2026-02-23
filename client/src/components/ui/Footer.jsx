import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RETURN_TRANSLATE_FUNC_TYPE } from "../../globalVariables";

import facebookIcon from "@imgs/icons/socialMedia/facebook.svg";
import instagramIcon from "@imgs/icons/socialMedia/instagram.svg";
import linkedinIcon from "@imgs/icons/socialMedia/linkedin.svg";
import Xicon from "@imgs/icons/socialMedia/XIcon.svg";
import youtubeIcon from "@imgs/icons/socialMedia/youtube.svg";
import uvelioLogo from "@imgs/icons/uvelio.svg";

import NavToCatalog from "./NavToCatalog";

export default function Footer() {
  const { t, i18n } = useTranslation();

  const catalogLinksWithFilter = [
    ...t("footer.siteNavigation.category.links", RETURN_TRANSLATE_FUNC_TYPE),
  ];
  const aboutUsLinks = [
    ...t("footer.siteNavigation.aboutUs.links", RETURN_TRANSLATE_FUNC_TYPE),
  ];
  const offersLink = [
    ...t("footer.siteNavigation.offers.links", RETURN_TRANSLATE_FUNC_TYPE),
  ];

  return (
    <>
      <Outlet />

      <footer className="flex flex-col bg-white w-full h-auto">
        <div className="w-[90%] flex flex-col pt-8 pb-10 ml-auto mr-auto gap-10 lg:flex-row">
          <div className="w-full flex flex-col gap-8 text-(--color-primary) lg:w-1/4 xl:w-1/3">
            <div className="w-full flex flex-col justify-start">
              <img
                src={uvelioLogo}
                className="w-40 mb-5"
                alt="Uvelio logotype"
              />
              <address className="text-base [460px]:text-2xl [460px]:mb-2">
                0 456 213 380
              </address>
              <p className="text-[14px] text-(--second-primary-с)">
                {t("footer.communicationMethods.description")}
              </p>
            </div>

            <div className="max-w-150 flex flex-col text-[14px] font-normal gap-6 sm:flex-row sm:gap-8">
              <div className="flex flex-col text-left w-full sm:w-1/2">
                <h4>{t("footer.communicationMethods.hotline.title")}</h4>
                <p className="text-(length:--base-p-size)">{t("footer.communicationMethods.hotline.days")}</p>

                <div className="w-full">
                  <time dateTime="10:00">
                    {t("footer.communicationMethods.hotline.startTime")}
                  </time>
                  –{" "}
                  <time dateTime="19:00">
                    {t("footer.communicationMethods.hotline.endTime")}
                  </time>
                </div>
              </div>

              <div className="flex flex-col text-left w-full sm:w-1/2">
                <h4>{t("footer.communicationMethods.callCenter.title")}</h4>
                <p className="text-(length:--base-p-size)">{t("footer.communicationMethods.callCenter.days")}</p>
                <div className="w-full">
                  <time dateTime="10:00">
                    {t("footer.communicationMethods.callCenter.startTime")}
                  </time>
                  –{" "}
                  <time dateTime="19:00">
                    {t("footer.communicationMethods.callCenter.endTime")}
                  </time>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-300 lg:w-2/3 h-auto flex items-start justify-between flex-col sm:flex-row flex-wrap lg:flex-nowrap gap-7">
            <nav className={`w-5/6 h-auto flex flex-col justify-start min-[380px]:w-auto ${i18n.language == "en" ? "min-[380px]:min-w-65.25" : ""}`}>
              <h4 className="uppercase text-lg font-medium mb-5">
                {t("footer.siteNavigation.category.title")}
              </h4>

              <div className={`w-full max-h-72 max-w-88.75 flex justify-between items-start
              ${i18n.language != "en" ? "max-h-none flex-col min-[450px]:flex-row min-[450px]:gap-5" : ""} list-none`}>
                <ul className="flex flex-col items-start gap-2">
                  {catalogLinksWithFilter.slice(0, 8).map((link, ind) => (
                  <li key={ind} className="flex items-center">
                    <NavToCatalog filter={link.filter} styles={"text-[14px]"}>
                      {link.text}
                    </NavToCatalog>
                  </li>
                ))}
                </ul>

                <ul className="flex flex-col items-start gap-2">
                  {catalogLinksWithFilter.slice(8).map((link, ind) => (
                  <li key={ind} className="flex items-center">
                    <NavToCatalog filter={link.filter} styles={"text-[14px]"}>
                      {link.text}
                    </NavToCatalog>
                  </li>
                ))}
                </ul>
              </div>
            </nav>

            <nav className="w-5/6 flex flex-col justify-start min-[380px]:w-auto">
              <h4 className="uppercase text-lg font-medium mb-5">
                {t("footer.siteNavigation.aboutUs.title")}
              </h4>
              <ul className="w-full list-none flex flex-col justify-start gap-2">
                {aboutUsLinks.map((item, ind) => (
                  <li key={ind}>
                    <a href={item.href} className="wrap-anywhere text-[14px]">{item.text}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="w-5/6 flex flex-col justify-start min-[380px]:w-auto">
              <h4 className="uppercase text-lg font-medium mb-5">
                {t("footer.siteNavigation.offers.title")}
              </h4>
              <ul className="w-full list-none flex flex-col justify-start gap-2">
                {offersLink.map((item, ind) => (
                  <li key={ind}>
                    <a href="/uvelio/" className="wrap-anywhere text-[14px]">{item}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex items-center justify-end h-1/3 bg-(--color-primary) py-5">
          <div className="w-[90%] flex items-center justify-between m-auto max-lg:flex-col max-lg:gap-5 max-lg:items-start">
            <div
              className="w-5/6 max-w-none min-w-none md:w-3/5 md:max-w-200 md:min-w-192.5 flex items-start justify-start flex-col md:flex-row 
              md:items-center gap-4 md:gap-8 text-white"
            >
              <p className="w-full md:w-1/3 inline-block text-base">
                © 2025 Uvelio. All rights reserved.
              </p>

              <nav className="flex flex-row flex-wrap gap-3 sm:gap-6 underline decoration-1">
                <a className="wrap-break-word">Privacy Policy</a>
                <a className="wrap-break-word">Terms of Service</a>
                <a className="wrap-break-word">Cookie Settings</a>
              </nav>
            </div>

            <div className="w-1/3 flex gap-3 justify-start lg:justify-end">
              <img
                src={facebookIcon}
                alt="facebook icon"
                className="cursor-pointer"
              />
              <img
                src={instagramIcon}
                alt="instagram icon"
                className="cursor-pointer"
              />
              <img
                src={linkedinIcon}
                alt="linkedin icon"
                className="cursor-pointer"
              />
              <img src={Xicon} alt="X icon" className="cursor-pointer" />
              <img src={youtubeIcon} alt="youtube icon" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
