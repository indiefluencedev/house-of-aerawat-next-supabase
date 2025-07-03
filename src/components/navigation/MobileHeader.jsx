"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 xl:hidden">
        {/* Hamburger + Logo */}
        <div className="flex items-center">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="mr-2"
          >
            {/* Hamburger Icon */}
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Image src="/assets/newlogo.png" alt="Logo" width={180} height={50} className="ml-1" />
        </div>
        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Image src="/assets/heart.svg" alt="Heart" width={24} height={24} />
          <Link href="/cart">
            <Image src="/assets/chart.svg" alt="Cart" width={24} height={24} />
          </Link>
        </div>
      </div>

      {/* Search Bar (Mobile Only) */}
      <div className="px-4 py-2 bg-white border-b md:hidden">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search for jewellery, paintings and more"
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>

      {/* Side Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${menuOpen ? "visible" : "invisible pointer-events-none"}`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${menuOpen ? "opacity-30" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 h-full w-[85vw] max-w-xl bg-white shadow-lg transition-transform duration-300
            ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Drawer Header */}
          <div className="flex items-center px-4 py-4 border-b border-gray-200">
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="mr-2"
            >
              {/* X Icon */}
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            <Image src="/assets/newlogo.png" alt="Logo" width={180} height={50} className="ml-1" />
          </div>
          {/* Categories */}
          <nav className="flex flex-col py-2">
            {["Fine Jewellery", "Crystals", "Shringaar", "Wooden Beads", "Treasured Gifts", "Kalapatt"].map((cat) => (
              <a
                key={cat}
                href="#"
                className="flex items-center px-6 py-3 text-[16px] font-medium hover:bg-gray-100 transition"
              >
                {cat}
              </a>
            ))}
          </nav>
          {/* Divider */}
          <div className="border-b border-gray-200 my-2" />
          {/* Profile & Other Links */}
          <div className="flex flex-col">
            {/* Profile Dropdown */}
            <button
              className="flex items-center justify-between px-6 py-3 text-[16px] font-medium hover:bg-gray-100 transition"
              onClick={() => setProfileOpen((v) => !v)}
            >
              Your Profile
              <svg
                className={`w-4 h-4 text-gray-400 transform transition-transform ${profileOpen ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
              </svg>
            </button>
            {/* Dropdown with smooth transition */}
            <div
              className={`pl-10 flex flex-col text-[15px] overflow-hidden transition-all duration-600
                ${profileOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
              `}
              style={{
                transitionProperty: 'max-height, opacity',
              }}
            >
              <a href="#" className="py-2 hover:underline">Account Information</a>
              <a href="#" className="py-2 hover:underline">Your Orders</a>
              <a href="#" className="py-2 hover:underline">Your Addresses</a>
            </div>
            <a href="#" className="px-6 py-3 text-[16px] font-medium hover:bg-gray-100 transition">About House Of Aerawat</a>
            <a href="#" className="px-6 py-3 text-[16px] font-medium hover:bg-gray-100 transition">Legal</a>
            <a href="#" className="px-6 py-3 text-[16px] font-medium hover:bg-gray-100 transition">Get In Touch</a>
          </div>
        </div>
      </div>
    </>
  );
}
