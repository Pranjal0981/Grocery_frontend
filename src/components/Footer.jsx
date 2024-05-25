import React from "react";
import paymentImage from "../assets/Group-2.png";
import playStoreImage from "../assets/google-play-badge-1.webp";
import appStoreImage from "../assets/google-play-badge-1.webp";

import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function FooterItem({ title, items }) {
  return (
    <div className="p-2">
      <h1 className="font-bold text-lg m-2">{title}</h1>
      <ul>
        {items.map((item, index) => (
          <div className="m-2" key={index}>
            <Link to={`/${item}`}>{item}</Link>
          </div>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-[20vh]">
      {/* top part */}
      <div className="border grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
        <FooterItem
          title="ALL POLICY"
          items={["Return Policy", "Exchange Policy", "Privacy Policy"]}
        />

        <FooterItem
          title="NEED HELP"
          items={["FAQs", "Customer Care", "Support Center"]}
        />

        <FooterItem
          title="COMPANY"
          items={["About Us", "Delivery Information","Terms & Conditions"]}
        />

        <FooterItem
          title="CORPORATE"
          items={[ "RGS Store Business"]}
        />

        
      </div>
      {/* middle part */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="h-[200px] flex flex-col justify-center items-center gap-2">
          <h1 className="m-2 font-bold text-lg">PAYMENT OPTIONS</h1>
          <img src={paymentImage} alt="Payment Options" />
        </div>
        <div className="h-[200px] flex flex-col justify-center items-center gap-2">
          <h1 className="m-2 font-bold text-lg">DOWNLOAD APP</h1>
          <div className="grid grid-cols-2 gap-2">
            <img src={playStoreImage} alt="Play Store" />
            <img src={appStoreImage} alt="App Store" />
          </div>
        </div>
        <div className="h-[200px] flex flex-col justify-center items-center gap-2">
          <h1 className="m-2 font-bold text-lg">SOCIAL MEDIA</h1>
          <div className="grid grid-cols-4 gap-2">
            <a href="#">
              <FaFacebook className="text-3xl" />
            </a>
            <a href="#">
              <FaTwitter className="text-3xl" />
            </a>
            <a href="#">
              <FaInstagram className="text-3xl" />
            </a>
            <a href="#">
              <FaYoutube className="text-3xl" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center m-2">
        <p>
          Copyright © 2024 <span className="font-bold">RGS Grocery.</span>
        </p>
        <p>
          Built and Maintained by <span className="font-bold">Mr. Pranjal Shukla</span>.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
