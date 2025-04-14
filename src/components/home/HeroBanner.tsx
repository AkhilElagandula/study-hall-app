"use client";

import ImageCarousel from "../ui/Carousel";
import Button from "../ui/Button";

const HeroBanner: React.FC = () => {
  const imageList = ["image1.svg", "image2.svg", "image3.svg"];

  return (
    <section className="relative w-full bg-white py-10 px-4 md:px-16 overflow-hidden">
      <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0">
          <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight">
            Personalized Student <br /> Study Cubicles.
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Individual cabinets with ample storage space and dedicated charging points.
          </p>
          <Button type="button" label="Book My Cabin!" variant="rounded" />
        </div>

        {/* Right Content (Image/Carousel) */}
        <div className="w-full md:w-1/2 relative">
          <ImageCarousel images={imageList} />

          {/* Decorative Squares */}
          <div className="absolute top-4 right-4 w-12 h-12 border-4 border-yellow-400"></div>
          <div className="absolute bottom-8 left-8 w-10 h-10 border-4 border-blue-800"></div>
        </div>
      </div>

      {/* Optional: Static dots instead of dynamic */}
      {/* If using your own slider logic */}
      {/* <div className="mt-12 flex justify-center space-x-2">
        <span className="w-3 h-3 bg-blue-800 rounded-full"></span>
        <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
        <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
        <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
      </div> */}
    </section>
  );
};

export default HeroBanner;