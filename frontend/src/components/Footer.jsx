import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto pt-10 pb-6 border-t border-gray-100 text-sm text-gray-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Deluxe Hotel Resort. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Email:</span>
            <a href="mailto:support@deluxehotel.com" className="text-fuchsia-900 hover:text-fuchsia-700 transition-colors underline decoration-fuchsia-200">support@deluxehotel.com</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Contact/Text:</span>
            <a href="tel:+15550000000" className="text-fuchsia-900 hover:text-fuchsia-700 transition-colors underline decoration-fuchsia-200">+1 (555) 000-0000</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;