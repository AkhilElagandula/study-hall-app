"use client";

import React from "react";

const stats = [
  {
    label: "Successful Orders",
    value: "211",
    bg: "bg-[#FBD962]",
    textColor: "text-[#19548D]",
    showLeftBox: true,
  },
  {
    label: "Satisfied Students",
    value: "98%",
    bg: "bg-[#19548D]",
    textColor: "text-[#FBD962]",
    showLeftBox: true,
  },
  {
    label: "Rated on Google",
    value: "4.9*",
    bg: "bg-[#FBD962]",
    textColor: "text-[#19548D]",
    showLeftBox: true,
  },
  {
    label: "Days Service",
    value: "24/7*365",
    bg: "bg-[#19548D]",
    textColor: "text-[#FBD962]",
    showLeftBox: true,
  },
];

const StatsSection: React.FC = () => {
  return (
    <section className="bg-white py-10 px-4 sm:px-6 md:px-10 w-full relative overflow-hidden">
      {/* Decorative Squares */}
      <div className="absolute top-6 left-6 w-12 h-12 border-2 border-yellow-400 opacity-50 hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-12 h-12 border-2 border-[#19548D] opacity-50 hidden md:block"></div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`relative w-full h-[150px] sm:h-[170px] md:h-[175px] flex flex-col items-center justify-center rounded-xl ${stat.bg} ${stat.textColor} shadow-md px-4 text-center`}
          >
            {stat.showLeftBox && (
              <div className="absolute top-4 left-2 w-6 h-6 border-2 border-white opacity-30"></div>
            )}
            <h3 className="text-4xl sm:text-[42px] md:text-[56px] leading-none font-semibold tracking-wide font-poppins">
              {stat.value}
            </h3>
            <p className="text-base sm:text-lg md:text-xl font-medium tracking-wide font-poppins">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
