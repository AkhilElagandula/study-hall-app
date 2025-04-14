"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface CarouselProps {
  images: string[];
  className?: string;
}

const ImageCarousel: React.FC<CarouselProps> = ({
  images,
  className = "",
}) => {
  return (
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      showStatus={false}
      showArrows={false}
      showIndicators
      interval={4000}
      transitionTime={700}
      className={className}
    >
      {images.map((image) => (
        <div
          key={image}
          className="relative w-full h-[450px] rounded-xl overflow-hidden"
        >
          <Image
            src={`/images/${image}`}
            alt={image}
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;