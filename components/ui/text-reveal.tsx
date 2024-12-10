"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"], // Ensures the full range of scrolling
  });

  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[100vh]", className)}>
      {/* Container height remains reduced */}
      <div
        className={
          "sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[1rem]"
        }
      >
        <p
          className={
            "flex flex-wrap p-5 text-4xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-5xl lg:p-10 lg:text-6xl xl:text-7xl"
          }
        >
          {words.map((word, index) => {
            // Ensure equal ranges for all words
            const start = index / words.length;
            const end = (index + 1) / words.length;
            return (
              <Word key={index} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]); // Fade-in effect
  const y = useTransform(progress, range, ["20px", "0px"]); // Slide-up effect

  return (
    <motion.span
      style={{ opacity, y }}
      className="relative mx-1 lg:mx-2.5 text-black dark:text-white"
    >
      {children}
    </motion.span>
  );
};

export default TextRevealByWord;
