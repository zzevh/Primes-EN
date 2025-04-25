"use client";
import { motion } from "framer-motion";
import React from "react";

export const BackgroundBoxes = () => {
  const rows = new Array(3).fill(1);
  const cols = new Array(3).fill(1);
  
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90vw] md:w-[60vw] h-[60vh]">
        {rows.map((_, i) => (
          <motion.div
            key={`row-${i}`}
            className="relative h-[33.33%] w-full"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: i * 0.2,
            }}
          >
            <div className="absolute h-full w-full">
              {cols.map((_, j) => (
                <motion.div
                  key={`col-${j}`}
                  className="absolute h-full w-[33.33%]"
                  style={{
                    left: `${j * 33.33}%`,
                  }}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: j * 0.2,
                  }}
                >
                  <div className="h-full w-full">
                    <motion.div
                      className="h-full w-full rounded-[32px] bg-[#1a1a1a]/[0.5] border border-[#ffffff]/[0.08] p-8"
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: [0, 1.2, 1],
                      }}
                      transition={{
                        delay: (i + j) * 0.2,
                        duration: 0.8,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
