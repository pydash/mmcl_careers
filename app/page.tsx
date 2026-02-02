"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "https://images.pexels.com/photos/35528435/pexels-photo-35528435.jpeg?",
  "https://images.pexels.com/photos/34079769/pexels-photo-34079769.jpeg?",
  "https://images.pexels.com/photos/20243360/pexels-photo-20243360.jpeg?",
  "https://images.pexels.com/photos/15215323/pexels-photo-15215323.jpeg?",
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className="h-dvh flex">
        {/* Left Section */}
        <div className="w-2/5 bg-white flex flex-col items-start justify-center px-16 py-12">
          <div className="flex flex-col gap-8 max-w-md">
            {/* Logo/Branding */}
            <div>
              <Image
                src="/logo_horizontal.png"
                alt="MMCL Logo"
                width={150}
                height={50}
              />
            </div>

            {/* Heading */}
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-red-600">
                A Fulfilling Career.
                <span className="text-blue-900"> Right Here.</span>
              </h1>
              <p className="text-gray-600">
                Join MMCL today and unlock a world of exciting job opportunities
                tailored just for you.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-4">
              <Button
                asChild
                className="bg-red-600 hover:bg-red-500 text-white rounded-none"
              >
                <Link href="/signup">Create Account</Link>
              </Button>
              <Button
                asChild
                className="bg-blue-900 hover:bg-blue-800 hover:text-white text-white rounded-none"
              >
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section - Slideshow */}
        <div className="w-3/5 relative overflow-hidden bg-slate-900">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Image Indicator Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-1 h-1 rounded-xl transition-all ${
                  index === currentImageIndex
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
