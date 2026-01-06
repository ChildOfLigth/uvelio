import { Outlet } from "react-router-dom";
import facebookIcon from "@imgs/icons/socialMedia/facebook.svg";
import instagramIcon from "@imgs/icons/socialMedia/instagram.svg";
import linkedinIcon from "@imgs/icons/socialMedia/linkedin.svg";
import Xicon from "@imgs/icons/socialMedia/XIcon.svg";
import youtubeIcon from "@imgs/icons/socialMedia/youtube.svg";
import uvelioLogo from "@imgs/icons/uvelio.svg";

export default function Footer() {
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
              <address className="text-2xl mb-2 max-[460px]:text-base">
                0 456 213 380
              </address>
              <p className="text-[14px] text-(--color-secondary)">Callback</p>
            </div>

            <div
              className="max-w-150 flex items-center text-[14px] font-normal w-full max-xl:flex-col max-xl:items-start max-xl:gap-4 
            max-lg:flex-row max-lg:w-1/2 max-lg:max-w-none max-md:w-3/4 max-[370px]:flex-col!"
            >
              <div className="flex flex-col text-left w-2/5 max-xl:w-full max-lg:w-1/2 max-[400px]:w-full!">
                <h4>Hotline</h4>
                <p>Daily</p>
                <div className="w-full">
                  <time dateTime="10:00">10:00 AM</time> –{" "}
                  <time dateTime="17:00">7:00 PM</time>
                </div>
              </div>

              <div className="flex flex-col text-left w-2/5 max-xl:w-full max-lg:w-1/2 max-[400px]:w-full!">
                <h4>Call center</h4>
                <p>Daily</p>
                <div className="w-full">
                  <time dateTime="10:00">10:00 AM</time> –{" "}
                  <time dateTime="17:00">7:00 PM</time>
                </div>
              </div>
            </div>
          </div>

          <div className="w-2/3 max-w-300 flex items-start justify-between gap-12 max-lg:w-full max-md:flex-wrap max-sm:gap-7 max-[470px]:text-sm max-[380px]:flex-col">
            <nav className="w-2/5 flex flex-col justify-start max-[380px]:w-full">
              <h4 className="uppercase text-lg font-medium mb-5">Categories</h4>
              <ul className="w-full max-h-72 list-none inline-flex flex-wrap flex-col gap-2">
                <li>
                  <a href="#">Rings</a>
                </li>
                <li>
                  <a href="#">Cufflinks</a>
                </li>
                <li>
                  <a href="#">Jewelry</a>
                </li>
                <li>
                  <a href="#">Tie clips</a>
                </li>
                <li>
                  <a href="#">Earrings</a>
                </li>
                <li>
                  <a href="#">Crosses</a>
                </li>
                <li>
                  <a href="#">Chains</a>
                </li>
                <li>
                  <a href="#">Table silver</a>
                </li>
                <li>
                  <a href="#">Pendants</a>
                </li>
                <li>
                  <a href="#">Sale</a>
                </li>
                <li>
                  <a href="#">Bracelets</a>
                </li>
                <li>
                  <a href="#">Gift certificates</a>
                </li>
                <li>
                  <a href="#">Brooches</a>
                </li>
                <li>
                  <a href="#">Icons</a>
                </li>
                <li>
                  <a href="#">Watches</a>
                </li>
              </ul>
            </nav>

            <nav className="w-1/3 flex flex-col justify-start max-[380px]:w-full">
              <h4 className="uppercase text-lg font-medium mb-5">About us</h4>
              <ul className="w-full list-none inline-flex flex-col justify-start gap-2">
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Contacts</a>
                </li>
                <li>
                  <a href="#">Franchising</a>
                </li>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
                <li>
                  <a href="#">User agreement</a>
                </li>
                <li>
                  <a href="#">Questions and Answers</a>
                </li>
                <li>
                  <a href="#">Loyalty program from Uvelio</a>
                </li>
              </ul>
            </nav>

            <nav className="w-1/3 flex flex-col justify-start max-sm:w-2/5 max-[380px]:w-full">
              <h4 className="uppercase text-lg font-medium mb-5">Offers</h4>
              <ul className="w-full list-none inline-flex flex-col justify-start gap-2">
                <li>
                  <a href="#">Promotions</a>
                </li>
                <li>
                  <a href="#">Sets</a>
                </li>
                <li>
                  <a href="#">Collections</a>
                </li>
                <li>
                  <a href="#">Free shipping</a>
                </li>
                <li>
                  <a href="#">Branded packaging</a>
                </li>
                <li>
                  <a href="#">Electronic certificates</a>
                </li>
                <li>
                  <a href="#">Free in-store booking</a>
                </li>
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
              <p className="inline-block w-1/3">
                © 2025 Uvelio. All rights reserved.
              </p>

              <nav className="w-1/2 flex items-center justify-between decoration-1 underline max-[450px]:text-xs max-[450px]:items-start max-[450px]:justify-start max-[450px]:gap-2">
                <a>Privacy Policy</a>
                <a>Terms of Service</a>
                <a>Cookie Settings</a>
              </nav>
            </div>

            <div className="w-1/3 flex gap-3 justify-end max-lg:justify-start">
              <img src={facebookIcon} alt="facebook icon" className="cursor-pointer"/>
              <img src={instagramIcon} alt="instagram icon" className="cursor-pointer"/>
              <img src={linkedinIcon} alt="linkedin icon"className="cursor-pointer" />
              <img src={Xicon} alt="X icon" className="cursor-pointer"/>
              <img src={youtubeIcon} alt="youtube icon" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
