"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { sectors } from "@/lib/vackert";
import { useSector } from "./SectorContext";
import Reveal from "./Reveal";

// First and last cards span two columns so ten cards fill the grid evenly
const wide = (i: number) => i === 0 || i === sectors.length - 1;

export default function Sectors() {
  const ref = useRef<HTMLElement>(null);
  const { select } = useSector();

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.set(".sector-card", { autoAlpha: 0, y: 60 });
      ScrollTrigger.batch(".sector-card", {
        start: "top 90%",
        once: true,
        onEnter: (cards) =>
          gsap.to(cards, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, overwrite: true }),
      });
    });
  }, { scope: ref });

  // Spotlight follows the cursor across the card
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="sectors" ref={ref} className="py-20 sm:py-28 bg-cream dark:bg-black/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal stagger={0.1} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="block text-forest dark:text-gold font-bold text-sm uppercase tracking-widest">Sectors</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-dark dark:text-white mt-4 leading-tight">
              Business sectors we work in
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-md">
            Pick your sector to get started. We&apos;ll fill it in on the form for you.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <a
                key={sector.title}
                href="#contact"
                onClick={() => select(sector.title)}
                onMouseMove={onMove}
                className={`sector-card group relative overflow-hidden flex flex-col p-6 sm:p-8 bg-white dark:bg-forest-dark rounded-3xl border border-forest/10 dark:border-white/10 hover:border-gold/60 hover:-translate-y-1 hover:shadow-2xl hover:shadow-forest/10 transition-[border-color,box-shadow,translate] duration-300 ${
                  wide(index) ? "md:col-span-2" : ""
                }`}
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(360px_circle_at_var(--x)_var(--y),rgba(212,160,23,0.14),transparent_70%)]" />
                <div className="relative flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-forest text-gold flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                    <Icon size={26} />
                  </div>
                  <span className="text-4xl sm:text-5xl font-extrabold text-forest/10 dark:text-white/10 group-hover:text-gold/50 transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="relative text-lg sm:text-xl font-bold text-forest-dark dark:text-white mb-2">{sector.title}</h3>
                <p className="relative text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">{sector.description}</p>
                <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-bold text-forest dark:text-gold">
                  Get started
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
