import React from "react";
import { GoArrowRight } from "react-icons/go";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import greenLeaf from "../assets/footerImages/greenLeaf.png";
import redLeaf from "../assets/footerImages/redLeaf.png";
import centerGreenLeaf from "../assets/footerImages/centerGreenLeaf.png";
import endingImage from "../assets/footerImages/endingImage2.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialMediaIcons = [FaFacebookF, FaInstagram, FaYoutube, FaXTwitter];

  return (
    <div className="bg-[var(--footer-skin-color-bg)] w-full h-fit">
      <div className="bg-[var(--color-primary)] relative w-full h-screen max-h-[600px]   flex flex-col justify-center items-center sm:rounded-t-[50%]">
        <div className="absolute max-sm:size-16 max-lg:size-28 max-xl:size-44  max-sm:top-0 left-0">
          <img src={greenLeaf} alt="Green decorative leaf" />
        </div>
        <div className="absolute max-sm:size-16 max-lg:size-28 max-xl:size-44 max-sm:top-0 right-0">
          <img src={redLeaf} alt="Red decorative leaf" />
        </div>
        <div className="content max-sm:w-10/12 w-8/12 md:w-7/12 lg:w-5/12 xl:w-5/12  flex flex-col items-center gap-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl  text-center font-heading font-extrabold text-[var(--footer-skin-color-bg)] ">
             Illuminate Your Inbox.
          </h1>
          <p className="font-text max-sm:text-xs text-amber-50 text-center text-sm">
            Join a community that celebrates light, luxury, and warmth. Subscribe to receive
             exclusive glimpses of upcoming collections, deep-dive features on the craft of
              candle making, and private invitations to special events. Your moments of serenity,
               delivered.

          </p>

         <Link to="/contact">
         
          <button className=" bg-amber-100 flex items-center justify-center px-4 py-2 w-fit font-heading font-bold ">
         Illuminate Your Inbox    <GoArrowRight />{" "}
          </button>
         </Link>
        </div>

        <div className="absolute  w-full h-full flex flex-col items-center justify-center   top-11/12">
          <div className="box w-11/12 relative bg-[var(--footer-skin-color-bg)] rounded-lg h-fit p-8 lg:p-20 flex lg:flex-row flex-col  justify-between">
            <div className="left relative z-10 font-text w-full lg:w-1/2 flex flex-col gap-6">
              <h2 className=" font-extrabold text-3xl lg:text-5xl">Join our newsletter</h2>
              <p>
                We are always looking to expand the marketing and development
                team to accelerate our growth.
              </p>
              <div className="inputAndBtn flex gap-4 w-full">
<input 
  type="text" 
  name="newsletterEmail" 
  aria-label="Enter your email for newsletter"
  className="lg:px-3 lg:py-2 px-2 py-1 w-7/12 bg-white" 
/>                <button className="lg:px-3 lg:py-2 px-2 py-1 lg:text-base text-xs w-fit text-white bg-[var(--color-primary)]">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="right  relative z-10 flex flex-col gap-2 justify-center">
              <h3 className="lg:block hidden lg:text-6xl  font-extrabold text-[var(--color-primary)]">
                CELESTARAA
              </h3>
            </div>

            <div className="centerGreenLea absolute top-0 z-0 left-0 w-full h-full flex justify-center ">
              <img src={centerGreenLeaf} alt="Center decorative leaf" />
            </div>
          </div>
          <div className="w-11/12 bg-white flex sm:flex-row flex-col gap-6 sm:gap-0 sm:justify-between py-8 ">
            <div className="left  w-full sm:w-1/2 flex flex-col gap-6">
              <h3 className="text-3xl lg:text-6xl sm:text-left text-center  font-extrabold text-[var(--color-primary)]">
                CELESTARAA
              </h3>
              <p className="text-[var(--color-primary)] sm:text-left text-center font-semibold">
                Where art, expression, and growth intertwine. Explore pottery,
                scented candles, and workshops. Join us to unleash your
                creativity and experience the magic of CERA.
              </p>
            </div>
            <div className="right flex w-full sm:w-1/2  flex-col gap-6 items-center sm:items-end">
              <p className="text-[var(--color-primary)] text-xl font-bold">
                Find Us On
              </p>
              <ul className="flex gap-4">
                {socialMediaIcons.map((IconName,i) => (
                  <li key={i} className="bg-[var(--color-primary)] p-2 rounded-full"> 
                  <a href="#" aria-label={`Follow us on ${IconName.name}`}></a>
                  <IconName className="text-white size-6"/> </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lowerImage w-full h-[600px]  flex flex-col">
            
            <img
              className="w-full h-36 object-cover"
              src={endingImage}
              alt="Artistic ending image of Celestaraa"
            />
          </div>
        </div>
      </div>
  </div>
  );
};

export default Footer;
