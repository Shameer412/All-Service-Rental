import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 bg-[#021522] font-outfit border-t border-[#021928]">
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

          {/* Logo & Slogan (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6">
            <Link href="/">
              <Image
                src="/icons/logo1.svg"
                alt="All Service Rental Logo"
                width={180}
                height={75}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-400 text-[20px] max-w-full leading-relaxed">
              Flexible rentals across the U.S.
            </p>
          </div>

          {/* Quick Links (Span 2) */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6">
            <h4 className="text-white text-[20px] font-[600]">Quick Links</h4>
            <ul className="flex flex-col gap-3 md:gap-4 text-gray-400 text-[18px]">
              <li><Link href="/" className="hover:text-[#66DF75] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#66DF75] transition-colors">About us</Link></li>
              <li><Link href="/fleet" className="hover:text-[#66DF75] transition-colors">Our Fleet</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#66DF75] transition-colors">How it Works</Link></li>
              <li><Link href="/faq" className="hover:text-[#66DF75] transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-[#66DF75] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Us (Span 3) */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6">
            <h4 className="text-white text-[20px] font-[600]">Contact Us</h4>
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-[14px] uppercase tracking-widest">Email us</span>
                <a href="mailto:help@yourwebsite.com" className="text-white text-[18px] hover:text-[#66DF75] transition-colors font-[500]">
                  help@yourwebsite.com
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-[14px] uppercase tracking-widest">Call us</span>
                <a href="tel:+0123456789" className="text-white text-[18px] hover:text-[#66DF75] transition-colors font-[500]">
                  +01 2345 6789
                </a>
              </div>
            </div>
          </div>

          {/* Follow Us (Span 3) */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6">
            <h4 className="text-white text-[20px] font-[600]">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-4">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ),
                  link: "#"
                }, // Facebook
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                    </svg>
                  ),
                  link: "#"
                }, // Twitter
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="15" x="2" y="4.5" rx="2.18" ry="2.18"/>
                      <path d="m15.75 12-6.75 3.75V8.25L15.75 12z"/>
                    </svg>
                  ),
                  link: "#"
                }, // Youtube
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                    </svg>
                  ),
                  link: "#"
                } // TikTok
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.link}
                  className="w-12 h-12 rounded-full bg-[#010F1899] border border-[#021928] flex items-center justify-center text-white hover:bg-[#66DF75] hover:border-[#66DF75] transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-gray-500 text-[16px] text-center font-[500]">
            © 2025 All Right Reserved | <Link href="/privacy" className="hover:text-[#66DF75] hover:underline underline-offset-4 transition-all">Privacy Policy</Link>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
