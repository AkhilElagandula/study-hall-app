"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Personalized Student Study Cubicles.",
    subtitle:
      "Individual cabinets with ample storage space and dedicated charging points.",
    image: "/images/image2.svg",
  },
  {
    id: 2,
    title: "Convenience for Commute.",
    subtitle:
      "Located in Prime point of Karimnagar, within reach to many Institutions, Yet keeps you in peace and out of the clatter.",
    image: "/images/image4.svg",
  },
  {
    id: 3,
    title: "Hygiene and Silent.",
    subtitle: "Maintenance at regular intervals, Hygiene never compromised.",
    image: "/images/image1.svg", // put your actual image path in `public/images`
  },
];

const HeroBanner: React.FC = () => {
  return (
    <section className="relative w-full h-full bg-white py-8">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="mt-8 md:mt-0 flex flex-col md:flex-row items-center justify-between w-[95%] mx-auto px-4 py-8">
              {/* Left: Text */}
              <div className="md:w-[60%] text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-xl md:text-4xl font-bold text-black md:mb-4">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base text-gray-700 md:mb-8 mb-4">
                  {slide.subtitle}
                </p>
                <Link
                  href="/book-cabin"
                  className="inline-block bg-[#FBD962] text-[#19548D] text-sm md:text-base font-semibold px-6 py-3 rounded-full shadow hover:bg-yellow-300 transition"
                >
                  Book My Cabin!
                </Link>
              </div>

              {/* Right: Image */}
              <div className="md:w-[40%] flex justify-center items-center">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={400}
                  height={400}
                  className="w-[80%] h-[80%] object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroBanner;
