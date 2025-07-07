import React from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaDiscord, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-bg-dark text-text-light border-t-2 border-gray-800 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="col-span-1">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-300 bg-clip-text text-transparent">SaaSFlow</h2>
          <p className="text-text-muted mt-2 mb-4">
                       Build, deploy, and scale your SaaS application with our AI-powered platform.
          </p>
          <div className="flex space-x-4 text-sm text-text-muted">
            <a href="#" className="hover:text-accent">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-accent">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-accent">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-accent">
              <FaDiscord />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">PRODUCT</h4>
          <ul className="space-y-1 text-text-muted text-sm">
            <li><a href="#" className="hover:text-accent">Features</a></li>
            <li><a href="#" className="hover:text-accent">Pricing</a></li>
            <li><a href="#" className="hover:text-accent">Use Cases</a></li>
            <li><a href="#" className="hover:text-accent">Roadmap</a></li>
            <li><a href="#" className="hover:text-accent">Changelog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">RESOURCES</h4>
          <ul className="space-y-1 text-text-muted text-sm">
            <li><a href="#" className="hover:text-accent">Documentation</a></li>
            <li><a href="#" className="hover:text-accent">Guides</a></li>
            <li><a href="#" className="hover:text-accent">API Reference</a></li>
            <li><a href="#" className="hover:text-accent">Community</a></li>
            <li><a href="#" className="hover:text-accent">Templates</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">COMPANY</h4>
          <ul className="space-y-1 text-text-muted text-sm">
            <li><a href="#" className="hover:text-accent">About</a></li>
            <li><a href="#" className="hover:text-accent">Blog</a></li>
            <li><a href="#" className="hover:text-accent">Careers</a></li>
            <li><a href="#" className="hover:text-accent">Contact</a></li>
            <li><a href="#" className="hover:text-accent">Media Kit</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">LEGAL</h4>
          <ul className="space-y-1 text-text-muted text-sm">
            <li><a href="#" className="hover:text-accent">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-accent">Terms of Service</a></li>
            <li><a href="#" className="hover:text-accent">Cookie Policy</a></li>
            <li><a href="#" className="hover:text-accent">GDPR</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-text-muted">
        <p>© 2025 SaaSFlow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
