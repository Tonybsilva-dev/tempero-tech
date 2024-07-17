"use client";

import { useState, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

// ----------------------------------------------------------------------

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);

  const text = "THANK YOU! HAVE A NICE DAY.";
  const characters = text.split("");

  const radius = 80;
  const fontSize = "18px";
  const letterSpacing = 12.5;

  const [scopeElement, animate] = useAnimate();

  useEffect(() => {
    const animateLoader = async () => {
      const letterAnimation = [] as any;
      characters.forEach((_, i) => {
        letterAnimation.push([
          `.letter-${i}`,
          { opacity: 0 },
          { duration: 0.3, at: i === 0 ? "+0.8" : "-0.28" },
        ]);
      });
      characters.forEach((_, i) => {
        letterAnimation.push([
          `.letter-${i}`,
          { opacity: 1 },
          { duration: 0.3, at: i === 0 ? "+0.8" : "-0.28" },
        ]);
      });
      animate(letterAnimation, {
        ease: "linear",
        repeat: Infinity,
      });
      animate(
        scopeElement.current,
        { rotate: 360 },
        { duration: 4, ease: "linear", repeat: Infinity },
      );
    };
    if (scopeElement.current) {
      animateLoader();
    }
  }, [animate, characters, scopeElement]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <motion.div
        ref={scopeElement}
        className="circle relative aspect-square"
        style={{ width: radius * 2 }}
      >
        <p aria-label={text} />
        <p aria-hidden="true" className="text">
          {characters.map((ch, i) => (
            <motion.span
              key={i}
              className={`letter font-bold letter-${i} absolute left-1/2 top-0 font-sans text-yellow-600`}
              style={{
                transformOrigin: `0 ${radius}px`,
                transform: `rotate(${i * letterSpacing}deg)`,
                fontSize,
              }}
            >
              {ch}
            </motion.span>
          ))}
        </p>
      </motion.div>
    </div>
  );
}
