"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = {
  Agent: { label: "AI Agent" },
  Code: { label: "Code" },
  Video: { label: "Video" },
};

const builder = () => {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof categories>("Agent");

  return (
    <div>
      <div></div>

      <div className="flex items-center justify-between p-2 rounded-full relative bg-white/5 backdrop-blur-md w-full max-w-md mx-auto">
        {Object.entries(categories).map(([key, { label }]) => (
          <div
            key={key}
            onClick={() => setActiveCategory(key as keyof typeof categories)}
            className="relative cursor-pointer w-full group text-center py-1.5 overflow-visible hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.175, 0.885, 0.32, 1.275)] px-4"
          >
            {activeCategory === key && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-neutral-900 rounded-full"
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 10,
                  mass: 0.2,
                  ease: [0, 1, 0.35, 0],
                }}
              />
            )}
            <span
              className={`relative flex text-white text-xs sm:text-sm items-center gap-2 justify-center ${
                activeCategory === key
                  ? "text-primary-foreground"
                  : "text-foreground"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default builder;
