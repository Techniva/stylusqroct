"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface HeroMotionCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  buttonOnClick?: MouseEventHandler<HTMLButtonElement>;
  image: string;
  reverse?: boolean;
  bgClassName?: string;
  buttonClassName?: string;
}

const textVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.3,
      ease: "easeInOut",
    },
  }),
};

const imageVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

export default function HeroMotionCard({
  title,
  description,
  buttonText,
  buttonLink,
  buttonOnClick,
  image,
  reverse = false,
  bgClassName = "bg-gradient-to-br from-[#7B2C2C] via-[#A83232] to-[#D94E2B] py-12",
  buttonClassName = "inline-block bg-white text-[#B22222] px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 hover:shadow-xl transition",
}: HeroMotionCardProps) {
  return (
    <section className="pt-4 shadow-sm">
      <div className={bgClassName}>
        <div
          className={`max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 ${
            reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Text Section */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-snug"
              variants={textVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
            >
              {title}
            </motion.h1>

            <motion.p
              className="text-lg text-gray-200 mb-8"
              variants={textVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
            >
              {description}
            </motion.p>

            <motion.div
              variants={textVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={2}
            >
              {buttonOnClick ? (
                <button onClick={buttonOnClick} className={buttonClassName}>
                  {buttonText}
                </button>
              ) : (
                buttonLink && (
                  <Link href={buttonLink} className={buttonClassName}>
                    {buttonText}
                  </Link>
                )
              )}
            </motion.div>
          </div>

          {/* Image Section */}
          <motion.div
            className="flex-1 flex justify-center will-change-transform will-change-opacity"
            variants={imageVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Wrapper reserves space to prevent flicker */}
            <div className="w-full max-w-lg aspect-[4/3] bg-gray-800 rounded-2xl overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
