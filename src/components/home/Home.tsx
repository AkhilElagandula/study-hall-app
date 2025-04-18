"use client";

import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Header from "./Header";
import HeroBanner from "./HeroBanner";
import GalleryDirections from "../GalleryDirections";
import StatsSection from "../StatsSection";
import ContactDetails from "../ContactDetails";
import { User } from "@/types/auth.types";
import { toast } from "react-toastify";
import Loading from "../ui/Loader";
import { EarlyUser } from "@/services/authService";
import TestimonialSlider from "../TestimonialSlider";

const Home: React.FC = () => {
  const [resetKey, setResetKey] = useState<number>(0);
  const [earlyUser, setEarlyUser] = useState<User>({
    name: "",
    mobile: "",
    gender: "Select",
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const res = await EarlyUser(
      earlyUser.name ?? "",
      earlyUser.mobile ?? "",
      earlyUser.gender ?? ""
    );
    if (res.status) {
      toast.success(res.message);
      setResetKey((prev) => prev + 1);
      setEarlyUser({
        name: "",
        mobile: "",
        gender: "Select",
      });
    } else {
      toast.error("Error saving Info!");
    }
  };

  return (
    <div
      key={resetKey}
      className="relative w-full pt-3 flex flex-col items-center justify-between"
    >
      <Loading isOpen={false} />

      {/* Header */}
      <Header />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Contact Form Section */}
      <section className="w-full flex flex-col items-center px-4 py-8 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Get in touch with Us
        </h2>

        <div className="w-full md:w-[60%] h-full pb-8 rounded-xl shadow-md border border-gray-300 overflow-hidden relative bg-white">
          <div className="relative bg-[#19548D] text-white text-center rounded-t-xl overflow-hidden">
            {/* Heading */}
            <div className="pt-6 pb-12 relative z-10">
              <h2 className="text-lg md:text-xl font-bold">
                FILL TO ENROLL FOR EARLY BIRD OFFERS!
              </h2>
            </div>

            {/* PERFECT Concave Curve */}
            <svg
              className="absolute bottom-0 left-0 w-full h-[40px]"
              viewBox="0 0 1440 150"
              preserveAspectRatio="none"
            >
              <path
                fill="#ffffff"
                d="M0,0 C360,150 1080,150 1440,0 L1440,150 L0,150 Z"
              ></path>
            </svg>
          </div>

          {/* Form */}
          <form
            className="w-full px-4 sm:px-8 mt-7 flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <Input
              label="FULL NAME"
              type="text"
              placeHolder="Enter Full Name"
              value={earlyUser?.name}
              onChange={(e) =>
                setEarlyUser({ ...earlyUser, name: e.target.value })
              }
              onBlur={(e) =>
                setEarlyUser({ ...earlyUser, name: e.target.value })
              }
              maxLength={25}
              required
            />

            <Select
              label="SELECT GENDER"
              optionItems={["Male", "Female", "Others"]}
              selectedValue={earlyUser.gender}
              onChange={(value) =>
                setEarlyUser({ ...earlyUser, gender: value })
              }
              required
            />

            <Input
              id="mobile"
              label="MOBILE NUMBER"
              type="text"
              mode="numeric"
              placeHolder="Enter 10 Digit Phone Number"
              minLength={10}
              maxLength={10}
              value={earlyUser.mobile}
              onChange={(e) =>
                setEarlyUser({ ...earlyUser, mobile: e.target.value })
              }
              onBlur={(e) =>
                setEarlyUser({ ...earlyUser, mobile: e.target.value })
              }
              required
            />

            <div className="text-center pt-2">
              <Button
                label="Proceed To Payment"
                variant="rectangle"
                type="submit"
                loading={false}
                disabled={
                  !earlyUser.name ||
                  !earlyUser.gender ||
                  earlyUser.gender === "Select"
                }
              />
            </div>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider />

      {/* Gallery & Directions */}
      <GalleryDirections />

      {/* Stats */}
      <StatsSection />

      {/* Contact Details */}
      <ContactDetails />
    </div>
  );
};

export default Home;
