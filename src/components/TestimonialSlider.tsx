"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote:
      "Mahadev Study hall is an excellent, affordable study space offering all the essentials for a productive experience. It provides high speed Wi-Fi, clean washrooms, discussion space, locker facility and 24/7 availability with uninterrupted power. The well maintained environment and convenient stationery services make it a top choice for students and professionals. Highly recommended!",
    name: "Ch. Shivaraj",
    role: "GATE Aspirant",
    avatar: "/images/avatar1.png",
  },
  {
    id: 2,
    quote:
      "A peaceful and hygienic place to focus on your studies. Helpful staff and great ambiance!",
    name: "Sravani M.",
    role: "NEET Aspirant",
    avatar: "/images/avatar2.png",
  },
  {
    id: 3,
    quote:
      "One of the best spaces in town for students. Loved the environment and services!",
    name: "Ravi Teja",
    role: "CA Student",
    avatar: "/images/avatar3.png",
  },
];

const TestimonialSlider: React.FC = () => {
  return (
    <section className="w-full md:h-[600px] bg-[url('/images/testimonial-bg.svg')] bg-cover bg-center px-4 font-[poppins]">
      <div className="relative w-full md:w-[60%] h-full mx-auto bg-[#19548D] text-white rounded-2xl px-6 sm:px-8 md:px-12 py-4 shadow-xl overflow-hidden">
        {/* Heading */}
        <h2 className="text-xl md:text-5xl font-medium text-center text-yellow-300 py-6">
          What our customers has to say
        </h2>
        <p className="md:w-[60%] mx-auto text-xl text-[#ffffff] font-medium md:text-base text-center mb-8 opacity-80">
          Positive study environment, free from external disturbances.
          Supportive management.
        </p>
        <div className="flex items-center justify-center md:py-6">
          <Image
            src="/images/vector.svg"
            alt="Quote"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Swiper Container */}
        <div className="relative ">
          {/* <-- controls the height of slide */}
          <Swiper
            modules={[Pagination, EffectFade]}
            pagination={{ clickable: true }}
            loop
            className="h-full"
          >
            {testimonials.map((item) => (
              <SwiperSlide
                key={item.id}
                className="flex justify-center items-center h-full"
              >
                <div className="w-full text-center space-y-6 px-2 md:px-8 py-8">
                  <p className="text-2xl md:text-base leading-relaxed text-[#FBD962] opacity-95">
                    {item.quote}
                  </p>
                  <div className="pt-4">
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm opacity-80">{item.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
