"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { sectors, site } from "@/lib/vackert";
import { useSector } from "./SectorContext";
import Logo from "./Logo";

// How long each sector stays featured before the next one rotates in
const CYCLE_MS = 2800;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { select } = useSector();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Cycle through the sectors unless the visitor is hovering one
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = setInterval(() => setActive((i) => (i + 1) % sectors.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [paused]);

  // Intro: headline unmasks, panels grow up like bars, the V mark draws itself
  useGSAP(() => {
    // Content starts hidden to avoid a flash before the intro runs
    gsap.set(".vh-content", { autoAlpha: 1 });

    gsap.matchMedia().add(MOTION_OK, () => {
      SplitText.create(".vh-lead", {
        type: "words",
        mask: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(self.words, { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.08, delay: 0.1 }),
      });

      const shown = { y: 0, autoAlpha: 1 };
      gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } })
        .fromTo(".vh-top > *", { y: -16, autoAlpha: 0 }, { ...shown, stagger: 0.1 })
        .fromTo(".vh-word-wrap", { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, ease: "expo.out" }, 0.35)
        .fromTo(".vh-side > *", { y: 24, autoAlpha: 0 }, { ...shown, stagger: 0.1 }, 0.5)
        .fromTo(
          ".vh-panel",
          { clipPath: "inset(100% 0% 0% 0% round 0.75rem)" },
          { clipPath: "inset(0% 0% 0% 0% round 0.75rem)", duration: 1.1, ease: "expo.out", stagger: 0.05 },
          0.6
        );

      gsap.fromTo(".vh-mark", { drawSVG: "0%" }, { drawSVG: "100%", duration: 2.4, ease: "power2.inOut", stagger: 0.3, delay: 0.2 });

      gsap.to(".vh-mark-wrap", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    });
  }, { scope: ref });

  // Each time the featured sector changes, flip the word in and fade its details up
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(".vh-word", { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" });
    gsap.fromTo(".vh-detail", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.3, ease: "power2.out" });
  }, { scope: ref, dependencies: [active] });

  const feature = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-cream text-forest-dark dark:bg-forest-dark dark:text-white">
      {/* Oversized V mark in the background */}
      <div
        aria-hidden="true"
        className="vh-mark-wrap pointer-events-none absolute -right-40 -top-24 w-[30rem] sm:w-[44rem] lg:w-[50rem] text-gold/30 dark:text-gold/20"
      >
        <svg viewBox="0 0 100 100" className="w-full h-auto">
          <path className="vh-mark" d="M12 14 L50 88 L88 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path className="vh-mark" d="M26 14 L50 62 L74 14" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest/[0.07] dark:from-black/30 to-transparent" />

      <div className="vh-content invisible relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-10 sm:pb-14">
        {/* Masthead */}
        <div className="vh-top flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-forest/15 dark:border-white/10">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <span className="font-extrabold text-lg tracking-[0.25em]">VACKERT</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-widest text-forest/70 dark:text-white/60">
            <span>Sister company of {site.sister}</span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              <MapPin size={14} />
              {site.location}
            </span>
          </div>
        </div>

        {/* Headline + side copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pt-8 sm:pt-10">
          <h1 className="lg:col-span-8 font-extrabold tracking-tight">
            <span className="vh-lead block leading-[1.15] text-[clamp(2.25rem,5.5vw,4.5rem)]">Doing business in</span>
            <span className="sr-only">every sector</span>
            <span aria-hidden="true" className="block overflow-hidden leading-[1.1] pb-[0.08em] text-[clamp(2.25rem,7vw,5.75rem)]">
              <span className="vh-word-wrap block">
                <span key={active} className="vh-word inline-block whitespace-nowrap text-gold-deep dark:text-gold">
                  {sectors[active].short}
                  <span className="text-forest dark:text-white">.</span>
                </span>
              </span>
            </span>
          </h1>

          <div className="vh-side lg:col-span-4 lg:pb-3 space-y-6">
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Vackert works with companies and entrepreneurs across ten economic sectors in Ethiopia.
              Tell us about your business and our team will get back to you.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap bg-forest text-white dark:bg-gold dark:text-forest-dark px-6 py-4 rounded-md font-bold hover:bg-forest-dark dark:hover:bg-[#e0b12a] transition-colors"
              >
                Send your information
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#sectors"
                className="group inline-flex items-center justify-center gap-1.5 whitespace-nowrap py-3 sm:py-0 font-bold underline decoration-gold decoration-2 underline-offset-8 hover:text-gold-deep dark:hover:text-gold transition-colors"
              >
                All 10 sectors
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Sector panels: the featured one expands (tablet and up) */}
        <div className="hidden md:flex gap-2 lg:gap-3 h-72 mt-10 lg:mt-12" onMouseLeave={() => setPaused(false)}>
          {sectors.map((sector, i) => {
            const Icon = sector.icon;
            const on = i === active;
            return (
              <a
                key={sector.title}
                href="#contact"
                onMouseEnter={() => feature(i)}
                onFocus={() => feature(i)}
                onBlur={() => setPaused(false)}
                onClick={() => select(sector.title)}
                aria-label={`${sector.title}: send us your information`}
                style={{ flexBasis: 0 }}
                className={`vh-panel relative overflow-hidden rounded-xl border transition-[flex-grow,background-color,border-color,color] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                  on
                    ? "grow-[8] bg-forest text-white border-forest dark:bg-gold dark:text-forest-dark dark:border-gold"
                    : "grow bg-white/70 text-forest border-forest/10 hover:bg-white dark:bg-white/5 dark:text-gold dark:border-white/10 dark:hover:bg-white/10"
                }`}
              >
                <div className={`absolute top-4 inset-x-0 flex flex-col gap-3 ${on ? "items-start px-6 lg:px-8" : "items-center"}`}>
                  <span className="text-xs font-bold opacity-70">{String(i + 1).padStart(2, "0")}</span>
                  <Icon className="w-6 h-6 lg:w-7 lg:h-7" />
                </div>

                {on ? (
                  <div key={i} className="vh-detail absolute inset-x-0 bottom-0 p-6 lg:p-8 min-w-[16rem]">
                    <h3 className="text-xl lg:text-2xl font-extrabold leading-tight mb-2">{sector.title}</h3>
                    <p className="text-sm lg:text-base opacity-80 leading-relaxed line-clamp-3 max-w-md">{sector.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold">
                      Get started <ArrowRight size={16} />
                    </span>
                  </div>
                ) : (
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 text-sm font-bold whitespace-nowrap opacity-80">
                    {sector.short}
                  </span>
                )}
              </a>
            );
          })}
        </div>

        {/* Sector cards: swipeable row on phones */}
        <div className="md:hidden -mx-4 px-4 scroll-px-4 mt-10 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sectors.map((sector, i) => {
            const Icon = sector.icon;
            const on = i === active;
            return (
              <a
                key={sector.title}
                href="#contact"
                onClick={() => select(sector.title)}
                className={`vh-panel snap-start shrink-0 w-60 rounded-xl border p-5 transition-colors duration-500 ${
                  on
                    ? "bg-forest text-white border-forest dark:bg-gold dark:text-forest-dark dark:border-gold"
                    : "bg-white/70 text-forest-dark border-forest/10 dark:bg-white/5 dark:text-white dark:border-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <Icon className={`w-6 h-6 ${on ? "" : "text-forest dark:text-gold"}`} />
                  <span className="text-xs font-bold opacity-70">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-extrabold mb-1">{sector.short}</h3>
                <p className="text-sm opacity-75 line-clamp-2">{sector.description}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
