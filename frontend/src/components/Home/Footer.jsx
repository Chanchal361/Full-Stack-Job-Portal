

import React from "react";
import { FaFacebookF, FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex-shrink-0">
              <img
                src="https://img.freepik.com/premium-vector/reach-best-job-seekers-logo-design-template_448617-242.jpg"
                alt="Flowbite Logo"
                className="h-10 w-10 rounded-full"
              />
            </div>
            <div className="ml-3 text-white">
              <h1 className="text-xl font-bold">Job Portal</h1>
            </div>
          </div>
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaGithub />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaGlobe />
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <h2 className="text-gray-500 font-bold uppercase mb-2">
              Resources
            </h2>
            <ul>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  React js
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h2 className="text-gray-500 font-bold uppercase mb-2">
              Follow Us
            </h2>
            <ul>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Github
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Discord
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h2 className="text-gray-500 font-bold uppercase mb-2">Legal</h2>
            <ul>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-500">
            &copy; 2024 Raja Job™. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
