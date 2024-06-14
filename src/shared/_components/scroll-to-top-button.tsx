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
    <div className="bottom-20 fixed right-5">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-evenly rounded-full bg-zinc-800 p-3 text-white shadow-lg transition duration-300 hover:bg-gray-700 text-sm font-medium"
        >
          <ChevronUp className="mr-0 lg:mr-2 text-zinc-300" />
          <p className="hidden lg:block text-zinc-300 lg:mr-3">Para cima</p>
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
