import { Outlet, Link } from "react-router-dom";
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

  const createLinks = (arrayLinks, href) => {
    return arrayLinks.map((link, ind) => <Link to={href} key={ind}>{link}</Link>);
  };

  return (
    <>
      <Outlet />
      <footer className="flex flex-col bg-white w-full h-auto">
        <div className="w-[90%] flex items-start pt-8 pb-10 ml-auto mr-auto max-lg:flex-col ">
          <div className="w-1/3 flex flex-col items-start gap-8 text-(--color-primary) max-xl:w-1/4 max-lg:flex-row max-lg:w-3/4 max-lg:mb-5 max-md:w-full">
            <div className="w-full flex flex-col justify-start max-lg:w-1/2">
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

            <div
              className="max-w-150 flex items-center text-[14px] font-normal w-full max-xl:flex-col max-xl:items-start max-xl:gap-4 
            max-lg:flex-row max-lg:w-1/2 max-lg:max-w-none max-md:w-3/4 max-[370px]:flex-col!"
            >
              <div className="flex flex-col text-left w-2/5 max-xl:w-full max-lg:w-1/2 max-[400px]:w-full!">
                <h4>{t("footer.communicationMethods.hotline.title")}</h4>
                <p>{t("footer.communicationMethods.hotline.days")}</p>
                <div className="w-full">
                  <time dateTime="10:00">
                    {t("footer.communicationMethods.hotline.startTime")}
                  </time>{" "}
                  –{" "}
                  <time dateTime="19:00">
                    {t("footer.communicationMethods.hotline.endTime")}
                  </time>
                </div>
              </div>

              <div className="flex flex-col text-left w-2/5 max-xl:w-full max-lg:w-1/2 max-[400px]:w-full!">
                <h4>{t("footer.communicationMethods.callCenter.title")}</h4>
                <p>{t("footer.communicationMethods.callCenter.days")}</p>
                <div className="w-full">
                  <time dateTime="10:00">
                    {t("footer.communicationMethods.callCenter.startTime")}
                  </time>{" "}
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
              className="w-3/5 max-w-200 min-w-192.5 flex items-center justify-start gap-8 text-white 
            text-base font-normal max-lg:max-w-none max-md:flex-col max-md:gap-4 max-md:items-start "
            >
              <p className="inline-block w-1/3 text-base!">
                © 2025 Uvelio. All rights reserved.
              </p>

              <nav className="w-1/2 flex items-center justify-between decoration-1 underline max-[450px]:text-xs max-[450px]:items-start max-[450px]:justify-start max-[450px]:gap-2">
                <a>Privacy Policy</a>
                <a>Terms of Service</a>
                <a>Cookie Settings</a>
              </nav>
            </div>

            <div className="w-1/3 flex gap-3 justify-end max-lg:justify-start">
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
