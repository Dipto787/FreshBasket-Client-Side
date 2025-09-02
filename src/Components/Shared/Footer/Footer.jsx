import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-600 to-green-800 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Services */}
        <div>
          <h6 className="text-lg font-semibold border-b-2 border-green-400 inline-block pb-1 mb-4">
            Services
          </h6>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-green-300 transition">Branding</a></li>
            <li><a href="#" className="hover:text-green-300 transition">Design</a></li>
            <li><a href="#" className="hover:text-green-300 transition">Marketing</a></li>
            <li><a href="#" className="hover:text-green-300 transition">Advertisement</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h6 className="text-lg font-semibold border-b-2 border-green-400 inline-block pb-1 mb-4">
            Company
          </h6>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-green-300 transition">About us</a></li>
            <li><a href="#" className="hover:text-green-300 transition">Contact</a></li>
            <li><a href="#" className="hover:text-green-300 transition">Jobs</a></li>
            <li><a href="#" className="hover:text-green-300 transition">Press kit</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h6 className="text-lg font-semibold border-b-2 border-green-400 inline-block pb-1 mb-4">
            Legal
          </h6>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-green-300 transition">Terms of use</a></li>
            <li><a href="#" className="hover:text-green-300 transition">Privacy policy</a></li>
            <li><a href="#" className="hover:text-green-300 transition">Cookie policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h6 className="text-lg font-semibold border-b-2 border-green-400 inline-block pb-1 mb-4">
            Newsletter
          </h6>
          <p className="text-sm mb-3 text-green-200">
            Subscribe to get our latest offers and updates.
          </p>
          <div className="flex items-center bg-white rounded-full overflow-hidden shadow">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-4 py-2 text-gray-800 outline-none"
            />
            <button className="bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-500 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6">
        <p className="text-sm text-green-200">
          © {new Date().getFullYear()} FreshFarm. All rights reserved.
        </p>

        {/* Social icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-green-300 transition"><Facebook size={20} /></a>
          <a href="#" className="hover:text-green-300 transition"><Twitter size={20} /></a>
          <a href="#" className="hover:text-green-300 transition"><Instagram size={20} /></a>
          <a href="#" className="hover:text-green-300 transition"><Linkedin size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
