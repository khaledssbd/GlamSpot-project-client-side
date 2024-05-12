import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="mt-30 bg-[#030712] px-5 md:px-20">
      <footer className="footer footer-center mt-30 bg-[#030712] py-5 md:py-10 px-5 md:px-20 text-primary-content">
        <aside>
          <div className="mb-5">
            <Link
              to="/"
              className="btn btn-ghost hover:bg-white hover:text-black text-3xl md:text-4xl font-extrabold md:mb-4"
              data-aos="flip-up"
            >
              <button className="flex justify-center items-center gap-1 md:gap-2">
                <img
                  className="w-5 md:w-10 rounded-lg"
                  src="/favicon.png"
                  alt=""
                />
                <span className="bg-gradient-to-r from-primary to-red-500 text-transparent bg-clip-text">
                  GlamSpot
                </span>
              </button>
            </Link>
            <p
              className="text-white text-sm md:text-lg font-normal"
              data-aos="zoom-out-right"
            >
              GlamSpot is the most popular platform for your <br /> next tourism
              arrangement.
            </p>
          </div>
          <p className="font-bold text-white">
            228C San Pablo St. Vallejo, CA 94591 <br />
            Email: khaled@PH.com
          </p>
          <p className="text-white">Copyright © 2024 - All right reserved</p>
        </aside>
        <nav>
          <div className="flex gap-4 text-xl md:text-3xl mb-3">
            <a
              href="https://www.facebook.com/mdkhaledsshuvo"
              className="text-[#1877F2] cursor-pointer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com/mdkhaledsshuvo"
              className="text-[#1DA1F2] cursor-pointer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/mdkhaledsshuvo"
              className="text-[#E1306C] cursor-pointer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/mdkhaledsshuvo"
              className="text-[#0077B5] cursor-pointer"
            >
              <FaLinkedin />
            </a>
          </div>
        </nav>
      </footer>
    </footer>
  );
};

export default Footer;
