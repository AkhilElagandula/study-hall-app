"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock,
} from "react-icons/hi";

const contactInfo = [
  {
    title: "Phone",
    detail: "+91 98498 62696",
    icon: <HiOutlinePhone size={24} />,
  },
  {
    title: "Office",
    detail:
      "2-10-1187/1, Besides Kamala heights,\nJyothinagar, Karimnagar,\nTelangana 505001",
    icon: <HiOutlineLocationMarker size={24} />,
  },
  {
    title: "Working hours",
    detail: "10am to 5pm",
    icon: <HiOutlineClock size={24} />,
  },
];

const ContactSection: React.FC = () => {
  return (
    <section className="w-full relative">
      {/* WHITE Background: Heading + CTA */}
      <div className="bg-white text-center px-4 pt-12 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Contact us regarding any query
        </h2>
        <p className="text-sm text-[#19548D] mb-4">
          Reach out to us at below details.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-[#FBD962] text-[#19548D] font-semibold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition"
        >
          Contact Us
        </Link>
      </div>

      {/* BLUE Background + Cards */}
      <div className="bg-[#19548D] w-full px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="relative bg-[#FBD962] text-[#19548D] rounded-xl p-6 shadow-md min-h-[180px] flex flex-col justify-between"
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white p-2 rounded-md">{item.icon}</div>
                <h4 className="font-semibold text-lg">{item.title}</h4>
              </div>

              {/* Details */}
              <p className="text-sm whitespace-pre-line leading-relaxed font-medium">
                {item.detail}
              </p>

              {/* Decorative Square */}
              <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-white opacity-40"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;