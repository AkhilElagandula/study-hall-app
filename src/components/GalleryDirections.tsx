"use client";

import Link from "next/link";
import ImageCarousel from "./ui/Carousel";

const GalleryDirections: React.FC = () => {
  const imageList = ["image1.svg", "image2.svg", "image3.svg"];

  return (
    <section className="w-full bg-white py-8 px-4 md:px-12">
      <div className="w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Gallery & Directions
        </h2>

        <div className="grid md:grid-cols-2 gap-6 items-start relative">
          {/* Map */}
          <div className="flex flex-col gap-6">
            <iframe
              title="Google Maps - Religare Enterprises Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.8456326302917!2d79.11663097739516!3d18.44531672671499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bccd927faddc3b1%3A0x26ef921933469168!2s2-10-1217%2C%202-10-1187%2F1%2C%20Jyothinagar%2C%20Karimnagar%2C%20Telangana%20505001!5e0!3m2!1sen!2sin!4v1744577677094!5m2!1sen!2sin"
              width="600"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-400px md:w-full border-0 rounded-xl overflow-hidden shadow-md"
            ></iframe>
            <div className="flex items-center justify-center">
              <Link
                href="https://maps.app.goo.gl/fjVVK8qXcKzAB5zYA"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FBD962] text-[#19548D] font-semibold text-sm px-4 py-2 rounded-full shadow hover:bg-yellow-300 transition"
              >
                Open in Maps
              </Link>
            </div>
          </div>

          {/* Gallery Image */}
          <div className="w-full h-[400px]">
            <ImageCarousel images={imageList} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryDirections;
