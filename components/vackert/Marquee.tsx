"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { sectors } from "@/lib/vackert";

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      // Two identical halves, so sliding by half loops seamlessly
      const loop = gsap.to(".marquee-track", { xPercent: -50, duration: 50, ease: "none", repeat: -1 });
      const el = ref.current!;
      const slow = () => gsap.to(loop, { timeScale: 0.2, duration: 0.5 });
      const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.5 });
      el.addEventListener("mouseenter", slow);
      el.addEventListener("mouseleave", resume);
      return () => {
        el.removeEventListener("mouseenter", slow);
        el.removeEventListener("mouseleave", resume);
      };
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="bg-gold text-forest-dark py-4 sm:py-5 overflow-hidden" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <span key={sector.title} className="flex items-center gap-3 px-6 sm:px-8 font-bold text-sm sm:text-base whitespace-nowrap">
                  <Icon size={18} />
                  {sector.title}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
