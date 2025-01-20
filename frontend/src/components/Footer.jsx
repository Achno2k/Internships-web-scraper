import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg">
              Contact: <a href="mailto:amansinghh525@gmail.com" 
                         className="hover:text-primary transition duration-300">
                amansinghh525@gmail.com
              </a>
            </p>
          </div>
          
          <div className="flex space-x-6">
            {[
              { icon: <FaGithub />, url: 'https://github.com/Achno2k' },
              { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/amansingh0612/' },
              { icon: <FaInstagram />, url: 'https://www.instagram.com/am4n_singh/' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-2xl hover:text-primary transition duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="flex items-center justify-center">
            Made with <FaHeart className="text-red-500 mx-2" /> by Aman Singh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
