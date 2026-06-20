"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20 || pathname === '/how-it-works' || pathname.startsWith('/equipment') || pathname.startsWith('/register')) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll(); // Check initial state
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: "Equipment", href: "/equipment" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`h-[80px] flex items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B2337] shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="w-[92%] xl:w-[90%] 2xl:w-[88%] mx-auto flex justify-between items-center">

        {/* LEFT SIDE: LOGO */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/icons/logo1.svg"
              alt="All Service Rental"
              width={90}
              height={38}
              className="object-contain"
            />
          </Link>
        </div>

        {/* DESKTOP NAV ITEMS + BUTTONS */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:text-secondary font-medium transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login">
              <button className="bg-secondary hover:bg-secondary/90 text-white font-bold py-2.5 px-8 rounded-[10px] text-sm transition-all active:scale-95 shadow-lg">
                Login
              </button>
            </Link>
            <Link
              href="/welcome"
              className="text-white hover:text-secondary font-bold text-sm transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="absolute top-[80px] left-0 right-0 bg-[#0B2337] border-t border-white/5 py-8 px-4 flex flex-col gap-6 lg:hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-medium border-b border-white/5 pb-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-4 pt-4">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <button className="bg-secondary text-white font-bold py-4 rounded-[12px] w-full uppercase tracking-wider">
                Login
              </button>
            </Link>
            <Link
              href="/welcome"
              onClick={() => setIsOpen(false)}
              className="text-white text-center font-bold py-2"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
