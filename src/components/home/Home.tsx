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
import handler from "@/services/handler";
import { useLoader } from "@/hooks/useLoader";
import { toast } from "react-toastify";
import Loading from "../ui/Loader";

const Home: React.FC = () => {
  const { loading, showLoader, hideLoader } = useLoader();
  const [resetKey, setResetKey] = useState<number>(0);
  const [earlyUser, setEarlyUser] = useState<User>({
    name: "",
    mobile: "",
    gender: "Select",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    debugger;
    event?.preventDefault();
    const res = await handler(
      "POST",
      "/api/auth",
      earlyUser,
      "",
      showLoader,
      hideLoader
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
      className="w-full pt-3 flex flex-col items-center justify-between"
    >
      <Loading isOpen={loading} />
      {/* Logo */}
      <Header />
      {/* Hero Banner */}
      <HeroBanner />
      {/* Contact Form Section */}
      <section className="w-[50%] mx-auto flex flex-col items-center px-4 py-8 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Get in touch with Us
        </h2>

        <div className="w-full rounded-xl shadow-md border border-gray-300 overflow-hidden bg-white relative">
          {/* Top Curved Header */}
          <div className="relative w-full">
            {/* Elliptical Header */}
            <div className="bg-[#19548D] text-white text-center font-bold py-6 rounded-t-xl">
              <h2 className="text-lg">FILL TO ENROLL FOR EARLY BIRD OFFERS!</h2>
            </div>

            {/* SVG Curve (concave bottom like your image) */}
            <svg
              className="absolute bottom-0 left-0 w-full h-[40px]"
              viewBox="0 0 500 80"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 C150,80 350,-40 500,60 L500,80 L0,80 Z"
                fill="#19548D"
              />
            </svg>
          </div>

          {/* Form */}
          <form className="px-36 py-8 mt-7 bg-white space-y-6" onSubmit={handleSubmit}>
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
                loading={loading}
                disabled={
                  !earlyUser.name || !earlyUser.gender || !earlyUser.gender
                }
              />
            </div>
          </form>
        </div>
      </section>
      {/* Gallery & Directions Section */}
      <GalleryDirections />
      <StatsSection />
      <ContactDetails />
    </div>
  );
};

export default Home;
