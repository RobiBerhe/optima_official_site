"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials, sampleTestimonials } from "@/lib/testimonials";

const isSample = testimonials.length === 0;
const items = isSample && process.env.NODE_ENV === "development" ? sampleTestimonials : testimonials;

const initials = (name: string) =>
  name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = (step: number) => {
    setDirection(step);
    setIndex((i) => (i + step + items.length) % items.length);
  };

  // Auto-advance, paused while hovered
  useEffect(() => {
    if (paused || items.length < 2) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % items.length);
    }, 7000);
    return () => clearInterval(id);
  }, [paused]);

  if (items.length === 0) return null;
  const current = items[index];

  return (
    <section className="py-24 dark:bg-navy overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-optima-blue dark:text-optima-green font-bold text-sm uppercase tracking-widest mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl font-extrabold text-navy dark:text-white mb-4">What Our Clients Say</h2>
          {isSample && (
            <p className="inline-block text-xs font-semibold text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-500/10 px-3 py-1 rounded-full">
              Sample content, only visible in development
            </p>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl shadow-optima-blue/5 px-6 py-12 sm:px-14 sm:py-16 min-h-[20rem] flex items-center">
            <Quote
              aria-hidden="true"
              className="absolute top-6 left-6 sm:top-8 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 text-optima-blue/10 dark:text-optima-green/15"
              fill="currentColor"
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full text-center"
                aria-live="polite"
              >
                <blockquote className="text-lg sm:text-2xl font-medium text-navy dark:text-white leading-relaxed">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-gradient-to-br from-optima-blue to-optima-green text-white font-bold flex items-center justify-center">
                    {initials(current.name)}
                  </span>
                  <span className="text-center sm:text-left">
                    <span className="block font-bold text-navy dark:text-white">{current.name}</span>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">
                      {current.role}, {current.organization}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {items.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/15 text-navy dark:text-white flex items-center justify-center hover:border-optima-blue hover:text-optima-blue dark:hover:text-optima-green transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? "w-8 bg-gradient-to-r from-optima-blue to-optima-green" : "w-2 bg-gray-300 dark:bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/15 text-navy dark:text-white flex items-center justify-center hover:border-optima-blue hover:text-optima-blue dark:hover:text-optima-green transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
