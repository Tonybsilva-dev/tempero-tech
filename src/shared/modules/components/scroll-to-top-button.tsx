"use client";

import { ChevronUp } from "lucide-react";
import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-20 right-5 lg:right-6">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-evenly rounded-full bg-stone-800 p-3 text-sm font-medium text-white shadow-lg transition duration-300 hover:bg-gray-700"
        >
          <ChevronUp className="mr-0 text-zinc-300 lg:mr-2" />
          <p className="hidden text-zinc-300 lg:mr-3 lg:block">Para cima</p>
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
